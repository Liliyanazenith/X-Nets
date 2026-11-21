-- X'Nest update: tempel di Supabase > SQL Editor, lalu Run (aman dijalankan ulang)
-- 1) Top up Mora oleh dev
create table if not exists public.topups(id bigint generated always as identity primary key,user_id uuid references public.profiles on delete cascade,mora int not null,by_dev uuid,created_at timestamptz not null default now());
alter table public.topups enable row level security;
drop policy if exists p_sel on public.topups;
create policy p_sel on public.topups for select to authenticated using (user_id=auth.uid() or public.is_dev());
revoke insert,update,delete on public.topups from authenticated;
grant select on public.topups to authenticated;
create or replace function public.dev_topup(uname text,mail text,amt int) returns int language plpgsql security definer set search_path=public as $$
declare uid uuid; m int;
begin
  if not is_dev() then raise exception 'Khusus developer'; end if;
  if amt is null or amt<1 or amt>10000000 then raise exception 'Jumlah Mora tidak valid'; end if;
  select p.id into uid from profiles p join auth.users u on u.id=p.id where p.username=lower(trim(uname)) and lower(u.email)=lower(trim(mail));
  if uid is null then raise exception 'Username dan Gmail tidak cocok'; end if;
  insert into wallets(user_id) values(uid) on conflict do nothing;
  update wallets set mora=mora+amt where user_id=uid returning mora into m;
  insert into topups(user_id,mora,by_dev) values(uid,amt,auth.uid());
  return m;
end $$;
-- 2) Status sandi semua pengguna (Aman / Tidak pantas), sandi asli tidak pernah ditampilkan
create or replace function public.dev_pw_all() returns table(id uuid,username text,email text,bad boolean) language sql stable security definer set search_path=public,extensions as $$
  select u.id,p.username,u.email::text,coalesce(u.encrypted_password<>'' and exists(select 1 from banned_pw b where u.encrypted_password=crypt(b.pw,u.encrypted_password)),false)
  from auth.users u join profiles p on p.id=u.id where is_dev() order by 4 desc,2 $$;
-- 3) Harga centang biru: 500 Mora per bulan (5 bulan 2.500, 1 tahun 6.000)
create or replace function public.buy_check(plan int) returns int language plpgsql security definer set search_path=public as $$
declare cost int; d int; m int;
begin
  if auth.uid() is null or is_banned() then raise exception 'Tidak diizinkan'; end if;
  select c,dd into cost,d from (values (0,100,7),(1,500,30),(2,2500,150),(3,6000,365)) v(i,c,dd) where i=plan;
  if cost is null then raise exception 'Paket tidak valid'; end if;
  if not is_dev() then
    insert into wallets(user_id) values(auth.uid()) on conflict do nothing;
    update wallets set mora=mora-cost where user_id=auth.uid() and mora>=cost returning mora into m;
    if m is null then raise exception 'Mora tidak cukup'; end if;
  end if;
  update profiles set verified_until=greatest(coalesce(verified_until,now()),now())+d*interval '1 day' where id=auth.uid();
  return coalesce(m,0);
end $$;
-- 4) Saluran/komunitas: pemilik, pemilik tambahan, tambah anggota, transfer
alter table public.room_members add column if not exists is_owner boolean not null default false;
create or replace function public.room_owner(rid uuid) returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from rooms r where r.id=rid and r.owner=auth.uid()) or exists(select 1 from room_members m where m.room_id=rid and m.user_id=auth.uid() and m.is_owner) $$;
drop policy if exists p_upd on public.rooms;
create policy p_upd on public.rooms for update to authenticated using (public.room_owner(id) or public.is_dev()) with check (public.room_owner(id) or public.is_dev());
create or replace function public.room_add(rid uuid,uname text,mk_owner boolean default false) returns void language plpgsql security definer set search_path=public as $$
declare t uuid;
begin
  if not (public.room_owner(rid) or is_dev()) then raise exception 'Hanya pemilik'; end if;
  select id into t from profiles where username=lower(trim(uname));
  if t is null then raise exception 'Pengguna tidak ditemukan'; end if;
  insert into room_members(room_id,user_id,is_owner) values(rid,t,mk_owner) on conflict(room_id,user_id) do update set is_owner=room_members.is_owner or excluded.is_owner;
end $$;
create or replace function public.room_transfer(rid uuid,uname text) returns void language plpgsql security definer set search_path=public as $$
declare t uuid;
begin
  if not (exists(select 1 from rooms where id=rid and owner=auth.uid()) or is_dev()) then raise exception 'Hanya pemilik utama'; end if;
  select id into t from profiles where username=lower(trim(uname));
  if t is null then raise exception 'Pengguna tidak ditemukan'; end if;
  insert into room_members(room_id,user_id,is_owner) values(rid,t,true) on conflict(room_id,user_id) do update set is_owner=true;
  update rooms set owner=t where id=rid;
end $$;
-- 5) Bubble pesan kustom hanya untuk akun terverifikasi
create or replace function public.t_bub() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if coalesce(new.s->'bub','null'::jsonb)<>'null'::jsonb and (new.s->'bub') is distinct from (old.s->'bub') and not (new.role='dev' or coalesce(new.verified_until>now(),false)) then
    raise exception 'Bubble khusus akun terverifikasi'; end if;
  return new;
end $$;
drop trigger if exists bub_chk on public.profiles;
create trigger bub_chk before update on public.profiles for each row execute function public.t_bub();
grant execute on function public.dev_topup(text,text,int),public.dev_pw_all(),public.buy_check(int),public.room_owner(uuid),public.room_add(uuid,text,boolean),public.room_transfer(uuid,text) to authenticated;
