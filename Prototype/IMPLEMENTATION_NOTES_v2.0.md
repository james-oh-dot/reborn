# Rebornsoft Prototype — v2.0 Migration Alignment Notes

## Files changed

- `AGENTS.md`
- `docs/v2/MASTER_FRAMEWORK_v2.0.md`
- `docs/v2/EVIDENCE_LEDGER_v2.0.md`
- `docs/v2/CODEX_EXECUTION_SPEC_v2.0.md`
- `docs/v2/V2_MIGRATION_RISK_HEDGE_PLAN.md`
- `prototype/index.html`
- `prototype/company.html`
- `prototype/capabilities.html`
- `prototype/work.html`
- `prototype/IMPLEMENTATION_NOTES_v2.0.md`

Shared CSS/JavaScript, Contact, the approved Hero, page architecture, and the existing visual system were retained without redesign.

## v2.0 framework migration

- The previous root AGENTS and all v1.0/v1.1 frameworks were preserved under `docs/archive_pre_v2/`.
- v1.1 delivery copies from `Update/` were preserved under `docs/archive_pre_v2/update_v1.1/`.
- `docs/v2/` is now the only Canonical framework location.
- Original PDFs, contracts, images, assets, prototype code, and previous implementation notes were not archived or deleted.

## Current Project changes

- Replaced the anonymous `Large-Scale Immersive Cultural Experience` label with:
  - KR: `SCO 노아의 방주 프로젝트`
  - EN: `SCO Noah's Ark Project`
- Status remains `IN PROGRESS · 2025–2026` / `진행 중 · 2025–2026`.
- Home presents it after Technology Proof, so it does not replace the corporate Hero or positioning.
- Company treats it as the current chapter of the evolution.
- Capabilities maps it to Technology Integration as current evidence.
- Work presents it as Current Flagship but not as completed work.

## Project status corrections

- FIT-M changed from `CO-DEVELOPED / DELIVERED · 2021–2022` to `CO-DEVELOPED · 2021–2022`.
- Hana uses 2019 deployment history without group-wide or current-operation claims.
- Yancheng copy is restricted to curved-screen implementation and racing simulation/content production.
- Hongdae remains limited to curved-screen visual implementation and VR experience-space application.
- Hyundai remains limited to curved-screen display implementation for the presentation environment.
- 7 Cubic remains `RELEASED · 2022` and is not a Homepage Flagship.
- Cityfield remains `CONTRACTED · 2022` under Selected Engagements only.

## Existing assets used

- Approved T-E Hero brand visual
- IR-derived Yancheng, Hongdae, and Hyundai actual project images
- IR-derived FIT-M and Hana solution UI
- 7 Cubic actual product UI
- KISA AI HYPER VISION documentary image

No SCO logo, emblem, external stock image, or generated project evidence was added.

## Missing SCO / Noah assets

Required for the next evidence/design gate:

- approved SCO flag-area photograph
- approved site-inspection photographs
- approved Noah concept/planning visual

## Current placeholder

The Work Current Flagship section contains an explicit `PROJECT VISUAL · APPROVED ASSET REQUIRED` placeholder. It must be replaced only with approved documentary or planning imagery and must retain the `IN PROGRESS` status.

## Facts intentionally not published

- official institutional expansion or legal relationship behind `SCO`
- `Official SCO Project` or `Commissioned by SCO` wording
- governmental authorization claims
- Qingdao naming
- exact contract or procurement structure
- project dimensions, budget, or investment structure
- named Chinese institutions, sponsors, or partners
- sensitive meeting imagery or private participant information
- official SCO logo/emblem

## Tests

Browser validation completed after the alignment pass:

- Desktop 1440 × 900: all five pages loaded without broken images or horizontal overflow; current-project and corrected status labels were confirmed.
- Tablet 820 × 1180: Home loaded without broken images or horizontal overflow; Current Project content remained visible and readable.
- Mobile 390 × 844: all five pages loaded without broken images or horizontal overflow; the mobile menu opened correctly.
- KR / EN: language switching worked, and the selected language persisted across page navigation through `localStorage`.
- Mobile KR Work: `SCO 노아의 방주 프로젝트` and `진행 중 · 2025–2026` were confirmed.
- Mobile KR Capabilities: the Technology Integration evidence line was confirmed.

## Unresolved factual items

- final externally official English project title
- exact public-safe Rebornsoft role wording
- exact public SCO institutional wording
- publication-cleared SCO/site-inspection asset originals
- current verified corporate contact details

No Project Detail page was created.
