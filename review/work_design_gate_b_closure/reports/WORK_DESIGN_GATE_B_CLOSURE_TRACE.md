# WORK Design Gate B Closure Trace

## Mobile SCO Before

- Secondary width: 100% of the mobile content column (350 px at 390 px viewport)
- Secondary height / ratio: `52vw` = 202.8 px, approximately 1.73:1
- Alignment: full-width / default stretch

## Mobile SCO After

- Secondary width: 82% of the mobile content column (287 px at 390 px viewport)
- Secondary height / ratio: auto via `aspect-ratio: 16 / 9` = 161.44 px
- Alignment: right aligned via `align-self: flex-end`

## Why

Secondary Public Record를 명백한 supporting evidence로 낮추기 위함. Primary field evidence, existing body copy, and documentary sequence remain unchanged.

## Desktop Regression

PASS — existing 1440×900 SCO hierarchy and 74.93 / 25.07 desktop balance remain governed by the unchanged desktop rules.

## Tablet Regression

PASS — the 820×1180 layout remains governed by the unchanged tablet rule.

## Mobile KR

PASS — Primary remains dominant; Secondary is subordinate, right aligned, readable, and free of overflow.

## Mobile EN

PASS — title, body copy, image order, spacing, alignment, and `rebornsoft_lang` persistence verified.

## Canonical Verification

Evidence Ledger: PASS

- L6, SCO-EXT-01, WeChat, 太平山索道, 2026-03-27, supported scope, and all requested non-support boundaries are present.

SCO Public Evidence Lock: PASS

- Corporate identity, Current Flagship / Current Scale, primary/secondary evidence roles, source-only article rule, Launch v1.0 concept exclusion, prohibited claims, and meeting-photo exclusion are present.

Neither canonical document was modified.

## Changed Production Files

- `prototype/css/site.css`

No HTML, JavaScript, asset, copy, or canonical document was changed.

## Hash Verification

| File | Before | After |
|---|---|---|
| `prototype/work.html` | `7c3c98049c96d6fbf89c82bedd56551dba5a9b6e0bff6ed9a44f1811c388a975` | same |
| `prototype/css/site.css` | `e205132a1adc898d67c2a0d38223f3ab8136a481d5775763b0b3187af9bea39a` | `e6ddb7991a4d16af8ed34fd2cd3f24b049879128ad7ca4a420bad2e87d2fcc92` |
| `prototype/js/site.js` | `d195e5506338e8467f13334ecf0725a08d19512d0d796a72537431669ed959c6` | same |
| `docs/canonical/EVIDENCE_LEDGER_v2.1.md` | `3a9b12b1008f4f2551ce45042ce52ac91a1f55b0e5a5bfa9403c041139a2f55b` | same |
| `docs/canonical/SCO_PUBLIC_EVIDENCE_LOCK_v1.0.md` | `2a3807b82e7818df9422c45fbdb1dff5e65c5d5b6e35172f36b0f87fb17673f4` | same |
| Primary asset | `0d256260f311b7b8c9d5b3c265ab467f2757edb424ef28fc7765a083aa712ac1` | same |
| Secondary asset | `53daf89d9271048e1e27409fce2bd02f1d256febf421eacf4c9854ff6b1b750c` | same |

## Locked Areas

WORK Hero, SCO desktop/tablet, SCO copy/status, Primary image, Yancheng, Hongdae, Hyundai, FIT-M, Hana, Sections 03–06, closing, global design/navigation/motion/language system, HOME, COMPANY, CAPABILITIES, CONTACT, MASTER Framework, and Execution Spec were not changed.
