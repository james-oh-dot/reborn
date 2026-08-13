# REBORN SOFT CORPORATE WEBSITE
## PROTOTYPE SPECIFICATION v1.1
## Multi-Page Prototype v0.2 Implementation Specification

**Project:** Rebornsoft Corporate Website  
**Document Type:** Direct implementation specification  
**Supersedes:** `PROTOTYPE_SPECIFICATION_v1.0.md`  
**Governing IA:** `INFORMATION_ARCHITECTURE_FRAMEWORK_v1.1.md`  
**Governing Project Evidence:** `PROJECT_EVIDENCE_FRAMEWORK_v1.1.md`  
**Implementation Agent:** Codex  
**Prototype Target:** `v0.2`  
**Status:** **ACTIVE EXECUTION SPEC**

---

# 0. PURPOSE

v0.1 validated a partial visual language:

- Hero
- Evolution
- Capability sequence
- dark/light rhythm
- restrained motion
- editorial typography
- asymmetrical image layouts

But v0.1 was structurally incomplete.

v0.2 must validate the **actual corporate website architecture**:

```text
HOME
COMPANY
CAPABILITIES
WORK
CONTACT
```

Each menu item is a separate long-form page.

This is not a one-page scrolling corporate site.

---

# 1. PRIMARY OBJECTIVE

Prototype v0.2 must prove that:

1. Rebornsoft can sustain a professional multi-page corporate website.
2. The design language remains coherent across separate pages.
3. WORK feels substantial and evidence-led.
4. Technology remains the base of the brand.
5. Experience and spatial application feel like the evolution of technology.
6. The latest large-scale project can be shown safely as Current Work.
7. KR and EN both work naturally.
8. Desktop + mobile navigation work as real site navigation.

---

# 2. TECH STACK

Use:

- HTML5
- CSS3
- Vanilla JavaScript

Use shared files where possible.

Recommended:

```text
prototype/
├── index.html
├── company.html
├── capabilities.html
├── work.html
├── contact.html
├── css/
│   └── site.css
├── js/
│   └── site.js
└── IMPLEMENTATION_NOTES_v0.2.md
```

Do not use:
- React
- Vue
- Next.js
- WebGL
- build pipeline
- heavy animation library
- external UI framework

Small local helper code is preferred over dependencies.

---

# 3. GLOBAL VISUAL SYSTEM

## Art Direction
**DARK TECHNICAL EDITORIAL**

## Palette baseline
- Near Black
- Graphite
- Warm Off-white / Paper
- Neutral Gray
- Signal Blue as restrained functional accent
- Brand Red only where naturally tied to brand identity

Do not let Blue and Red compete at equal intensity.

---

# 4. GLOBAL GRID

Desktop:
12-column editorial grid.

Tablet:
8-column adaptation.

Mobile:
4-column adaptation.

Recommended content width:
up to approximately 1760px on large displays.

Use generous side gutters.

---

# 5. GLOBAL TYPOGRAPHY

Preferred:
- Korean: Pretendard Variable
- English Display: Inter Tight
- Body/UI: Inter / Pretendard

Fallbacks permitted.

Rules:
- no generic browser serif
- strong scale contrast
- Korean `word-break: keep-all`
- optical size tuning per language
- large section titles
- concise body copy

---

# 6. GLOBAL HEADER

Desktop:

```text
[REBORN SOFT]     COMPANY   CAPABILITIES   WORK   CONTACT     KR / EN
```

Logo / wordmark returns to Home.

Header:
- transparent over dark Hero
- dark translucent background after scroll
- consistent across all pages
- clear active-page state may be subtle

Tablet/mobile:
- full-screen or full-height mobile navigation
- available at <=1023px
- must not reproduce previous tablet menu bug

---

# 7. LANGUAGE

Default:
KR

Switch:
KR / EN

Use:
`localStorage`

Key:
```text
rebornsoft_lang
```

Apply selected language across page navigation where feasible.

At minimum, each page must initialize from saved preference.

---

# 8. MOTION

Motion character:
- restrained
- low-amplitude
- precise
- spatial
- editorial

Allowed:
- image reveal
- opacity / translate
- subtle scale
- capability sticky sequence
- hover image scale
- gentle line progress

Avoid:
- scroll hijacking
- aggressive parallax
- letter-by-letter
- flashy counters
- 3D camera tricks

Support:
`prefers-reduced-motion`

---

# 9. ASSET CLASSIFICATION

## Brand Hero
T-E Representational.

## Delivered Work
Actual project / product evidence only.

## Current Work
May use:
- approved concept
- representational visual
- planning visual

but must visibly remain:

`IN PROGRESS`

and must not look like a completed installation.

---

# 10. HOME PAGE — `index.html`

Home is an Executive Overview.

---

## HOME / H01 — HERO

Keep the approved v0.1 Hero direction.

### Copy

**Eyebrow**
TECHNOLOGY + EXPERIENCE

**KR**
인터랙티브 환경을 위한 기술

사람과 시스템, 디지털과 실제 공간이 연결되는 환경을 만듭니다.

**EN**
Technology for Interactive Environments

We build environments where people, digital systems, and physical spaces connect.

### Visual
Use approved Hero asset.

### Required behavior
- near/full viewport
- text safe on left
- visual focus right
- technology-led reading
- no excessive dark overlay
- restrained entrance motion

### CTA
`VIEW WORK →`
or approved equivalent.

---

## HOME / H02 — EVOLUTION

Theme:
**From perception to experience.**

KR working headline:
**기술의 범위를 넓혀 왔습니다.**

EN:
**Technology, applied at a larger scale.**

Narrative:

```text
PERCEPTION
→ INTERACTION
→ ENVIRONMENT
→ EXPERIENCE
```

Light editorial section.

Preserve useful v0.1 layout.

---

## HOME / H03 — CORE CAPABILITIES

Dark section.

Show:
1. Intelligent Interaction
2. Digital Environments
3. Experience Systems
4. Technology Integration as cross-layer

Desktop:
sticky sequential interaction may remain.

Mobile:
stack.

Do not make 3 equal cards.

CTA:
`VIEW CAPABILITIES →`

---

## HOME / H04 — SELECTED WORK

This replaces the single 7 Cubic flagship.

### Priority

#### 01 Yancheng Automotive Theme Park
`DELIVERED · 2022`

#### 02 Hongdae VR Experience Space
`DELIVERED · 2022`

#### 03 FIT-M
`CO-DEVELOPED / DELIVERED · 2021–2022`

#### 04 Hana Bank Face Recognition Access System
`DELIVERED · 2019`

Optional smaller supporting:
Hyundai E&C Presentation Environment.

### Layout
Do NOT create four equal cards.

Recommended editorial sequence:
- one large lead case
- one secondary physical case
- two compact editorial cases

### CTA
`VIEW ALL WORK →`

---

## HOME / H05 — TECHNOLOGY PROOF

Light or dark depending rhythm.

Use evidence:
- KISA
- patents
- R&D center
- Venture
- TCB T3

Avoid:
four giant rounded stat cards.

Use:
document details, badges, metadata, small editorial proof blocks.

---

## HOME / H06 — CURRENT DIRECTION

Public-safe label:

### KR
대규모 몰입형 문화 경험 프로젝트

### EN
Large-Scale Immersive Cultural Experience

Status:

`IN PROGRESS · 2025–2026`

Working KR copy:
현재 대규모 문화 콘텐츠 프로젝트의 경험 구성과 기술·콘텐츠 기획을 진행하고 있습니다. 리본소프트가 축적해 온 디지털 기술, 인터랙션, 환경과 실제 경험의 적용 범위를 더 큰 프로젝트 단위로 확장하고 있습니다.

Working EN copy:
Rebornsoft is currently planning a large-scale immersive cultural experience that brings together technology, content, interaction, and physical environments at a larger project scale.

### Visual
May use a public-safe abstract / representational / planning visual.

Do not reveal:
Noah's Ark / Qingdao / SCO / religion / dimensions / investment / partners.

---

## HOME / H07 — CLOSING BRIDGE

Simple company / contact CTA.

Suggested:

```text
Technology that moves from systems into experience.

ABOUT REBORNSOFT →
START A CONVERSATION →
```

Do not over-design.

---

# 11. COMPANY PAGE — `company.html`

Long-form company page.

---

## COMPANY / C01 — HERO

Working theme:

**KR**
기술에서 시작해, 경험의 범위를 넓혀 왔습니다.

**EN**
From technology to broader experiences.

Use a calmer Hero than Home.

No generic team stock photo.

---

## COMPANY / C02 — COMPANY DEFINITION

Use approved corporate definition.

Large editorial statement.

---

## COMPANY / C03 — EVOLUTION

Suggested phases:

```text
2018–2019
PERCEPTION

2019–2021
INTERACTION

2021–2022
DIGITAL ENVIRONMENTS

2022–2024
PHYSICAL EXPERIENCES

2025–
LARGER EXPERIENCE SYSTEMS
```

This should feel like company evolution, not a dense legal timeline.

---

## COMPANY / C04 — HISTORY

Detailed timeline:
2018–2026.

Use real facts from Source Ledger only.

Recommended:
chronological editorial rows rather than bubbles/cards.

---

## COMPANY / C05 — TECHNOLOGY CREDIBILITY

Evidence:
- Corporate R&D Lab
- Venture Certification
- TCB T3
- KISA Certification
- patents

Use actual documents where possible.

---

## COMPANY / C06 — CORPORATE FACTS

Only verified current facts.

Do not auto-publish:
- old address
- capital
- employee count
- revenue

unless confirmed.

---

## COMPANY / C07 — CURRENT DIRECTION

Bridge to current large-scale work.

CTA:
`EXPLORE WORK →`

---

# 12. CAPABILITIES PAGE — `capabilities.html`

---

## CAP / C01 — HERO

Working:
**Technology, organized around interaction and environment.**

No large stock hero.

Can use technical graphical system + actual evidence.

---

## CAP / C02 — INTELLIGENT INTERACTION

Content:
- Computer Vision
- Face Recognition
- Motion Recognition
- Tracking
- Detection / response logic

Evidence:
- Hana
- AI HYPER VISION
- FIT-M
- patents

### Visual rule
Prefer actual UI / system evidence plus restrained overlays.

Avoid abstract radar-only visual as primary proof.

---

## CAP / C03 — DIGITAL ENVIRONMENTS

Content:
- Virtual environment
- Platform
- Digital Twin
- Remote interaction
- 3D environment

Evidence:
- WeWorld
- Meta Campus
- 7 Cubic

7 Cubic belongs here as productization evidence.

---

## CAP / C04 — EXPERIENCE SYSTEMS

Content:
- VR / AR
- Simulator
- Curved-screen / large media
- interactive content
- physical/digital systems

Evidence:
- Hongdae
- Hyundai
- Yancheng

This section should end with actual physical-experience imagery.

---

## CAP / C05 — TECHNOLOGY INTEGRATION

Cross-layer.

Use diagram / line / integration sequence.

Do not use fourth equal card.

---

## CAP / C06 — RELATED WORK

Use 3–5 work references.

CTA:
`EXPLORE WORK →`

---

# 13. WORK PAGE — `work.html`

This page requires the most depth.

---

## WORK / W01 — HERO

Working:

**KR**
기술이 실제 환경에서 작동한 경험.

**EN**
Technology applied in real environments.

Use strong editorial type + restrained project montage or selected physical-project image if legally/publicly safe.

---

## WORK / W02 — CURRENT WORK

Public-safe project:

**Large-Scale Immersive Cultural Experience**  
`IN PROGRESS · 2025–2026`

Visually distinguish from completed Work.

Required UI:
- clear status
- "Current Work" label
- no completion implication

---

## WORK / W03 — SELECTED PROJECT EXPERIENCE

Recommended hierarchy:

### Lead Case
**Yancheng Automotive Theme Park**
`DELIVERED · 2022`

### Secondary Physical Case
**Hongdae VR Experience Space**
`DELIVERED · 2022`

### Supporting Physical Media
**Hyundai E&C Presentation Environment**
`DELIVERED · 2022`

### Technology / Healthcare
**FIT-M**
`CO-DEVELOPED / DELIVERED · 2021–2022`

### Enterprise Technology
**Hana Bank Face Recognition Access System**
`DELIVERED · 2019`

Do not create equal cards.

---

## WORK / W04 — FROM TECHNOLOGY TO EXPERIENCE

Narrative bridge:

```text
Recognition
→ Motion & Tracking
→ Digital Environment
→ Physical Media & Simulation
→ Integrated Experience
```

May be text + line / lightweight diagram.

---

## WORK / W05 — SYSTEMS & DEVELOPMENT

Use compact structured archive.

### Intelligent Systems
- Reborn Face 3D
- Reborn Face 2D
- Reborn Vision
- Reborn Motion
- Reborn Tracking
- AI Unmanned Service
- AI HYPER VISION

### Digital Environment Development
- WeWorld
- Meta Campus
- 7 Cubic
- Avatar / Digital Twin development

7 Cubic appears here after the stronger delivered cases.

---

## WORK / W06 — SELECTED ENGAGEMENTS / DEVELOPMENT HISTORY

Compact chronology.

May include:
- Vflex — Contracted
- Busan Port-related MOU
- GOM & Company MOU
- M-Star Korea — usage contract
- Soonsoo Education — MOU
- Hannune Doctor — technology supply contract
- Cityfield — Contracted · 2022

### Cityfield
Must display:
`CONTRACTED · 2022`

Never:
Delivered / Installed / Completed.

---

## WORK / W07 — TECHNOLOGY PROOF

Evidence-led close:
- KISA
- patents
- R&D
- Venture
- TCB T3

---

## WORK / W08 — CONTACT BRIDGE

Working:
**Building the next interactive environment.**

CTA:
`START A PROJECT CONVERSATION →`

---

# 14. CONTACT PAGE — `contact.html`

---

## CONTACT / CT01 — HERO

Working:

**KR**
다음 프로젝트를 함께 설계합니다.

**EN**
Let's build the next interactive environment.

---

## CONTACT / CT02 — INQUIRY TYPES

Possible:
- General Business
- Technology Partnership
- Project Collaboration
- Content / Experience Collaboration

Do not make SaaS feature cards.

---

## CONTACT / CT03 — CONTACT INFORMATION

Use only verified current information.

If unavailable:
use explicit placeholder in prototype.

---

## CONTACT / CT04 — COMPANY PROFILE

Optional visual placeholder for future profile download.

No actual downloadable file required unless supplied.

---

# 15. PROJECT DETAIL PAGES — NOT REQUIRED YET

Do not build all case details in v0.2.

But architecture should allow later pages such as:

```text
work-yancheng.html
work-fitm.html
work-hana.html
```

Potential detail structure:

1. Hero
2. Context
3. Rebornsoft Role
4. Technology
5. Experience / Result
6. Evidence
7. Related Capabilities
8. Related Work

---

# 16. RESPONSIVE ACCEPTANCE

Test at minimum:

Desktop:
1440 × 900

Tablet:
820 × 1180

Mobile:
390 × 844

### Required
- nav works at tablet
- no hidden menu bug
- Hero crop safe
- no capability desktop sticky forced on mobile
- project images readable
- Korean wrapping clean
- English layout stable
- no overflow

---

# 17. GLOBAL CONTENT SAFETY

Do not invent:
- project outcomes
- performance metrics
- user counts
- revenue
- current deployment
- project completion
- client endorsement

Use approved facts only.

---

# 18. CURRENT PROJECT PUBLIC-SAFETY TEST

Before rendering the Current Work section, verify the visible page does not contain:

```text
Noah
Ark
Qingdao
SCO
Bible
Biblical
church
religious
300m
investment
```

unless explicitly approved later.

---

# 19. v0.1 CODE REUSE

Do not rebuild blindly.

Inspect v0.1 and reuse:
- tokens
- Hero behavior
- reveal
- header styling
- bilingual JS logic after fixes
- capability interaction
- responsive foundations
- reduced-motion handling

Refactor shared styles into `site.css`.

Refactor shared JS into `site.js`.

---

# 20. REQUIRED FIXES FROM v0.1 REVIEW

### FIX-01
Tablet mobile menu must work from <=1023px.

### FIX-02
Add / preserve Korean:
```css
html[lang="ko"]{
  word-break:keep-all;
  overflow-wrap:break-word;
}
```

### FIX-03
Do not use a fake red-square wordmark if actual Rebornsoft logo placeholder exists.

### FIX-04
Hero copy width must respect visual safe zone.

### FIX-05
Do not bake meaningful bilingual text into CSS `content:` pseudo-elements.

### FIX-06
Restore real localStorage language persistence in a normal local/hosted environment.

### FIX-07
Capability mobile must preserve visual evidence, not become text-only.

---

# 21. ASSET PLACEHOLDER POLICY

Prototype placeholders are permitted.

Record every placeholder in:

`IMPLEMENTATION_NOTES_v0.2.md`

For each:
- name
- path
- source
- truth class
- quality
- intended replacement
- publication limitation

---

# 22. IMPLEMENTATION NOTES REQUIRED

`IMPLEMENTATION_NOTES_v0.2.md` must include:

1. Page list
2. Asset inventory
3. Placeholder inventory
4. Project status handling
5. Current Work disclosure handling
6. Bilingual behavior
7. Responsive behavior
8. v0.1 code reused
9. deviations
10. unresolved issues
11. browser test sizes
12. case-detail pages not yet built

---

# 23. AUTOMATIC REJECTION CONDITIONS

Reject / fix before review if any occur:

- single-page-only anchor-scroll architecture
- 7 Cubic shown as homepage flagship
- Cityfield shown as completed
- Current Work shown as completed
- Noah's Ark identity publicly exposed
- generic 3-card capability grid
- stock image used as project proof
- generated image used as delivered-project proof
- tablet menu broken
- simultaneous KR + EN page copy
- mobile capability has no imagery
- missing Work page depth
- hidden invented facts

---

# 24. QUALITY TARGET

The v0.2 prototype should feel like a real corporate website, not a landing page.

Expected impression:

> Rebornsoft is a technology company with a real history of intelligent systems, digital environments, physical media, and experience implementation — now extending that experience into larger integrated projects.

---

# 25. OUTPUT

Create:

```text
prototype/index.html
prototype/company.html
prototype/capabilities.html
prototype/work.html
prototype/contact.html
prototype/css/site.css
prototype/js/site.js
prototype/IMPLEMENTATION_NOTES_v0.2.md
```

Render and test all five pages.

Then stop and wait for review.

