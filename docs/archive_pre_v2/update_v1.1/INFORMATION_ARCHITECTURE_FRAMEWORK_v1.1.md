# REBORN SOFT CORPORATE WEBSITE
## INFORMATION ARCHITECTURE FRAMEWORK v1.1
## 리본소프트 공식 홈페이지 정보구조 프레임워크 v1.1

**Project / 프로젝트:** Rebornsoft Corporate Website / 리본소프트 공식 기업 홈페이지  
**Document Type / 문서 유형:** Information Architecture Framework / 정보구조 설계 프레임워크  
**Supersedes / 대체 문서:** `INFORMATION_ARCHITECTURE_FRAMEWORK_v1.0.md`  
**Parent Documents / 상위 문서:** FOUNDATION_FRAMEWORK / SOURCE_LEDGER / COMPANY_DNA / POSITIONING_FRAMEWORK / CAPABILITY_FRAMEWORK / PROJECT_EVIDENCE_FRAMEWORK  
**Reference / 레퍼런스:** Spectrascape — quality and structural reference only  
**Language Policy / 언어 정책:** Korean + English developed in parallel / 한국어 + 영어 동시 설계  
**Status / 상태:** **LOCKED BASELINE v1.1**

---

# 0. VERSION 1.1 — WHAT CHANGED
# 0. v1.1 핵심 변경사항

v1.1은 기존 v1.0의 "Home 중심 Prototype IA"를 **정식 다중 페이지 Corporate Website IA**로 확장한다.

The website is no longer treated as a one-page scrolling presentation.

### Locked change
- **NO:** 하나의 긴 원페이지에서 메뉴 클릭 시 anchor scroll만 하는 구조
- **YES:** 각 1차 메뉴가 **별도의 롱폼 페이지**로 이동하는 구조
- 각 페이지는 해당 주제를 충분한 깊이로 설명한다.
- Home은 전체 사이트의 Executive Overview 역할을 한다.
- 핵심 Work만 선택적으로 Case Detail Page를 가질 수 있다.

---

# 1. MASTER SITE MODEL
# 1. 전체 사이트 모델

```text
HOME
│
├── COMPANY
│   └── long-form page
│
├── CAPABILITIES
│   └── long-form page
│
├── WORK
│   └── long-form page
│       ├── selected case detail (optional)
│       ├── selected case detail (optional)
│       └── selected case detail (optional)
│
└── CONTACT
    └── business entry page
```

### Public routes — working model

```text
/
 /company
 /capabilities
 /work
 /contact
```

Optional selected case routes:

```text
/work/yancheng-automotive-experience
/work/hongdae-vr
/work/fit-m
/work/hana-financial
/work/hyundai-media
```

Case Detail pages are selective.  
Not every project requires a separate detail page.

---

# 2. PRIMARY NAVIGATION
# 2. 1차 네비게이션

| KR | EN | Function |
|---|---|---|
| 회사소개 | COMPANY | Identity / History / Trust |
| 역량 | CAPABILITIES | Reusable Project Capabilities |
| 프로젝트 | WORK | Delivered Experience / Development / Current Work |
| 문의 | CONTACT | Business Conversion |
| KR / EN | KR / EN | Language |

### Home behavior
Desktop에서 HOME 텍스트 메뉴를 필수로 만들지 않는다.  
Logo / Wordmark 클릭으로 Home에 복귀한다.

### Label decision
영문 메인 메뉴는 **WORK**를 사용한다.

이유:
- 완료·수행 경험을 중심으로 회사의 실제 축적을 보여준다.
- 내부적으로 Status를 엄격히 관리하므로 `WORK`가 모든 항목을 완료작처럼 보이게 하지 않도록 페이지 구조에서 구분한다.
- Released / Contracted / In Progress / Development History는 Work 페이지 내부의 별도 Layer로 분리한다.

---

# 3. MASTER STORY LOGIC
# 3. 전체 스토리 논리

방문자가 사이트 전체에서 이해해야 하는 흐름:

```text
WHO WE ARE
Technology + Experience
        ↓
WHAT WE CAN DO
Intelligent Interaction
Digital Environments
Experience Systems
Technology Integration
        ↓
WHAT WE HAVE DONE
Delivered / Co-developed / Installed / Released / Contracted
        ↓
WHY WE ARE CREDIBLE
Enterprise execution
Physical implementation
Certification / Patents / R&D
        ↓
WHERE WE ARE GOING
Larger interactive and immersive experience projects
        ↓
START A CONVERSATION
```

---

# 4. HOME — EXECUTIVE OVERVIEW
# 4. HOME — 회사 전체 요약

Home은 모든 콘텐츠를 다 보여주는 페이지가 아니다.

It is an **executive overview** that lets a visitor understand Rebornsoft quickly and then choose a deeper page.

## H01 — HERO
### Purpose
3초 안에 회사 정체성을 전달한다.

**Category:** Technology + Experience  
**Descriptor:** Technology for Interactive Environments

Approved Hero visual direction and copy remain governed by the Hero / Content frameworks.

---

## H02 — EVOLUTION
### Working message
**KR:** 인식에서 경험으로.  
**EN:** From perception to experience.

### Narrative
```text
Perception
→ Interaction
→ Environment
→ Experience
```

회사의 여러 과거 사업을 하나의 진화 서사로 묶는다.

---

## H03 — CORE CAPABILITIES
Home에는 3 Core + 1 Cross 구조의 개요만 보여준다.

1. Intelligent Interaction / 지능형 인터랙션
2. Digital Environments / 디지털 환경
3. Experience Systems / 경험 시스템
4. Technology Integration / 기술 통합 — cross-layer only

### CTA
`VIEW CAPABILITIES →`

---

## H04 — SELECTED WORK
Home의 대표 Work는 **실제 수행·공급 경험 우선**으로 재구성한다.

### Primary candidates
1. Yancheng Automotive Theme Park — Delivered · 2022
2. Hongdae VR Experience Space — Delivered · 2022
3. FIT-M — Co-developed / Delivered · 2021–2022
4. Hana Bank Face Recognition Access System — Delivered · 2019

### Supporting candidate
5. Hyundai E&C Presentation Environment — Delivered · 2022

### Rule
- 7 Cubic을 Home의 대표 Work로 사용하지 않는다.
- Cityfield를 Completed Work처럼 사용하지 않는다.
- 강한 이미지를 가진 Physical Experience 사례를 우선한다.
- 이미지가 약한 Enterprise / Healthcare 사례는 editorial evidence treatment를 사용한다.

### CTA
`VIEW ALL WORK →`

---

## H05 — TECHNOLOGY PROOF
### Role
실제 기술 기반을 객관적 증거로 보여준다.

Candidate proof:
- Corporate R&D Center
- Venture Business Certification
- TCB T3 technology rating
- KISA AI HYPER VISION Ver1.0 performance certification
- AI / ICT patents
- AR-based motion / face recognition patent

### Design rule
대형 숫자 KPI 카드로 단순화하지 않는다.

---

## H06 — CURRENT DIRECTION
### Public-safe current direction

**KR working title:** 더 큰 경험을 설계하는 단계로.  
**EN working title:** Toward larger interactive experiences.

### Public-safe current project reference
**Large-Scale Immersive Cultural Experience**  
**대규모 몰입형 문화 경험 프로젝트**

Status:

`IN PROGRESS · 2025–2026`

### Public disclosure rule
Home에서는 다음을 공개하지 않는다.
- Noah's Ark / 노아의 방주
- Qingdao / 칭다오
- SCO
- religion / biblical narrative
- investment structure
- specific physical scale
- named Chinese partners

Home의 목적은:
> "리본소프트의 기술 적용 범위가 현재 더 큰 문화·공간형 경험 프로젝트로 확장되고 있다."

까지만 전달하는 것이다.

---

## H07 — COMPANY / CONTACT BRIDGE
회사에 대한 추가 신뢰 또는 협업 CTA.

### CTA examples
- `ABOUT REBORNSOFT →`
- `START A PROJECT CONVERSATION →`

---

# 5. COMPANY PAGE
# 5. COMPANY 페이지

`/company`

Company는 짧은 About 페이지가 아니라 회사의 정체성·진화·신뢰를 설명하는 롱폼 페이지다.

## C01 — COMPANY HERO
Who Rebornsoft is.

## C02 — COMPANY DEFINITION
Working corporate definition:

**KR**  
사람과 디지털 시스템, 실제 환경을 연결하는 기술을 개발하고 통합합니다.

**EN**  
We develop and integrate technologies that connect people, digital systems, and physical environments.

## C03 — OUR EVOLUTION
```text
2018–2019  PERCEPTION
2019–2021  INTERACTION
2021–2022  DIGITAL ENVIRONMENTS
2022–2024  PHYSICAL EXPERIENCES
2025–      LARGER EXPERIENCE SYSTEMS
```

연도 구간은 웹 카피 단계에서 시각적으로 조정 가능하나,
DNA sequence는 유지한다.

## C04 — HISTORY
2018–2026 상세 Timeline.

### History topics
- Foundation
- R&D Center
- Face / Vision
- Financial deployment
- Motion / Tracking
- KISA / Patents
- FIT-M
- WeWorld / Meta Campus / 7 Cubic
- Physical media / simulator projects
- Current large-scale experience direction

## C05 — TECHNOLOGY CREDIBILITY
- KISA
- Patents
- R&D Center
- Venture
- TCB T3

## C06 — CORPORATE FACTS
공개가 확정된 최신 정보만 사용.

Do not automatically publish:
- old address
- capital
- employee count
- revenue
unless reconfirmed.

## C07 — CURRENT DIRECTION
현재의 Experience / Integration 방향을 회사 진화의 다음 단계로 설명한다.

---

# 6. CAPABILITIES PAGE
# 6. CAPABILITIES 페이지

`/capabilities`

Capabilities는 제품 카탈로그가 아니다.

It explains **what Rebornsoft can contribute to a project today**.

---

## CAP00 — OVERVIEW

```text
Technology
→ Interaction
→ Environment
→ Experience
```

---

## CAP01 — INTELLIGENT INTERACTION
### Includes
- Computer Vision
- Face Recognition
- Motion Recognition
- Tracking
- Human-state / event detection
- Interactive software logic

### Evidence candidates
- Hana Bank
- AI HYPER VISION
- FIT-M
- patents

---

## CAP02 — DIGITAL ENVIRONMENTS
### Includes
- Virtual Environment
- Digital Twin
- Platform
- Remote Interaction
- 3D digital space

### Evidence candidates
- WeWorld
- Meta Campus
- 7 Cubic
- digital twin development history

### Important
7 Cubic is positioned here primarily as **development / productization evidence**, not as the company's flagship Work.

---

## CAP03 — EXPERIENCE SYSTEMS
### Includes
- VR / AR
- Simulator
- Large-format media
- Interactive content
- Physical–digital connection

### Evidence candidates
- Hongdae VR
- Hyundai E&C
- Yancheng Automotive Theme Park

---

## CAP04 — TECHNOLOGY INTEGRATION
Cross-capability layer.

### Includes
- project-specific system planning
- software integration
- content + media + interaction
- digital / physical connection
- current large-scale experience planning

### Rule
Technology Integration must not become a fourth equal card.

---

## CAP05 — RELATED WORK
관련 Work를 3~5개만 연결한다.

### CTA
`EXPLORE WORK →`

---

# 7. WORK PAGE
# 7. WORK 페이지

`/work`

WORK는 단순 Portfolio Grid가 아니다.

It is the page that demonstrates:
1. what Rebornsoft has actually delivered,
2. how its work has evolved,
3. what systems it has developed,
4. and where its current direction is heading.

---

## W01 — WORK HERO
### Working theme
**KR:** 기술이 실제 환경에서 작동한 경험.  
**EN:** Technology applied in real environments.

---

## W02 — CURRENT WORK
가장 최신의 전략적 방향을 페이지 초반에 둔다.

### Public-facing project
**대규모 몰입형 문화 경험 프로젝트**  
**Large-Scale Immersive Cultural Experience**

`IN PROGRESS · 2025–2026`

### Communication role
- Completed Case가 아님을 명확히 한다.
- 현재 회사가 더 큰 경험 단위로 확장되고 있음을 보여준다.
- 상세 프로젝트 정체성은 공개하지 않는다.

### Public prohibition
Do not expose:
Noah's Ark / Qingdao / SCO / religion / investment / specific project scale / named partners.

---

## W03 — SELECTED PROJECT EXPERIENCE
실제 수행·공급 경험의 중심 Layer.

Recommended order:

### 01 Yancheng Automotive Theme Park
`DELIVERED · 2022`
Role:
Curved-screen display implementation + content production, including racing simulation content.

Primary proof:
Physical Experience + International + Content Production.

### 02 Hongdae VR Experience Space
`DELIVERED · 2022`
Role:
Curved-screen visual implementation for a VR experience space.

### 03 Hyundai E&C Presentation Environment
`DELIVERED · 2022`
Role:
Curved-screen display implementation for the Banpo redevelopment contractor-selection presentation environment.

### 04 FIT-M
`CO-DEVELOPED / DELIVERED · 2021–2022`
Role:
Phase-1 co-development of an AI-based stroke rehabilitation service with Ajou University Medical Center / related research collaboration.

### 05 Hana Bank Face Recognition Access System
`DELIVERED · 2019`
Role:
Rebornsoft-developed facial-recognition access-security solution delivery.

### Display hierarchy
Do not make all five equal cards.

Recommended:
- Yancheng = primary visual case
- Hongdae = visual case
- Hyundai = medium supporting physical case
- FIT-M = technology / healthcare editorial case
- Hana = enterprise technology proof case

---

## W04 — FROM TECHNOLOGY TO EXPERIENCE
Work 중간의 Narrative Bridge.

```text
Recognition
→ Motion / Tracking
→ Digital Environment
→ Physical Media / Simulation
→ Integrated Experience
```

목적:
프로젝트 목록이 서로 무관한 이력처럼 보이지 않도록 한다.

---

## W05 — SYSTEMS & DEVELOPMENT
대표 성공 사례가 아니라 회사가 실제 개발해온 기술·서비스 축적을 보여준다.

### Intelligent Technology
- Reborn Face 3D
- Reborn Face 2D
- AI Reborn Vision
- AI Reborn Motion
- AI Reborn Tracking
- AI Unmanned Service
- AI HYPER VISION

### Digital Environment Development
- WeWorld — Beta
- Meta Campus — CBT / Beta
- 7 Cubic — Developed → CBT → Released
- avatars
- digital twin development / commercialization concepts

### 7 Cubic priority
7 Cubic = **Development / Productization History**.

Do not use it as the first or dominant Work item.

---

## W06 — SELECTED ENGAGEMENTS / DEVELOPMENT HISTORY
작게 처리하는 Chronology / Metadata Layer.

Candidates:
- Vflex Theme Park mobile face-recognition contract — Contracted · 2020
- Busan Port-related digital twin commercialization MOU — MOU · 2021
- GOM & Company metaverse MOU / commercialization MOU — 2022
- M-Star Korea AI safe-care program usage contract — Contracted · 2022
- Soonsoo Education education metaverse MOU — 2022
- Hannune Doctor technology supply contract — Contracted · 2022
- Cityfield Theme Park — Contracted · 2022
- Real-estate asset management platform — status to verify / development history
- 2024 City Theme Park — status / relation to Cityfield to verify

### Cityfield rule
`CONTRACTED · 2022`

Never imply installation or completion.

Contract value is not published by default.

---

## W07 — TECHNOLOGY PROOF
Work의 마지막 신뢰 장치.

- KISA certification
- patents
- R&D Center
- Venture Certification
- TCB T3

---

## W08 — NEXT / CONTACT
### Working direction
**Building the next interactive environment.**

CTA to Contact.

---

# 8. WORK DETAIL PAGE MODEL
# 8. WORK 상세 페이지 모델

Only projects with enough evidence and content receive a detail page.

## Required sections

### D01 — PROJECT HERO
- Project
- Year
- Status
- Sector
- Rebornsoft Role

### D02 — CONTEXT
Why the project existed — factual scope only.

### D03 — WHAT REBORNSOFT DID
Exact delivery / implementation scope.

### D04 — SYSTEM / TECHNOLOGY
Applied technology and media.

### D05 — EXPERIENCE / RESULT
What the environment or service enabled.
Do not invent unverified outcomes.

### D06 — EVIDENCE
Actual photo / UI / contract / certification / release archive.

### D07 — RELATED CAPABILITIES
Capability mapping.

### D08 — NEXT WORK
Related case navigation.

---

# 9. CONTACT PAGE
# 9. CONTACT 페이지

`/contact`

Contact is a business entry point, not merely an address page.

## CT01 — CONTACT HERO
Start a project conversation.

## CT02 — INQUIRY TYPES
- General Business
- Project Collaboration
- Technology Partnership
- Content / Experience Collaboration

## CT03 — CONTACT INFORMATION
Only current verified information.

## CT04 — COMPANY PROFILE
Optional future download.

---

# 10. LANGUAGE UX
# 10. 언어 UX

- KR / EN one language at a time
- identical information architecture
- native writing in both languages
- no simultaneous full bilingual duplication
- language preference should persist in production

---

# 11. DEPTH RULE
# 11. 사이트 Depth 규칙

### Standard navigation depth
```text
Level 1: Global Nav
Level 2: Long-form page
```

### Selective case depth
```text
Level 1: WORK
Level 2: Work Index
Level 3: Selected Case Detail
```

Case Detail is allowed because it is evidence content, not additional navigation complexity.

---

# 12. VISUAL / CONTENT DENSITY RULE
# 12. 페이지 밀도 규칙

각 메뉴 페이지는 충분한 depth를 가져야 하지만
정보를 작은 카드로 과도하게 쪼개지 않는다.

Prefer:
- large sections
- editorial sequencing
- strong imagery
- evidence-driven modules
- long-form rhythm

Avoid:
- SaaS dashboard density
- dozens of equal cards
- giant walls of chronology
- repetitive section templates

---

# 13. LOCKED IA DECISIONS
# 13. IA 고정안

## LOCK IA-11-01
The website is **not a one-page anchor-scroll site**.

## LOCK IA-11-02
Primary architecture:
**HOME / COMPANY / CAPABILITIES / WORK / CONTACT**

## LOCK IA-11-03
Each primary menu opens a **separate long-form page**.

## LOCK IA-11-04
Home is an Executive Overview, not the full website.

## LOCK IA-11-05
WORK is a deep evidence page, not a single-feature project section.

## LOCK IA-11-06
Selected projects may have Case Detail pages.

## LOCK IA-11-07
7 Cubic is not the flagship Work item.

## LOCK IA-11-08
Current 2025–2026 large-scale project is shown publicly only as:
**Large-Scale Immersive Cultural Experience / 대규모 몰입형 문화 경험 프로젝트**
with status `IN PROGRESS`.

## LOCK IA-11-09
The specific identity of the current Noah's Ark project is not disclosed on the public corporate site at this stage.

## LOCK IA-11-10
Company facts, status, and evidence remain governed by Project / Evidence rules.

---

# 14. IMPLEMENTATION IMPACT
# 14. 구현 영향

The existing v0.1 prototype is **not discarded**.

It becomes a visual-language baseline for:
- Hero
- Evolution
- Capability interaction
- dark/light rhythm
- typography
- motion

But its site scope is obsolete.

### v0.2 must expand from:
```text
Hero → Evolution → Capabilities → One 7 Cubic Project
```

to an architecture compatible with:
```text
Home
Company
Capabilities
Work
Contact
+ selected Work detail pages
```

---

# 15. NEXT EXECUTION GATE
# 15. 다음 실행 단계

1. Update Project / Evidence Framework to v1.1
2. Keep current visual prototype as design baseline
3. Create a v0.2 multi-page implementation specification
4. Expand Home and build page shells
5. Implement WORK first among secondary pages
6. Review content / evidence / mobile
7. Build the remaining pages

