# REBORN SOFT CORPORATE WEBSITE
# CODEX EXECUTION SPEC v2.0
## 현재 구현물 유지 + 콘텐츠/구조 기준 갱신

**Status:** DIRECT IMPLEMENTATION ORDER  
**Priority:** This document overrides all pre-v2 prototype/implementation specifications for current work.

---

# 0. PRIMARY RULE

Do **not** redesign the website from scratch.

The current Codex multi-page implementation is the approved **UI / layout baseline** for the next iteration.

Preserve its useful design language and structure unless a concrete implementation bug exists.

Current Home baseline:

```text
Hero
→ Evolution
→ Core Capabilities
→ Selected Work
→ Technology Proof
→ Current Project
→ Closing Bridge
```

Primary pages remain:

```text
index.html
company.html
capabilities.html
work.html
contact.html
```

This iteration is primarily a **content / evidence / disclosure alignment pass**, not a visual redesign.

---

# 1. SOURCE OF TRUTH

Before changing code, read only these current governing documents:

1. project root `AGENTS.md`
2. `docs/v2/MASTER_FRAMEWORK_v2.0.md`
3. `docs/v2/EVIDENCE_LEDGER_v2.0.md`
4. `docs/v2/CODEX_EXECUTION_SPEC_v2.0.md`

Old v1.x docs are historical Archive only.

Do not reconcile or merge old v1.x instructions into v2.0.

If old documents say "Noah/SCO must not be public", that instruction is superseded.

Source PDFs/images/contracts may still be used as factual evidence.

---

# 2. CURRENT HTML BASELINE

The existing multi-page HTML should be modified incrementally.

Preserve:
- multi-page navigation
- KR / EN switching
- Hero structure
- Evolution structure
- Capability sequence
- Selected Work hierarchy
- Technology Proof
- page depth
- shared CSS/JS
- responsive behavior
- current visual system

Do not re-create a new design system in this task.

---

# 3. REQUIRED CONTENT CHANGE — HOME CURRENT PROJECT

Replace the anonymous current-project treatment:

```text
CURRENT DIRECTION
Large-Scale Immersive Cultural Experience
IN PROGRESS · 2025–2026
```

with:

```text
CURRENT PROJECT
SCO Noah's Ark Project
IN PROGRESS · 2025–2026
```

KR:

```text
현재 프로젝트
SCO 노아의 방주 프로젝트
진행 중 · 2025–2026
```

Do not yet invent:
- exact official SCO institutional expansion
- official governmental authorization wording
- exact contract relationship
- project dimensions
- investment values
- named Chinese investment parties

---

# 4. CURRENT PROJECT POSITIONING

Noah's Ark is:
- Current Flagship Project
- IN PROGRESS
- proof of current project scale
- evidence of Technology Integration

It is not:
- company identity
- completed work
- proof that Rebornsoft built the full project
- permission to turn the corporate site into a religious site

Keep Home Hero and corporate positioning technology-led.

---

# 5. WORK PAGE UPDATE

Work page order:

1. Work Hero
2. **Current Flagship — SCO Noah's Ark Project / IN PROGRESS**
3. Selected Project Experience
4. From Technology to Experience
5. Systems & Development
6. Selected Engagements / Development History
7. Technology Proof
8. Contact Bridge

Current Flagship should be more substantial than the former anonymous Current Work block,
but do not create a full Case Detail Page yet unless explicitly ordered.

If approved SCO/site inspection images are not in assets:
use an explicit placeholder and note the required asset.
Do not source random internet photos.

---

# 6. COMPANY PAGE UPDATE

Company page should treat SCO Noah's Ark Project as the **current chapter** of the company's evolution.

Do not turn the Company page into a Noah Project page.

Evolution remains:

```text
Perception
→ Interaction
→ Digital Environments
→ Physical Experience
→ Larger Integrated Experience
```

---

# 7. CAPABILITIES PAGE UPDATE

Preserve 3 Core + 1 Cross.

Map evidence:

Intelligent Interaction:
Hana / FIT-M / HYPER VISION

Digital Environments:
WeWorld / Meta Campus / 7 Cubic

Experience Systems:
Yancheng / Hongdae / Hyundai

Technology Integration:
SCO Noah's Ark Project — IN PROGRESS

Technology Integration remains a cross layer, not a fourth equal card.

---

# 8. PROJECT STATUS CORRECTIONS

## 7 Cubic
`RELEASED · 2022`
Do not use as homepage flagship.

## Cityfield
`CONTRACTED · 2022`
Never Delivered / Installed / Completed.

## FIT-M
Avoid `DELIVERED` in final public-facing wording unless evidence explicitly verifies delivery.
Prefer:
`CO-DEVELOPED · 2021–2022`
for the next iteration unless a more precise phase label is approved.

## Hana
Use 2019 deployment/delivery history.
Do not imply group-wide/current operation.

## Yancheng
Keep exact role boundary:
curved-screen implementation + racing simulation/content production.

## Hongdae
Keep role boundary:
curved-screen visual implementation / VR experience-space application.

## Hyundai
Keep role boundary:
curved-screen display implementation for presentation environment.

---

# 9. PUBLIC DISCLOSURE — SCO / NOAH

Allowed:
- SCO text
- Noah's Ark project name
- IN PROGRESS
- approved flag-area / site-inspection photos if provided

Do not assume permission for:
- SCO official emblem/logo
- governmental seals

Do not publish:
- sensitive meeting photos
- private negotiation details
- unverified official institutional claims

---

# 10. KR / EN

Keep existing one-language-at-a-time behavior.

Default:
KR

Persist with:
`rebornsoft_lang`

For new current-project copy:
provide KR and EN data pairs.

Do not implement mechanically awkward English.
Use concise corporate English.

---

# 11. NO DESIGN RESET

This task must not:
- replace global typography
- create a new color system
- rebuild Hero
- replace current section rhythm
- introduce a new visual concept
- revert to one-page structure

Design review is a later Gate.

You may fix technical bugs and spacing breakages caused by new copy.

---

# 12. ASSET HANDLING

If these assets exist, wire them in:
- SCO flag-area photo
- site-inspection photos
- approved Noah concept visual

If absent:
create named placeholders in markup/assets notes.

Do not use:
- random web images
- generated completed-project images
- official SCO logo without explicit authorization

---

# 13. DETAIL PAGE POLICY

Do not build all project detail pages in this task.

Architecture should allow future:
- Noah Current Project detail
- Yancheng
- FIT-M
- Hana
- Hongdae

Noah detail page will be commissioned separately after public copy / assets are verified.

---

# 14. EXISTING INDEX COPY REVIEW

Where the current HTML already matches v2.0:
keep it.

Only change copy that conflicts with:
- new SCO/Noah disclosure
- exact status truth
- verified role boundary

Do not rewrite all copy for stylistic novelty.

---

# 15. TEST

Validate:
- all 5 pages
- KR / EN
- desktop 1440×900
- tablet 820×1180
- mobile 390×844
- language persistence
- navigation
- no overflow
- current-project status
- Cityfield status
- 7 Cubic priority
- FIT-M status
- no accidental old "Noah/SCO prohibited" behavior

---

# 16. IMPLEMENTATION NOTES

Update/create implementation notes containing:

1. files changed
2. v2.0 framework migration
3. Current Project changes
4. project status corrections
5. assets used
6. missing SCO / Noah assets
7. placeholders
8. facts intentionally not published
9. tests run
10. unresolved factual items

---

# 17. STOP CONDITION

Stop after the current multi-page prototype has been aligned to v2.0.

Do not:
- do a full visual redesign
- build all case pages
- invent final SCO institutional copy
- deploy production
- change strategy

Wait for visual/content review.
