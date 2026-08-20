/* 01 / 현재 진행중인 프로젝트 — cover expand → route → detail hero.
 * Clicking the list row grows its cover to fill the viewport, then navigates. The
 * detail page opens with the identical cover already full screen, so the two
 * documents read as one move, and its title then lands one character at a time.
 * Reduced motion skips the whole thing and just follows the link.
 */
(()=>{
const EASE='cubic-bezier(.16,1,.3,1)';
const GROW_MS=760;
const KEY='rs:cover-expand';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- list row: grow the cover, then route ---------- */
(()=>{
const links=[...document.querySelectorAll('a[data-cover-link]')];
if(!links.length)return;

/* Restoring this page from bfcache brings back the faded-out body it left with. */
const clear=()=>{document.body.classList.remove('is-cover-leaving');
 document.querySelectorAll('.cover-transition').forEach(el=>el.remove())};
addEventListener('pageshow',e=>{if(e.persisted)clear()});

links.forEach(link=>link.addEventListener('click',e=>{
 if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const cover=link.querySelector('[data-cover]');
 if(!cover||reduced())return;
 e.preventDefault();

 const r=cover.getBoundingClientRect();
 const clone=document.createElement('div');
 clone.className='cover-transition';
 clone.setAttribute('aria-hidden','true');
 clone.innerHTML=cover.innerHTML;
 Object.assign(clone.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
 document.body.appendChild(clone);
 document.body.classList.add('is-cover-leaving');

 /* The detail hero carries the same gradient over the cover; fading it in here means
    the two pages hand over on an identical frame. */
 const scrim=document.createElement('span');
 scrim.style.cssText='position:absolute;inset:0;opacity:0;background:linear-gradient(180deg,rgba(9,10,11,.5) 0%,rgba(9,10,11,.34) 38%,rgba(9,10,11,.86) 82%,rgba(9,10,11,.97) 100%)';
 clone.appendChild(scrim);

 const grow=clone.animate(
  [{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'},
   {left:'0px',top:'0px',width:innerWidth+'px',height:innerHeight+'px'}],
  {duration:GROW_MS,easing:EASE,fill:'forwards'});
 scrim.animate([{opacity:0},{opacity:1}],{duration:GROW_MS*.7,delay:GROW_MS*.3,easing:EASE,fill:'forwards'});

 try{sessionStorage.setItem(KEY,JSON.stringify({href:link.href,t:Date.now()}))}catch{}

 let gone=false;
 const go=()=>{if(gone)return;gone=true;location.href=link.href};
 grow.finished.then(go).catch(go);
 setTimeout(go,GROW_MS+240);
}));
})();

/* ---------- detail page: arrive, then light the title ---------- */
(()=>{
const hero=document.querySelector('.pd-hero');
if(!hero)return;
const title=hero.querySelector('.pd-title');

/* Split into words first so a line break never falls inside one, then into characters. */
const split=el=>{
 const text=el.textContent;
 el.textContent='';
 let i=0;
 text.split(/(\s+)/).forEach(part=>{
  if(!part)return;
  if(/^\s+$/.test(part)){el.appendChild(document.createTextNode(part));return}
  const word=document.createElement('span');
  word.className='wd';
  [...part].forEach(chr=>{
   const ch=document.createElement('span');
   ch.className='ch';
   ch.style.setProperty('--ch-i',String(i++));
   ch.textContent=chr;
   word.appendChild(ch)});
  el.appendChild(word)});
};

/* Arriving from the list means the cover is already full screen: hold nothing back.
   A direct load has to establish the image first, so the title waits a beat longer. */
let arrived=false;
try{
 const raw=sessionStorage.getItem(KEY);
 if(raw){
  const {href,t}=JSON.parse(raw);
  arrived=Date.now()-t<6000&&new URL(href,location.href).pathname===location.pathname;
  sessionStorage.removeItem(KEY)}
}catch{}
document.body.classList.add(arrived?'is-cover-arrival':'is-cover-fresh');

const light=()=>{
 if(title){title.style.setProperty('--ch-base',(arrived?180:520)+'ms');title.classList.add('is-lit')}
 hero.classList.add('is-lit')};

if(title&&!reduced()){
 split(title);
 /* setLang() rewrites textContent from data-ko/data-en, which flattens the split.
    Re-splitting on that mutation keeps the language toggle working on the title. */
 if(title.dataset.ko){
  const mo=new MutationObserver(()=>{
   if(title.querySelector('.ch'))return;
   mo.disconnect();split(title);
   title.classList.add('is-lit');
   mo.observe(title,{childList:true})});
  mo.observe(title,{childList:true})}
}
requestAnimationFrame(()=>requestAnimationFrame(light));

/* After the route lands, hold the still for 2s, then crossfade into the looping cover. */
(()=>{
 const cover=hero.querySelector('.pd-hero-cover');
 const video=cover&&cover.querySelector('.pd-hero-video');
 if(!cover||!video)return;
 const src=video.querySelector('source[data-src]');
 const conn=navigator.connection;
 const cheap=()=>!conn||(!conn.saveData&&!/^(slow-2g|2g|3g)$/.test(conn.effectiveType||''));
 if(reduced()||!cheap())return;
 if(src&&!src.getAttribute('src')){src.setAttribute('src',src.dataset.src);video.load()}
 let armed=false;
 const reveal=()=>{
  if(!armed||video.readyState<2)return;
  video.play().then(()=>cover.classList.add('is-playing')).catch(()=>{})};
 video.addEventListener('canplay',reveal);
 setTimeout(()=>{armed=true;reveal()},2000);
 const io='IntersectionObserver'in window&&new IntersectionObserver(es=>{
  es.forEach(e=>{if(!cover.classList.contains('is-playing'))return;
   if(e.isIntersecting)video.play().catch(()=>{});else video.pause()})},{threshold:.2});
 if(io)io.observe(hero);
})();
})();
})();
