# Rebornsoft Prototype v0.2 — Implementation Notes

## 1. Page list

- `index.html` — executive overview
- `company.html` — definition, evolution, 2018–2026 history, credibility, verified facts, current direction
- `capabilities.html` — three core capabilities, cross-capability integration, related evidence
- `work.html` — current work, delivered project hierarchy, systems/development history, engagements, proof
- `contact.html` — inquiry types and explicit contact/profile placeholders
- Shared: `css/site.css`, `js/site.js`

The v0.1 artifact remains preserved as `prototype-v0.1.html`.

## 2. Asset inventory

- Hero: `assets/Hero/HERO_REBORNSOFT_PROTOTYPE_A1_v0.1.png`
  - T-E representational brand visual; Hero only.
- Yancheng: `assets/projects/yancheng/installation.png`, `simulator.png`
  - T-A actual project; extracted from IR PDF page 39; Q3 prototype evidence.
- Hongdae: `assets/projects/hongdae/vr-screen.png`, `interactive-screen.png`
  - T-A actual project; extracted from IR PDF page 38; Q3 and low-resolution.
- Hyundai E&C: `assets/projects/hyundai/presentation.png`, `curved-screen.png`
  - T-A actual project; extracted from IR PDF page 38; Q3.
- FIT-M: `assets/projects/fitm/app.png`
  - T-B product/UI; extracted from IR PDF page 35; Q3.
- Face access solution: `assets/projects/hana/face-access.png`
  - T-B actual solution UI; extracted from IR PDF page 31; Q3. Used as solution evidence, not presented as a direct project-site photograph.
- 7 Cubic UI: four existing extracted images under `assets/products/7cubic/`
  - T-B actual product UI; Q3.
- KISA: `assets/evidence/kisa-hyper-vision.png`
  - T-C documentary evidence; extracted from IR PDF page 50; Q3.

## 3. Placeholder inventory

- Official logo
  - Current: text-only `REBORN SOFT` wordmark; no invented red square.
  - Truth/quality: provisional brand placeholder / Q4.
  - Replace with approved official SVG or transparent PNG.
- Current Work visual
  - Current: no image; editorial grid and status only.
  - Intended: approved public-safe planning/concept visual.
  - Truth/quality: explicit missing asset / Q4.
  - Must never imply a completed installation.
- Contact information
  - Current: explicit on-page placeholder.
  - Replace with verified public email, telephone, and address only.
- Company profile download
  - Current: explicit on-page placeholder with no dead link.
  - Replace with an approved current public profile.
- Home desktop Intelligent Interaction visual
  - Current: CSS technical diagram is decorative only; actual solution UI remains visible on tablet/mobile and on Capabilities.
  - Truth class: T-E representational support; not project proof.

## 4. Project-status handling

- Yancheng — `DELIVERED · 2022`; limited to curved-screen, racing simulation content, and physical experience implementation.
- Hongdae — `DELIVERED · 2022`; limited to curved-screen/VR experience application.
- Hyundai E&C — `DELIVERED · 2022`; limited to curved-screen presentation environment.
- FIT-M — `CO-DEVELOPED / DELIVERED · 2021–2022`; development contract and MOU relationship are kept distinct in copy.
- Hana — `DELIVERED · 2019`; not described as group-wide deployment.
- 7 Cubic — `RELEASED · 2022`; placed in Capabilities and Systems & Development, not Home flagship.
- Cityfield — `CONTRACTED · 2022`; placed only in Selected Engagements.
- MOU items remain explicitly `MOU`.

## 5. Current Work disclosure

- Public label only: `대규모 몰입형 문화 경험 프로젝트 / Large-Scale Immersive Cultural Experience`.
- Visible status: `IN PROGRESS · 2025–2026`.
- No confidential identity, religious context, location, dimensions, partner, or investment information is exposed.
- It is visually separated from delivered work and described as planning in progress.

## 6. Bilingual behavior

- KR default, one language at a time.
- `rebornsoft_lang` localStorage key initializes every page and persists across navigation.
- Text-bearing child elements are updated individually; links retain arrow spans and HTML structure.
- Korean uses `word-break: keep-all` and `overflow-wrap: break-word`.

## 7. Responsive behavior

- Desktop uses 12-column editorial compositions and Home capability sticky progression.
- At <=1023px, the menu becomes a working full-height navigation and capabilities become stacked.
- Tablet/mobile capability blocks retain actual visual evidence.
- Mobile layouts use normal reading order and do not depend on sticky state.

## 8. v0.1 code reused

- Core palette and type scale
- Approved Hero treatment, safe-zone logic, and restrained entrance
- Dark/light rhythm and editorial spacing
- Fixed/scrolled header behavior
- Reveal observer and reduced-motion handling
- Desktop capability scroll sequence and mobile simplification
- Asymmetrical project presentation

## 9. Deviations

- Actual project originals are unavailable; approved IR-embedded Q3 images are used for prototype review.
- Current Work has no visual because no public-safe approved planning asset exists.
- No current verified contact information is published.
- No footer beyond a minimal prototype utility close was specified; a minimal shared footer is included only for navigation continuity.

## 10. Unresolved issues

- Q1 official logo and production Hero master
- Yancheng, Hongdae, Hyundai, FIT-M, Hana original/publication-cleared asset sets
- KISA, patent, R&D, Venture, and TCB T3 original documents
- Current public contact information
- Approved current public company profile
- Exact official English project names and client-name publication policy before production

## 11. Browser tests

- Verified all five pages at 1440×900 in English and 390×844 in Korean.
- Verified tablet navigation at 820×1180, including menu open state, cross-page navigation, and persisted KR language state.
- Confirmed no broken images, page-level horizontal overflow, or console errors.
- Confirmed Home capability behavior: desktop sticky sequence; tablet/mobile normal flow with three visible evidence images.
- Confirmed all primary navigation routes resolve to separate HTML pages.

## 12. Case-detail pages

No Case Detail pages were created in v0.2, as required.
