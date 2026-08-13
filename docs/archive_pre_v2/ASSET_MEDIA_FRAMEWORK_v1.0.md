# REBORN SOFT CORPORATE WEBSITE
## ASSET & MEDIA FRAMEWORK v1.0
## 리본소프트 공식 홈페이지 에셋·미디어 프레임워크 v1.0

**Project / 프로젝트:** Rebornsoft Corporate Website / 리본소프트 공식 기업 홈페이지  
**Document Type / 문서 유형:** Asset Inventory + Media Governance / 에셋 인벤토리 + 미디어 운영 규정  
**Parent Documents / 상위 문서:** FOUNDATION_FRAMEWORK_v1.0 / SOURCE_LEDGER_v1.0 / COMPANY_DNA_v1.0 / POSITIONING_FRAMEWORK_v1.0 / INFORMATION_ARCHITECTURE_FRAMEWORK_v1.0 / CAPABILITY_FRAMEWORK_v1.0 / PROJECT_EVIDENCE_FRAMEWORK_v1.0 / CONTENT_FRAMEWORK_v1.0 / VISUAL_DIRECTION_FRAMEWORK_v1.0  
**Language Policy / 언어 정책:** Korean + English developed in parallel / 한국어 + 영어 동시 설계  
**Source Boundary / 자료 경계:** User-provided Rebornsoft materials + approved reference principles only / 사용자가 제공한 리본소프트 자료와 승인된 레퍼런스 원칙만 사용  
**Status / 상태:** Recommended Baseline v1.0 / 권고 기준안 v1.0

---

# 0. PURPOSE
# 0. 문서 목적

이 문서는 실제 웹사이트 구현에 사용할 **이미지, UI, 프로젝트 사진, 인증·특허, 계약 문서, 로고, 컨셉 비주얼**을 하나의 시스템으로 관리한다.

This document governs every visual asset used in the website: **brand files, project photography, product UI, technical proof, documentary evidence, concept visuals, and representational imagery.**

목표는 세 가지다.

1. 실제 프로젝트와 표현용 이미지를 명확하게 분리한다.
2. 현재 보유 자료와 반드시 새로 확보해야 할 자료를 구분한다.
3. Claude가 구현 단계에서 임의의 Stock / Web / AI 이미지를 실적처럼 사용하지 못하도록 한다.

---

# 1. ASSET TRUTH CLASSES
# 1. 에셋 진실성 등급

모든 시각자료는 아래 Truth Class 중 하나를 가져야 한다.

## T-A — ACTUAL PROJECT
## T-A — 실제 프로젝트

실제 현장, 설치, 행사, 구축 결과를 촬영한 이미지.

Examples:
- VR 카페 실제 공간
- 자동차 테마파크 시뮬레이터 현장
- 실제 대형 스크린 설치
- 실제 장비

### Use
가장 높은 우선순위의 Project Evidence.

---

## T-B — ACTUAL PRODUCT / UI
## T-B — 실제 제품·UI

리본소프트가 개발한 서비스 또는 시스템의 실제 화면.

Examples:
- 7 Cubic
- WeWorld
- AI HYPER VISION / 행동인식 화면
- Meta Campus

### Use
Digital Environment / Intelligent Interaction의 핵심 Evidence.

---

## T-C — DOCUMENTARY EVIDENCE
## T-C — 문서 증거

계약서, 인증서, 특허, 등록증 등.

### Use
Trust / Proof / Project detail.

### Rule
Hero 또는 대형 프로젝트 배경으로 쓰지 않는다.

---

## T-D — APPROVED CONCEPT
## T-D — 승인된 컨셉

실제로 기획 중인 프로젝트의 공식 Concept / Planning Visual.

### Use
`PLANNING`, `IN PROGRESS`, `CONCEPT` 상태에서만 사용.

### Rule
완료된 프로젝트 사진처럼 표현 금지.

---

## T-E — REPRESENTATIONAL BRAND VISUAL
## T-E — 브랜드 표현용 비주얼

리본소프트의 Positioning과 Capability를 표현하기 위해 새로 제작하는 비실적 이미지.

### Use
Hero, capability transition, abstract brand moment.

### Rule
특정 고객·프로젝트의 실제 구축 결과라고 암시하지 않는다.

---

# 2. ASSET QUALITY GRADES
# 2. 에셋 품질 등급

## Q1 — PRODUCTION READY
- 원본 고해상도
- 저작권 / 공개범위 명확
- 충분한 crop 가능
- 최종 홈페이지 즉시 사용 가능

## Q2 — USABLE WITH PROCESSING
- 실제 원본이지만 색보정·crop·노이즈 정리 필요
- 또는 충분한 해상도의 UI capture

## Q3 — REFERENCE / PROTOTYPE ONLY
- PDF 안에 삽입된 이미지
- 저해상도 캡처
- 오래된 PPT screenshot
- 원본 미확보

최종 사이트보다는 Prototype 및 원본 탐색 기준으로 사용.

## Q4 — MISSING
- 사실은 있으나 시각자료 미확보
- 반드시 요청 / 제작 / 확인 필요

---

# 3. CRITICAL SOURCE RULE
# 3. 핵심 소스 규칙

현재 IR PDF 안에는 여러 실제 프로젝트·UI·인증 이미지가 존재한다.

그러나 **PDF에서 캡처한 이미지는 원칙적으로 원본 에셋이 아니다.**

### Therefore / 따라서

- PDF page image = **Reference locator**
- Original JPG / PNG / MP4 / SVG = **Production asset**

최종 사이트 제작 전 가능하면 원본 파일을 확보한다.

### Exception
계약서·인증서·특허처럼 문서 자체가 Evidence인 경우 PDF / scan 원본을 직접 활용할 수 있다.

---

# 4. CURRENT ASSET INVENTORY — BRAND
# 4. 현재 에셋 인벤토리 — 브랜드

## BR-01 — Rebornsoft Logo
## BR-01 — 리본소프트 로고

**Current source / 현재 소스:**  
Rebornsoft IR introduction PDF, cover and corporate slides.

**Truth Class:** Brand  
**Current Quality:** Q3  
**Observed form:** red Rebornsoft mark / raster embedded in PDF

### Use
- Header
- Footer
- Favicon source
- Open Graph branding
- Contact

### Required
**Q1 original required**

Priority formats:
1. SVG
2. AI / EPS
3. transparent PNG at 2000px+ width

### Need variants
- Primary red
- White
- Black / monochrome
- Symbol only if officially available

### Rule
PDF에서 로고를 억지로 잘라 최종 사용하지 않는다.

---

# 5. HERO ASSET
# 5. Hero 에셋

## HERO-01 — Cinematic Interactive Environment
## HERO-01 — 인터랙티브 환경 브랜드 비주얼

**Truth Class:** T-E Representational  
**Current Quality:** Q4 — not yet created  
**Priority:** P0 / Critical for Prototype A

### Purpose
다음 Positioning을 시각화:

**Technology for Interactive Environments**

### Required visual idea
- 인간 scale이 느껴지는 실제적 공간
- physical architecture + digital layer
- subtle sensing / interaction
- media / light / software의 힌트
- premium architectural photography feel
- dark technical editorial tone
- 충분한 negative space
- 특정 실제 프로젝트처럼 보이지 않음

### Content boundary
이미지는 반드시 다음 회사 DNA에서만 파생한다.

- Intelligent Interaction
- Digital Environments
- Experience Systems
- Technology Integration

### Prohibited
- 외부 회사 프로젝트 모방
- 임의 Stock image
- 종교적 상징
- Noah’s Ark visual unless separately approved for this corporate site
- 거대한 AI brain
- neon cyberpunk city
- text inside image
- company logos embedded in the visual

---

# 6. HERO DELIVERABLE SPEC
# 6. Hero 산출 규격

Final asset set:

### Desktop Master
`3840 × 2160` minimum  
Recommended ratio: `16:9`

### Wide Crop
`3200 × 1800` or wider crop-safe source

### Mobile Master
`1440 × 1920` minimum  
Recommended ratio: `3:4` or `4:5`

### Optional video
6–10 sec seamless loop  
1080p minimum  
No audio  
H.264 / WebM optimized

### Safe zones
- Desktop: left 42–48% can support copy
- Mobile: upper/middle image should avoid critical subject; copy occupies lower third

---

# 7. DIGITAL ENVIRONMENT ASSETS
# 7. 디지털 환경 에셋

## DE-01 — WeWorld Internal Images
## DE-01 — WeWorld 내부 이미지

**Current source:** Rebornsoft IR, page 21  
**Available in source:** 4 internal virtual-environment images  
**Truth Class:** T-B Actual Product / UI  
**Current Quality:** Q3  
**Website role:** History / Digital Environments supporting evidence

### Current assessment
IR에는 강의실·캠퍼스·가상공간 화면이 확인된다.

### Required action
원본 screenshot / render 확보.

### Preferred production set
- 1 wide campus environment
- 1 auditorium / classroom
- 1 architectural interior
- 1 interaction UI or avatar scene

### Priority
P2

---

## DE-02 — 7 Cubic Internal Images
## DE-02 — 7 Cubic 내부 이미지

**Current source:** Rebornsoft IR, page 23  
**Available in source:** 4 internal virtual-space images  
**Truth Class:** T-B Actual Product / UI  
**Current Quality:** Q3  
**Project Status:** RELEASED · 2022  
**Website role:** **Featured Project / Digital Environments**

### Current assessment
페이지 내 실제 3D 공간 화면이 존재해 프로젝트의 시각적 근거는 이미 확인된다.

### Critical limitation
현재 확인 가능한 것은 PDF 안에 삽입된 과거 화면이며, 홈페이지 대형 Project Visual로 사용하기에는 원본 해상도가 필요하다.

### Required asset pack — P0
- `7CUBIC_hero_01` — 가장 인상적인 가상공간 wide render
- `7CUBIC_space_02` — 실내 공간
- `7CUBIC_avatar_03` — 사용자 / avatar interaction
- `7CUBIC_detail_04` — UI / 기능 detail
- optional short screen recording / video

### Minimum resolution
Still:
`2560px` longest edge minimum

### Mobile crop
중앙 subject가 유지되는 4:5 crop 가능해야 함.

---

# 8. INTELLIGENT INTERACTION ASSETS
# 8. 지능형 인터랙션 에셋

## II-01 — AI HYPER VISION / Safe AI UI
## II-01 — AI HYPER VISION / 행동인식 화면

**Current source:** Rebornsoft IR pages 26–30  
**Available source visuals:**
- system capability diagram
- privacy filter UI
- area-out detection UI
- area-stay detection UI
- fall detection UI
- multiple-person detection UI
- fire / heat recognition example

**Truth Class:** T-B Actual Product / UI  
**Current Quality:** Q3  
**Website role:** Intelligent Interaction / technology foundation

### Current assessment
과거 UI의 디자인 자체는 현재 기준으로 오래되어 보일 수 있으나 **실제 기술 Evidence**로는 가치가 높다.

### Visual strategy
전체 화면을 크게 예쁘게 보여주려 하기보다:

- UI detail crop
- detection overlay
- bounding area
- thermal / visual contrast
- small documentary labels

로 사용.

### Required action
가능하면 원본 screenshot 확보.

### Do not
현재 판매되는 최신 SaaS 제품처럼 재디자인해서 “현재 UI”인 것처럼 보여주지 않는다.

---

# 9. PHYSICAL EXPERIENCE ASSETS — HONGDAE
# 9. 실제 공간 에셋 — 홍대 VR 카페

## PX-01 — Hongdae VR Cafe
## PX-01 — 홍대 VR 카페

**Current source:** Rebornsoft IR page 38  
**Current source contains:** VR cafe / VR simulator photographs  
**Truth Class:** T-A Actual Project  
**Current Quality:** Q3 in PDF; original quality unknown  
**Project Status:** INSTALLED · 2022  
**Known scope:** 45평 / VR 시뮬레이터 12대  
**Website role:** Featured Project candidate / Experience Systems

### Current assessment
IR page 38에서 실제 VR 장비·공간 사진이 확인된다. 따라서 프로젝트를 시각적으로 뒷받침할 **실제 이미지 자체는 존재했던 것으로 판단**한다.

### Required asset pack — P0
- full space wide shot
- simulator row / installation
- visitor or device usage shot
- detail shot of hardware / experience

### Preferred
3–6 original photos.

### Minimum
- hero candidate: 3000px+ width
- supporting: 1800px+ width

### If originals cannot be found
PDF crop은 Prototype placeholder로만 사용.

Final website에서는:
- Feature 규모를 축소하거나
- 다른 Q1/Q2 project로 교체.

### Prohibited
외부 VR arcade stock image로 대체.

---

# 10. PHYSICAL EXPERIENCE ASSETS — HYUNDAI E&C
# 10. 실제 공간 에셋 — 현대건설 관련 행사

## PX-02 — Large Screen Event
## PX-02 — 대형 스크린 행사

**Current source:** Rebornsoft IR page 38  
**Current source contains:** event / presentation photographs  
**Truth Class:** T-A Actual Project / participation evidence  
**Current Quality:** Q3  
**Website role:** Supporting Experience Systems evidence  
**Priority:** P2

### Required before public use
- 리본소프트의 정확한 역할
- 공개 가능한 원본사진
- 고객명 공개 여부

### Use
Project detail or supporting media montage.

### Do not
리본소프트가 전체 행사 또는 현대건설 프로젝트 전체를 수행한 것처럼 편집하지 않는다.

---

# 11. INTERNATIONAL EXPERIENCE ASSETS — YANCHENG
# 11. 해외 Experience 에셋 — 옌청

## PX-03 — Yancheng Automotive Theme Park Simulator
## PX-03 — 중국 옌청 자동차 테마파크 시뮬레이터

**Current source:** Rebornsoft IR page 39  
**Current source contains:**
- exterior / site image
- VR simulator installation photograph
- simulator screen / driving simulation image

**Truth Class:** T-A Actual Project  
**Current Quality:** Q3 in PDF  
**Project Status:** INSTALLED · 2022  
**Website role:** Featured Project candidate / Experience Systems / Overseas  
**Priority:** P0

### Important update from current archive review
현재 IR page 39에 실제 프로젝트 이미지가 존재하므로 “이미지 존재 여부”는 더 이상 완전한 미확인이 아니다.

However, **production-quality originals are still missing.**

### Required
- original simulator installation photo
- original exterior/site photo if company has rights to use it
- original simulation screen
- official Korean project title
- official English project title / city spelling
- Rebornsoft's exact supply scope

### Recommended title placeholder
KR:
`중국 옌청 자동차 테마파크 시뮬레이터`

EN:
`Automotive Theme Park Simulator, Yancheng`

Final English naming remains TBD.

---

# 12. CITYFIELD ASSETS
# 12. 시티필드 에셋

## CF-01 — Cityfield Supply & Installation Contract
## CF-01 — 시티필드 공급·설치 계약서

**Current source:** Cityfield supply & installation contract PDF, 6 pages  
**Truth Class:** T-C Documentary Evidence  
**Current Quality:** Q1 as documentary proof  
**Project Status:** CONTRACTED · 2022  
**Website role:** Technology Integration proof / Project detail  
**Priority:** P0

### Source confirms
- Cityfield theme park contract
- digital city / metaverse digital twin scope
- VR / AR / simulator scope
- supply & installation contract
- contract value exists in source, but default publication policy is NO

### Website usage
Use:
- cropped contract title
- project name
- selected scope detail
- signature / stamp only if legally/publicly appropriate
- subtle documentary layer

### Privacy / legal processing
Before public use:
- redact personal phone numbers
- redact private addresses if unnecessary
- redact bank / corporate confidential fields
- decide whether signatures / seals should be visible
- do not publish contract value unless explicitly approved

### Do not
계약서를 Project Hero image로 사용.

---

## CF-02 — Cityfield Implementation Photography
## CF-02 — 시티필드 실제 수행 이미지

**Current Quality:** Q4 / not confirmed in current uploaded sources  
**Priority:** P0

### Required clarification
- 실제 납품/설치 완료 여부
- 현장 사진 존재 여부
- 검수 / completion evidence

### Until confirmed
Cityfield project remains:
**CONTRACTED**

---

# 13. TRUST ASSETS
# 13. 신뢰성 에셋

## TR-01 — KISA Performance Certification
## TR-01 — KISA 성능인증

**Current source:** Rebornsoft IR technology-certification section; earlier company profile also includes certificate imagery  
**Truth Class:** T-C Documentary  
**Current Quality:** Q3 embedded scan / source original desired  
**Status:** CERTIFIED  
**Priority:** P1

### Required
Original certificate scan / PDF if available.

### Website usage
- Trust section
- Intelligent Interaction proof
- Company → Certifications & IP

### Treatment
Do not show entire A4 scan at tiny size.
Use:
- certificate name
- agency
- year
- cropped document detail

---

## TR-02 — AI & ICT Patents
## TR-02 — AI·ICT 특허

**Current source:** Rebornsoft IR pages 55–58 contain patent certificate images; pages 50–54 also contain other certification / registration documents  
**Truth Class:** T-C Documentary  
**Current Quality:** Q3 in IR  
**Priority:** P1

### Required
Original individual patent PDFs / JPGs.

### Asset package
- Patent master list
- Patent name KR
- Patent name EN or approved English rendering
- Registration number
- Registration year
- document image

### Website visual
Use 2–4 representative patents, not seven tiny documents in a grid.

---

## TR-03 — T3 Technology Rating
## TR-03 — T3 기업기술등급

**Current source:** history + certification materials in archive  
**Truth Class:** T-C  
**Current Quality:** Q3 / original needed  
**Priority:** P1

---

## TR-04 — Corporate R&D Center
## TR-04 — 기업부설연구소

**Current source:** history only in current reviewed assets  
**Current Quality:** Q4 document original  
**Priority:** P2

---

## TR-05 — Venture Certification
## TR-05 — 벤처기업 인증

**Current source:** history / archive  
**Current Quality:** Q4 document original  
**Priority:** P2

---

# 14. DIGITAL TWIN / CONCEPT ARCHIVE
# 14. 디지털트윈·컨셉 아카이브

## DT-01 — Company Digital Twin Example
## DT-01 — 회사 디지털트윈 예시

**Current source:** Rebornsoft IR page 12  
**Source wording:** company digital twin / metaverse example materials  
**Truth Class:** T-B or internal project example, but exact project status should remain cautious  
**Current Quality:** Q3  
**Priority:** P2

### Use
Digital Environments capability support.

### Required
원본 3D renders / screenshots가 있으면 확보.

---

## DT-02 — Shopping / Real Estate Concept
## DT-02 — 쇼핑몰·부동산 컨셉

**Current source:** IR pages 14–19  
**Truth Class:** mixed T-D concept + third-party example material  
**Current Quality:** Q3

### Critical rule
이 페이지 묶음에는 자사 개념 이미지뿐 아니라 **타사 메타버스 쇼핑 이용 예시**가 포함되어 있다.

따라서 전체를 리본소프트 Project Asset으로 사용하면 안 된다.

### Website use
- only clearly owned / company-created visuals
- only after asset ownership is identified
- never use third-party examples as company proof

### Priority
P3

---

# 15. CURRENT DIRECTION ASSETS
# 15. 현재 방향 에셋

## CD-01 — 2025–2026 Global Theme Park Planning
## CD-01 — 2025–2026 글로벌 테마파크 기획

**Truth Class:** T-D Planned / In Progress  
**Current Quality:** Q4 in the current corporate source set  
**Priority:** P1

### Required
확인 가능한 범위에서:
- approved concept render
- planning diagram
- software / content planning visual
- spatial storyboard
- project scope diagram

### Mandatory metadata
`PLANNING` or `IN PROGRESS`

### Do not
- generate a fake completed park photograph and present it as work
- expose client / location without approval
- use religious content as the company's corporate identity

---

# 16. LOGO / TEXT INSIDE IMAGE RULE
# 16. 이미지 내부 텍스트 규칙

## Representational / generated assets
이미지 내부 텍스트 금지.

No:
- headline
- Korean words
- English labels
- fake UI text
- Rebornsoft logo rendered by AI

Text must remain HTML.

## Actual product UI
원래 서비스 화면 속 텍스트는 허용.

## Documents
원본 문서 텍스트는 Evidence이므로 허용.

---

# 17. NO EXTERNAL STOCK BY DEFAULT
# 17. 외부 Stock 기본 미사용

본 프로젝트는 사용자가 제공한 자료와 회사 사실을 기반으로 구현한다.

따라서 Claude는 이미지가 부족하다고 해서 외부 Stock / 검색 이미지 / 다른 회사 프로젝트 사진을 임의로 사용하지 않는다.

### Default hierarchy

1. Original Rebornsoft asset
2. Actual Rebornsoft archive asset
3. Approved documentary evidence
4. Approved concept asset
5. New representational visual based only on approved company DNA
6. CSS / typography / motion solution

External stock is **not** part of the default asset strategy.

---

# 18. PDF EMBEDDED IMAGE POLICY
# 18. PDF 내 이미지 운영 규칙

현재 PDF에 있는 과거 이미지들은 두 가지 역할을 가진다.

### Role A — Evidence of existence
어떤 원본자료를 찾아야 하는지 알려주는 Locator.

### Role B — Prototype placeholder
원본을 확보하기 전에 Prototype layout을 테스트.

### Not intended
Final high-impact visual unless extracted quality is exceptionally sufficient and publication rights are clear.

---

# 19. IMAGE PROCESSING RULES
# 19. 이미지 후처리 규칙

실제 프로젝트 이미지는 지나치게 새것처럼 “재창조”하지 않는다.

Allowed:
- crop
- exposure correction
- color balance
- perspective correction
- mild noise reduction
- confidential information masking
- resolution enhancement without changing factual content

Not allowed:
- adding visitors that were not there
- replacing equipment
- changing architectural scale
- adding large LED screens
- turning a small installation into a larger project
- AI-generating missing parts in a way that changes the evidence

### Principle
**Enhance the image, not the history.**

---

# 20. PROJECT CROP SPEC
# 20. 프로젝트 Crop 규격

For every Featured Project, prepare:

### Desktop Wide
`2400 × 1500` minimum  
Ratio: `16:10`

### Desktop Cinema
`2560 × 1440`  
Ratio: `16:9`

### Mobile Portrait
`1600 × 2000`  
Ratio: `4:5`

### Thumbnail
`1200 × 900`  
Ratio: `4:3`

### Rule
원본 하나를 CSS `object-fit`으로 모든 화면에서 무리하게 잘라 쓰지 않는다.

Key images should have pre-approved desktop and mobile crops.

---

# 21. UI CAPTURE SPEC
# 21. UI 캡처 규격

### Preferred
Native screenshot at 2x resolution.

Minimum:
`1920 × 1080`

### Browser / OS chrome
가능하면 제거.

### Sensitive data
Mask before export.

### Treatment
- no fake device mockup required
- direct UI crops preferred
- 1px soft frame optional
- actual aspect ratio preserved when meaningful

---

# 22. VIDEO SPEC
# 22. 영상 규격

If original product / project footage exists:

### Project video
- 1080p minimum
- 4K preferred
- 6–20 sec short sequences
- no presentation music required
- subtitles should be HTML where possible

### Hero loop
- 6–10 sec
- seamless
- no audio
- compressed target: ideally under ~8–12 MB depending on final implementation
- poster image required

### Do not
Autoplay long corporate promo film in hero.

---

# 23. DOCUMENT EVIDENCE SPEC
# 23. 문서 증거 규격

Contract / patent / certificate:

### Master
PDF or scan at 200–300dpi minimum.

### Web derivative
- 1600–2400px crop
- grayscale / neutral treatment allowed
- private information redacted
- accessible caption

### Storage
Original evidence is kept separate from public derivative.

Example:
`/source-private/cityfield_contract_original.pdf`
`/public/assets/trust/cityfield_contract_crop.webp`

---

# 24. ASSET OWNERSHIP STATUS
# 24. 에셋 소유·사용권 상태

모든 Asset에는 아래 필드를 둔다.

- `ownership = company / partner / third-party / unknown`
- `publication = approved / selective / internal / unknown`
- `truth_class`
- `status`
- `source`

### Non-negotiable
`ownership = unknown`인 이미지는 최종 Public Website에 자동 사용하지 않는다.

---

# 25. ASSET MANIFEST FIELDS
# 25. 에셋 매니페스트 필드

향후 실제 파일을 수집할 때 다음 표준 필드를 사용한다.

| Field | Meaning |
|---|---|
| asset_id | 고유 ID |
| title_kr | 국문명 |
| title_en | 영문명 |
| category | brand / hero / project / product / trust / concept |
| project | 관련 프로젝트 |
| year | 연도 |
| truth_class | T-A ~ T-E |
| quality | Q1 ~ Q4 |
| status | Released / Installed / Contracted etc. |
| ownership | company / partner / third-party / unknown |
| publication | approved / selective / internal / unknown |
| source_file | 원본 출처 |
| source_page | PDF page if applicable |
| desktop_crop | yes/no |
| mobile_crop | yes/no |
| alt_kr | 국문 alt |
| alt_en | 영문 alt |
| notes | 추가사항 |

---

# 26. FILE NAMING STANDARD
# 26. 파일명 표준

Use lowercase English file names.

Pattern:

`[category]_[project]_[subject]_[sequence]_[ratio].[ext]`

Examples:

`project_7cubic_virtual-space_01_16x10.webp`  
`project_7cubic_virtual-space_01_4x5.webp`  
`project_yancheng_simulator_01_16x9.webp`  
`trust_kisa_certificate_detail_01_4x5.webp`  
`brand_rebornsoft_logo_white.svg`  
`hero_interactive-environment_01_16x9.webp`

### Avoid
- Korean file names in production assets
- spaces
- `final_final2.jpg`
- unclear names such as `image01.png`

---

# 27. RECOMMENDED ASSET FOLDER STRUCTURE
# 27. 권장 에셋 폴더 구조

```text
/assets
│
├── brand
│   ├── logo
│   └── favicon
│
├── hero
│   ├── desktop
│   ├── mobile
│   └── video
│
├── capabilities
│   ├── intelligent-interaction
│   ├── digital-environments
│   ├── experience-systems
│   └── integration
│
├── projects
│   ├── 7cubic
│   ├── hongdae-vr
│   ├── yancheng-simulator
│   └── cityfield
│
├── trust
│   ├── kisa
│   ├── patents
│   ├── t3
│   ├── rnd-center
│   └── venture
│
├── company
│   └── history
│
└── current-direction
    └── theme-park-planning
```

---

# 28. CURRENT SOURCE ASSET MAP
# 28. 현재 제공자료 기반 에셋 맵

| Asset | Current source | Page / location | Truth | Quality now | Priority | Final action |
|---|---|---:|---|---|---|---|
| Rebornsoft logo | IR | p.1 and other pages | Brand | Q3 | P0 | Original SVG/PNG 확보 |
| WeWorld internal images | IR | p.21 | T-B | Q3 | P2 | Original screenshots |
| 7 Cubic internal images | IR | p.23 | T-B | Q3 | **P0** | Original renders/UI |
| AI behavior-recognition UI | IR | p.26–30 | T-B | Q3 | P1 | Original screenshots |
| Digital Twin company examples | IR | p.12 | T-B / cautious | Q3 | P2 | Ownership/status confirm + originals |
| Shopping/real-estate concepts | IR | p.14–19 | Mixed T-D / third-party | Q3 | P3 | Separate owned vs third-party |
| Hongdae VR Cafe | IR | p.38 | T-A | Q3 | **P0** | Original project photos |
| Hyundai E&C event | IR | p.38 | T-A / role verify | Q3 | P2 | Original photos + role |
| Yancheng simulator | IR | p.39 | T-A | Q3 | **P0** | Original project photos |
| KISA / certificates | IR / profile | p.50 onward | T-C | Q3 | P1 | Original documents |
| Patent certificates | IR | p.55–58 | T-C | Q3 | P1 | Original patent files |
| Cityfield contract | Contract PDF | 6-page document | T-C | **Q1 evidence** | **P0** | Public derivative + redaction |
| Cityfield installation photos | Not confirmed | — | T-A | Q4 | **P0** | Verify completion / collect |
| 2025–2026 planning visuals | Not in current corporate source set | — | T-D | Q4 | P1 | Collect approved concept assets |
| Hero brand visual | Not created | — | T-E | Q4 | **P0** | Create after asset decision |

---

# 29. PROTOTYPE MINIMUM ASSET PACK
# 29. 프로토타입 최소 에셋 패키지

전체 Asset가 모일 때까지 Prototype을 무기한 미루지는 않는다.

Prototype A/B를 시작하기 위한 최소 조건:

## MUST HAVE — P0

1. **Logo**
   - 최소 transparent high-resolution PNG
   - 가능하면 SVG

2. **Hero**
   - approved representational hero visual 1 desktop + 1 mobile
   - 또는 approved temporary visual for layout test

3. **7 Cubic**
   - original or best-available 2–4 images

4. **One physical project**
   - Hongdae VR **or** Yancheng, original-quality images

5. **Cityfield**
   - contract proof crop
   - status = CONTRACTED

6. **One Trust asset**
   - KISA certificate or representative patent

### If P0 originals are not available yet
PDF embedded images may be used **only in Prototype**, explicitly tagged `PLACEHOLDER`.

---

# 30. FINAL BUILD MINIMUM
# 30. 최종 Build 최소 조건

최종 Public Website 이전에는 다음을 확보해야 한다.

### Required
- brand logo Q1
- Hero Q1/Q2
- 7 Cubic Q1/Q2
- at least 2 physical project asset sets Q1/Q2, or revise Featured Projects
- Cityfield public-safe proof asset
- KISA / patent proof Q1/Q2
- current corporate address / contact confirmation
- publication status for named clients
- KR / EN alt text
- mobile crops

### If not achieved
Featured project structure itself must be revised.

Do not compensate with unrelated stock imagery.

---

# 31. ASSET ACQUISITION REQUEST — USER CHECKLIST
# 31. 사용자에게 요청할 자료 체크리스트

향후 자료를 찾을 때 우선 다음 순서가 가장 효율적이다.

### P0
- [ ] 리본소프트 로고 원본 SVG / AI / transparent PNG
- [ ] 7 Cubic 원본 이미지 / 영상
- [ ] 홍대 VR 카페 원본 사진
- [ ] 중국 옌청 시뮬레이터 원본 사진
- [ ] 시티필드 실제 수행 사진 또는 완료여부 자료
- [ ] 시티필드 계약서 홈페이지 공개범위 확인

### P1
- [ ] KISA 인증 원본
- [ ] 특허 원본
- [ ] 2025–2026 글로벌 테마파크 공개 가능한 Concept / Planning visual
- [ ] AI HYPER VISION 원본 screenshot

### P2
- [ ] WeWorld / Meta Campus 원본
- [ ] 하나금융 구축 관련 이미지
- [ ] FIT-M UI / 영상
- [ ] 현대건설 행사 원본사진
- [ ] 기업부설연구소 / T3 / 벤처 인증 원본

---

# 32. ASSET REPLACEMENT LOGIC
# 32. 에셋 교체 논리

프로젝트는 사실이 강하더라도 시각자료가 부족할 수 있다.

### Rule

If:
`Evidence Strong + Visual Weak`

Then:
- smaller proof-led presentation
- documentary crop
- capability support

Not:
- fake visual generation presented as project

If:
`Evidence Strong + Visual Strong`

Then:
- Featured Project
- full-bleed image
- project detail

If:
`Evidence Weak + Visual Strong`

Then:
- do not feature until factual status is verified

---

# 33. REPRESENTATIONAL IMAGE GENERATION RULE
# 33. 표현용 이미지 생성 규칙

새로운 브랜드용 이미지가 필요할 경우 다음 범위만 허용한다.

### Allowed themes
- human-scale interactive space
- sensing / responsive environment
- digital-to-physical transition
- media / light / spatial technology
- software layer integrated with environment

### Must be derived from
approved Positioning + Capability Framework.

### Do not include
- fake client branding
- fake completed theme park
- fake product screen
- fabricated award / certificate
- religious symbolism
- text

### Label internally
`T-E / REPRESENTATIONAL`

---

# 34. MOBILE ASSET GOVERNANCE
# 34. 모바일 에셋 운영

모바일에서는 Desktop 이미지를 단순히 잘라 쓰지 않는다.

For each P0 image:
- Desktop crop
- Mobile crop
- focal-point metadata

### Project mobile rules
- actual hardware / person / screen remains visible
- metadata must not cover core evidence
- no microscopic UI

### UI mobile rule
UI screenshot는 필요하면 detail crop으로 교체.

---

# 35. ALT TEXT STANDARD
# 35. Alt Text 기준

Alt text는 마케팅 문구가 아니다.

### KR example
`7 Cubic 가상공간 내부의 회의 공간 화면`

### EN example
`Virtual meeting space inside the 7 Cubic platform`

### Project example
KR:
`중국 옌청 자동차 테마파크에 설치된 VR 시뮬레이터`

EN:
`VR simulator installed at an automotive theme park in Yancheng, China`

### Avoid
“혁신적인”, “최첨단”, “세계적”.

---

# 36. ASSET QA CHECKLIST
# 36. 에셋 QA 체크리스트

Every production asset must pass:

- [ ] Truth Class assigned
- [ ] Project Status assigned
- [ ] Ownership known
- [ ] Publication cleared
- [ ] Source recorded
- [ ] Sufficient resolution
- [ ] Desktop crop approved
- [ ] Mobile crop approved
- [ ] No unapproved personal data
- [ ] No false project implication
- [ ] KR alt text
- [ ] EN alt text
- [ ] File naming standard
- [ ] Compression tested
- [ ] Visual treatment consistent with Dark Technical Editorial

---

# 37. ASSET FAILURE CONDITIONS
# 37. 에셋 실패 조건

### FAIL AM-01
PDF 캡처 이미지를 원본처럼 무분별하게 최종 사용.

### FAIL AM-02
Stock image를 실제 프로젝트처럼 사용.

### FAIL AM-03
AI-generated image를 완료된 테마파크 프로젝트처럼 사용.

### FAIL AM-04
실제 프로젝트보다 표현용 이미지가 Projects 페이지를 지배.

### FAIL AM-05
7 Cubic 같은 실제 제품 Evidence를 generic device mockup으로 가림.

### FAIL AM-06
문서 Evidence에 개인정보가 그대로 노출.

### FAIL AM-07
저해상도 프로젝트 이미지를 화면 가득 확대.

### FAIL AM-08
KR/EN 텍스트를 이미지에 박아 언어 전환을 불가능하게 만듦.

### FAIL AM-09
타사 메타버스 / 쇼핑 사례 이미지를 리본소프트 프로젝트처럼 사용.

### FAIL AM-10
Asset가 부족하다는 이유로 Visual Direction 자체를 generic template으로 후퇴.

---

# 38. LOCKED ASSET DECISIONS
# 38. 에셋 고정안

## LOCK AM-01
실제 Project section에서는 **Actual Evidence First**.

## LOCK AM-02
PDF embedded image는 기본적으로 Q3 / locator로 취급.

## LOCK AM-03
7 Cubic, Hongdae VR, Yancheng, Cityfield는 Prototype 전 P0 asset group으로 관리.

## LOCK AM-04
IR p.38의 Hongdae VR / Hyundai Event와 p.39의 Yancheng project visuals는 실제 archive evidence로 인정하되 원본을 우선 확보.

## LOCK AM-05
IR p.23의 7 Cubic internal visuals는 실제 Product Evidence로 인정하되 원본 screenshot/render를 우선 확보.

## LOCK AM-06
IR p.26–30 AI UI는 Intelligent Interaction의 기술 Evidence로 사용 가능.

## LOCK AM-07
IR p.50–58 certification / patent images는 Trust Evidence locator로 사용하며 원본 문서를 확보한다.

## LOCK AM-08
Cityfield contract는 강한 Documentary Evidence지만 프로젝트 상태는 계속 **CONTRACTED**.

## LOCK AM-09
2025–2026 Current Direction visual은 `PLANNING / IN PROGRESS`로만 사용.

## LOCK AM-10
Hero representational visual은 프로젝트 실적이 아니라 T-E Brand Visual로 명확히 분리.

## LOCK AM-11
외부 Stock / 경쟁사 프로젝트 이미지는 기본 사용하지 않는다.

## LOCK AM-12
Generated visual에 KR/EN 텍스트나 로고를 삽입하지 않는다.

## LOCK AM-13
KR/EN copy는 HTML text로 유지한다.

## LOCK AM-14
Final Build 전에 P0 assets의 publication / ownership / crop 상태를 확정한다.

---

# 39. NEXT GATE
# 39. 다음 단계

## PROTOTYPE SPECIFICATION v1.0
## 프로토타입 구현 명세 v1.0

이제 Prototype A/B를 실제로 구현하기 위한 Claude용 명세서를 작성한다.

### Prototype A
- Navigation
- Language Switch
- Hero
- Hero visual behavior
- H02 Evolution Intro
- Dark → Light transition

### Prototype B
- Capability transition
- Technology Integration visual language
- One Featured Project
- Project metadata / status
- Mobile behavior

### Specification must include
- exact content
- layout coordinates / grid behavior
- design tokens
- breakpoints
- motion
- temporary vs final asset references
- acceptance criteria
- prohibited improvisation

그 다음 순서:

**PROTOTYPE SPEC → CLAUDE IMPLEMENTATION → GPT REVIEW → REVISION → APPROVAL → FULL BUILD SPEC**

---

# 40. BASELINE SUMMARY
# 40. 기준 요약

> **KR**
>
> 리본소프트 홈페이지의 핵심 시각 자산은 새로 꾸며낸 “첨단 기술 이미지”가 아니라, **실제 UI·실제 공간·실제 계약·인증·특허와 같은 Evidence**다.
>
> 현재 회사 IR에는 7 Cubic 내부 화면, AI 행동인식 UI, 홍대 VR 카페, 현대건설 행사, 중국 옌청 자동차 테마파크 시뮬레이터, 인증·특허 이미지가 존재한다. 그러나 대부분 PDF 내부에 삽입된 자료이므로 최종 홈페이지에서는 가능한 한 원본 파일을 확보해 사용한다.
>
> Hero만은 회사의 `Technology for Interactive Environments`를 표현하는 별도의 Brand Visual을 사용할 수 있지만, 그것은 어디까지나 **Representational Visual**이며 실제 프로젝트 실적으로 사용하지 않는다.

> **EN**
>
> The strongest visual assets for Rebornsoft are not generic “future technology” images, but **real product interfaces, physical installations, contracts, certifications, and patents.**
>
> The current company archive already contains internal 7 Cubic imagery, AI behavior-recognition interfaces, photographs from the Hongdae VR project and a Hyundai E&C event, simulator imagery from the Yancheng automotive theme park, and certification / patent documents. Most are embedded inside older PDFs, so original source files should be recovered wherever possible before final production.
>
> The hero may use a separate representational brand visual to express **Technology for Interactive Environments**, but that visual must remain clearly separate from completed project evidence.
