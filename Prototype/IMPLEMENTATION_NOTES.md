# Rebornsoft Prototype v0.1 — Implementation Notes

## Scope

Implemented only Prototype A + B: fixed navigation, KR/EN switch, H01 Hero, H02 Evolution, H03 Capability Sequence with Technology Integration cross-layer, and H04 7 Cubic featured project. No full Company, Projects archive, Contact section, or footer was added.

## Assets used

- `assets/hero/HERO_REBORNSOFT_PROTOTYPE_A1_v0.1.png`
  - Source preserved at `assets/Hero/Hero.png`.
  - Truth class: T-E / Representational Brand Visual.
  - Use: Hero only; not project evidence.
  - Source resolution: 1672 × 941, lower than the framework's preferred final-production master.
- `assets/products/7cubic/7cubic-ui-01.png` through `7cubic-ui-04.png`
  - Extracted from page 23 of `Source/리본소프트_IR소개.pdf` without modifying the PDF.
  - Truth class: T-B / Actual Product UI.
  - Quality: Q3 / Prototype only because independent originals are unavailable.
  - Use: H03 Digital Environments and H04 7 Cubic evidence.

## Placeholders

- `H03 / CORE 01 / Intelligent Interaction visual`
  - Intended final asset: actual AI HYPER VISION, motion recognition, or tracking UI.
  - Current source: CSS-only sensing diagram.
  - Truth class: T-E / representational placeholder.
  - Limitation: does not demonstrate actual product operation.
  - Replacement requirement: approved actual UI capture with publication permission.
- `H03 / CORE 03 / Experience Systems visual`
  - Intended final asset: actual Hongdae VR Cafe or Yancheng simulator installation photography.
  - Current source: CSS-only spatial-system diagram.
  - Truth class: T-E / representational placeholder.
  - Limitation: does not prove an installed project.
  - Replacement requirement: approved original installation photography and confirmed usage rights.
- Corporate logo
  - Intended final asset: official Rebornsoft SVG/transparent PNG.
  - Current source: HTML typographic wordmark plus a small red geometric mark.
  - Truth class: provisional brand placeholder.
  - Limitation: not an official logo reproduction.
  - Replacement requirement: official Q1 logo asset.

## Assumptions and structural decisions

- Existing files and source documents were not modified. The Hero was copied to the canonical lowercase path and renamed according to the approved specification.
- Existing `Source/` and `assets/Hero/` folders were preserved to avoid destructive reorganization. New canonical asset folders were added only for implementation references.
- The desktop H03 section uses a 300vh sticky sequential progression; tablet/mobile changes to normal stacked reading order below 1024px.
- The language preference is stored as `rebornsoft_lang`; KR remains the fallback default.
- H04 status follows approved bilingual copy: `출시 · 2022` in KR and `RELEASED · 2022` in EN.

## Deviations and unresolved issues

- The approved Hero file is 1672 × 941 rather than the recommended 3840 × 2160 production size; it is acceptable for prototype review but a higher-resolution master is required for production.
- No dedicated mobile Hero crop exists. The same asset is used with responsive `object-position` and a stronger lower overlay.
- Original 7 Cubic UI files are unavailable. Extracted IR-PDF images are explicitly labeled as prototype-only Q3 evidence in H04.
- Official brand logo files are unavailable.
- Actual Intelligent Interaction UI and actual Experience Systems installation photos are unavailable as standalone approved assets.
- The supplied Cityfield contract is scanned/image-based and confirms documentary evidence only; it is not used in this prototype and no completion claim is made.

## Technical limitations

- Fonts use the specified fallback stack without bundled or remote webfonts.
- Single-file HTML with inline CSS/JavaScript; no framework, dependency, WebGL, canvas, or build step.
- `file://` viewing is supported. LocalStorage availability depends on browser policy for local files.

## Responsive decisions

- Desktop: 12-column editorial composition; sticky sequential H03.
- Tablet: simplified flow and full-width project media.
- Mobile: 4-column intent expressed as vertical reading order; full-screen menu; stacked capability content; no sticky dependency; lower-third Hero copy.
- Reduced-motion mode disables reveal timing and scroll-driven Hero/capability transforms.

## Browser/testing notes

- Local HTTP rendering verified in the Codex in-app browser at 1440 × 1000 and mobile viewport.
- Hero image, all 7 Cubic images, language switching, fixed/scrolled navigation, H03 desktop sticky state, mobile stacked state, status metadata, and anchor navigation were checked.
- No broken images, page-level horizontal overflow, or browser console errors were found during final verification.
