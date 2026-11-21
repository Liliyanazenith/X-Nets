-- X'Nest komentar gaya Facebook: tempel di Supabase > SQL Editor, lalu Run (aman diulang)
alter table public.comments add column if not exists parent_id bigint references public.comments(id) on delete cascade;
create index if not exists comments_post_time on public.comments(post_id,created_at);
create table if not exists public.comment_likes(comment_id bigint references public.comments on delete cascade,user_id uuid references public.profiles on delete cascade,primary key(comment_id,user_id));
alter table public.comment_likes enable row level security;
drop policy if exists p_sel on public.comment_likes;
create policy p_sel on public.comment_likes for select to authenticated using (true);
drop policy if exists p_ins on public.comment_likes;
create policy p_ins on public.comment_likes for insert to authenticated with check (user_id=auth.uid() and not public.is_banned());
drop policy if exists p_del on public.comment_likes;
create policy p_del on public.comment_likes for delete to authenticated using (user_id=auth.uid());
grant select,insert,delete on public.comment_likes to authenticated;
-- balasan selalu 2 tingkat: balasan ke balasan masuk ke komentar induk
create or replace function public.t_cparent() returns trigger language plpgsql security definer set search_path=public as $$
declare p public.comments;
begin
  if new.parent_id is not null then
    select * into p from public.comments where id=new.parent_id;
    if p.id is null then raise exception 'Komentar induk tidak ada'; end if;
    new.post_id:=p.post_id; new.parent_id:=coalesce(p.parent_id,p.id);
  end if;
  return new;
end $$;
drop trigger if exists cparent on public.comments;
create trigger cparent before insert on public.comments for each row execute function public.t_cparent();
do $$ begin
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='comment_likes') then
    alter publication supabase_realtime add table public.comment_likes;
  end if;
end $$;
