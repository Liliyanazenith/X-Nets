
/* ===== Komentar gaya Facebook ===== */
(()=>{
if(typeof postH!=='function'||typeof sync!=='function')return;
const E=esc,$$=s=>document.querySelector(s),vv=window.visualViewport,
TH='<svg viewBox="0 0 24 24" width="10" height="10" fill="#fff"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>',
SD='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
ago=t=>{const s=(Date.now()-Date.parse(t))/1e3;return s<60?'Baru saja':s<3600?Math.floor(s/60)+' mnt':s<86400?Math.floor(s/3600)+' j':s<604800?Math.floor(s/86400)+' h':new Date(t).toLocaleDateString('id-ID',{day:'numeric',month:'short'})},
A=(u,s)=>typeof av==='function'?av(u||{name:'?'},s):'',
nmx=u=>E(u?.display||u?.name||'?'),
N=u=>typeof nm==='function'?nm(u):`<b>${nmx(u)}</b>`,
X=t=>typeof tx==='function'?tx(t):E(t);
let C=null,busy=0;
document.head.insertAdjacentHTML('beforeend',`<style>
.fbo{position:fixed;left:0;right:0;top:0;bottom:0;z-index:200;background:#0007;display:flex;align-items:flex-end;justify-content:center}
.fbsh{width:min(600px,100%);height:780px;max-height:calc(100% - 28px);background:var(--pn);color:var(--ink);border-radius:18px 18px 0 0;display:flex;flex-direction:column;overflow:hidden;animation:fxrise .3s cubic-bezier(.2,.7,.2,1) backwards}
.fbhd{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;padding:10px 6px;border-bottom:1px solid var(--ln)}
.fbhd b{text-align:center}.fbhd button{justify-self:end;background:none;border:0;color:var(--ink);font-size:1.1rem;padding:8px 12px;cursor:pointer}
.fbl{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:14px;overscroll-behavior:contain}
.fbc{display:flex;gap:8px;align-items:flex-start}.fbc>.av{flex:none}.fbm{min-width:0;flex:1}
.fbbw{position:relative;display:inline-block;max-width:100%}
.fbb{background:var(--tn);border-radius:18px;padding:8px 12px;font-size:.92rem;line-height:1.35;word-break:break-word}
.fbb b{font-size:.82rem}.fbb.sm{font-size:.82rem;padding:6px 11px;border-radius:14px}.fbt{margin-top:1px}
.fbk{position:absolute;right:-8px;bottom:-10px;display:flex;align-items:center;gap:3px;background:var(--pn);border-radius:99px;box-shadow:0 1px 4px #0004;padding:1px 6px 1px 3px;font-size:.7rem}
.fbk i{width:16px;height:16px;border-radius:50%;background:#1877f2;display:grid;place-items:center}
.fba{display:flex;gap:14px;padding:3px 12px 0;font-size:.75rem;color:var(--mut)}.fba.k{padding-top:12px}
.fba b{cursor:pointer;user-select:none}.fba b.on{color:#1877f2}.fba b.rd{color:#c62828}
.fbrp{display:flex;flex-direction:column;gap:12px;margin-top:10px}
.fbv{margin:6px 0 0 12px;font-size:.8rem;font-weight:700;color:var(--mut);cursor:pointer}
.fbe{text-align:center;color:var(--mut);padding:40px 10px}
.fbrb{display:flex;justify-content:space-between;padding:7px 16px;font-size:.78rem;color:var(--mut);background:var(--tn)}.fbrb[hidden]{display:none}.fbrb span:last-child{font-weight:700;cursor:pointer}
.fber{color:#c62828;font-size:.78rem;padding:0 16px}
.fbf{display:flex;align-items:flex-end;gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--ln)}.fbf>.av{flex:none}
.fbf textarea{flex:1;resize:none;border:0;outline:0;background:var(--tn);color:var(--ink);border-radius:20px;padding:9px 14px;font:inherit;font-size:.92rem;line-height:1.3;min-height:38px;max-height:110px}
.fbf>button{border:0;background:none;color:var(--mut);padding:6px;display:grid;place-items:center;cursor:pointer}.fbf>button.on{color:#1877f2}
.fbpv{margin-top:10px;cursor:pointer}.fbvn{font-size:.82rem;font-weight:700;color:var(--mut);margin-bottom:6px}</style>`);
const load=async()=>{try{if(!me())return;const ids=(D.posts||[]).map(p=>+p.id);if(!ids.length)return;const ch=[];for(let i=0;i<ids.length;i+=200)ch.push(ids.slice(i,i+200));
const get=async s=>{const rs=await Promise.all(ch.map(c=>sb.from('comments').select(s).in('post_id',c).order('created_at').limit(2000)));return rs.some(r=>r.error)?null:rs.flatMap(r=>r.data)};
let d=await get('id,post_id,user_id,body,created_at,parent_id,comment_likes(user_id)'),f=!!d;if(!d)d=await get('id,post_id,user_id,body,created_at');if(!d)return;
const m={};for(const c of d)(m[c.post_id]=m[c.post_id]||[]).push({id:c.id,u:c.user_id,b:c.body,t:c.created_at,p:c.parent_id||null,l:(c.comment_likes||[]).map(x=>x.user_id)});D.cm=m;D.cmf=f}catch(e){}};
const find=i=>((D.cm&&D.cm[C.pid])||[]).find(c=>c.id===i);
const err=m=>{const b=$$('#fbs .fber');if(b){b.textContent=m;setTimeout(()=>{b.textContent=''},4000)}};
const paint=()=>{const s=$$('#fbs');if(!s||!C)return;const L=s.querySelector('.fbl'),y=L.scrollTop,all=(D.cm&&D.cm[C.pid])||[],tops=all.filter(c=>!c.p),M=me(),f=D.cmf;
const one=(c,sub)=>{const u=D.users[c.u],lk=M&&c.l.includes(M.id),can=M&&(c.u===M.id||M.role==='dev'),rp=sub?[]:all.filter(x=>x.p===c.id);
return`<div class="fbc${sub?' sub':''}">${A(u,sub?26:34)}<div class="fbm"><div class="fbbw"><div class="fbb">${N(u)}<div class="fbt">${X(c.b)}</div></div>${c.l.length?`<span class="fbk"><i>${TH}</i>${c.l.length}</span>`:''}</div><div class="fba${c.l.length?' k':''}">${f?`<b data-k="l" data-i="${c.id}" class="${lk?'on':''}">Suka</b><b data-k="r" data-i="${c.p||c.id}" data-n="${nmx(u)}">Balas</b>`:''}${can?(C.del===c.id?`<b class="rd" data-k="D" data-i="${c.id}">Hapus?</b><b data-k="n">Batal</b>`:`<b data-k="d" data-i="${c.id}">Hapus</b>`):''}<span>${ago(c.t)}</span></div>${rp.length?(C.open.has(c.id)?`<div class="fbrp">${rp.map(x=>one(x,1)).join('')}</div>`:`<div class="fbv" data-k="o" data-i="${c.id}">&#8627; Lihat ${rp.length} balasan</div>`):''}</div></div>`};
const sh=tops.slice(-C.lim);
L.innerHTML=(tops.length>sh.length?'<div class="fbv" data-k="m">Lihat komentar sebelumnya</div>':'')+(sh.map(c=>one(c)).join('')||'<div class="fbe"><b>Belum ada komentar</b><br>Jadilah yang pertama berkomentar.</div>');
L.scrollTop=y;s.querySelector('.fbhd b').textContent='Komentar'+(all.length?' ('+all.length+')':'');
const rb=s.querySelector('.fbrb');rb.hidden=!C.rep;rb.innerHTML=C.rep?`<span>Membalas <b>${E(C.rep.n)}</b></span><span data-k="y">Batal</span>`:''};
const like=async i=>{const c=find(i),m=me().id;if(!c)return;const has=c.l.includes(m);c.l=has?c.l.filter(x=>x!==m):[...c.l,m];paint();
const r=has?await sb.from('comment_likes').delete().eq('comment_id',i).eq('user_id',m):await sb.from('comment_likes').insert({comment_id:i,user_id:m});if(r.error){err(r.error.message);await load();paint()}};
const del=async i=>{C.del=null;const r=await sb.from('comments').delete().eq('id',i).select('id');if(r.error||!r.data.length){err(r.error?.message||'Tidak bisa menghapus');paint();return}await sync();view(1)};
const send=async()=>{const i=$$('#fbi'),x=i.value.trim();if(!x||busy)return;busy=1;
try{const r=await sb.from('comments').insert({post_id:+C.pid,user_id:me().id,body:x,...(C.rep?{parent_id:C.rep.id}:{})});if(r.error)throw r.error;
if(C.rep)C.open.add(C.rep.id);C.rep=null;i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));await sync();view(1);const L=$$('#fbs .fbl');L.scrollTop=L.scrollHeight}catch(e){err(e.message||'Gagal mengirim')}busy=0};
const fit=()=>{const o=$$('#fbs');if(o&&vv){o.style.top=vv.offsetTop+'px';o.style.height=vv.height+'px';o.style.bottom='auto'}};
if(vv){vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit)}
const close=()=>{$$('#fbs')?.remove();C=null;document.documentElement.style.overflow=''};
const openC=pid=>{if(!me()||$$('#fbs'))return;C={pid:String(pid),lim:15,open:new Set(),rep:null,del:null};
document.body.insertAdjacentHTML('beforeend',`<div id="fbs" class="fbo"><div class="fbsh"><div class="fbhd"><span></span><b>Komentar</b><button type="button" data-k="x" aria-label="Tutup">&#10005;</button></div><div class="fbl"></div><div class="fbrb" hidden></div><div class="fber"></div><div class="fbf">${A(me(),34)}<textarea id="fbi" rows="1" maxlength="1000" placeholder="Tulis komentar..."></textarea><button type="button" data-k="s" aria-label="Kirim">${SD}</button></div></div></div>`);
document.documentElement.style.overflow='hidden';fit();paint();const L=$$('#fbs .fbl');L.scrollTop=L.scrollHeight};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-a="cm"]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();openC(t.dataset.v||t.dataset.id)},true);
document.addEventListener('click',e=>{const o=e.target.closest&&e.target.closest('#fbs');if(!o)return;const t=e.target.closest('[data-k]');if(!t){if(e.target===o)close();return}
const k=t.dataset.k,i=+t.dataset.i;
if(k==='x')close();else if(k==='s')send();else if(k==='l')like(i);else if(k==='r'){C.rep={id:i,n:t.dataset.n};C.open.add(i);paint();$$('#fbi').focus()}
else if(k==='y'){C.rep=null;paint()}else if(k==='o'){C.open.add(i);paint()}else if(k==='m'){C.lim+=15;paint()}else if(k==='d'){C.del=i;paint()}else if(k==='n'){C.del=null;paint()}else if(k==='D')del(i)});
document.addEventListener('input',e=>{const i=e.target;if(i.id!=='fbi')return;i.style.height='auto';i.style.height=Math.min(i.scrollHeight,110)+'px';$$('#fbs .fbf>button').classList.toggle('on',!!i.value.trim())});
document.addEventListener('keydown',e=>{if(e.target.id==='fbi'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
const _s2=sync;sync=async function(){await _s2.apply(this,arguments);await load();if(C)paint()};
const _ph=postH;postH=function(p){const h=_ph.apply(this,arguments);try{const a=(D.cm&&D.cm[p.id])||[],k=h.lastIndexOf('</article>');if(!a.length||k<0)return h;const c=a[a.length-1],u=D.users[c.u],t=String(c.b);
return h.slice(0,k)+`<div class="fbpv" data-a="cm" data-v="${p.id}"><div class="fbvn">${a.length>1?'Lihat semua '+a.length+' komentar':'Lihat 1 komentar'}</div><div class="fbc">${A(u,26)}<div class="fbb sm"><b>${nmx(u)}</b> ${X(t.length>90?t.slice(0,90)+'...':t)}</div></div></div>`+h.slice(k)}catch(e){return h}};
try{sb.channel('fb-cl').on('postgres_changes',{event:'*',schema:'public',table:'comment_likes'},async()=>{await load();if(C)paint()}).subscribe()}catch(e){}
})();
