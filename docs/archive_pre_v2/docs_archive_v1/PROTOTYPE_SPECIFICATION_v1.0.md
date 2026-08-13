# REBORN SOFT CORPORATE WEBSITE
## PROTOTYPE SPECIFICATION v1.0
## 리본소프트 공식 홈페이지 프로토타입 구현 명세 v1.0

**Project / 프로젝트:** Rebornsoft Corporate Website / 리본소프트 공식 기업 홈페이지  
**Document Type / 문서 유형:** Implementation Specification for Prototype A/B / 프로토타입 A/B 구현 명세  
**Primary Implementer / 주 구현 도구:** Claude Max 5  
**Strategy / Review / 전략·검수:** ChatGPT Pro  
**Parent Documents / 상위 문서:** FOUNDATION_FRAMEWORK_v1.0 / SOURCE_LEDGER_v1.0 / COMPANY_DNA_v1.0 / POSITIONING_FRAMEWORK_v1.0 / INFORMATION_ARCHITECTURE_FRAMEWORK_v1.0 / CAPABILITY_FRAMEWORK_v1.0 / PROJECT_EVIDENCE_FRAMEWORK_v1.0 / CONTENT_FRAMEWORK_v1.0 / VISUAL_DIRECTION_FRAMEWORK_v1.0 / ASSET_MEDIA_FRAMEWORK_v1.0  
**Language Policy / 언어 정책:** Korean + English developed in parallel / 한국어 + 영어 동시 설계  
**Status / 상태:** Implementation Baseline v1.0 / 구현 기준안 v1.0

---

# 0. PURPOSE
# 0. 문서 목적

이 문서는 전체 홈페이지를 구현하기 전에 리본소프트 사이트의 핵심 시각 언어와 인터랙션 품질을 검증하기 위한 **두 개의 제한된 프로토타입**을 Claude가 구현하도록 지시하는 명세서다.

This document instructs Claude to build **two limited prototypes** before any full-site implementation, so that Rebornsoft's visual language, motion quality, bilingual behavior, and project-evidence treatment can be reviewed and approved first.

### Prototype A
**Navigation + Hero + H02 Evolution Intro**

### Prototype B
**Capability Sequence + Technology Integration + One Featured Project**

### Non-negotiable
**Do not build the full website before Prototype A and Prototype B are approved.**

---

# 1. IMPLEMENTATION ROLE
# 1. Claude 역할

Claude는 이 문서에서 확정된 시스템을 **구현**한다.

Claude implements the approved system; it does not redefine the strategy.

Claude는 다음을 임의 변경하지 않는다.

- Positioning
- Brand Descriptor
- KR / EN content hierarchy
- Capability names
- Project status
- Dark-first direction
- Typography hierarchy
- Hero strategy
- Capability sequence
- Project truth policy
- Motion personality
- Main information order

좋은 대안을 발견하면 코드에 임의 반영하지 말고 별도 `PROPOSAL`로 제시한다.

---

# 2. IMPLEMENTATION FORMAT
# 2. 구현 형식

## Required
**Pure HTML / CSS / JavaScript**

### No framework
- No React
- No Vue
- No Next.js
- No build tool required for prototype

### Delivery target
- Single standalone HTML file preferred for first review
- Assets may live in local `/assets` directory
- Must open directly in browser
- CodePen-friendly structure preferred

### JavaScript
Vanilla JavaScript first.

Optional lightweight animation library may be proposed only if necessary, but the first implementation should be possible with:

- CSS transforms
- CSS transitions
- IntersectionObserver
- requestAnimationFrame only where needed

### WebGL
**Do not use.**

---

# 3. PROTOTYPE FILE STRUCTURE
# 3. 프로토타입 파일 구조

Recommended:

```text
/prototype
│
├── index.html
│
└── assets
    ├── brand
    │   └── rebornsoft-logo-white.png
    ├── hero
    │   ├── hero-interactive-desktop.jpg
    │   └── hero-interactive-mobile.jpg
    ├── capabilities
    │   ├── intelligent-interaction.jpg
    │   ├── digital-environments.jpg
    │   └── experience-systems.jpg
    └── projects
        └── 7cubic
            ├── 7cubic-01.jpg
            └── 7cubic-02.jpg
```

If final P0 assets are not available, use clearly marked local placeholders:

`PLACEHOLDER_HERO.jpg`  
`PLACEHOLDER_7CUBIC.jpg`

Do not download stock images automatically.

---

# 4. GLOBAL PAGE MODEL
# 4. 글로벌 페이지 구조

Prototype page sequence:

```text
<body>
  HEADER
  MAIN
    H01 HERO
    H02 EVOLUTION INTRO
    H03 CAPABILITY SEQUENCE
    H04 FEATURED PROJECT
  END MAIN
</body>
```

Prototype A consists of:
`HEADER + H01 + H02`

Prototype B adds:
`H03 + H04`

---

# 5. GLOBAL DESIGN TOKENS
# 5. 글로벌 디자인 토큰

Use the following baseline.

```css
:root {
  --bg-ink: #090A0B;
  --bg-graphite: #111315;
  --bg-paper: #F6F5F1;

  --text-on-dark: #F2F1ED;
  --text-on-light: #141618;
  --text-muted-dark: rgba(242,241,237,.60);
  --text-muted-light: rgba(20,22,24,.58);

  --accent: #5D72FF;
  --accent-soft: #A9B4FF;

  --line-dark: rgba(255,255,255,.14);
  --line-light: rgba(20,22,24,.14);

  --gutter-desktop: clamp(32px, 4vw, 72px);
  --gutter-mobile: 20px;

  --max-standard: 1440px;
  --max-wide: 1760px;
  --max-editorial: 880px;

  --section-space: clamp(112px, 12vw, 200px);

  --radius-media: 4px;
  --radius-ui: 6px;

  --ease-main: cubic-bezier(.16,1,.3,1);
  --ease-secondary: cubic-bezier(.22,1,.36,1);
}
```

Do not add extra decorative brand colors.

---

# 6. FONT IMPLEMENTATION
# 6. 폰트 구현

## Preferred
Korean:
`Pretendard Variable`

English:
`Inter Tight` for display  
`Inter` for body / UI

### Fallback
```css
font-family: Pretendard, Inter, Arial, "Noto Sans KR", sans-serif;
```

### Rule
Do not embed or distribute local font files in the prototype package unless licensing and delivery method are already resolved.

If webfont loading is not available, fall back cleanly.

---

# 7. RESPONSIVE BREAKPOINTS
# 7. 반응형 기준

Use CSS-first fluid layout.

```css
/* narrow mobile */
@media (max-width: 419px) {}

/* mobile */
@media (max-width: 767px) {}

/* tablet */
@media (min-width: 768px) and (max-width: 1023px) {}

/* desktop */
@media (min-width: 1024px) {}

/* wide desktop */
@media (min-width: 1440px) {}
```

Use `clamp()` wherever practical.

---

# 8. GLOBAL GRID
# 8. 글로벌 그리드

## Desktop
12-column conceptual grid.

Use CSS Grid where practical:

```css
display: grid;
grid-template-columns: repeat(12, minmax(0, 1fr));
gap: 24px;
```

## Tablet
8 columns.

## Mobile
4 columns.

### Important
Do not show visible grid lines to the user.

The grid is a composition system, not a visual decoration.

---

# 9. HEADER / NAVIGATION
# 9. 헤더 / 내비게이션

## Height
Desktop:
`80px`

Mobile:
`68px`

## Position
`position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;`

## Initial state over Hero
- transparent background
- white logo
- light nav text
- no large shadow

## Scrolled state
When scroll > approximately 48px:

- background: `rgba(9,10,11,.86)`
- `backdrop-filter: blur(14px)`
- subtle bottom border using `--line-dark`

### Transition
`280ms var(--ease-main)`

---

# 10. DESKTOP NAV CONTENT
# 10. 데스크톱 내비게이션 콘텐츠

Left:
Rebornsoft logo

Right:
- COMPANY
- CAPABILITIES
- PROJECTS
- CONTACT
- `KR / EN`

Spacing:
`28–36px`

Typography:
`12–13px`
weight `500`
letter spacing `0.06em`

No oversized pill buttons.

CONTACT may include a small arrow `↗` or `→`.

---

# 11. MOBILE NAV
# 11. 모바일 내비게이션

Desktop links collapse into a menu trigger.

### Trigger
- simple two-line or text `MENU`
- no hamburger animation spectacle

### Menu panel
- full viewport or 85–100svh
- dark background
- large vertical links
- language switch visible
- no project thumbnails

### Link size
`32–42px`

### Animation
Panel opacity + translateY 12–20px.

Duration:
`400–500ms`

---

# 12. LANGUAGE SWITCH
# 12. 언어 전환

UI:
`KR / EN`

### Default language
Prototype default:
**KR**

### Behavior
Clicking EN:
- changes all visible content to English
- retains current scroll position
- no page reload required for prototype
- updates `document.documentElement.lang = "en"`

Clicking KR:
- changes back to Korean
- updates `lang = "ko"`

### Implementation recommendation
Use data attributes:

```html
<span data-ko="회사소개" data-en="COMPANY">회사소개</span>
```

or a structured JS copy object.

### Non-negotiable
Do not display KR and EN simultaneously in the same content block.

---

# 13. LANGUAGE STATE STORAGE
# 13. 언어 상태 저장

Prototype:
Use `localStorage`.

Key:
`rebornsoft_lang`

Accepted:
`ko`, `en`

On first load:
- use stored value if present
- otherwise use `ko`

No browser auto-detection required in prototype v1.0.

---

# 14. PROTOTYPE A — H01 HERO
# 14. 프로토타입 A — H01 Hero

## Height
Desktop:
`min-height: 100svh`

Mobile:
`min-height: 92svh`
recommended visual floor: ~720px

## Background
Hero asset:
T-E Representational Visual.

`object-fit: cover; width:100%; height:100%;`

### Desktop focal behavior
Prefer focal point on right half, leaving copy space on left.

### Mobile focal behavior
Use dedicated mobile asset or alternate `object-position`.

---

# 15. HERO OVERLAY
# 15. Hero 오버레이

Use only enough overlay for text legibility.

Desktop:
```css
background:
linear-gradient(
  90deg,
  rgba(9,10,11,.80) 0%,
  rgba(9,10,11,.45) 42%,
  rgba(9,10,11,.10) 72%,
  rgba(9,10,11,.20) 100%
);
```

Mobile:
stronger lower gradient.

No purple glow layer.

---

# 16. HERO CONTENT POSITION
# 16. Hero 콘텐츠 위치

## Desktop
Content container:
max-width `1760px`
full page gutter.

Copy begins around:
- left: page gutter
- vertical: 52–66% viewport height

Grid:
copy spans columns `1–7`

## Wide desktop
Headline max width:
`900–1050px`

## Mobile
Copy anchored in lower third.
Left/right: 20px.
Bottom padding: `64–88px`.

---

# 17. HERO CONTENT — KR
# 17. Hero 콘텐츠 — KR

Use exactly this Working Copy for prototype.

### Eyebrow
`TECHNOLOGY + EXPERIENCE`

### Main headline
`인터랙티브 환경을 위한 기술`

### Supporting
`사람과 시스템, 디지털과 실제 공간이 연결되는 환경을 만듭니다.`

### Optional small CTA
`프로젝트 보기 →`

Prototype CTA may scroll to H04.

---

# 18. HERO CONTENT — EN
# 18. Hero 콘텐츠 — EN

### Eyebrow
`TECHNOLOGY + EXPERIENCE`

### Main headline
`Technology for Interactive Environments`

### Supporting
`We build environments where people, digital systems, and physical spaces connect.`

### Optional CTA
`VIEW PROJECTS →`

---

# 19. HERO TYPOGRAPHY
# 19. Hero 타이포그래피

## Eyebrow
`12px`
uppercase
letter-spacing `0.12em`
opacity `0.68`

## Main headline
EN:
```css
font-size: clamp(64px, 7.3vw, 116px);
line-height: .94;
letter-spacing: -.045em;
font-weight: 540;
```

KR:
```css
font-size: clamp(52px, 6.1vw, 92px);
line-height: 1.04;
letter-spacing: -.035em;
font-weight: 560;
```

## Supporting
Desktop:
`20–24px`
max width `640px`

Mobile:
`17–20px`

---

# 20. HERO INTRO MOTION
# 20. Hero 진입 모션

Sequence after DOM ready:

### t=0
Hero image opacity `0 → 1`
scale `1.015 → 1`
duration `1200ms`

### t=120ms
Eyebrow
opacity `0 → 1`
translateY `18px → 0`
duration `700ms`

### t=220ms
Headline
line-mask reveal
translateY `36px → 0`
duration `900ms`

### t=420ms
Supporting
opacity `0 → 1`
translateY `24px → 0`
duration `800ms`

### t=560ms
CTA / scroll marker
opacity `0 → 1`

### Rule
No letter-by-letter animation.

---

# 21. HERO SCROLL BEHAVIOR
# 21. Hero 스크롤 동작

On scroll within first viewport:

- Hero image may translate Y max `3%`
- Copy may translate Y max `-2%`
- opacity remains stable until section transition

Do not shrink Hero into a card.

Do not use zoom-out tunnel effect.

---

# 22. HERO SCROLL MARKER
# 22. Hero 스크롤 표시

Optional.

Bottom right or left:
`SCROLL`
thin 36–48px vertical / horizontal line.

Use only on desktop.

No bouncing mouse icon.

---

# 23. H02 — EVOLUTION INTRO
# 23. H02 — 기술 진화 인트로

## Visual purpose
Hero의 dark cinematic impression 다음에 Light Editorial section으로 전환.

## Background
`--bg-paper`

## Text
`--text-on-light`

## Spacing
Desktop:
top `160–200px`
bottom `160–200px`

Mobile:
`96–120px`

---

# 24. H02 LAYOUT
# 24. H02 레이아웃

## Desktop 12-column
Small section label:
columns 1–2

Headline:
columns 4–11

Body:
columns 7–11

Suggested:

```text
01 / EVOLUTION          기술의 범위를 넓혀 왔습니다.
                        [large headline]

                                         [body text]
```

Do not center.

---

# 25. H02 CONTENT — KR
# 25. H02 콘텐츠 — KR

Section label:
`01 / EVOLUTION`

Headline:
`기술의 범위를 넓혀 왔습니다.`

Body:
`얼굴과 움직임을 인식하는 기술에서 시작해, 사용자가 활동하는 디지털 환경과 실제 공간 경험까지 적용 범위를 확장해 왔습니다.`

Footer DNA line:
`PERCEPTION → INTERACTION → ENVIRONMENT → EXPERIENCE`

---

# 26. H02 CONTENT — EN
# 26. H02 콘텐츠 — EN

Section label:
`01 / EVOLUTION`

Headline:
`Technology, applied at a larger scale.`

Body:
`Rebornsoft began with technologies that recognize people and movement, then expanded into digital environments and physical experiences built around interaction.`

Footer DNA:
`PERCEPTION → INTERACTION → ENVIRONMENT → EXPERIENCE`

---

# 27. H02 TYPOGRAPHY
# 27. H02 타이포그래피

Headline EN:
`clamp(48px, 5vw, 80px)`

Headline KR:
`clamp(42px, 4.4vw, 68px)`

Body:
`20–24px`

DNA line:
`12–14px`
uppercase EN
small tracking.

---

# 28. H02 MOTION
# 28. H02 모션

Trigger when section enters 70–75% viewport.

Headline:
opacity + translateY 36px

Body:
120ms delayed.

DNA:
thin line grows left→right or text fades.

Duration:
`700–900ms`

No pinned scrolling in H02.

---

# 29. PROTOTYPE B — H03 CAPABILITY SEQUENCE
# 29. 프로토타입 B — H03 Capability Sequence

## Goal
Capabilities가 네 개의 평범한 카드로 보이지 않고,
**기술의 적용 단위가 점점 커지는 과정**으로 보이게 한다.

### Core sequence
1. Intelligent Interaction
2. Digital Environments
3. Experience Systems

### Cross layer
Technology Integration

---

# 30. H03 SECTION BASE
# 30. H03 기본 구조

Background:
`--bg-ink`

Text:
warm white.

Desktop section height:
approximately `260–340vh`

Purpose:
sticky visual progression.

### Structure

```text
<section class="capabilities">
  <div class="cap-sticky">
    left: capability index / text
    right: visual stage
  </div>
  <div class="cap-scroll-track">
    step 1
    step 2
    step 3
  </div>
</section>
```

### Sticky viewport
`min-height: 100svh`

---

# 31. H03 DESKTOP COMPOSITION
# 31. H03 데스크톱 구성

12-column grid.

Left text:
columns 1–5

Right visual:
columns 6–12

At wide desktop:
visual may bleed to right edge.

### Section label
`02 / CAPABILITIES`

### Top level caption
`FROM PERCEPTION TO EXPERIENCE`

---

# 32. CAPABILITY STEP 01
# 32. Capability 단계 01

## KR
### 지능형 인터랙션
`사람과 행동을 이해하는 기술.`

Body:
`컴퓨터 비전, 동작인식, 추적 기술을 기반으로 시스템이 사용자를 인식하고 반응하도록 만듭니다.`

## EN
### Intelligent Interaction
`Technology that understands people and movement.`

Body:
`Computer vision, motion recognition, and tracking enable systems to sense and respond to users.`

### Visual
Actual AI / motion UI detail preferred.
If unavailable:
approved T-E sensing visual placeholder.

---

# 33. CAPABILITY STEP 02
# 33. Capability 단계 02

## KR
### 디지털 환경
`사람이 활동할 수 있는 디지털 공간.`

Body:
`가상환경, 플랫폼, 디지털트윈을 통해 연결·협업·상호작용이 가능한 환경을 구축합니다.`

## EN
### Digital Environments
`Digital spaces built for interaction.`

Body:
`Virtual environments, platforms, and digital twins create spaces for connection, collaboration, and use.`

### Visual
7 Cubic / WeWorld actual interface.

---

# 34. CAPABILITY STEP 03
# 34. Capability 단계 03

## KR
### 경험 시스템
`기술을 실제 경험으로 확장합니다.`

Body:
`소프트웨어, 미디어, VR·AR, 시뮬레이터와 콘텐츠를 실제 공간과 방문자 경험에 연결합니다.`

## EN
### Experience Systems
`Extending technology into real-world experiences.`

Body:
`Software, media, VR/AR, simulation, and content come together in physical spaces and visitor experiences.`

### Visual
Hongdae VR or Yancheng physical project.

---

# 35. CAPABILITY VISUAL TRANSITION
# 35. Capability 비주얼 전환

Each step must feel larger in scale.

### Step 1
Tight / human / sensor detail.

### Step 2
Medium spatial digital environment.

### Step 3
Large physical / visitor-scale environment.

### Motion
At progress threshold:

old visual:
opacity 1→0  
scale 1→0.985

new visual:
opacity 0→1  
scale 1.02→1

duration:
`700–900ms`

No 3D flip.

---

# 36. TECHNOLOGY INTEGRATION LAYER
# 36. Technology Integration 시각 레이어

Technology Integration은 네 번째 카드가 아니다.

### Visual
A subtle line / node system connecting the three states.

At bottom / final phase of H03:

KR:
`프로젝트에 필요한 기술을 하나의 작동 구조로 연결합니다.`

EN:
`We bring multiple technologies together around the needs of each project.`

### Possible visual language
- three small labels connected by a single line
- line moves through visual stage
- nodes activate as each capability becomes active

### Accent use
Signal Blue used only on active node / short connecting segment.

---

# 37. H03 MOBILE
# 37. H03 모바일

Do not reproduce 300vh sticky experience if it becomes cumbersome.

### Mobile structure
Stack 3 capability blocks vertically.

Each block:
- full-width image
- label
- title
- body
- subtle transition

Technology Integration:
simple divider / line system after third block.

### Rule
Critical information must not depend on scroll position tricks.

---

# 38. H04 FEATURED PROJECT
# 38. H04 대표 프로젝트

Prototype uses **7 Cubic** as default because:

- Status = RELEASED
- strong Digital Environments relevance
- actual UI images exist in archive
- visually useful for testing real evidence presentation

If 7 Cubic original assets are unavailable, use best available approved placeholder from company archive.

---

# 39. H04 BACKGROUND
# 39. H04 배경

Preferred:
Light `--bg-paper`

or dark-to-light transition depending on final H03 exit.

For v1.0:
**Light section recommended** to test contrast.

---

# 40. H04 PROJECT LAYOUT
# 40. H04 프로젝트 레이아웃

## Desktop
Top:
section metadata.

Large image:
approximately 65–72vw width or 7–8 columns.

Text:
adjacent or below in editorial split.

Recommended composition:

```text
03 / PROJECTS              RELEASED · 2022

[ large 7 Cubic visual ---------------------- ]

7 Cubic                    Digital Environments
                            short description
                            VIEW PROJECT →
```

### Avoid
3-column portfolio grid.

---

# 41. H04 CONTENT — KR
# 41. H04 콘텐츠 — KR

Section label:
`03 / PROJECTS`

Project:
`7 Cubic`

Status:
`출시 · 2022`

Capability:
`디지털 환경`

Description:
`가상공간에서 회의·상담·협업을 진행할 수 있도록 개발한 3D 플랫폼. CBT를 거쳐 2022년 정식 출시했습니다.`

Link:
`프로젝트 보기 →`

---

# 42. H04 CONTENT — EN
# 42. H04 콘텐츠 — EN

Section label:
`03 / PROJECTS`

Project:
`7 Cubic`

Status:
`RELEASED · 2022`

Capability:
`DIGITAL ENVIRONMENTS`

Description:
`A 3D environment developed for virtual meetings, consultation, and collaboration. The platform moved from closed beta to release in 2022.`

Link:
`VIEW PROJECT →`

---

# 43. H04 IMAGE TREATMENT
# 43. H04 이미지 처리

Actual UI / product visual.

### Do
- direct crop
- preserve actual product visual
- color correct lightly if needed
- use large scale

### Do not
- place inside MacBook mockup
- fake hologram
- add people not in source
- rebuild screen into a newer product UI
- overblur image behind text

---

# 44. H04 MOTION
# 44. H04 모션

On enter:

Image:
clip-path / mask reveal from bottom or side.

Duration:
`900–1100ms`

Text:
opacity + translateY 28px
delayed 120–180ms.

Hover:
image scale max `1.012–1.015`.

---

# 45. GLOBAL LINK SYSTEM
# 45. 글로벌 링크 시스템

Text link style:

`LABEL →`

No filled pill required.

Hover:
- arrow shifts 4px
- underline / line extends

Duration:
`220ms`

---

# 46. GLOBAL CURSOR
# 46. 커서

Use default system cursor.

Do not implement custom circular cursor in v1.0.

---

# 47. GLOBAL BUTTON RULE
# 47. 버튼 규칙

Prototype should avoid generic large rounded buttons.

If a button is necessary:

- transparent / minimal
- 1px subtle line
- 4–6px radius
- no giant pill
- no heavy shadow

---

# 48. IMAGE LOADING
# 48. 이미지 로딩

Hero:
eager load.

Below fold:
`loading="lazy"`

Use:
`srcset` only if alternate assets available.

For prototype single HTML:
keep paths simple.

---

# 49. REDUCED MOTION
# 49. Reduced Motion

Must implement.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Scroll-driven transforms must be bypassed in JS as well.

---

# 50. ACCESSIBILITY
# 50. 접근성

Prototype must include:

- semantic `header`, `nav`, `main`, `section`
- heading order
- `aria-label` for menu
- language switch buttons accessible
- alt text
- keyboard focus styles
- no hover-only information
- sufficient contrast

---

# 51. PERFORMANCE REQUIREMENTS
# 51. 성능 요구사항

Prototype target:
fast enough for immediate review.

### Avoid
- 20MB hero GIF
- uncompressed PNG backgrounds
- huge JS animation packages
- unnecessary canvas
- unnecessary video

### Hero image
Prefer WebP / AVIF where available.

---

# 52. CODE ORGANIZATION
# 52. 코드 구조

Single HTML may contain:

```html
<style>
  /* tokens */
  /* reset */
  /* typography */
  /* layout */
  /* components */
  /* responsive */
  /* motion */
</style>
```

and

```html
<script>
  // language state
  // header scroll state
  // reveal observer
  // capability scroll logic
  // mobile menu
</script>
```

### Requirement
Add clear section comments.

---

# 53. CONTENT OBJECT RECOMMENDATION
# 53. 콘텐츠 객체 권장 구조

For bilingual text:

```js
const copy = {
  ko: {
    hero: {
      eyebrow: "TECHNOLOGY + EXPERIENCE",
      title: "인터랙티브 환경을 위한 기술",
      body: "사람과 시스템, 디지털과 실제 공간이 연결되는 환경을 만듭니다."
    }
  },
  en: {
    hero: {
      eyebrow: "TECHNOLOGY + EXPERIENCE",
      title: "Technology for Interactive Environments",
      body: "We build environments where people, digital systems, and physical spaces connect."
    }
  }
};
```

Either this object model or `data-ko/data-en` is acceptable.

Do not duplicate entire DOM trees for KR and EN.

---

# 54. CSS LANGUAGE-SPECIFIC TUNING
# 54. 언어별 CSS 조정

On `<html lang="ko">`:
Korean headline scale.

On `<html lang="en">`:
English headline scale.

Example:

```css
html[lang="ko"] .hero-title {
  font-size: clamp(52px,6.1vw,92px);
  line-height: 1.04;
}

html[lang="en"] .hero-title {
  font-size: clamp(64px,7.3vw,116px);
  line-height: .94;
}
```

This is required.

---

# 55. PROTOTYPE A ACCEPTANCE CHECKLIST
# 55. 프로토타입 A 승인 체크리스트

## A-01
Hero 첫 인상이 일반 AI / SaaS 템플릿처럼 보이지 않는다.

## A-02
`Technology + Experience`와 `Technology for Interactive Environments`가 5초 내 인식된다.

## A-03
KR Hero가 번역본처럼 보이지 않고 독립적으로 자연스럽다.

## A-04
EN Hero가 한국 기업소개서 영어처럼 보이지 않는다.

## A-05
Hero visual은 실제 프로젝트로 오인되지 않는다.

## A-06
Header가 과도한 glassmorphism toolbar처럼 보이지 않는다.

## A-07
Dark Hero → Light Evolution의 전환이 자연스럽다.

## A-08
Typography가 화면 품질을 주도한다.

## A-09
모션이 느리고 정밀하며 콘텐츠 읽기를 방해하지 않는다.

## A-10
Mobile에서 Hero copy와 image가 충돌하지 않는다.

---

# 56. PROTOTYPE B ACCEPTANCE CHECKLIST
# 56. 프로토타입 B 승인 체크리스트

## B-01
Capabilities가 일반적인 3개/4개 카드처럼 보이지 않는다.

## B-02
Intelligent → Digital → Experience로 scale이 커지는 느낌이 있다.

## B-03
Technology Integration이 네 번째 사업부처럼 보이지 않는다.

## B-04
실제 7 Cubic Evidence가 표현용 비주얼보다 우선한다.

## B-05
`RELEASED · 2022 / 출시 · 2022`가 명확하다.

## B-06
Project 설명이 이미지와 중복되지 않는다.

## B-07
Dark capability → Light project 전환이 페이지 리듬을 만든다.

## B-08
Mobile에서 sticky interaction이 단순한 stack으로 자연스럽게 변환된다.

## B-09
Signal Blue accent 사용량이 제한적이다.

## B-10
Prototype 전체가 Spectrascape 복제물이 아니라 Rebornsoft 자체 구조로 읽힌다.

---

# 57. AUTOMATIC REJECTION CONDITIONS
# 57. 자동 반려 조건

다음이 하나라도 발생하면 Prototype을 승인하지 않는다.

- purple/blue mesh gradient background
- AI brain / circuit-board hero
- glass cards
- large rounded SaaS cards
- 3 equal capability cards
- generic stock project images
- project status missing
- two languages displayed together
- custom gimmick cursor
- WebGL
- excessive parallax
- hero centered like a startup landing page
- tiny Korean type
- excessive CTA buttons
- Cityfield used as installed/completed without proof
- Noah's Ark imagery used in corporate hero without explicit approval
- religious symbolism in main corporate branding
- template-style pricing / feature UI patterns
- page looks like PowerPoint converted to web

---

# 58. CLAUDE OUTPUT REQUIREMENTS
# 58. Claude 산출 요구사항

Claude must return:

## 01
`prototype-v1.html`

## 02
Short `IMPLEMENTATION_NOTES.md`

Implementation notes must list:
- assets used
- placeholders used
- assumptions made
- any deviation from spec
- any unresolved issue

## 03
No full homepage.

Do not generate About / Contact / full Projects pages yet.

---

# 59. GPT REVIEW FORMAT
# 59. GPT 검수 형식

GPT will review Prototype using:

### ISSUE
문제

### EVIDENCE
화면에서 확인되는 근거

### ROOT CAUSE
원인

### REQUIRED CHANGE
필수 수정

### PRIORITY
P0 / P1 / P2

### PASS CONDITION
통과 기준

“더 고급스럽게”, “Spectrascape 느낌 더 내기” 같은 추상적 수정 지시는 사용하지 않는다.

---

# 60. PROTOTYPE VERSIONING
# 60. 프로토타입 버전 규칙

Initial:
`prototype-v0.1.html`

After GPT review:
`prototype-v0.2.html`

Approved visual baseline:
`prototype-v1.0-approved.html`

Do not overwrite previous versions.

---

# 61. BUILD GATE
# 61. 전체 Build 진입 조건

Full Build Specification can begin only if:

### Gate A
Prototype A passes at least 9/10 acceptance items.

### Gate B
Prototype B passes at least 9/10 acceptance items.

### Gate C
No P0 automatic rejection issue remains.

### Gate D
KR / EN parity approved.

### Gate E
At least one real project treatment is visually approved.

---

# 62. LOCKED PROTOTYPE DECISIONS
# 62. 프로토타입 고정안

## LOCK PR-01
Prototype A = Header + Hero + Evolution Intro.

## LOCK PR-02
Prototype B = Capability Sequence + Technology Integration + 7 Cubic Featured Project.

## LOCK PR-03
Full site implementation is prohibited before approval.

## LOCK PR-04
Pure HTML/CSS/JS baseline.

## LOCK PR-05
No WebGL.

## LOCK PR-06
KR is default language; KR/EN switch implemented in prototype.

## LOCK PR-07
Hero visual is T-E representational, not project proof.

## LOCK PR-08
7 Cubic uses actual product evidence where available.

## LOCK PR-09
Capabilities scale visually from human/sensing → digital environment → physical experience.

## LOCK PR-10
Technology Integration is a cross-layer, not a fourth card.

## LOCK PR-11
Dark Hero → Light H02 → Dark H03 → Light H04 rhythm is baseline.

## LOCK PR-12
Signal Blue is used only as controlled interaction accent.

## LOCK PR-13
Project status must be visible.

## LOCK PR-14
Mobile uses simplified stacked logic, not forced desktop sticky behavior.

## LOCK PR-15
Claude must report assumptions and placeholders.

---

# 63. COPY-PASTE CLAUDE EXECUTION PROMPT
# 63. Claude 실행용 프롬프트

아래 블록은 관련 Framework 파일들과 함께 Claude Project에 제공하는 실행 지시문으로 사용한다.

---

## KOREAN EXECUTION PROMPT

당신은 리본소프트 공식 홈페이지 프로젝트의 Implementation Lead / Front-end Engineer다.

첨부된 프로젝트 Framework 문서들을 최상위 사양으로 읽어라. 특히 `PROTOTYPE_SPECIFICATION_v1.0.md`의 지시가 현재 구현 단계의 직접 실행 명세다.

이번 작업에서는 전체 홈페이지를 만들지 마라.

다음 범위만 구현하라.

**Prototype A**
1. Fixed Navigation
2. KR / EN Language Switch
3. Hero
4. Hero Motion
5. H02 Evolution Intro
6. Dark → Light transition

**Prototype B**
7. H03 Capability Sequence
8. Intelligent Interaction → Digital Environments → Experience Systems transition
9. Technology Integration cross-layer
10. H04 7 Cubic Featured Project
11. Project status metadata
12. Mobile responsive behavior

기술 스택은 순수 HTML / CSS / JavaScript를 기준으로 한다. React, Vue, Next.js, WebGL을 사용하지 마라.

Spectrascape를 복제하지 마라. 이 프로젝트의 목표는 리본소프트 자체의 `Technology + Experience`, `Technology for Interactive Environments`, `Perception → Interaction → Environment → Experience` 구조를 구현하는 것이다.

다음은 금지한다.

- generic AI visual
- purple/blue mesh gradient
- glassmorphism
- giant rounded cards
- equal capability card grid
- custom cursor
- stock imagery를 실제 프로젝트처럼 사용
- KR/EN 동시 노출
- 프로젝트 Status 생략
- 프레임워크에 없는 회사 사실 생성
- 아직 검증되지 않은 프로젝트 완료 주장

필요한 실제 Asset이 없으면 임의의 인터넷 이미지를 다운로드하지 마라. `PLACEHOLDER`로 표시하고 `IMPLEMENTATION_NOTES.md`에 정확히 기록하라.

산출물:
1. `prototype-v0.1.html`
2. `IMPLEMENTATION_NOTES.md`

구현 후 전체 Build로 확장하지 말고 검수를 기다려라.

---

## ENGLISH EXECUTION PROMPT

You are the Implementation Lead and Front-end Engineer for the Rebornsoft corporate website.

Treat the attached framework documents as the governing specification for the project. `PROTOTYPE_SPECIFICATION_v1.0.md` is the direct implementation specification for this stage.

Do not build the full website.

Implement only:

**Prototype A**
1. Fixed navigation
2. KR / EN language switch
3. Hero
4. Hero motion
5. H02 Evolution Intro
6. Dark-to-light transition

**Prototype B**
7. H03 Capability Sequence
8. Intelligent Interaction → Digital Environments → Experience Systems transition
9. Technology Integration cross-layer
10. H04 7 Cubic Featured Project
11. Project-status metadata
12. Mobile responsive behavior

Use pure HTML, CSS, and JavaScript. Do not use React, Vue, Next.js, or WebGL.

Do not copy Spectrascape. The prototype must express Rebornsoft's own system: `Technology + Experience`, `Technology for Interactive Environments`, and `Perception → Interaction → Environment → Experience`.

Do not introduce:
- generic AI visuals
- purple/blue mesh gradients
- glassmorphism
- oversized rounded cards
- equal capability-card grids
- custom cursors
- stock imagery presented as project evidence
- simultaneous KR/EN copy
- missing project-status labels
- fabricated company facts
- unverified claims of project completion

If a required Rebornsoft asset is missing, do not download an unrelated image from the internet. Use an explicitly marked placeholder and document it in `IMPLEMENTATION_NOTES.md`.

Deliver:
1. `prototype-v0.1.html`
2. `IMPLEMENTATION_NOTES.md`

Stop after the prototype. Do not expand into the full site until review and approval.

---

# 64. NEXT GATE
# 64. 다음 단계

After this specification is approved:

### Step 1
Provide Claude with all current Framework documents.

### Step 2
Provide the best available P0 asset package.

### Step 3
Claude creates `prototype-v0.1.html`.

### Step 4
Open and capture Desktop + Mobile screens.

### Step 5
GPT reviews actual rendered result.

### Step 6
Revise until `prototype-v1.0-approved`.

### Step 7
Only then create:
**FULL BUILD SPECIFICATION v1.0**

---

# 65. BASELINE SUMMARY
# 65. 기준 요약

> **KR**
>
> 이번 Prototype의 목적은 홈페이지를 빨리 완성하는 것이 아니다.
> **리본소프트 사이트의 Hero, 타이포그래피, Dark/Light 리듬, Capability 전환, 실제 Project Evidence 표현이 우리가 설정한 브랜드 수준에 도달하는지를 가장 작은 구현 단위에서 검증하는 것**이다.
>
> Claude는 전략을 재해석하지 않고 구현하며, Asset이 없으면 임의의 외부 이미지로 채우지 않는다. Prototype A와 B가 승인된 이후에만 전체 페이지 구현으로 확장한다.

> **EN**
>
> The purpose of the prototype is not to finish the website quickly.
> It is to validate, at the smallest useful implementation scale, whether Rebornsoft's **hero, typography, dark/light rhythm, capability transitions, bilingual behavior, and real project evidence** reach the intended brand standard.
>
> Claude implements the approved system rather than redefining it. Missing assets remain placeholders rather than being replaced with unrelated external imagery. Full-site development begins only after Prototype A and B are approved.
