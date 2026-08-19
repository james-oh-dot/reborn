(()=>{const root=document.documentElement,body=document.body,header=document.querySelector('.site-header');const setLang=lang=>{lang=lang==='en'?'en':'ko';root.lang=lang;try{localStorage.setItem('rebornsoft_lang',lang)}catch{}document.querySelectorAll('[data-ko][data-en]').forEach(el=>{el.textContent=el.dataset[lang]});document.querySelectorAll('[data-alt-ko]').forEach(el=>{el.alt=el.dataset[lang==='ko'?'altKo':'altEn']});document.querySelectorAll('[data-lang]').forEach(btn=>{const on=btn.dataset.lang===lang;btn.classList.toggle('active',on);btn.setAttribute('aria-pressed',String(on))});
/* Slide the header toggle's pill onto the active button. It is measured from the
   buttons themselves rather than assumed to be half the group, so it stays correct if
   the labels ever differ in width. Skipped where there is no pill (the mobile panel
   toggle is plain text). */
document.querySelectorAll('.lang').forEach(g=>{
 const pill=g.querySelector('.lang-pill'),on=g.querySelector('button.active');
 if(!pill||!on)return;
 pill.style.width=on.offsetWidth+'px';
 pill.style.transform='translateX('+on.offsetLeft+'px)'});};document.querySelectorAll('.lang').forEach(g=>{const p=document.createElement('span');p.className='lang-pill';p.setAttribute('aria-hidden','true');g.insertBefore(p,g.firstChild)});let saved='ko';try{saved=localStorage.getItem('rebornsoft_lang')||'ko'}catch{}setLang(saved);addEventListener('resize',()=>setLang(root.lang==='en'?'en':'ko'),{passive:true});document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));requestAnimationFrame(()=>body.classList.add('loaded'));const scrollHeader=()=>{header?.classList.toggle('scrolled',scrollY>48);body.classList.toggle('is-scrolled',scrollY>120)};addEventListener('scroll',scrollHeader,{passive:true});scrollHeader();const trigger=document.querySelector('.menu-trigger'),panel=document.querySelector('.nav-panel');function closeMenu(){if(!trigger||!panel)return;if(panel.classList.contains('open'))setMenu(false)}document.querySelectorAll('.nav-item').forEach((el,i)=>el.style.setProperty('--i',i));
const setMenu=open=>{
 trigger.setAttribute('aria-expanded',String(open));
 panel.classList.toggle('open',open);
 panel.setAttribute('aria-hidden',String(!open));
 body.classList.toggle('menu-open',open);
 /* The icon carries the state visually; this keeps the accessible name in step. */
 trigger.setAttribute('aria-label',open
   ?(root.lang==='en'?'Close menu':'메뉴 닫기')
   :(root.lang==='en'?'Open menu':'메뉴 열기'));
 /* Focus the panel, NOT the first link. Focusing a link marked it as :focus-visible --
    the browser treats programmatic focus after a click as keyboard-ish -- so opening
    the menu on a phone left a red ring and underline sitting on 회사소개 as though it
    were selected, competing with the real current-page mark. The panel carries
    tabindex="-1", so keyboard users still land inside it and Tab reaches the items. */
 if(open)panel.focus();
 else trigger.focus()};
trigger?.addEventListener('click',()=>setMenu(trigger.getAttribute('aria-expanded')!=='true'));
/* Keep Tab inside the open panel; without this focus walks the page behind it. */
addEventListener('keydown',e=>{
 if(e.key!=='Tab'||!panel?.classList.contains('open'))return;
 const f=[...panel.querySelectorAll('a,button')].filter(x=>x.offsetParent!==null);
 if(!f.length)return;const first=f[0],last=f[f.length-1];
 const all=[trigger,...f];
 /* The panel itself is now the open-state focus holder, so it is the wrap point too. */
 if(e.shiftKey&&(document.activeElement===all[0]||document.activeElement===panel)){e.preventDefault();last.focus()}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();trigger.focus()}});/* Deliberately NOT closing the menu when a link is tapped. closeMenu releases the
   scroll lock, which restores body position and scrolls the page, and calls
   trigger.focus() -- all synchronously inside the tap. Moving the page and the focus
   under the finger mid-tap makes mobile Safari abandon the pending navigation, so the
   menu closed and nothing happened. The link is replacing the document anyway; the
   next page arrives with the menu shut. */
/* Leaving the lock on during unload would restore fixed/offset body from bfcache, so
   it is cleared on the way out -- without the scroll restore, which is what hurt. */
addEventListener('pagehide',()=>{body.classList.remove('menu-open','is-scroll-locked');body.style.top=''});addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});const AUTO_REVEAL='h1,h2,h3,p,.link,.status,.tag,.card-eyebrow,li,.engagement,.proof-row,.timeline-row,.phase,.contact-row,.fact,.evo-label,.section-head';document.querySelectorAll('main').forEach(m=>{m.querySelectorAll(AUTO_REVEAL).forEach(el=>{if(el.closest('.hero-copy,.cap-flow-step,.cap-flow-accordion-item'))return;const owner=el.closest('.reveal');if(owner&&owner!==el)return;el.classList.add('reveal')})});const revealGroups=new Map();document.querySelectorAll('.reveal').forEach(el=>{const p=el.parentElement,i=revealGroups.get(p)||0;el.style.setProperty('--reveal-i',String(Math.min(i,8)));revealGroups.set(p,i+1)});const obs=new IntersectionObserver(es=>es.forEach(e=>{e.target.classList.toggle('visible',e.isIntersecting)}),{threshold:.15,rootMargin:'0px 0px -8%'});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));const mobileSteps=[...document.querySelectorAll('.cap-flow-accordion-item')];mobileSteps.forEach(item=>{const trigger=item.querySelector('.cap-flow-accordion-trigger');trigger?.addEventListener('click',()=>{const open=!item.classList.contains('open');mobileSteps.forEach(x=>{x.classList.remove('open');x.querySelector('.cap-flow-accordion-trigger')?.setAttribute('aria-expanded','false')});if(open){item.classList.add('open');trigger.setAttribute('aria-expanded','true')}})})})();
(()=>{document.querySelectorAll('.progressive-image__full').forEach(img=>{const go=()=>img.closest('[data-progressive]')?.classList.add('is-ready');if(img.complete&&img.naturalWidth>0)go();else{img.addEventListener('load',go,{once:true});img.addEventListener('error',go,{once:true})}})})();
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const layers=[...document.querySelectorAll('[data-parallax]')],bgLayers=[...document.querySelectorAll('[data-parallax-bg]')];if(!layers.length&&!bgLayers.length)return;const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));let ticking=false;const update=()=>{const vh=innerHeight;layers.forEach(el=>{const speed=parseFloat(el.dataset.parallax)||.2,max=parseFloat(el.dataset.parallaxMax)||40,host=el.parentElement,r=host.getBoundingClientRect();if(r.bottom<0||r.top>vh){return}const center=r.top+r.height/2,delta=clamp((center-vh/2)*speed,-max,max);el.style.transform=`translate3d(0, ${delta.toFixed(1)}px, 0)`});bgLayers.forEach(el=>{const speed=parseFloat(el.dataset.parallaxBg)||.15,max=parseFloat(el.dataset.parallaxMax)||30,r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh){return}const center=r.top+r.height/2,delta=clamp((center-vh/2)*speed,-max,max);el.style.backgroundPosition=`center calc(50% + ${delta.toFixed(1)}px)`});ticking=false};const onScroll=()=>{if(!ticking){requestAnimationFrame(update);ticking=true}};addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);update()})();
(()=>{const flow=document.querySelector('.cap-flow');if(!flow)return;const track=flow.querySelector('.cap-flow-track'),steps=[...flow.querySelectorAll('.cap-flow-step')],visuals=[...flow.querySelectorAll('.cap-flow-visual')],rail=[...flow.querySelectorAll('.cap-flow-rail i')];if(!track||steps.length<2)return;const N=steps.length,LAST=N-1;const reduce=matchMedia('(prefers-reduced-motion: reduce)');const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const pinned=()=>innerWidth>=1024&&!reduce.matches;let ticking=false;const clear=()=>{steps.forEach(s=>{s.style.removeProperty('--step-y');s.style.removeProperty('--step-o')});visuals.forEach(v=>{v.style.removeProperty('--vis-y');v.style.removeProperty('--vis-o')})};const update=()=>{ticking=false;if(!pinned()){clear();return}const sticky=flow.querySelector('.cap-flow-sticky');const stickyH=sticky.offsetHeight;const travel=track.offsetHeight-stickyH;if(travel<=0)return;const top=track.getBoundingClientRect().top;const headerH=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'))||80;const p=clamp((headerH-top)/travel,0,1);const idx=p*LAST;
const slotH=steps[0].parentElement.clientHeight||420,HOLD=.2,RAMP=.5-HOLD;
/* One offset curve drives BOTH the copy and its image, so a step and its visual
   read as a single pair: they rest together through HOLD, then the outgoing pair
   clears the frame completely before the incoming pair starts rising in.
   Smoothstep keeps the hand-off from feeling mechanical. */
const ease=t=>t*t*(3-2*t);
const offsetFor=d=>{const a=Math.abs(d);return a<=HOLD?0:Math.sign(d)*ease(clamp((a-HOLD)/RAMP,0,1))};
steps.forEach((s,i)=>{const off=offsetFor(idx-i);s.style.setProperty('--step-y',(-off*slotH).toFixed(1)+'px');s.style.setProperty('--step-o',Math.abs(off)>=1?'0':'1')});
visuals.forEach((v,i)=>{const off=offsetFor(idx-i);v.style.setProperty('--vis-y',(-off*100).toFixed(2)+'%');v.style.setProperty('--vis-o',Math.abs(off)>=1?'0':'1')});const near=Math.round(idx);rail.forEach((r,i)=>r.classList.toggle('on',i===near));steps.forEach((s,i)=>s.classList.toggle('active',i===near))};const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);reduce.addEventListener?.('change',onScroll);update()})();
(()=>{const band=document.querySelector('.dna-band'),track=band?.querySelector('.dna-track'),half=band?.querySelector('.dna-half');if(!band||!track||!half)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
/* One full loop takes LOOP_S at rest. Scrolling adds speed on top: scrolling down
   pushes the strip left, scrolling up pushes it right. `vel` decays back to the
   resting drift, and x wraps on one half-width so either direction stays seamless. */
const LOOP_S=19,BOOST=2.6,DECAY=.88,MAXVEL=3200;
const ROT_PER_PX=.2;let x=0,rot=0,loop=half.offsetWidth,lastY=scrollY,vel=0,inView=false,raf=0,last=0;
new IntersectionObserver(es=>{inView=es[0].isIntersecting;if(inView&&!raf){last=0;raf=requestAnimationFrame(tick)}},{threshold:0}).observe(band);
addEventListener('resize',()=>{loop=half.offsetWidth},{passive:true});
addEventListener('scroll',()=>{const y=scrollY,d=y-lastY;lastY=y;vel=Math.max(-MAXVEL,Math.min(MAXVEL,vel-d*BOOST*10))},{passive:true});
function tick(t){raf=0;if(!inView)return;if(!last)last=t;const dt=Math.min(.05,(t-last)/1000);last=t;
const drift=-(loop/LOOP_S);const step=(drift+vel)*dt;x+=step;vel*=Math.pow(DECAY,dt*60);if(Math.abs(vel)<1)vel=0;
/* The asterisk turns with the travel: clockwise heading left, anti-clockwise heading right. */
rot-=step*ROT_PER_PX;
if(loop>0){while(x<=-loop)x+=loop;while(x>0)x-=loop}
track.style.setProperty('--dna-x',x.toFixed(1)+'px');
track.style.setProperty('--dna-rot',rot.toFixed(2)+'deg');raf=requestAnimationFrame(tick)}
})();
(()=>{const rail=document.querySelector('.work-rail');if(!rail)return;const track=rail.querySelector('.rail-track'),sticky=rail.querySelector('.rail-sticky'),strip=rail.querySelector('.rail-strip'),cards=[...rail.querySelectorAll('.visual-card')];if(!track||!strip||cards.length<2)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)');const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const pinned=()=>innerWidth>=1024&&!reduce.matches;let ticking=false;
/* Distance the strip must travel so the LAST card lands where the FIRST began. */
const span=()=>{const first=cards[0].getBoundingClientRect(),last=cards[cards.length-1].getBoundingClientRect();return Math.max(0,last.left-first.left)};
/* The horizontal span grows with every card, but the vertical scroll budget was a flat
   220vh — so adding cards silently sped the rail up. Budget per GAP instead of per rail
   (220vh over the original three gaps = 73.3vh each) and the pace stays put no matter
   how many cards the rail holds. */
const VH_PER_GAP=73.3;
const setBudget=()=>track.style.setProperty('--rail-scroll',((cards.length-1)*VH_PER_GAP).toFixed(0)+'vh');
setBudget();
const update=()=>{ticking=false;if(!pinned()){strip.style.removeProperty('--rail-x');return}const travel=track.offsetHeight-sticky.offsetHeight;if(travel<=0)return;const headerH=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'))||80;const p=clamp((headerH-track.getBoundingClientRect().top)/travel,0,1);strip.style.setProperty('--rail-x',(-p*span()).toFixed(1)+'px')};
const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);reduce.addEventListener?.('change',onScroll);update()})();
(()=>{const block=document.querySelector('.reveal-block'),spacer=document.querySelector('.reveal-spacer');if(!block||!spacer)return;
/* Height guard: the block is fixed and bottom-anchored, so anything taller than the
   viewport escapes off the TOP with no way to scroll to it. Measure the real content
   height and fall back to normal document flow when it will not fit. Hysteresis keeps
   the mobile URL bar from flipping the state on every scroll. */
const SLACK=24;
const guard=()=>{const isStatic=document.body.classList.contains('reveal-static');
 /* Measuring the block as-rendered is useless here: it has min-height:100svh and its
    closing section is flex:1, so it always reports about one viewport whether the
    content needs it or not. Relax both for one synchronous read to get the natural
    height, then put them back. */
 /* Measure in ONE reference frame. The static fallback lays the block out in normal
    flow, where it is narrower and reports a smaller height than the fixed layout does
    -- so measuring "as currently rendered" made the two states disagree: fixed said
    "too tall, go static", static said "fits, go back", and it oscillated. Always read
    the fixed geometry, which is the layout the decision is actually about. */
 block.classList.add('is-measuring');
 document.body.classList.remove('reveal-static');
 const need=block.scrollHeight;
 if(isStatic)document.body.classList.add('reveal-static');
 block.classList.remove('is-measuring');
 if(!isStatic&&need>innerHeight)document.body.classList.add('reveal-static');
 else if(isStatic&&need<=innerHeight-SLACK)document.body.classList.remove('reveal-static')};
const sync=()=>{guard();spacer.style.height=block.offsetHeight+'px'};sync();
/* Resize has to settle before measuring: running guard() synchronously on the event
   read the OLD viewport, so a rotate from 844 to 667 left reveal-static false and the
   closing block overflowing a viewport it is pinned behind. Defer a frame, and run
   twice so the second read sees the settled layout. */
/* rAF alone is not enough -- it is starved in a backgrounded or throttled tab, which
   would leave the stale state latched. Pair it with a timer so one of them always
   lands after the new viewport metrics settle. */
const resync=()=>{requestAnimationFrame(()=>{sync();requestAnimationFrame(sync)});setTimeout(sync,120);setTimeout(sync,320)};
addEventListener('resize',resync,{passive:true});addEventListener('orientationchange',resync);
/* The reliable trigger: ResizeObserver fires once the box has actually changed, so it
   cannot read pre-settle metrics the way a resize listener can. The listeners above
   stay as a fallback for engines that fire them first. */
if('ResizeObserver' in window)new ResizeObserver(sync).observe(document.documentElement);addEventListener('load',sync);if(document.fonts?.ready)document.fonts.ready.then(sync)})();
(()=>{const block=document.querySelector('.reveal-block'),main=document.querySelector('main');if(!block||!main)return;if(!document.body.classList.contains('subpage'))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
/* Dim the closing block while it is still mostly hidden, easing back to its own
   colour as the last of it is uncovered. */
const MAX=.34;let ticking=false;
const update=()=>{ticking=false;
 /* No reveal, no dim — the height guard has dropped the block into normal flow. */
 if(document.body.classList.contains('reveal-static')){block.style.setProperty('--reveal-dim','0');return}
 const h=block.offsetHeight||1;const revealed=Math.max(0,Math.min(h,innerHeight-Math.max(0,main.getBoundingClientRect().bottom)));const p=revealed/h;block.style.setProperty('--reveal-dim',((1-p)*MAX).toFixed(3))};
const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);update()})();
/* The drawer shell used to be authored into work.html and index.html, identically, and
   nowhere else -- which is exactly why a capability link had to navigate to Work before it
   could show anything. It is built here instead, so it exists on every page and there is
   one copy of it rather than one per page that happens to want it. Nothing is lost with
   JS off: an empty dialog in the markup was never useful on its own, and the links that
   feed it are still ordinary hrefs that navigate. */
(()=>{if(document.getElementById('project-drawer'))return;
 const host=document.createElement('div');
 host.innerHTML='<div class="drawer" id="project-drawer"><div class="drawer-scrim" data-drawer-close></div><aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1"><button class="drawer-close" type="button" data-drawer-close aria-label="닫기" data-alt-ko="닫기" data-alt-en="Close"><span aria-hidden="true">✕</span></button><div class="drawer-scroll"><div class="drawer-media"></div><div class="drawer-body"><div class="drawer-status meta"></div><h2 class="drawer-title" id="drawer-title"></h2><p class="drawer-class meta"></p><p class="drawer-summary"></p><div class="drawer-desc"></div><div class="drawer-extra"></div><div class="drawer-boundary"></div><p class="drawer-note meta" data-ko="KEYWORDS" data-en="KEYWORDS">KEYWORDS</p><div class="drawer-tags"></div></div></div></aside></div>';
 document.body.appendChild(host.firstElementChild)})();
/* Shared by the drawer and the proof gallery, so they live at file scope rather than
   inside whichever module happened to need them first. armProgressive is the image
   pipeline's own helper -- any module that builds a progressive-image has to arm it,
   or the layer sits on its blurred preview for good. */
const lang=()=>document.documentElement.lang==='en'?'en':'ko';
const armProgressive=(img,box)=>{
 const host=()=>box||img.closest('[data-progressive]');
 const go=()=>host()?.classList.add('is-ready');
 if(img.complete&&img.naturalWidth>0)go();
 else{img.addEventListener('load',go,{once:true});img.addEventListener('error',go,{once:true})}};
(()=>{const drawer=document.getElementById('project-drawer');if(!drawer)return;
const cards=[...document.querySelectorAll('.visual-card[data-project]')];
const triggers=[...document.querySelectorAll('a[href*="work.html?project="]')];
/* A shared ?project= URL has to open on whatever page it names, even one carrying
   neither a card nor a link -- otherwise the address is only good on Work. */
const deepKey=new URLSearchParams(location.search).get('project');
if(!cards.length&&!triggers.length&&!deepKey)return;
const panel=drawer.querySelector('.drawer-panel'),media=drawer.querySelector('.drawer-media'),
 elStatus=drawer.querySelector('.drawer-status'),elTitle=drawer.querySelector('.drawer-title'),
 elSummary=drawer.querySelector('.drawer-summary'),elTags=drawer.querySelector('.drawer-tags'),
 elClass=drawer.querySelector('.drawer-class'),elDesc=drawer.querySelector('.drawer-desc'),
 elExtra=drawer.querySelector('.drawer-extra'),elBound=drawer.querySelector('.drawer-boundary'),
 elNote=drawer.querySelector('.drawer-note'),
 scroll=drawer.querySelector('.drawer-scroll');
const elSeries=document.createElement('p');elSeries.className='drawer-series meta';elSeries.hidden=true;elStatus.after(elSeries);
const elEnName=document.createElement('p');elEnName.className='drawer-en-name meta';elEnName.hidden=true;elTitle.after(elEnName);
/* Project detail copy. Every claim, status and boundary sentence here is transcribed
   from the approved write-up, which matches EVIDENCE_LEDGER_v2.1 section 6 claim
   boundaries; `bound` paragraphs are the scope limits and render demoted. */
const DETAIL={
 yancheng:{cls:['Physical Experience / Media & Simulation','Physical Experience / Media & Simulation'],
  lead:['리본소프트는 2022년 중국 옌청 자동차 테마파크 프로젝트에서 곡면 스크린 디스플레이 구현과 콘텐츠 제작을 수행했습니다.',
        'In 2022 Rebornsoft carried out curved-screen display implementation and content production for the Yancheng Automotive Theme Park project in China.'],
  body:[['프로젝트에서는 자동차를 주제로 한 공간에 대형 곡면 스크린을 적용하고, 해당 디스플레이 환경에서 구동되는 시각 콘텐츠를 제작했습니다. 공간의 형태와 화면 비율을 고려해 콘텐츠가 곡면 디스플레이에 적합하게 표현될 수 있도록 구성했습니다.',
         'A large curved screen was applied to a space themed around automobiles, and visual content running on that display environment was produced. The content was composed so that it would read correctly on a curved display, taking the shape of the space and the screen ratio into account.'],
        ['레이싱 체험을 위한 시뮬레이션 콘텐츠도 함께 제작했습니다. 자동차 주행과 레이싱을 주제로 한 콘텐츠를 시뮬레이션 환경에 적용하고, 이용자가 공간 안에서 콘텐츠를 직접 경험할 수 있도록 구성했습니다.',
         'Simulation content for a racing experience was produced alongside it. Content themed around driving and racing was applied to a simulation environment and arranged so that visitors could experience it directly within the space.'],
        ['프로젝트 수행 범위에는 곡면 스크린 디스플레이 구현, 화면용 콘텐츠 제작, 레이싱 시뮬레이션 콘텐츠 제작이 포함됩니다. 디지털 콘텐츠와 대형 디스플레이, 시뮬레이션 시스템을 실제 테마파크 공간에 적용한 해외 프로젝트입니다.',
         'The scope of work covers curved-screen display implementation, content production for the screen, and racing simulation content production. It is an overseas project in which digital content, a large-format display and a simulation system were applied to an actual theme-park space.']],
  bound:[],
  keys:['Curved Display','Racing Simulation','Media Content','Simulator','Physical Experience','Spatial Media']},

 'handan-ktv':{cls:['CONTINUED COLLABORATION','CONTINUED COLLABORATION'],
  lead:['옌청 프로젝트 이후 중국 한단의 실내테마공원 프로젝트로 협업이 이어졌습니다.',
        'After the Yancheng project, collaboration continued on an indoor theme-park project in Handan, China.'],
  body:[['리본소프트는 이 프로젝트를 통해 중국 내 실내 Experience Project의 협업 범위를 이어갔습니다.',
         'Through this project Rebornsoft continued the range of its indoor experience-project collaboration in China.']],
  bound:[['현재 공개 상태는 STATUS TO VERIFY입니다. 전체 실내테마공원의 구축 완료, 전체 콘텐츠 제작, 또는 확정된 수행 연도를 의미하지 않습니다.',
          'The disclosed status is STATUS TO VERIFY. It does not indicate completion of the whole indoor theme park, production of all content, or a confirmed year of delivery.']],
  keys:['Indoor Theme Park','Experience Project','Spatial Media','Continued Collaboration','Panorama','Physical Experience']},

 hana:{cls:['Intelligent Interaction / Enterprise Security','Intelligent Interaction / Enterprise Security'],
  lead:['리본소프트는 2019년 자체 개발한 얼굴인식 기술을 하나은행 출입보안 환경에 적용했습니다.',
        'In 2019 Rebornsoft applied its own facial-recognition technology to a Hana Bank access-security environment.'],
  body:[['얼굴 및 이미지 인식 기술을 기반으로 사용자를 식별하고, 등록된 사용자의 얼굴 정보를 출입보안 시스템과 연계하는 방식으로 구축했습니다. 사용자의 얼굴을 인식한 결과가 실제 출입 절차와 연결될 수 있도록 얼굴인식 기능을 기업 보안 환경에 적용했습니다.',
         'The system identifies users on the basis of face and image recognition, linking the facial data of registered users to the access-security system. Facial recognition was applied within a corporate security environment so that the result of recognising a user could be connected to the actual access procedure.'],
        ['리본소프트는 설립 초기부터 얼굴인식과 이미지 인식 관련 기술을 개발해 왔으며, 해당 프로젝트를 통해 자체 Computer Vision 기술을 실제 기업 환경에 적용했습니다.',
         'Rebornsoft has developed face- and image-recognition technology since its earliest years, and this project applied its own computer-vision technology in a real enterprise environment.'],
        ['이후 얼굴인식뿐 아니라 이미지 분석, 동작인식, 사용자 추적 등으로 Computer Vision 관련 기술 개발을 이어갔습니다. 하나은행 프로젝트는 이러한 기술 개발 과정에서 실제 기업 시스템에 적용된 출입보안 구축 사례입니다.',
         'Development then continued beyond facial recognition into image analysis, motion recognition and user tracking. The Hana Bank project is an access-security implementation in which that line of development was applied to an actual enterprise system.']],
  bound:[['본 프로젝트의 공개 범위는 2019년 하나은행 관련 얼굴인식 출입보안 시스템 적용 이력입니다. 현재 운영 상태 또는 하나금융그룹 전체의 시스템 구축을 의미하지 않습니다.',
          'What is disclosed here is the 2019 record of applying a facial-recognition access-security system in a Hana Bank context. It does not indicate current operational status, nor a group-wide implementation across Hana Financial Group.']],
  keys:['Face Recognition','Computer Vision','Access Security','Intelligent Interaction','Enterprise Deployment','User Recognition']},

 fitm:{cls:['Healthcare AI / Intelligent Interaction','Healthcare AI / Intelligent Interaction'],
  lead:['FIT-M은 AI 동작인식 기술을 활용해 뇌졸중 환자의 움직임과 운동기능을 분석하는 의료·재활 분야 공동개발 프로젝트입니다.',
        'FIT-M is a co-development project in the medical and rehabilitation field that uses AI motion-recognition technology to analyse the movement and motor function of stroke patients.'],
  body:[['리본소프트는 2021년 아주대학교 산학협력단과 AI 뇌졸중 환자 운동기능 관련 서비스 개발 계약을 체결하고 FIT-M 개발을 진행했습니다. 아주대학교의료원과는 AI 의료서비스 공동개발 및 사업화를 위한 협력 관계를 구축했습니다.',
         'In 2021 Rebornsoft signed a service-development contract with the Ajou University Industry-Academic Cooperation Foundation covering AI-based motor function for stroke patients, and developed FIT-M under it. A cooperative relationship for the co-development and commercialisation of AI medical services was established with Ajou University Medical Center.'],
        ['FIT-M은 카메라로 촬영한 사용자의 움직임을 AI 동작인식 기술로 분석하고, 인식된 움직임을 바탕으로 운동능력을 측정해 결과를 제공하는 방식으로 개발되었습니다.',
         'FIT-M analyses a user’s movement captured on camera using AI motion recognition, then measures motor ability from the recognised movement and returns a result.'],
        ['프로젝트에는 사람의 주요 움직임을 인식하는 Computer Vision 기술과 동작 데이터를 분석하는 기능이 적용되었습니다. 별도의 센서를 신체에 부착하는 방식이 아니라 카메라 영상에서 사용자의 움직임을 인식하고 분석하는 방향으로 개발했습니다.',
         'The project applied computer-vision technology that recognises a person’s principal movements, together with functions that analyse motion data. It was developed to recognise and analyse movement from camera imagery rather than by attaching sensors to the body.'],
        ['리본소프트는 FIT-M을 통해 기존의 얼굴·이미지 인식 기술과 함께 사람의 움직임을 인식하고 분석하는 Motion Recognition 기술을 의료·재활 분야에 적용했습니다.',
         'Through FIT-M, Rebornsoft applied motion-recognition technology, alongside its existing face and image recognition, to the medical and rehabilitation field.']],
  bound:[['FIT-M의 공개 상태는 CO-DEVELOPED · 2021–2022이며, 아주대학교 산학협력단과의 개발 계약을 기반으로 진행한 공동개발 프로젝트입니다.',
          'The disclosed status of FIT-M is CO-DEVELOPED · 2021–2022: a co-development project carried out on the basis of a development contract with the Ajou University Industry-Academic Cooperation Foundation.']],
  keys:['Motion Recognition','Healthcare AI','Movement Analysis','Computer Vision','Rehabilitation Technology','Institutional Co-development']},

 hongdae:{cls:['Physical Experience / Spatial Media','Physical Experience / Spatial Media'],
  lead:['리본소프트는 2022년 서울 홍대 VR 경험 공간에 곡면 스크린 비주얼을 구현했습니다.',
        'In 2022 Rebornsoft implemented curved-screen visuals for a VR experience space in Hongdae, Seoul.'],
  body:[['프로젝트에서는 VR 체험 공간 내부에 곡면 디스플레이를 적용하고, 공간의 형태와 화면 구조에 맞춰 시각 콘텐츠가 표현될 수 있도록 화면 환경을 구성했습니다.',
         'A curved display was applied inside the VR experience space, and the screen environment was composed so that visual content would render in keeping with the shape of the space and the structure of the screen.'],
        ['곡면 스크린은 일반적인 평면 디스플레이와 달리 화면의 각도와 관람 위치에 따라 시각적 표현이 달라질 수 있습니다. 리본소프트는 공간과 디스플레이의 형태를 고려해 비주얼 콘텐츠가 실제 공간 안에서 자연스럽게 보일 수 있도록 구현했습니다.',
         'Unlike a flat display, a curved screen can change in appearance depending on the angle of the screen and the viewing position. Rebornsoft implemented the visual content with the form of the space and the display in mind, so that it would read naturally inside the actual space.'],
        ['해당 스크린은 VR 콘텐츠를 이용하기 위해 방문한 사용자가 공간 안에서 접하게 되는 시각적 요소로 적용되었습니다. 디지털 비주얼과 대형 화면을 실제 방문형 체험 공간에 적용한 프로젝트입니다.',
         'The screen was applied as a visual element encountered within the space by visitors who came to use the VR content. It is a project applying digital visuals and a large-format screen to an actual walk-in experience space.']],
  bound:[['리본소프트의 수행 범위는 홍대 VR Experience Space의 곡면 스크린 비주얼 구현입니다. 전체 VR 공간의 설계·운영 또는 전체 시스템 구축을 의미하지 않습니다.',
          'Rebornsoft’s scope of work is the curved-screen visual implementation at the Hongdae VR Experience Space. It does not indicate design or operation of the whole VR venue, nor implementation of the entire system.']],
  keys:['VR Experience','Curved Screen','Spatial Media','Physical Environment','Digital Visual','Experience Space']},

 hyundai:{cls:['Presentation Environment / Spatial Media','Presentation Environment / Spatial Media'],
  lead:['리본소프트는 2022년 현대건설의 반포 재개발 시공사 선정 사업계획 발표 환경에 곡면 스크린 디스플레이를 구현했습니다.',
        'In 2022 Rebornsoft implemented a curved-screen display for the environment in which Hyundai E&C presented its business plan for the Banpo redevelopment contractor selection.'],
  body:[['프로젝트에서는 대규모 발표 공간 안에서 사업계획과 관련된 시각 자료를 전달할 수 있도록 곡면 형태의 대형 디스플레이 환경을 구성했습니다.',
         'A large curved display environment was composed so that visual material relating to the business plan could be delivered inside a large presentation space.'],
        ['곡면 스크린의 형태와 발표 공간의 시야를 고려해 화면이 공간 안에서 안정적으로 보일 수 있도록 구현했으며, 대형 시각 콘텐츠가 프레젠테이션 과정에서 활용될 수 있도록 디스플레이를 적용했습니다.',
         'The implementation accounted for the form of the curved screen and the sightlines of the presentation space so that the screen would read stably within it, and the display was applied so that large-format visual content could be used during the presentation.'],
        ['기업의 사업계획 발표 환경은 다수의 참석자가 동일한 시각 정보를 확인해야 하는 공간입니다. 리본소프트는 이러한 환경에 대형 곡면 디스플레이를 적용해 발표용 시각 정보가 실제 공간 안에서 전달될 수 있도록 했습니다.',
         'A corporate business-plan presentation is a setting in which many attendees must take in the same visual information. Rebornsoft applied a large curved display to that environment so the presentation visuals could be delivered within the actual space.']],
  bound:[['본 프로젝트의 수행 범위는 현대건설 관련 사업계획 발표 환경의 곡면 스크린 디스플레이 구현입니다. 행사 전체 제작, 공간 전체 설계 또는 전체 콘텐츠 제작을 의미하지 않습니다.',
          'The scope of work is the curved-screen display implementation for the Hyundai E&C business-plan presentation environment. It does not indicate production of the whole event, design of the entire space, or production of all the content.']],
  keys:['Curved Display','Presentation Environment','Spatial Media','Corporate Experience','Large-Format Media','Physical Environment']},

 sevencubic:{cls:['Digital Environments / Platform','Digital Environments / Platform'],
  lead:['7 Cubic은 리본소프트가 개발한 3D 기반 디지털 환경 플랫폼입니다. 개발과 CBT 과정을 거쳐 2022년 정식 출시했습니다.',
        '7 Cubic is a 3D-based digital environment platform developed by Rebornsoft. It was formally released in 2022 after development and a closed beta test.'],
  body:[['사용자는 3D 공간 안에서 아바타를 이용해 이동하고 다른 사용자와 상호작용할 수 있도록 구성되었습니다. 아바타 커스터마이징 기능을 적용해 사용자가 자신의 캐릭터를 설정할 수 있도록 개발했습니다.',
         'Users move through a 3D space using an avatar and can interact with other users. Avatar customisation was implemented so that users can configure their own character.'],
        ['플랫폼에는 사용자 계정 연동 기능과 함께 화면 공유, 화상 커뮤니케이션, 음성 및 채팅 기능을 구현했습니다. 여러 사용자가 하나의 디지털 공간에 접속해 콘텐츠를 이용하고 서로 커뮤니케이션할 수 있도록 기능을 구성했습니다.',
         'The platform implements user-account linking together with screen sharing, video communication, voice and chat. These were composed so that multiple users can enter a single digital space, use content there and communicate with one another.'],
        ['리본소프트는 3D 공간과 사용자 계정, 아바타, 커뮤니케이션 기능을 하나의 플랫폼 안에 통합해 7 Cubic을 개발했습니다. 개별 기능을 별도로 제공하는 방식이 아니라 사용자가 접속해 활동할 수 있는 하나의 디지털 환경으로 제품화했습니다.',
         'Rebornsoft built 7 Cubic by integrating 3D space, user accounts, avatars and communication features into a single platform. Rather than offering each capability separately, it was productised as one digital environment that users log into and act within.'],
        ['7 Cubic 이전에는 모바일 기반 가상환경 서비스와 Meta Campus 관련 개발 및 테스트를 진행했으며, 이를 바탕으로 3D 환경과 원격 커뮤니케이션 기능을 지속적으로 개발했습니다.',
         'Before 7 Cubic, Rebornsoft carried out development and testing on a mobile-based virtual-environment service and on Meta Campus, and continued developing 3D environments and remote communication features on that basis.']],
  bound:[['7 Cubic은 2022년 출시된 과거 제품으로, 현재 홈페이지에서는 리본소프트의 3D Digital Environment 개발 및 제품화 이력으로 소개합니다.',
          '7 Cubic is a past product released in 2022. On this site it is presented as a record of Rebornsoft’s 3D digital-environment development and productisation.']],
  keys:['3D Environment','Avatar','Collaboration','Virtual Environment','Digital Platform','Screen Sharing','Video Communication','Productization']},

 cityfield:{cls:['Experience Systems / Technology Integration','Experience Systems / Technology Integration'],
  lead:['리본소프트는 2022년 Cityfield Theme Park 관련 디지털 기술 및 체험 시스템 공급·설치 계약을 체결했습니다.',
        'In 2022 Rebornsoft signed a contract to supply and install digital technology and experience systems for Cityfield Theme Park.'],
  body:[['계약 범위에는 Digital City와 Digital Twin 관련 시스템을 비롯해 VR·AR 및 Simulator 기술을 활용하는 체험 시스템이 포함되었습니다.',
         'The scope of the contract covered Digital City and Digital Twin systems, along with experience systems using VR/AR and simulator technology.'],
        ['Digital Twin은 실제 공간과 관련된 정보를 디지털 환경으로 구성하고 활용하기 위한 기술 영역이며, VR·AR과 Simulator는 사용자가 디지털 콘텐츠와 직접 상호작용할 수 있도록 하는 체험 기술로 구성되었습니다.',
         'Digital Twin is the technical area concerned with composing and using information about a physical space within a digital environment, while VR/AR and simulators were included as experience technologies that let users interact directly with digital content.'],
        ['Cityfield 계약에서는 이러한 개별 기술을 각각 분리해 다루는 것이 아니라 하나의 테마파크 프로젝트 안에서 디지털 환경과 체험 시스템을 함께 공급·설치하는 범위를 설정했습니다.',
         'Rather than treating each of these technologies separately, the Cityfield contract set a scope in which the digital environment and the experience systems are supplied and installed together within a single theme-park project.'],
        ['리본소프트는 프로젝트 계약을 통해 Digital Twin, VR·AR, Simulator 등 서로 다른 기술 영역이 함께 포함된 공간형 프로젝트의 공급 범위를 다뤘습니다.',
         'Through this contract Rebornsoft handled the supply scope of a spatial project bringing together distinct technical areas — Digital Twin, VR/AR and simulators.']],
  bound:[['현재 확인된 프로젝트 상태는 2022년 공급·설치 계약 체결입니다. 계약 이후 전체 프로젝트의 구축 완료 또는 운영 개시는 현재 공개 자료에서 확인되지 않았습니다.',
          'The project status confirmed at present is the signing of a supply and installation contract in 2022. Completion of the overall build, or the start of operation, is not confirmed in currently available public material.'],
         ['따라서 Cityfield Theme Park는 완료 프로젝트가 아닌 CONTRACTED · 2022 상태로 소개하며, 계약서에서 확인되는 Digital Twin, VR·AR, Simulator 관련 공급·설치 범위만을 공개합니다.',
          'Cityfield Theme Park is therefore presented as CONTRACTED · 2022 rather than as a completed project, and only the Digital Twin, VR/AR and simulator supply and installation scope evidenced in the contract is disclosed.']],
  keys:['Digital Twin','VR/AR','Simulator','Experience Systems','Technology Integration','Digital City','Contracted Project']}};
/* A second, unused-on-page image where one exists and adds something the card shot does
   not: the Yancheng simulator mid-installation. Hongdae extras moved to MEDIA. */
const EXTRA={
 yancheng:['projects/yancheng/installation','옌청 자동차 테마파크 레이싱 시뮬레이터 설치 현장','Racing simulator being installed at Yancheng Automotive Theme Park']};
/* Spatial-record drawers. Previous card stills remain on disk
   (Hongdae: interactive-screen, vr-screen; Hyundai: curved-screen).
   Restore from backup/pre-hongdae-media-20260818,
   backup/pre-hyundai-media-20260818, backup/pre-fitm-media-20260818,
   or backup/pre-handan-media-20260818. */
const MEDIA={
 hongdae:{
  heroVideo:{src:'../assets/projects/hongdae/screen-visual-loop.mp4',
   poster:'../assets/projects/hongdae/screen-visual-loop.poster.webp',
   cap:['SCREEN VISUAL · SPATIAL RECORD','SCREEN VISUAL · SPATIAL RECORD']},
  still:['projects/hongdae/screen-bay','곡면 스크린이 적용된 체험 베이','A curved-screen experience bay'],
  demandVideo:{src:'../assets/projects/hongdae/screen-visual-on-demand.mp4',
   poster:'../assets/projects/hongdae/screen-visual-on-demand.poster.webp',
   cap:['같은 스크린의 다른 비주얼','Another visual on the same screen']}},
 hyundai:{
  heroVideo:{src:'../assets/projects/hyundai/screen-visual-loop.mp4',
   poster:'../assets/projects/hyundai/screen-visual-loop.poster.webp',
   cap:['SCREEN VISUAL · SPATIAL RECORD','SCREEN VISUAL · SPATIAL RECORD']},
  still:['projects/hyundai/presentation-hall','곡면 스크린이 적용된 발표 공간','A curved-screen presentation space'],
  demandVideo:{src:'../assets/projects/hyundai/screen-visual-on-demand.mp4',
   poster:'../assets/projects/hyundai/screen-visual-on-demand.poster.webp',
   cap:['같은 스크린의 다른 비주얼','Another visual on the same screen']}},
 fitm:{
  heroVideo:{src:'../assets/projects/fitm/product-loop.mp4',
   poster:'../assets/projects/fitm/product-loop.poster.webp',
   cap:['MOTION RECOGNITION · PRODUCT RECORD','MOTION RECOGNITION · PRODUCT RECORD']},
  still:['projects/fitm/motion-measure','카메라 영상으로 동작을 인식하는 측정 화면','Measurement on camera using motion recognition']},
 'handan-ktv':{
  heroVideo:{src:'../assets/projects/ktv/screen-visual-loop.mp4',
   poster:'../assets/projects/ktv/screen-visual-loop.poster.webp',
   cap:['INDOOR EXPERIENCE · SPATIAL RECORD','INDOOR EXPERIENCE · SPATIAL RECORD']},
  still:['projects/ktv/panorama-entry','360도 파노라마가 적용된 실내 체험 공간','An indoor experience space with a 360° panorama']}};
const bi=(el,ko,en)=>{el.dataset.ko=ko;el.dataset.en=en;el.textContent=lang()==='en'?en:ko};
const reduceMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const stopDrawerVideos=()=>drawer.querySelectorAll('video').forEach(v=>{v.pause();try{v.currentTime=0}catch{}});
const stillFigure=(base,ako,aen)=>{
 const fig=document.createElement('figure');fig.className='drawer-still';
 const w=document.createElement('span');w.className='progressive-image';w.setAttribute('data-progressive','');
 const mk=(cls,src,alt)=>{const im=document.createElement('img');im.className=cls;im.src=src;im.alt=alt;
  im.draggable=false;im.loading='eager';im.decoding='async';return im};
 const pv=mk('progressive-image__preview','../assets/'+base+'.preview.webp','');pv.setAttribute('aria-hidden','true');
 const full=mk('progressive-image__full','../assets/'+base+'.webp',lang()==='en'?aen:ako);
 full.dataset.altKo=ako;full.dataset.altEn=aen;
 w.append(pv,full);fig.appendChild(w);
 armProgressive(full,w);
 const cap=document.createElement('figcaption');bi(cap,ako,aen);fig.appendChild(cap);
 return fig};
const ICO_PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.2v13.6L19.2 12 8 5.2z"/></svg>';
const ICO_PAUSE='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
const videoFigure=(spec,kind)=>{
 const fig=document.createElement('figure');fig.className='drawer-shot is-'+kind;
 const v=document.createElement('video');
 v.muted=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload=kind==='loop'?'auto':'metadata';
 v.poster=spec.poster;if(kind==='loop')v.loop=true;
 const source=document.createElement('source');source.src=spec.src;source.type='video/mp4';v.appendChild(source);
 const btn=document.createElement('button');btn.type='button';btn.className='drawer-play';
 const setBtn=(playing)=>{
  btn.innerHTML=playing?ICO_PAUSE:ICO_PLAY;
  btn.setAttribute('aria-label',lang()==='en'?(playing?'Pause':'Play'):(playing?'일시정지':'재생'));
  btn.classList.toggle('is-playing',playing)};
 setBtn(false);
 const canAuto=()=>kind==='loop'&&innerWidth>=768&&!reduceMotion();
 btn.addEventListener('click',()=>{if(v.paused)v.play().catch(()=>{});else v.pause()});
 v.addEventListener('play',()=>{setBtn(true);if(canAuto())btn.classList.add('is-auto')});
 v.addEventListener('pause',()=>{setBtn(false);btn.classList.remove('is-auto')});
 const bar=document.createElement('div');bar.className='drawer-progress';
 bar.setAttribute('role','slider');bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');
 bar.setAttribute('aria-valuenow','0');
 bar.setAttribute('aria-label',lang()==='en'?'Playback position':'재생 위치');
 const fill=document.createElement('i');fill.className='drawer-progress-fill';fill.setAttribute('aria-hidden','true');
 bar.appendChild(fill);
 const paint=()=>{
  const d=v.duration,t=v.currentTime;
  const p=(d&&isFinite(d)&&d>0)?Math.min(1,Math.max(0,t/d)):0;
  fill.style.transform='scaleX('+p+')';
  bar.setAttribute('aria-valuenow',String(Math.round(p*100)))};
 const seek=e=>{
  const r=bar.getBoundingClientRect(),d=v.duration;
  if(!d||!isFinite(d)||d<=0)return;
  const x=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));
  v.currentTime=x*d;paint()};
 bar.addEventListener('pointerdown',e=>{bar.setPointerCapture(e.pointerId);seek(e)});
 bar.addEventListener('pointermove',e=>{if(e.buttons)seek(e)});
 v.addEventListener('timeupdate',paint);v.addEventListener('seeked',paint);
 v.addEventListener('loadedmetadata',paint);v.addEventListener('ended',paint);
 const cap=document.createElement('figcaption');bi(cap,spec.cap[0],spec.cap[1]);
 fig.append(v,btn,bar,cap);
 fig._tryAuto=()=>{if(canAuto())v.play().catch(()=>{})};
 return fig};
let opener=null;
/* `from` is what focus goes back to on close. It defaults to the card because that is
   what was clicked on Work and Home, but a borrowed card is a detached node -- focusing
   it would silently do nothing -- so the capability link passes itself instead. */
const open=(card,from)=>{
 const key=card.dataset.project;
 const img=card.querySelector('.progressive-image'),
       eyebrow=card.querySelector('.card-eyebrow'),
       h=card.querySelector('.card-link h3'),
       p=card.querySelector('.card-link p');
 stopDrawerVideos();
 media.replaceChildren();
 drawer.classList.toggle('is-spatial',!!MEDIA[key]);
 elExtra.classList.toggle('drawer-extra-stack',!!MEDIA[key]);
 const pack=MEDIA[key];
 if(pack&&pack.heroVideo){
  const fig=videoFigure(pack.heroVideo,'loop');media.appendChild(fig);
  requestAnimationFrame(()=>fig._tryAuto())}
 else if(img){const c=img.cloneNode(true);c.removeAttribute('data-parallax');c.style.removeProperty('transform');media.appendChild(c);
  /* A card lifted from the fetched page never rendered, so its blur-up was never armed
     and the clone would sit on the blurred preview for good. Harmless to re-arm a local one. */
  const full=c.querySelector('.progressive-image__full');if(full)armProgressive(full,c)}
 else{/* cards with no archive image carry a placeholder — carry it through, don't leave an empty box */
  const ph=card.querySelector('.card-media-empty');if(ph)media.appendChild(ph.cloneNode(true))}
 const d=DETAIL[key];
 elStatus.textContent=eyebrow?eyebrow.textContent.trim():'';
 const series=card.querySelector('.card-series'),enName=card.querySelector('.card-en-name');
 elSeries.hidden=!series;elSeries.textContent=series?series.textContent.trim():'';
 if(h)bi(elTitle,h.dataset.ko||h.textContent.trim(),h.dataset.en||h.textContent.trim());
 elEnName.hidden=!enName;elEnName.textContent=enName?enName.textContent.trim():'';
 /* Detail copy wins over the card blurb when it exists; the card stays the fallback. */
 if(d)bi(elClass,d.cls[0],d.cls[1]); elClass.hidden=!d;
 if(d)bi(elSummary,d.lead[0],d.lead[1]);
 else if(p)bi(elSummary,p.dataset.ko||p.textContent.trim(),p.dataset.en||p.textContent.trim());
 const fill=(host,rows,cls)=>{host.replaceChildren();
  (rows||[]).forEach(([ko,en])=>{const el=document.createElement('p');if(cls)el.className=cls;bi(el,ko,en);host.appendChild(el)})};
 fill(elDesc,d&&d.body);
 fill(elBound,d&&d.bound,'drawer-limit');
 elExtra.replaceChildren();
 if(pack){
  if(pack.still)elExtra.appendChild(stillFigure(pack.still[0],pack.still[1],pack.still[2]));
  if(pack.demandVideo)elExtra.appendChild(videoFigure(pack.demandVideo,'demand'))}
 else{
  const ex=EXTRA[key];
  if(ex){const [base,ako,aen]=ex;
   const w=document.createElement('span');w.className='progressive-image';w.setAttribute('data-progressive','');
   const mk=(cls,src,alt)=>{const im=document.createElement('img');im.className=cls;im.src=src;im.alt=alt;
    im.draggable=false;im.loading='eager';im.decoding='async';return im};
   const pv=mk('progressive-image__preview','../assets/'+base+'.preview.webp','');pv.setAttribute('aria-hidden','true');
   const full=mk('progressive-image__full','../assets/'+base+'.webp',lang()==='en'?aen:ako);
   full.dataset.altKo=ako;full.dataset.altEn=aen;
   w.append(pv,full);elExtra.appendChild(w);armProgressive(full,w)}}
 elTags.replaceChildren();
 ((d&&d.keys)||[]).forEach(t=>{const s=document.createElement('span');s.textContent=t;elTags.appendChild(s)});
 elNote.hidden=!(d&&d.keys&&d.keys.length);
 scroll.scrollTop=0;opener=(from!==undefined)?from:card;
 drawer.classList.add('is-open');document.body.classList.add('drawer-open');
 panel.focus()};
const close=()=>{if(!drawer.classList.contains('is-open'))return;
 stopDrawerVideos();
 drawer.classList.remove('is-open','is-spatial','is-hongdae');document.body.classList.remove('drawer-open');
 elExtra.classList.remove('drawer-extra-stack');
 if(opener){opener.focus();opener=null}};
cards.forEach(c=>c.addEventListener('click',e=>{e.preventDefault();open(c)}));

/* Opening from a page that has no cards.
   open() reads the record off the card -- status, series, English name, title, blurb and
   the hero image all live in the markup, and only the long-form copy lives in DETAIL.
   Rather than copy those fields into a second place and let the two drift, the card is
   borrowed from work.html, which stays the one source for them. So a drawer opened from
   Capabilities shows exactly what Work shows, because it is the same node.
   Cost is one fetch of a static same-origin page, once per page load, warmed on hover. */
let deck=null;
const fetchDeck=()=>deck||(deck=fetch('work.html',{credentials:'same-origin'})
 .then(r=>{if(!r.ok)throw new Error(r.status);return r.text()})
 .then(t=>new DOMParser().parseFromString(t,'text/html'))
 .catch(e=>{deck=null;throw e}));
const cardFor=key=>{
 const local=cards.find(c=>c.dataset.project===key);
 if(local)return Promise.resolve(local);
 return fetchDeck().then(doc=>{
  const found=doc.querySelector('.visual-card[data-project="'+CSS.escape(key)+'"]');
  if(!found)throw new Error('no card for '+key);
  const node=document.importNode(found,true);
  /* Imported images were never in a rendered document, so alt text is still whatever
     work.html ships and nothing has armed the blur-up. Fix both before open() clones it. */
  node.querySelectorAll('[data-alt-ko]').forEach(im=>{
   im.alt=lang()==='en'?im.dataset.altEn:im.dataset.altKo});
  return node})};

triggers.forEach(a=>{
 const key=new URL(a.href,location.href).searchParams.get('project');
 if(!key)return;
 /* Warm the fetch on intent, so the click usually lands on an already-parsed document. */
 const warm=()=>fetchDeck().catch(()=>{});
 a.addEventListener('pointerenter',warm,{once:true});
 a.addEventListener('focus',warm,{once:true});
 a.addEventListener('click',e=>{
  /* Leave the modified clicks alone -- cmd/ctrl/shift/middle still mean "new tab". */
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();
  cardFor(key).then(c=>open(c,a)).catch(()=>{location.href=a.href})})});

/* Arriving by URL: ?project=<key> opens that drawer once the page has settled. It works
   on any page now, not just the one holding the cards, so the link can be shared. */
(()=>{const key=deepKey;if(!key)return;
 const go=()=>setTimeout(()=>cardFor(key).then(c=>open(c,null)).catch(()=>{}),420);
 if(document.readyState==='complete')go();else addEventListener('load',go,{once:true})})();
drawer.querySelectorAll('[data-drawer-close]').forEach(b=>b.addEventListener('click',close));
addEventListener('keydown',e=>{
 if(e.key==='Escape')return close();
 if(e.key!=='Tab'||!drawer.classList.contains('is-open'))return;
 /* keep focus inside the panel while it is open */
 const f=[...panel.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])')].filter(x=>x.offsetParent!==null);
 if(!f.length)return;const first=f[0],last=f[f.length-1];
 if(e.shiftKey&&(document.activeElement===first||document.activeElement===panel)){e.preventDefault();last.focus()}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}})})();
(()=>{const v=document.querySelector('.hero-video');if(!v)return;
/* The clip is ~6MB and is cropped hard at phone aspect ratios, so the poster frame is
   the DEFAULT and the video is an enhancement that has to earn its download. The
   <source> carries data-src, not src, so nothing is fetched until every gate passes:
   wide enough to show the composition, motion allowed, and not on a metered link. */
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const src=v.querySelector('source[data-src]');
const conn=navigator.connection;
const cheapLink=()=>!conn||(!conn.saveData&&!/^(slow-2g|2g|3g)$/.test(conn.effectiveType||''));
const allowed=()=>innerWidth>=768&&!reduce.matches&&cheapLink();
const apply=()=>{
 if(!allowed()){v.pause();return}
 if(src&&!src.getAttribute('src')){src.setAttribute('src',src.dataset.src);v.load()}
 v.play().catch(()=>{})};
apply();reduce.addEventListener?.('change',apply);addEventListener('resize',apply,{passive:true})})();
/* iOS-safe scroll lock. body{overflow:hidden} is ignored by Safari on iOS, so the page
   behind an open menu or drawer still rubber-bands. Pin the body at its current offset
   instead and restore it on release. A class observer drives it so the menu and the
   drawer share one implementation rather than each rolling their own. */
(()=>{const body=document.body,root=document.documentElement,KEYS=['menu-open','drawer-open'];
let locked=false,y=0;
const apply=()=>{const want=KEYS.some(k=>body.classList.contains(k));if(want===locked)return;
 if(want){y=scrollY||0;body.style.top=(-y)+'px';body.classList.add('is-scroll-locked');locked=true}
 else{body.classList.remove('is-scroll-locked');body.style.top='';locked=false;
  /* restore instantly — html{scroll-behavior:smooth} would otherwise animate the jump */
  const prev=root.style.scrollBehavior;root.style.scrollBehavior='auto';scrollTo(0,y);root.style.scrollBehavior=prev}};
new MutationObserver(apply).observe(body,{attributes:true,attributeFilter:['class']});apply()})();
/* Deep link from HOME 05 / CURRENT PROJECT. A bare #hash makes the browser paint the
   page already scrolled, which reads as a broken jump rather than as arriving at a
   section. Start at the top instead, wait for images so the target has settled at its
   final offset, then glide down. Reduced motion goes straight there. */
(()=>{const id=location.hash.slice(1);if(!id)return;
const section=document.querySelector('main>section[id="'+CSS.escape(id)+'"]');if(!section)return;
/* Aim at the content, not the section box: the section carries ~270px of top padding,
   so landing on its edge would show the visitor a screen of empty space. */
const target=section.querySelector('.wrap')||section;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('scrollRestoration' in history)history.scrollRestoration='manual';
if(reduce){addEventListener('load',()=>target.scrollIntoView());return}
scrollTo(0,0);
/* A timer, not rAF: rAF is starved while the tab is backgrounded, which would leave the
   visitor sitting at the top with no idea the link went anywhere. */
let done=false;
const go=()=>{if(done)return;done=true;setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),80)};
if(document.readyState==='complete')go();else addEventListener('load',go,{once:true});
setTimeout(go,1200)})();
/* Footer back-to-top. The pages run long -- home is around 7,900px -- and the footer
   otherwise offers no way back. Honours reduced motion rather than always animating. */
(()=>{const btns=[...document.querySelectorAll('.footer-totop')];if(!btns.length)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
btns.forEach(b=>b.addEventListener('click',()=>{
 scrollTo({top:0,behavior:reduce.matches?'auto':'smooth'})}))})();
/* Touch activation for the card brand wash. :hover is not dependable on touch --
   it either never fires or latches on after the tap and leaves a card washed while
   the user reads something else -- so the press state is driven explicitly and
   always released, including when the gesture turns into a scroll (pointercancel)
   or the finger leaves the card. Pointer devices are handled in CSS. */
(()=>{const cards=document.querySelectorAll('.visual-card');if(!cards.length)return;
 if(matchMedia('(hover:hover)').matches)return;
 const set=(el,on)=>el.classList.toggle('is-washed',on);
 cards.forEach(c=>{
  const off=()=>set(c,false);
  c.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')set(c,true)},{passive:true});
  ['pointerup','pointercancel','pointerleave','blur'].forEach(ev=>
    c.addEventListener(ev,off,{passive:true}));
  /* The card navigates away; clear on the way out so bfcache does not restore it washed. */
  addEventListener('pagehide',off)})})();
/* Section star: a line mark in each gap between sections, turning with scroll.
   Injected rather than authored into all five pages so the gaps stay in one place,
   and skipped where a section is pinned/sticky (the rail and the capability flow
   drive their own scroll choreography and an extra rotating mark inside them reads
   as a glitch). Rotation is written as a custom property on a rAF tick. */
(()=>{const main=document.querySelector('main');if(!main)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 /* work-rail is the pinned one; selected-work-section alone was too broad and was
    also skipping the plain card grid on the work page, which wants the mark. */
 const SKIP='cap-flow work-rail page-hero home-hero';
 const skip=el=>SKIP.split(' ').some(c=>el.classList.contains(c));
 const secs=[...main.children].filter(el=>el.tagName==='SECTION');
 const stars=[];
 secs.forEach((s,i)=>{
  const next=secs[i+1];if(!next)return;
  if(skip(s)||skip(next))return;
  const d=document.createElement('div');
  d.className='section-star';d.setAttribute('aria-hidden','true');
  /* The same mark the EVOLUTION band uses, so the two read as one motif. */
  d.innerHTML='<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4">'+
   '<path d="M50 6V94M6 50H94M19 19L81 81M81 19L19 81"/></svg>';
  /* Appended inside the section above rather than between the two. Sitting on the
     boundary it straddled two surfaces and, with <main> as its parent, inherited a
     colour belonging to neither -- a near-white mark on cream. Inside the section it
     takes that section's own ink, and CSS drops it into the middle of the padding
     below the content, which is the empty half of the gap. */
  s.appendChild(d);
  stars.push({el:d,svg:d.firstChild,prev:s,next})});
 if(!stars.length)return;
 /* Centre the mark in the gap, measured rather than assumed. The CSS used to drop it
    by half of --space, which is right only if the gap is one --space and the mark has
    no height. Neither holds. On a subpage every section carries --space on both faces,
    so the gap is two of them -- at 1600 that is 640px, and the mark's centre was
    landing at 210, a clear 110px high. Home fails the other way: .home-sco has zero
    padding and its content starts at its own top edge, so the gap is one 190px padding
    and the mark was sitting 20px past the boundary, on top of the incoming section.
    One measured centre fixes both, and survives any section that does not use the
    standard rhythm. */
 const place=()=>stars.forEach(t=>{
  const top=t.el.getBoundingClientRect().top;
  const bottom=t.prev.getBoundingClientRect().bottom+parseFloat(getComputedStyle(t.next).paddingTop);
  /* Computed height, not the rect: the glyph is rotated, and a rotated square reports
     a bounding box up to 1.41x its own side. */
  const h=parseFloat(getComputedStyle(t.svg).height);
  t.svg.style.setProperty('--star-drop',(((bottom-top)-h)/2).toFixed(1)+'px')});
 /* Runs whether or not motion is allowed -- the centring is placement, not animation,
    and the reduced-motion path returns before the scroll wiring below. */
 place();addEventListener('resize',place,{passive:true});
 if(reduce)return;
 /* Written straight from the scroll handler rather than batched through rAF. The
    batched version latched: the first frame ran, and if a later rAF did not fire the
    in-flight flag stayed set and every subsequent scroll was dropped, leaving the mark
    frozen at whatever angle it happened to hold. Four rect reads on a passive listener
    is cheap enough that the batching bought nothing worth that failure mode. */
 const update=()=>{const vh=innerHeight;
  stars.forEach(t=>{const r=t.el.getBoundingClientRect();
   if(r.bottom<-200||r.top>vh+200)return;
   /* Measured across the whole pass -- well above the viewport to well below -- so the
      turn is steady, not a spin that only happens while the mark is dead centre. */
   const p=((vh/2)-r.top)/vh;
   t.svg.style.setProperty('--star-rot',(p*180).toFixed(1)+'deg')})};
 addEventListener('scroll',update,{passive:true});
 addEventListener('resize',update,{passive:true});update()})();
/* Let a CTA confirm before it leaves. Routing on the raw click gave no acknowledgement
   at all -- the tap landed and the page was simply gone -- so the button now completes
   its fill and navigates just after. Deliberately short: 200ms reads as confirmation,
   longer reads as lag.

   The delay is the only thing added. An earlier attempt at hold-then-navigate broke on
   iOS because it also moved focus and restored scroll inside the tap, which made Safari
   abandon the pending navigation; nothing here touches either. */
(()=>{const DELAY=200;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const eligible=a=>{
  if(!a||!a.getAttribute('href'))return null;
  if(a.hasAttribute('download'))return null;
  if(a.target&&a.target!=='_self')return null;
  let u;try{u=new URL(a.href,location.href)}catch{return null}
  return u.origin===location.origin?u:null};
 /* Paint the press on contact rather than waiting for click, so touch gets its
    acknowledgement at the moment the finger lands. */
 document.addEventListener('pointerdown',e=>{
  const a=e.target.closest&&e.target.closest('a.link[href]');
  if(a&&eligible(a))a.classList.add('is-pressed')},{passive:true});
 ['pointercancel','pointerleave'].forEach(ev=>
  document.addEventListener(ev,e=>{
   const a=e.target.closest&&e.target.closest('a.link[href]');
   if(a)a.classList.remove('is-pressed')},{passive:true}));
 document.addEventListener('click',e=>{
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const a=e.target.closest&&e.target.closest('a.link[href]');
  const u=eligible(a);if(!u)return;
  a.classList.add('is-pressed');
  /* An in-page jump keeps the default: the glide is its own acknowledgement, and
     swallowing it here would fight the deep-link handling. */
  if(u.pathname===location.pathname&&u.hash)return;
  if(reduce)return;
  e.preventDefault();
  setTimeout(()=>{location.href=a.href},DELAY)});
 /* Coming back from bfcache would otherwise restore the button mid-press. */
 addEventListener('pageshow',()=>document.querySelectorAll('.link.is-pressed')
  .forEach(x=>x.classList.remove('is-pressed')))})();
/* Pending-project rows: a toast naming the row being pointed at. Rows that already
   print a status on the line do not need it -- the toast was written for name-only
   index rows whose only extra information was "a record is being prepared". */
(()=>{const rows=[...document.querySelectorAll('.pending-row')].filter(r=>!r.querySelector('.pending-status'));if(!rows.length)return;
 const root=document.documentElement;
 const el=document.createElement('div');
 el.className='toast';el.setAttribute('aria-hidden','true');
 el.innerHTML='<i></i><span></span>';
 document.body.appendChild(el);
 const label=el.querySelector('span');
 let hideTimer=null,current=null;
 const COPY={ko:['<b>','</b> · 상세 내용을 준비하고 있습니다.'],
              en:['<b>','</b> · a detailed record is being prepared.']};
 const show=row=>{
  if(current===row)return;current=row;
  const n=row.querySelector('.pending-name');
  const lang=root.lang==='en'?'en':'ko';
  const name=(lang==='en'?n.dataset.en:n.dataset.ko)||n.textContent;
  const [a,b]=COPY[lang];
  label.innerHTML=a+name.replace(/&/g,'&amp;').replace(/</g,'&lt;')+b;
  el.classList.add('is-shown');
  clearTimeout(hideTimer);hideTimer=setTimeout(hide,2600)};
 const hide=()=>{el.classList.remove('is-shown');current=null;clearTimeout(hideTimer)};
 rows.forEach(row=>{
  row.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')show(row)});
  row.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hide()});
  /* Touch has no hover to lean on, so the tap itself is the trigger and the row
     holds a pressed tint for as long as the toast is up. */
  row.addEventListener('pointerdown',e=>{
   if(e.pointerType==='mouse')return;
   rows.forEach(r=>r.classList.remove('is-touched'));
   row.classList.add('is-touched');show(row);
   clearTimeout(hideTimer);
   hideTimer=setTimeout(()=>{row.classList.remove('is-touched');hide()},2600)},{passive:true})});
 /* A scroll or a tap elsewhere means the pointer has moved on. */
 addEventListener('scroll',()=>{if(current)hide()},{passive:true});
 document.addEventListener('pointerdown',e=>{
  if(!e.target.closest('.pending-row')){rows.forEach(r=>r.classList.remove('is-touched'));hide()}},{passive:true});
 /* Language can flip while a toast is up. */
 document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',hide))})();
/* Proof gallery: the credential row you attend to shows its certificate.
   Hover is not enough on its own -- a touch screen has no hover, and iOS fakes one on the
   first tap, which would make the scan appear only after a tap that looks like it did
   nothing. So the row is driven by pointerenter for a real pointer, click for everything
   else, and focus so it is reachable from the keyboard; a row that owns a scan becomes
   focusable and announces itself. Sticky by design -- see the note in site.css. */
(()=>{document.querySelectorAll('.proof-list').forEach(list=>{
 const feature=list.querySelector('.proof-feature');
 const rows=[...list.querySelectorAll('.proof-row[data-shot]')];
 if(!feature||!rows.length)return;
 const first=feature.querySelector('.progressive-image');
 /* The layer already in the markup belongs to whichever row names that same shot, so it is
    claimed rather than duplicated -- otherwise the default certificate would load twice. */
 const inMarkup=first&&first.querySelector('.progressive-image__full')?.getAttribute('src')||'';
 const layerFor=row=>{
  const base=row.dataset.shot;
  if(first&&inMarkup.includes(base+'.webp'))
   {if(!first.dataset.shot)first.dataset.shot=base;if(first.dataset.shot===base)return first}
  let found=[...feature.querySelectorAll('.progressive-image')].find(l=>l.dataset.shot===base);
  if(found)return found;
  const w=document.createElement('span');w.className='progressive-image';
  w.setAttribute('data-progressive','');w.dataset.shot=base;
  const mk=(cls,src,alt)=>{const im=document.createElement('img');im.className=cls;im.src=src;
   im.alt=alt;im.draggable=false;im.loading='eager';im.decoding='async';return im};
  const pv=mk('progressive-image__preview','../assets/'+base+'.preview.webp','');
  pv.setAttribute('aria-hidden','true');
  const ako=row.dataset.shotKo||'',aen=row.dataset.shotEn||ako;
  const full=mk('progressive-image__full','../assets/'+base+'.webp',lang()==='en'?aen:ako);
  full.dataset.altKo=ako;full.dataset.altEn=aen;
  w.append(pv,full);feature.appendChild(w);armProgressive(full,w);
  return w};
 const layers=rows.map(layerFor);
 const show=i=>{layers.forEach((l,n)=>l.classList.toggle('is-shown',n===i));
  rows.forEach((r,n)=>{const on=n===i;r.classList.toggle('is-shown',on);
   r.setAttribute('aria-pressed',String(on))})};
 rows.forEach((row,i)=>{
  row.tabIndex=0;row.setAttribute('role','button');row.setAttribute('aria-pressed','false');
  const pick=()=>show(i);
  row.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')pick()});
  row.addEventListener('click',pick);
  row.addEventListener('focus',pick);
  row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}})});
 show(0)})})();
