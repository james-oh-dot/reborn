# WORK Refinement Pass 01 — Trace

## Hero

- Before height: desktop 648px / 72svh; tablet 767px / 65svh; mobile 608px / 72svh
- After height: desktop 544px / effective 60.4vh; tablet 708px / 60svh; mobile 540px / 64svh
- Desktop: `min-height:58svh`, page-scoped top/bottom padding 128px/70px. Content minimum produces 544px at 1440×900.
- Tablet: `min-height:60svh`, padding 116px/68px.
- Mobile: `min-height:64svh`, padding 108px/58px.

## SCO

- Documentary asset: NOT FOUND
- Source/path: none
- Resolution: —
- Publication category: approved documentary candidate absent
- Concept asset: NOT FOUND
- Source/path: none
- Resolution: —
- Publication category: approved concept/planning candidate absent
- Search scope: `assets/`, `source/` PDFs and embedded images, current review assets.
- Final composition: not implemented. Documentary Primary / Concept Secondary cannot be completed without approved assets.
- Placeholder: retained under Canonical missing-asset rule.
- Result: `SCO FLAGSHIP DESIGN HOLD`

## Yancheng

- High-res original found: NO
- Before assets: `assets/projects/yancheng/simulator.png` 810×646; `installation.png` 864×592
- After assets: unchanged
- Ratio/layout adjustment: none. Existing lead hierarchy, duo crop, status and copy retained.

## Hongdae

- High-res original found: NO
- Search result: IR PDF page 38 contains the same 347×201 image plus a smaller 249×151 alternate; no higher-resolution same-project original.
- Current asset: `assets/projects/hongdae/vr-screen.png` 347×201, unchanged.
- Applied documentary scale adjustment: desktop media max-height 560px → 380px; grid 4fr/6fr → 5fr/5fr; image `cover` → `contain`; neutral documentary frame. Tablet/mobile use bounded 46vw/54vw heights.

## Lower Sections

- 03 before/after: 668px → 434px; transition band padding and integration spacing compressed.
- 04 before/after: 1114px → 868px; section padding, list rows and 7 Cubic support visual height compressed.
- 05 before/after: 960px → 650px; section and engagement-row padding compressed, all entries/statuses preserved.
- 06 before/after: 646px → 420px; compact credibility strip spacing applied, all proof content preserved.
- Combined desktop footprint: 3388px → 2372px, reduction 1016px / approximately 30.0%.

## Changed Production Files

- `prototype/work.html`
- `prototype/css/site.css`

`prototype/js/site.js` was not changed.

## Locked Areas Confirmed

HOME, COMPANY, CAPABILITIES, CONTACT, global typography/color/max-width/gutter/grid, navigation, statuses, copy, evidence boundary, assets other than display treatment, and JavaScript remain unchanged. New CSS is scoped through WORK-specific classes and `body.work-page`.

## Additional Issue

Approved SCO documentary/concept assets remain missing. No external, generated, upscaled, cropped sensitive, or substituted image was used.
