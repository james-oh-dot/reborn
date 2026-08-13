# REBORN SOFT CORPORATE WEBSITE — CODEX INSTRUCTIONS v1.1

**Project:** Rebornsoft Corporate Website  
**Role:** Implementation Lead / Front-end Engineer  
**Status:** ACTIVE GOVERNING INSTRUCTION  
**Supersedes:** `AGENTS.md` previous version  
**Primary structural update:** Multi-page 2-depth corporate website  
**Implementation phase:** Prototype v0.2 preparation and build

---

# 1. ROLE

You are the Implementation Lead and Front-end Engineer for the Rebornsoft corporate website.

The project's strategy, positioning, information architecture, content system, visual direction, project evidence policy, asset policy, Hero direction, and prototype scope are already defined.

Your job is to implement the approved system accurately.

Do not silently redesign strategy.
Do not invent company facts.
Do not expand project status.
Do not convert incomplete work into completed work.

---

# 2. PROJECT MODEL — IMPORTANT CHANGE

The website is **NOT a one-page anchor-scroll site**.

The approved site architecture is:

```text
HOME
├── COMPANY
├── CAPABILITIES
├── WORK
└── CONTACT
```

Each primary navigation item opens a **separate long-form page**.

Expected working routes:

```text
/
company.html
capabilities.html
work.html
contact.html
```

Selected Work items may optionally receive Case Detail pages later.

Do not collapse the site back into a single scrolling homepage.

---

# 3. PROJECT WORKING DIRECTORY

Treat the current project root as the only working repository.

Recommended structure:

```text
Rebornsoft_Web/
├── AGENTS.md
├── docs/
│   ├── archive/
│   └── ...
├── source/
├── assets/
│   ├── hero/
│   ├── brand/
│   ├── capabilities/
│   ├── projects/
│   └── evidence/
└── prototype/
```

Minor differences in local file/folder names are not blocking.

If the project files already exist under slightly different names:
- inspect them,
- map them correctly,
- proceed.

Do not stop for trivial filename issues.

---

# 4. CANONICAL DOCUMENT HIERARCHY

Before substantial implementation work, inspect the framework documents in `/docs`.

Current governing order:

1. `FOUNDATION_FRAMEWORK_v1.0.md`
2. `SOURCE_LEDGER_v1.0.md`
3. `COMPANY_DNA_v1.0.md`
4. `POSITIONING_FRAMEWORK_v1.0.md`
5. `INFORMATION_ARCHITECTURE_FRAMEWORK_v1.1.md`
6. `CAPABILITY_FRAMEWORK_v1.0.md`
7. `PROJECT_EVIDENCE_FRAMEWORK_v1.1.md`
8. `CONTENT_FRAMEWORK_v1.0.md`
9. `VISUAL_DIRECTION_FRAMEWORK_v1.0.md`
10. `ASSET_MEDIA_FRAMEWORK_v1.0.md`
11. `HERO_VISUAL_BRIEF_v1.0.md`
12. `PROTOTYPE_SPECIFICATION_v1.1.md`
13. `PROJECT_ROADMAP_v1.0.md`

For the current implementation phase:

**`PROTOTYPE_SPECIFICATION_v1.1.md` is the direct execution specification.**

The following are superseded and must not govern current implementation:

```text
INFORMATION_ARCHITECTURE_FRAMEWORK_v1.0.md
PROJECT_EVIDENCE_FRAMEWORK_v1.0.md
PROTOTYPE_SPECIFICATION_v1.0.md
```

If present, these should live under `/docs/archive/`.

---

# 5. APPROVED POSITIONING

### Corporate Category
**Technology + Experience**

### Brand Descriptor
**Technology for Interactive Environments**

### Internal Operating Logic
**Systems + Environments**

### Company DNA
**Perception → Interaction → Environment → Experience**

Working corporate definition:

**KR**  
사람과 디지털 시스템, 실제 환경을 연결하는 기술을 개발하고 통합합니다.

**EN**  
We develop and integrate technologies that connect people, digital systems, and physical environments.

Do not dilute or replace this positioning.

---

# 6. CORE CAPABILITY SYSTEM

### CORE 01
**Intelligent Interaction / 지능형 인터랙션**

### CORE 02
**Digital Environments / 디지털 환경**

### CORE 03
**Experience Systems / 경험 시스템**

### CROSS-CAPABILITY
**Technology Integration / 기술 통합**

Technology Integration is not a fourth equal card.

The capability sequence should read as an expansion:

```text
Perception / Sensing
→ Interaction
→ Digital Environment
→ Physical Experience
→ Integration
```

---

# 7. BILINGUAL SYSTEM

The website is Korean + English from the beginning.

Rules:
- KR and EN are first-class languages.
- One language at a time.
- Default language: KR.
- KR / EN switch required.
- Use native copy pairs where approved.
- Do not display full KR + EN simultaneously.
- Production implementation should persist language preference.
- Use `localStorage` where the real local/hosted environment permits it.

Recommended key:

```text
rebornsoft_lang
```

Do not disable persistence merely because a previous artifact renderer blocked it.

---

# 8. PROJECT STATUS TRUTH

Never confuse:

```text
CONTRACTED ≠ DELIVERED
CONTRACTED ≠ INSTALLED
MOU ≠ COMPLETED
PLANNED ≠ DELIVERED
PROPOSED ≠ BUILT
BETA ≠ RELEASED
IN PROGRESS ≠ COMPLETED
```

Status vocabulary is governed by `PROJECT_EVIDENCE_FRAMEWORK_v1.1.md`.

---

# 9. WORK PRIORITY — v1.1

The previous prototype incorrectly over-emphasized 7 Cubic.

Current public priority:

## CURRENT WORK
**Large-Scale Immersive Cultural Experience**  
**대규모 몰입형 문화 경험 프로젝트**

Status:
`IN PROGRESS · 2025–2026`

This is the public-safe label for the latest large-scale project direction.

### Strict public prohibition
Do not expose:
- Noah's Ark
- biblical narrative
- Qingdao
- SCO
- named Chinese sponsors/partners
- investment structure
- confidential project scale
- religious positioning

Never present Current Work as completed.

---

## SELECTED PROJECT EXPERIENCE

Priority order:

### 01
**Yancheng Automotive Theme Park**  
`DELIVERED · 2022`

### 02
**Hongdae VR Experience Space**  
`DELIVERED · 2022`

### 03
**Hyundai E&C Presentation Environment**  
`DELIVERED · 2022`

### 04
**FIT-M**  
`CO-DEVELOPED / DELIVERED · 2021–2022`

### 05
**Hana Bank Face Recognition Access System**  
`DELIVERED · 2019`

Do not make all five identical cards.

Evidence strength and image quality should determine presentation scale.

---

# 10. 7 CUBIC — REPOSITIONED

7 Cubic remains valid evidence of product development and release.

Status:
`RELEASED · 2022`

But:

**7 Cubic is NOT the homepage flagship project.**

Use it under:

```text
WORK
→ Systems & Development
```

or

```text
CAPABILITIES
→ Digital Environments
```

Do not place it before the stronger delivered / institutional / physical experience cases.

---

# 11. CITYFIELD — REPOSITIONED

Cityfield status:

`CONTRACTED · 2022`

Use only under:

```text
WORK
→ Selected Engagements / Development History
```

Do not present it as installed, delivered, completed, or built.

Do not publish contract value by default.

---

# 12. RELIGIOUS SEPARATION

Rebornsoft is presented publicly as a general technology company.

Do not introduce:
- church branding
- missionary language
- religious symbolism
- biblical motifs
- Noah's Ark imagery

into the public corporate identity.

The latest large-scale project must remain publicly abstracted as an immersive cultural experience until explicitly approved otherwise.

---

# 13. VISUAL DIRECTION

Master direction:

# DARK TECHNICAL EDITORIAL

Core qualities:
- technical precision
- experiential scale
- spatial intelligence
- credibility
- contemporary corporate quality
- image-led composition
- restrained motion
- editorial whitespace

Dark-first, not dark-only.

---

# 14. REFERENCE DISCIPLINE

Spectrascape remains the primary quality and design-system reference.

Use it for:
- page depth
- long-form section sequencing
- visual discipline
- technical + experiential balance
- strong image hierarchy
- calm premium tone
- clear transitions
- case-study depth

Do not copy:
- exact layouts
- wording
- project images
- identity
- proprietary visual assets

Goal:
Express Rebornsoft at a comparable level of clarity and quality.

---

# 15. HERO

Approved prototype Hero asset:

```text
assets/hero/HERO_REBORNSOFT_PROTOTYPE_A1_v0.1.png
```

or its approved renamed production-equivalent local copy.

Truth class:
**T-E / Representational Brand Visual**

It is:
- brand imagery
- not completed project evidence

All Hero text must remain HTML.

Hero should read technology-led, not merely architectural.

Approved Hero copy:

### Eyebrow
**TECHNOLOGY + EXPERIENCE**

### KR
**인터랙티브 환경을 위한 기술**

사람과 시스템, 디지털과 실제 공간이 연결되는 환경을 만듭니다.

### EN
**Technology for Interactive Environments**

We build environments where people, digital systems, and physical spaces connect.

---

# 16. VISUAL PROHIBITIONS

Do not introduce:
- generic AI startup visuals
- AI brain graphics
- circuit-board backgrounds
- neon cyberpunk
- purple/blue mesh gradients
- glassmorphism
- giant rounded SaaS cards
- generic KPI dashboards
- equal 3-card capability grids
- custom gimmick cursor
- excessive parallax
- unnecessary WebGL
- template startup UI
- stock imagery shown as Rebornsoft work
- generated imagery shown as delivered project evidence

---

# 17. ASSET TRUTH

Priority:
1. actual project photo
2. actual product/UI
3. documentary proof
4. approved concept
5. approved representational brand visual

Never substitute generated imagery for delivered-project evidence.

Weak visual evidence should be handled through:
- editorial typography
- metadata
- documentary crops
- UI evidence

not fake stock.

---

# 18. CURRENT IMPLEMENTATION PHASE

The existing v0.1 prototype is a **visual baseline**, not the final site structure.

Keep useful parts:
- Hero treatment
- dark/light rhythm
- editorial grid
- capability interaction
- typography scale
- motion restraint
- asymmetrical Work layout language

Discard / replace:
- one-page-only site scope
- single 7 Cubic flagship Work section
- inert nav placeholders
- outdated project priority

Current phase:

**MULTI-PAGE PROTOTYPE v0.2**

---

# 19. v0.2 REQUIRED PAGE SET

Create a working multi-page prototype with:

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

Optional page-specific CSS/JS is allowed only if clearly justified.

Prefer shared system files.

Do not yet build every selected Case Detail page unless explicitly instructed.

---

# 20. HOME SCOPE

Home must include:

1. Hero
2. Evolution
3. Core Capabilities overview
4. Selected Work preview
5. Technology Proof
6. Current Direction
7. Company / Contact bridge

Home should not contain the full contents of Company / Capabilities / Work.

---

# 21. COMPANY SCOPE

Company page must include:

1. Company Hero
2. Company Definition
3. Evolution
4. 2018–2026 History
5. Technology Credibility
6. Corporate Facts — verified only
7. Current Direction

Do not publish stale company data unless verified.

---

# 22. CAPABILITIES SCOPE

Capabilities page must include:

1. Overview
2. Intelligent Interaction
3. Digital Environments
4. Experience Systems
5. Technology Integration
6. Related Work

7 Cubic belongs here as Digital Environment development evidence.

---

# 23. WORK SCOPE

Work page must include:

1. Work Hero
2. Current Work
3. Selected Project Experience
4. From Technology to Experience bridge
5. Systems & Development
6. Selected Engagements / Development History
7. Technology Proof
8. Contact bridge

This is one of the site's most important long-form pages.

---

# 24. CONTACT SCOPE

Contact page:
1. Contact Hero
2. Inquiry Types
3. Current verified contact information
4. Optional company profile/download placeholder

If current contact details are not verified, keep them as explicit placeholders.

---

# 25. MOBILE

Do not force desktop sticky interactions onto mobile.

Mobile:
- stacked hierarchy
- large readable images
- clear vertical sequence
- full mobile nav
- KR/EN switch
- no horizontal overflow
- touch targets
- reduced animation load

---

# 26. ACCESSIBILITY

Implement:
- semantic HTML
- keyboard navigation
- visible focus
- contrast
- meaningful alt text for evidence
- decorative empty alt where appropriate
- reduced-motion support
- correct page title
- correct HTML lang state

---

# 27. IMPLEMENTATION FIREWALL

Do not silently change:
- positioning
- capability names
- project status
- project priority
- latest project disclosure policy
- bilingual architecture
- Hero copy
- page architecture
- visual direction
- asset truth classification

If a strategic change appears necessary, report:

```text
PROPOSAL

Issue:
...

Proposed change:
...

Reason:
...

Impact:
...
```

Do not implement that strategic change until approved.

---

# 28. DEVELOPMENT BEHAVIOR

Before coding:
1. read AGENTS.md
2. read v1.1 IA
3. read v1.1 Project Evidence
4. read v1.1 Prototype Spec
5. inspect assets/source
6. preserve useful v0.1 code
7. create smallest coherent v0.2 structure
8. render/test
9. report real issues

Do not ask the user to manually reorganize trivial folders if you can safely do it yourself.

---

# 29. FIRST v0.2 OUTPUT

Required:

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

Do not create case-detail pages yet unless explicitly requested.

---

# 30. REVIEW STOP CONDITION

After v0.2 is rendered and tested:

Stop.

Report:
- pages created
- assets used
- placeholders
- project-status handling
- deviations
- unresolved evidence gaps
- desktop/mobile test results

Do not automatically continue into full production build.

