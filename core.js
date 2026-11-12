/* ============ TEMPLATE WORKSPACE ENGINE ============ */
(function(){
"use strict";

const ID = document.body.dataset.template;
const T  = (window.TEMPLATES||[]).find(x=>x.id===ID) || window.TEMPLATES[0];
const SEC= window.SECTORS[T.sector];
const th = Object.assign({}, SEC, T.theme||{});
const A  = th.accent, A2 = th.accent2, DARK = !!th.dark;
const money = n => th.currency + Number(n||0).toLocaleString();
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
document.title = T.id + " · " + T.name;

/* ---------- styles ---------- */
const css = `
:root{--a:${A};--a2:${A2};--bg:${DARK?"#0b0f16":"#ffffff"};--fg:${DARK?"#e8eef7":"#0f172a"};--card:${DARK?"#121a26":"#ffffff"};--line:${DARK?"#22304a":"#e4e7ec"};--muted:${DARK?"#94a3b8":"#667085"};--soft:${DARK?"#0f1622":"#f8fafc"}}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--bg);color:var(--fg);font:15px/1.65 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
img{max-width:100%}
a{color:inherit;text-decoration:none}
.wrap{max-width:1180px;margin:0 auto;padding:0 22px}
.banner{position:sticky;top:0;z-index:60;background:linear-gradient(90deg,var(--a),var(--a2));color:#fff;font-size:12.5px;letter-spacing:.2px;padding:8px 22px;text-align:center}
.banner b{font-weight:700}
header{position:sticky;top:33px;z-index:50;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.hrow{display:flex;align-items:center;justify-content:space-between;gap:18px;height:66px}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:-.3px;font-size:16px}
.logo i{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--a),var(--a2));display:grid;place-items:center;color:#fff;font-style:normal;font-size:13px;font-weight:800}
nav{display:flex;gap:26px;font-size:14px;font-weight:500;color:var(--muted)}
nav a:hover{color:var(--a)}
.hact{display:flex;gap:10px;align-items:center}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;cursor:pointer;font:inherit;font-weight:650;border-radius:10px;padding:11px 18px;background:var(--a);color:#fff;transition:.18s;white-space:nowrap}
.btn:hover{filter:brightness(1.08);transform:translateY(-1px)}
.btn.ghost{background:transparent;color:var(--fg);border:1px solid var(--line)}
.btn.ghost:hover{border-color:var(--a);color:var(--a)}
.btn.small{padding:8px 13px;font-size:13px;border-radius:9px}
.burger{display:none;background:none;border:1px solid var(--line);border-radius:9px;padding:8px 10px;color:var(--fg);cursor:pointer;font-size:16px}
.hero{padding:76px 0 60px;background:radial-gradient(900px 420px at 12% -10%,color-mix(in srgb,var(--a) 16%,transparent),transparent 70%)}
.badge{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:var(--a);background:color-mix(in srgb,var(--a) 10%,transparent);border:1px solid color-mix(in srgb,var(--a) 26%,transparent);padding:6px 12px;border-radius:999px}
h1{font-size:clamp(30px,4.4vw,54px);line-height:1.08;letter-spacing:-1.4px;margin:18px 0 16px;max-width:16ch}
.hero p{font-size:17px;color:var(--muted);max-width:58ch;margin:0 0 26px}
.heroActs{display:flex;gap:12px;flex-wrap:wrap}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:26px 0 0}
.stat{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
.stat strong{display:block;font-size:22px;letter-spacing:-.6px}
.stat span{font-size:12.5px;color:var(--muted)}
section{padding:64px 0}
.sechead{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:26px;flex-wrap:wrap}
h2{font-size:clamp(22px,2.6vw,32px);letter-spacing:-.8px;margin:0 0 6px}
.sechead p{margin:0;color:var(--muted);max-width:52ch;font-size:14.5px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:18px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;transition:.18s;display:flex;flex-direction:column;gap:10px}
.card:hover{border-color:color-mix(in srgb,var(--a) 45%,var(--line));transform:translateY(-2px)}
.card h3{margin:0;font-size:16px;letter-spacing:-.3px}
.card p{margin:0;color:var(--muted);font-size:13.5px}
.thumb{height:104px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 22%,transparent),color-mix(in srgb,var(--a2) 22%,transparent));font-weight:800;font-size:20px;color:var(--a);letter-spacing:1px}
.svcIcon{width:38px;height:38px;border-radius:10px;background:color-mix(in srgb,var(--a) 12%,transparent);color:var(--a);display:grid;place-items:center;font-weight:800;font-size:13px}
.svcPrice{font-size:12.5px;color:var(--a);font-weight:700}
.row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto}
.row strong{font-size:15px;letter-spacing:-.3px}
.chips{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:22px}
.chip{border:1px solid var(--line);background:transparent;color:var(--muted);padding:7px 14px;border-radius:999px;cursor:pointer;font:inherit;font-size:13px;font-weight:600;transition:.15s}
.chip:hover{color:var(--fg);border-color:var(--muted)}
.chip.on{background:var(--a);border-color:var(--a);color:#fff}
.panel{background:var(--soft);border:1px solid var(--line);border-radius:18px;padding:26px}
.two{display:grid;grid-template-columns:1.05fr .95fr;gap:28px;align-items:start}
input,select,textarea{font:inherit;width:100%;padding:11px 13px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--fg)}
input:focus,select:focus,textarea:focus{outline:2px solid color-mix(in srgb,var(--a) 40%,transparent);border-color:var(--a)}
label{font-size:12.5px;font-weight:700;color:var(--muted);display:block;margin:0 0 6px}
.field{margin-bottom:14px}
.tbar{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:14px}
.tbar h3{margin:0;font-size:18px;letter-spacing:-.4px}
.progress{height:9px;border-radius:99px;background:var(--line);overflow:hidden;margin:6px 0 14px}
.progress i{display:block;height:100%;background:linear-gradient(90deg,var(--a),var(--a2));border-radius:99px;transition:width .5s}
.q{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;font-size:14.5px}
.q footer{display:block;margin-top:10px;font-size:12.5px;color:var(--muted);font-weight:700}
.quote{font-size:15px;line-height:1.7}
footer.site{border-top:1px solid var(--line);padding:34px 0;color:var(--muted);font-size:13px}
.frow{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.fab{position:fixed;right:18px;bottom:18px;z-index:70;display:flex;align-items:center;gap:10px;background:var(--a);color:#fff;border:0;border-radius:14px;padding:13px 17px;font:inherit;font-weight:700;font-size:13.5px;cursor:pointer;box-shadow:0 12px 34px rgba(0,0,0,.28);max-width:330px;text-align:left}
.fab:hover{filter:brightness(1.08)}
.scrim{position:fixed;inset:0;background:rgba(4,8,16,.55);z-index:80;display:none}
.scrim.on{display:block}
.drawer{position:fixed;top:0;right:0;height:100%;width:390px;max-width:92vw;background:var(--bg);border-left:1px solid var(--line);z-index:90;transform:translateX(101%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column}
.drawer.on{transform:none}
.dhead{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-bottom:1px solid var(--line)}
.dhead h3{margin:0;font-size:16px}
.dbody{padding:16px 20px;overflow:auto;flex:1}
.dfoot{padding:16px 20px;border-top:1px solid var(--line)}
.line{display:flex;gap:12px;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px dashed var(--line);font-size:14px}
.line small{display:block;color:var(--muted);font-size:12px}
.x{background:none;border:0;font-size:20px;cursor:pointer;color:var(--muted);line-height:1}
.modal{position:fixed;z-index:95;inset:auto;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);width:520px;max-width:94vw;max-height:88vh;overflow:auto;background:var(--bg);border:1px solid var(--line);border-radius:18px;padding:24px;opacity:0;pointer-events:none;transition:.2s}
.modal.on{opacity:1;pointer-events:auto;transform:translate(-50%,-50%) scale(1)}
.modal h3{margin:0 0 4px;font-size:19px;letter-spacing:-.4px}
.modal p.sub{margin:0 0 18px;color:var(--muted);font-size:13.5px}
.slots{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 16px}
.slot{border:1px solid var(--line);background:transparent;color:var(--fg);border-radius:9px;padding:8px 12px;font:inherit;font-size:13px;cursor:pointer}
.slot.on{background:var(--a);border-color:var(--a);color:#fff}
.toast{position:fixed;left:50%;bottom:88px;transform:translate(-50%,20px);background:#0f172a;color:#fff;padding:12px 20px;border-radius:11px;font-size:13.5px;font-weight:600;z-index:120;opacity:0;transition:.25s;pointer-events:none;max-width:90vw;text-align:center}
.toast.on{opacity:1;transform:translate(-50%,0)}
.tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.tier{border:1px solid var(--line);border-radius:16px;padding:22px;background:var(--card);display:flex;flex-direction:column;gap:10px}
.tier.hot{border-color:var(--a);box-shadow:0 0 0 3px color-mix(in srgb,var(--a) 14%,transparent)}
.tier h4{margin:0;font-size:15px}
.tier .price{font-size:28px;font-weight:800;letter-spacing:-1px}
.tier ul{margin:0;padding-left:18px;color:var(--muted);font-size:13.5px}
.player{aspect-ratio:16/9;border-radius:14px;background:#000;display:grid;place-items:center;position:relative;overflow:hidden;border:1px solid var(--line)}
.player .play{width:64px;height:64px;border-radius:50%;border:0;background:rgba(255,255,255,.94);color:#000;font-size:22px;cursor:pointer;display:grid;place-items:center}
.chat{height:230px;overflow:auto;border:1px solid var(--line);border-radius:12px;padding:12px;background:var(--card);font-size:13px}
.chat div{padding:4px 0;border-bottom:1px dashed var(--line)}
.chat b{color:var(--a)}
.tl{border-left:2px solid var(--line);margin-left:8px;padding-left:20px}
.tl div{position:relative;padding:0 0 16px}
.tl div:before{content:"";position:absolute;left:-27px;top:5px;width:10px;height:10px;border-radius:50%;background:var(--line)}
.tl div.done:before{background:var(--a)}
.tl div.now:before{background:var(--a2);box-shadow:0 0 0 4px color-mix(in srgb,var(--a2) 24%,transparent)}
.tl strong{display:block;font-size:14px}
.tl span{font-size:12.5px;color:var(--muted)}
.masonry{columns:3;column-gap:16px}
.masonry .card{margin:0 0 16px;break-inside:avoid}
.range{display:flex;align-items:center;gap:14px}
.range input[type=range]{padding:0}
.big{font-size:32px;font-weight:800;letter-spacing:-1.2px;color:var(--a)}
.list{display:grid;gap:10px}
.list a{display:flex;justify-content:space-between;gap:12px;padding:13px 16px;border:1px solid var(--line);border-radius:11px;background:var(--card);font-size:14px}
.list a:hover{border-color:var(--a)}
@media(max-width:960px){.two{grid-template-columns:1fr}.masonry{columns:2}.stats{grid-template-columns:repeat(2,1fr)}.tiers{grid-template-columns:1fr}}
@media(max-width:820px){nav{position:absolute;top:66px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--line);flex-direction:column;gap:0;padding:8px 22px 16px;display:none}nav.open{display:flex}nav a{padding:11px 0;border-bottom:1px solid var(--line)}.burger{display:block}.hact .btn.ghost{display:none}}
@media(max-width:560px){.masonry{columns:1}.stats{grid-template-columns:1fr 1fr}.hero{padding:48px 0 40px}.fab{left:14px;right:14px;bottom:14px;max-width:none;justify-content:center}section{padding:46px 0}h1{letter-spacing:-.8px}}
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

/* ---------- helpers ---------- */
const app = document.getElementById("app");
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
let toastTimer;
function toast(msg){ let t=$(".toast"); if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t);} t.textContent=msg; t.classList.add("on"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("on"),2600); }

/* ---------- shell ---------- */
app.innerHTML = `
<div class="banner"><b>${esc(T.name)}</b> Demonstration — Click <b>“Customize for Your Business”</b> to make it yours.</div>
<header><div class="wrap hrow">
  <div class="logo"><i>${esc(T.name.slice(0,2).toUpperCase())}</i><span>${esc(T.name)}</span></div>
  <nav id="nav">${T.nav.map(n=>`<a href="#main">${esc(n)}</a>`).join("")}</nav>
  <div class="hact">
    <button class="btn ghost small" id="openDrawer">${esc(th.drawer)}</button>
    <button class="btn small" id="heroCta2">${esc(th.cta)}</button>
    <button class="burger" id="burger" aria-label="Menu">☰</button>
  </div>
</div></header>
<main id="main">
  <div class="hero"><div class="wrap">
    <span class="badge">● ${esc(th.badge)}</span>
    <h1>${esc(T.h1)}</h1>
    <p>${esc(T.sub)}</p>
    <div class="heroActs">
      <button class="btn" id="heroCta">${esc(th.cta)}</button>
      <button class="btn ghost" id="heroCta3">${esc(th.drawer)}</button>
    </div>
    <div class="stats">${T.stats.map(s=>`<div class="stat"><strong>${esc(s[0])}</strong><span>${esc(s[1])}</span></div>`).join("")}</div>
  </div></div>

  <section><div class="wrap">
    <div class="sechead"><div><h2>What we do</h2><p>${esc(SEC.label)} services with clear pricing and no hidden line items.</p></div></div>
    <div class="grid">${T.services.map((s,i)=>`
      <article class="card">
        <div class="svcIcon">${String(i+1).padStart(2,"0")}</div>
        <h3>${esc(s[0])}</h3><p>${esc(s[1])}</p>
        <div class="row"><span class="svcPrice">${esc(s[2])}</span><button class="btn small ghost" data-ask="${esc(s[0])}">Enquire</button></div>
      </article>`).join("")}</div>
  </div></section>

  <section style="background:var(--soft);border-block:1px solid var(--line)"><div class="wrap">
    <div class="sechead"><div><h2>${esc(th.grid)}</h2><p>Filter the grid below — results update instantly.</p></div>
      <button class="btn ghost small" id="openDrawer2">${esc(th.drawer)}</button></div>
    <div class="chips" id="chips">${["All",...T.filters.filter(f=>f!=="All")].map((f,i)=>`<button class="chip${i===0?" on":""}" data-f="${esc(f)}">${esc(f)}</button>`).join("")}</div>
    <div class="grid" id="grid"></div>
  </div></section>

  <section><div class="wrap"><div id="module"></div></div></section>

  <section style="background:var(--soft);border-block:1px solid var(--line)"><div class="wrap">
    <div class="sechead"><div><h2>What clients say</h2><p>Realistic, industry-specific testimonials — not lorem ipsum.</p></div></div>
    <div class="grid">${T.testimonials.map(t=>`<blockquote class="q quote">“${esc(t[0])}”<footer>— ${esc(t[1])}</footer></blockquote>`).join("")}</div>
  </div></section>

  <section><div class="wrap two">
    <div><div class="sechead"><div><h2>Talk to us</h2><p>${esc(T.contact.addr)}</p></div></div>
      <div class="list" style="margin-top:6px">
        <a href="tel:${esc(T.contact.phone)}"><span>Phone</span><strong>${esc(T.contact.phone)}</strong></a>
        <a href="mailto:${esc(T.contact.email)}"><span>Email</span><strong>${esc(T.contact.email)}</strong></a>
      </div></div>
    <form class="panel" id="contactForm">
      <div class="field"><label>Full name</label><input required placeholder="e.g. Amara Nwosu"></div>
      <div class="field"><label>Email</label><input type="email" required placeholder="you@company.com"></div>
      <div class="field"><label>How can we help?</label><textarea rows="4" placeholder="Briefly describe what you need…"></textarea></div>
      <button class="btn" type="submit">Send enquiry</button>
    </form>
  </div></section>
</main>
<footer class="site"><div class="wrap frow">
  <div><strong>${esc(T.name)}</strong> · ${esc(T.tag)}</div>
  <div>${esc(T.contact.email)} · ${esc(T.contact.phone)}</div>
</div></footer>
<button class="fab" id="fab">❤ Love this layout? Click here to customize this template for your business.</button>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer">
  <div class="dhead"><h3>${esc(th.drawer)}</h3><button class="x" data-close>×</button></div>
  <div class="dbody" id="drawerBody"></div>
  <div class="dfoot"><div class="row" style="margin-bottom:12px"><span>Total</span><strong id="drawerTotal">${money(0)}</strong></div>
    <button class="btn" style="width:100%" id="drawerCheckout">${esc(th.cta)}</button></div>
</aside>
<div class="modal" id="modal"><div id="modalBody"></div></div>
`;

/* ---------- grid + filters ---------- */
const grid = $("#grid");
function itemCard(it){
  return `<article class="card" data-tags="${esc((it.tags||[]).join("|"))}">
    <div class="thumb">${esc(it.t.slice(0,2).toUpperCase())}</div>
    <h3>${esc(it.t)}</h3><p>${esc(it.s)}</p>
    <div class="row"><strong>${it.p?money(it.p):"On request"}</strong>
    <button class="btn small" data-add="${esc(it.t)}" data-price="${it.p||0}">${it.p?"Select":"Enquire"}</button></div>
  </article>`;
}
function renderGrid(filter){
  const f = filter||"All";
  grid.innerHTML = T.items.filter(it => f==="All" || (it.tags||[]).includes(f)).map(itemCard).join("") || `<p style="color:var(--muted)">No items in this filter.</p>`;
}
renderGrid("All");
$("#chips").addEventListener("click",e=>{
  const b=e.target.closest(".chip"); if(!b) return;
  $$(".chip").forEach(c=>c.classList.remove("on")); b.classList.add("on");
  renderGrid(b.dataset.f);
});

/* ---------- drawer / selection ---------- */
const sel = [];
const drawer=$("#drawer"), scrim=$("#scrim");
function openDrawer(){ drawer.classList.add("on"); scrim.classList.add("on"); renderDrawer(); }
function closeAll(){ drawer.classList.remove("on"); scrim.classList.remove("on"); $("#modal").classList.remove("on"); }
function renderDrawer(){
  const body=$("#drawerBody");
  if(!sel.length){ body.innerHTML=`<p style="color:var(--muted)">Nothing selected yet. Use “Select” on any ${esc(th.grid.toLowerCase())} to add it here.</p>`; }
  else body.innerHTML = sel.map((s,i)=>`<div class="line"><span>${esc(s.name)}<small>${s.price?money(s.price):"Price on request"}</small></span>
    <button class="x" data-rm="${i}" aria-label="Remove">×</button></div>`).join("");
  $("#drawerTotal").textContent = money(sel.reduce((a,b)=>a+(b.price||0),0));
}
function addItem(name,price){
  const p=Number(price)||0;
  const ex=sel.find(s=>s.name===name);
  if(ex) toast("Already in your selection: "+name);
  else { sel.push({name,price:p}); toast("Added: "+name); }
  renderDrawer();
}
$("#drawerBody").addEventListener("click",e=>{
  const b=e.target.closest("[data-rm]"); if(!b) return;
  sel.splice(+b.dataset.rm,1); renderDrawer();
});
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-add]");
  if(a){ addItem(a.dataset.add, a.dataset.price); }
  const ask=e.target.closest("[data-ask]");
  if(ask){ addItem(ask.dataset.ask, 0); openDrawer(); }
});
$("#openDrawer").onclick=openDrawer;
$("#openDrawer2").onclick=openDrawer;
$("#heroCta3").onclick=openDrawer;
$("#drawerCheckout").onclick=()=>{ if(!sel.length){toast("Select something first.");return;} toast("Request submitted — our team will confirm within 1 business day."); };
$$("[data-close]").forEach(b=>b.onclick=closeAll);
scrim.onclick=closeAll;
$("#burger").onclick=()=>$("#nav").classList.toggle("open");
$("#heroCta").onclick=()=>openModuleAction();

/* ---------- modal ---------- */
const modal=$("#modal"), modalBody=$("#modalBody");
function openModal(html){ modalBody.innerHTML=html; modal.classList.add("on"); scrim.classList.add("on"); }
$("#heroCta2").onclick=()=>openModuleAction();
function openModuleAction(){ if(T.module==="booking") openBooking(); else if(T.module==="cart") openDrawer(); else if(T.module==="calculator") document.querySelector("#module").scrollIntoView({behavior:"smooth"}); else openCustomize(); }

/* ---------- booking ---------- */
function openBooking(){
  const days=[...Array(10)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i+1);return d;});
  const fmt=d=>d.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"});
  openModal(`<h3>Book: ${esc(T.name)}</h3><p class="sub">Choose a date and time. Confirmation is instant in this demo.</p>
    <label>Date</label><div class="slots" id="dSlots">${days.map((d,i)=>`<button class="slot${i===0?" on":""}" data-d="${fmt(d)}">${fmt(d)}</button>`).join("")}</div>
    <label>Time</label><div class="slots" id="tSlots">${["09:00","10:30","12:00","14:00","15:30","17:00"].map((t,i)=>`<button class="slot${i===0?" on":""}" data-t="${t}">${t}</button>`).join("")}</div>
    <div class="field"><label>Name</label><input placeholder="Your name"></div>
    <div class="field"><label>Email</label><input type="email" placeholder="you@email.com"></div>
    <button class="btn" style="width:100%" id="confirmBook">Confirm booking</button>`);
  let d=fmt(days[0]), t="09:00";
  $("#dSlots").onclick=e=>{const b=e.target.closest("[data-d]");if(!b)return;$$("#dSlots .slot").forEach(x=>x.classList.remove("on"));b.classList.add("on");d=b.dataset.d;};
  $("#tSlots").onclick=e=>{const b=e.target.closest("[data-t]");if(!b)return;$$("#tSlots .slot").forEach(x=>x.classList.remove("on"));b.classList.add("on");t=b.dataset.t;};
  $("#confirmBook").onclick=()=>{closeAll();toast("Booked: "+d+" at "+t+". A confirmation has been sent.");};
}

/* ---------- customize (lead) ---------- */
function openCustomize(){
  const days=[...Array(14)].map((_,i)=>{const x=new Date();x.setDate(x.getDate()+i+1);return x;});
  const fmt=x=>x.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"});
  openModal(`<h3>Customize this template</h3><p class="sub">Tell us about your business and pick a consultation slot. We reply within one business day.</p>
    <div class="field"><label>Your name</label><input id="cn" placeholder="e.g. Amara Nwosu"></div>
    <div class="field"><label>Business name</label><input id="cb" placeholder="e.g. Northwind Ltd"></div>
    <div class="field"><label>Email</label><input id="ce" type="email" placeholder="you@company.com"></div>
    <div class="field"><label>What should we change?</label><textarea id="cm" rows="3" placeholder="Colours, content, booking flow, integrations…"></textarea></div>
    <label>Consultation slot</label><div class="slots" id="cSlots">${days.map((x,i)=>`<button class="slot${i===0?" on":""}" data-c="${fmt(x)}">${fmt(x)}</button>`).join("")}</div>
    <button class="btn" style="width:100%" id="cSend">Request customization</button>`);
  let slot=fmt(days[0]);
  $("#cSlots").onclick=e=>{const b=e.target.closest("[data-c]");if(!b)return;$$("#cSlots .slot").forEach(x=>x.classList.remove("on"));b.classList.add("on");slot=b.dataset.c;};
  $("#cSend").onclick=()=>{
    if(!$("#cn").value.trim()||!$("#ce").value.trim()){toast("Please add your name and email.");return;}
    closeAll(); toast("Request received. Consultation held for "+slot+".");
  };
}
$("#fab").onclick=openCustomize;
$("#contactForm").addEventListener("submit",e=>{e.preventDefault();e.target.reset();toast("Enquiry sent. We will respond within 1 business day.");});

/* ---------- modules ---------- */
function renderModule(){
  const box=$("#module"); if(!T.module){box.innerHTML="";return;}
  if(T.module==="booking"){
    box.innerHTML=`<div class="sechead"><div><h2>Check availability</h2><p>Pick a date and time — the calendar updates live.</p></div></div>
      <div class="two"><div class="panel">
        <div class="field"><label>Service</label><select>${T.items.map(i=>`<option>${esc(i.t)}</option>`).join("")}</select></div>
        <div class="field"><label>Date</label><input type="date" id="bDate"></div>
        <div class="field"><label>Party size</label><select><option>1</option><option selected>2</option><option>3</option><option>4</option><option>6</option></select></div>
        <button class="btn" id="bGo">Check availability</button></div>
        <div class="panel"><h3 style="margin:0 0 12px">Why book direct</h3>
        <div class="list"><a href="#main"><span>Best price guaranteed</span><strong>✓</strong></a><a href="#main"><span>Free changes up to 48h</span><strong>✓</strong></a><a href="#main"><span>Instant confirmation</span><strong>✓</strong></a></div></div></div>`;
    $("#bDate").min=new Date().toISOString().slice(0,10);
    $("#bGo").onclick=openBooking;
  }
  if(T.module==="dashboard"){
    box.innerHTML=`<div class="sechead"><div><h2>Student dashboard preview</h2><p>A working demo of progress tracking — click “Mark complete” to see it update.</p></div></div>
      <div class="two"><div class="panel" id="dashList"></div>
      <div class="panel"><h3 style="margin:0 0 10px">Overall progress</h3><div class="progress"><i id="overall" style="width:0%"></i></div><p style="color:var(--muted);font-size:13.5px">Completion is calculated across all enrolled modules.</p>
      <div class="list" style="margin-top:12px"><a href="#main"><span>Next deadline</span><strong>Fri 12:00</strong></a><a href="#main"><span>Attendance</span><strong>96%</strong></a></div></div></div>`;
    const mods=T.items.slice(0,4).map(i=>({t:i.t,p:Math.floor(Math.random()*50)+20}));
    function paint(){ $("#dashList").innerHTML=mods.map((m,i)=>`<div style="margin-bottom:16px"><div class="row"><strong>${esc(m.t)}</strong><span style="font-size:13px;color:var(--muted)">${m.p}%</span></div>
      <div class="progress"><i style="width:${m.p}%"></i></div>
      <button class="btn small ghost" data-mc="${i}">Mark complete</button></div>`).join("");
      $("#overall").style.width=(mods.reduce((a,b)=>a+b.p,0)/mods.length)+"%";
      $$("[data-mc]").forEach(b=>b.onclick=()=>{mods[+b.dataset.mc].p=100;paint();toast("Module marked complete.");});}
    paint();
  }
  if(T.module==="calculator"){
    box.innerHTML=`<div class="sechead"><div><h2>Cost calculator</h2><p>Move the sliders — the estimate updates instantly. Illustrative only.</p></div></div>
      <div class="panel"><div class="field"><label>Amount / value</label><div class="range"><input type="range" id="amt" min="10000" max="1000000" step="5000" value="250000"><strong id="amtV"></strong></div></div>
      <div class="field"><label>Deposit / upfront (%)</label><div class="range"><input type="range" id="dep" min="0" max="50" step="1" value="10"><strong id="depV"></strong></div></div>
      <div class="field"><label>Term (years)</label><div class="range"><input type="range" id="term" min="1" max="30" step="1" value="20"><strong id="termV"></strong></div></div>
      <div class="row" style="margin-top:8px"><span>Estimated monthly</span><span class="big" id="calcOut"></span></div></div>`;
    const calc=()=>{
      const a=+$("#amt").value, d=+$("#dep").value, t=+$("#term").value;
      $("#amtV").textContent=money(a); $("#depV").textContent=d+"%"; $("#termV").textContent=t+" yrs";
      const principal=a*(1-d/100), r=0.065/12, n=t*12;
      const m=principal*r/(1-Math.pow(1+r,-n));
      $("#calcOut").textContent=money(Math.round(m));
    };
    ["amt","dep","term"].forEach(id=>$("#"+id).oninput=calc); calc();
  }
  if(T.module==="cart"){
    box.innerHTML=`<div class="sechead"><div><h2>Order preview</h2><p>Add items from the grid above — the drawer and total stay in sync.</p></div>
      <button class="btn small" id="mCart">Open ${esc(th.drawer)}</button></div>
      <div class="panel"><div class="list">${T.items.slice(0,4).map(i=>`<a href="#main"><span>${esc(i.t)}<br><small style="color:var(--muted)">${esc(i.s)}</small></span><strong>${i.p?money(i.p):"—"}</strong></a>`).join("")}</div></div>`;
    $("#mCart").onclick=openDrawer;
  }
  if(T.module==="stream"){
    box.innerHTML=`<div class="sechead"><div><h2>Live now</h2><p>Streaming, chat and leaderboard demo.</p></div></div>
      <div class="two"><div><div class="player"><button class="play" id="playBtn">▶</button></div>
      <h3 style="margin:14px 0 4px">${esc(T.items[0].t)}</h3><p style="color:var(--muted);font-size:13.5px">${esc(T.items[0].s)}</p></div>
      <div><h3 style="margin:0 0 8px;font-size:15px">Live chat</h3><div class="chat" id="chat"></div>
      <h3 style="margin:16px 0 8px;font-size:15px">Leaderboard</h3><div class="list">${T.items.slice(1,5).map((i,n)=>`<a href="#main"><span>${n+1}. ${esc(i.t)}</span><strong>${(9800-n*1340).toLocaleString()} pts</strong></a>`).join("")}</div></div></div>`;
    const msgs=[["mod_bot","Welcome in — rules in the pinned post."],["nova_x","that clutch was insane"],["kiwi","LFG for ranked after this"],["mod_bot","Clip submissions close at midnight"]];
    const chat=$("#chat"); chat.innerHTML=msgs.map(m=>`<div><b>${esc(m[0])}</b> ${esc(m[1])}</div>`).join("");
    let live=false;
    $("#playBtn").onclick=e=>{ live=!live; e.target.textContent=live?"❚❚":"▶"; toast(live?"Playing demo stream…":"Paused"); };
    setInterval(()=>{ if(!live) return; const names=["ghost_07","tundra","vee","pixelkid","mox"]; const lines=["gg","one more map","clip it","that was clean","need a 5th"];
      const d=document.createElement("div"); d.innerHTML=`<b>${names[Math.floor(Math.random()*names.length)]}</b> ${lines[Math.floor(Math.random()*lines.length)]}`; chat.appendChild(d); chat.scrollTop=chat.scrollHeight; },2600);
  }
  if(T.module==="portfolio"){
    box.innerHTML=`<div class="sechead"><div><h2>Selected work</h2><p>Masonry showcase with live preview cards and a downloadable CV.</p></div>
      <button class="btn small" id="cvBtn">Download CV</button></div>
      <div class="masonry">${T.items.map((i,n)=>`<article class="card"><div class="thumb" style="height:${110+((n*37)%90)}px">${esc(i.t.slice(0,2).toUpperCase())}</div><h3>${esc(i.t)}</h3><p>${esc(i.s)}</p></article>`).join("")}</div>`;
    $("#cvBtn").onclick=()=>{
      const txt=`${T.name}\n${T.tag}\n\n${T.h1}\n\n${T.sub}\n\nSELECTED WORK\n${T.items.map(i=>"- "+i.t+" — "+i.s).join("\n")}\n\nCONTACT\n${T.contact.email} | ${T.contact.phone}`;
      const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain"})); a.download=T.name.replace(/\s+/g,"-")+"-CV.txt"; a.click(); toast("CV downloaded.");
    };
  }
  if(T.module==="pricing"){
    const tiers=[["Starter","$0",["2 agents","Shared inbox","Email support"]],["Growth","$29",["10 agents","SLA tracking","Reporting","API access"]],["Scale","$59",["Unlimited agents","AI triage","SSO","Priority support"]]];
    box.innerHTML=`<div class="sechead"><div><h2>Simple, per-seat pricing</h2><p>No setup fees. Cancel any time.</p></div></div>
      <div class="tiers">${tiers.map((t,i)=>`<div class="tier${i===1?" hot":""}"><h4>${t[0]}</h4><div class="price">${t[1]}<span style="font-size:13px;font-weight:600;color:var(--muted)">/agent/mo</span></div>
      <ul>${t[2].map(x=>`<li>${x}</li>`).join("")}</ul><button class="btn small" data-plan="${t[0]}">Choose ${t[0]}</button></div>`).join("")}</div>`;
    $$("[data-plan]").forEach(b=>b.onclick=()=>toast(b.dataset.plan+" plan selected — trial activated."));
  }
  if(T.module==="tracker"){
    box.innerHTML=`<div class="sechead"><div><h2>Track a request</h2><p>Enter a reference number to see live status.</p></div></div>
      <div class="two"><div class="panel"><div class="field"><label>Reference number</label><input id="ref" placeholder="e.g. ${T.id}-4471"></div>
      <button class="btn" id="trackGo">Track</button></div>
      <div class="panel"><h3 style="margin:0 0 14px">Status</h3><div class="tl" id="tl">
        <div class="done"><strong>Received</strong><span>Request logged</span></div>
        <div class="done"><strong>Assigned</strong><span>Allocated to a team</span></div>
        <div class="now"><strong>In progress</strong><span>Being worked on now</span></div>
        <div><strong>Resolved</strong><span>Pending completion</span></div></div></div></div>`;
    $("#trackGo").onclick=()=>{ const v=$("#ref").value.trim(); if(!v){toast("Enter a reference number.");return;} toast("Status retrieved for "+v+"."); };
  }
  if(T.module==="feed"){
    box.innerHTML=`<div class="sechead"><div><h2>Latest</h2><p>Newest first — click any story to open the reading view.</p></div></div>
      <div class="list">${T.items.map(i=>`<a href="#main" data-story="${esc(i.t)}"><span><strong style="display:block;font-size:14.5px">${esc(i.t)}</strong><small style="color:var(--muted)">${esc(i.s)}</small></span><strong>→</strong></a>`).join("")}</div>`;
    $$("[data-story]").forEach(a=>a.onclick=e=>{e.preventDefault();toast("Opening: "+a.dataset.story);});
  }
  if(T.module==="directory"){
    box.innerHTML=`<div class="sechead"><div><h2>Service directory</h2><p>Search the full list of city services.</p></div></div>
      <div class="panel"><div class="field"><label>Search services</label><input id="dirSearch" placeholder="e.g. bin, permit, tax"></div>
      <div class="list" id="dirList"></div></div>`;
    const paint=(q="")=>{ $("#dirList").innerHTML=T.items.filter(i=>(i.t+i.s).toLowerCase().includes(q.toLowerCase())).map(i=>`<a href="#main"><span>${esc(i.t)}<br><small style="color:var(--muted)">${esc(i.s)}</small></span><strong>${i.p?money(i.p):"Free"}</strong></a>`).join("")||`<p style="color:var(--muted)">No matching services.</p>`; };
    $("#dirSearch").oninput=e=>paint(e.target.value); paint();
  }
  if(T.module==="donate"){
    box.innerHTML=`<div class="sechead"><div><h2>Make a donation</h2><p>87% of every gift goes directly to programmes.</p></div></div>
      <div class="panel"><label>Choose an amount</label><div class="slots" id="amtSlots">${[10,25,50,100,250].map((v,i)=>`<button class="slot${i===2?" on":""}" data-v="${v}">${money(v)}</button>`).join("")}</div>
      <div class="field"><label>Or enter your own</label><input id="customAmt" type="number" min="1" placeholder="Amount"></div>
      <div class="row"><span>Your donation</span><span class="big" id="donOut">${money(50)}</span></div>
      <button class="btn" style="width:100%;margin-top:14px" id="donGo">Donate</button></div>`;
    let amt=50;
    $("#amtSlots").onclick=e=>{const b=e.target.closest("[data-v]");if(!b)return;$$("#amtSlots .slot").forEach(x=>x.classList.remove("on"));b.classList.add("on");amt=+b.dataset.v;$("#donOut").textContent=money(amt);};
    $("#customAmt").oninput=e=>{amt=+e.target.value||0;$("#donOut").textContent=money(amt);};
    $("#donGo").onclick=()=>{ if(amt<1){toast("Enter an amount.");return;} toast("Thank you — "+money(amt)+" donated."); };
  }
  if(T.module==="tickets"){
    const qty={};
    box.innerHTML=`<div class="sechead"><div><h2>Get tickets</h2><p>Set quantities — total updates live.</p></div></div>
      <div class="panel"><div class="list" id="tkList"></div>
      <div class="row" style="margin-top:16px"><span>Order total</span><span class="big" id="tkTotal">${money(0)}</span></div>
      <button class="btn" style="width:100%;margin-top:14px" id="tkGo">Checkout</button></div>`;
    const paint=()=>{
      $("#tkList").innerHTML=T.items.filter(i=>i.p>0).map(i=>`<a href="#main"><span>${esc(i.t)}<br><small style="color:var(--muted)">${esc(i.s)}</small></span>
      <span style="display:flex;gap:8px;align-items:center"><button class="btn small ghost" data-minus="${esc(i.t)}">−</button><strong data-q="${esc(i.t)}">${qty[i.t]||0}</strong><button class="btn small" data-plus="${esc(i.t)}">+</button></span></a>`).join("");
      const total=T.items.filter(i=>i.p>0).reduce((a,i)=>a+(qty[i.t]||0)*i.p,0);
      $("#tkTotal").textContent=money(total);
      $$("[data-plus]").forEach(b=>b.onclick=e=>{e.preventDefault();qty[b.dataset.plus]=(qty[b.dataset.plus]||0)+1;paint();});
      $$("[data-minus]").forEach(b=>b.onclick=e=>{e.preventDefault();qty[b.dataset.minus]=Math.max(0,(qty[b.dataset.minus]||0)-1);paint();});
    };
    paint();
    $("#tkGo").onclick=()=>{ const n=Object.values(qty).reduce((a,b)=>a+b,0); if(!n){toast("Add at least one ticket.");return;} toast(n+" ticket(s) reserved. Check your email."); };
  }
}
renderModule();
})();
