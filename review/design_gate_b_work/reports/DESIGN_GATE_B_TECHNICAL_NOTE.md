# Design Gate B Technical Note

## Global

- Page width: `.wrap { width:min(100%,1760px); margin:auto; }`; 1440 viewport에서는 full width.
- Gutters: `clamp(28px,4vw,72px)`; 1440에서 57.6px, mobile에서 20px.
- Grid: shared 12-column utility; WORK uses local 4/7, 7/4, 4/6, 2-column and 3-column systems.
- Major breakpoints: 1023px and 767px.
- Typography: Pretendard, Inter, Arial, Noto Sans KR fallback; display 52–112px, section title 40–76px, editorial headings responsive.
- Background rhythm: dark Hero → graphite Current Flagship → light Selected Work → two dark systems sections → two light evidence sections → graphite Closing → dark Footer.

## WORK Hero

- Height: desktop 72svh (648px at 1440×900), tablet 65svh via breakpoint, mobile restored to 72svh.
- Visual behavior: no image; CSS circular border field positioned at lower-right.
- Motion: page elements rely on general body load/reveal system; no WORK-specific scroll interaction.

## Current Flagship

- Layout: desktop 4fr title/status + 7fr copy/visual with 8.33vw gap; grid-line background.
- Image treatment: no image exists. Bordered placeholder is public-facing.
- Status treatment: blue-soft `IN PROGRESS` style separated from heading.
- Desktop/mobile: stacked at ≤1023px; copy block receives top margin on mobile.

## Selected Work

- Hierarchy: Yancheng lead 7fr/4fr with dual media; Hongdae secondary 4fr/6fr; Hyundai/FIT-M/Hana in 2-column editorial system.
- Image ratios: lead height up to 720px; secondary up to 560px; editorial thumbs 230px desktop / 190px mobile.
- Hover: `.media:hover img { transform:scale(1.015) }` with 0.7s easing.
- Metadata: uppercase 11px status with letter spacing; titles scale by hierarchy.

## Responsive

- Desktop 1440×900: editorial splits and paired evidence are maintained; no horizontal overflow.
- Tablet 820×1180: navigation switches to menu; current/lead/secondary become one column while editorial cases stay paired.
- Mobile 390×844: all project systems stack; lead duo images become consecutive 72vw images; facts and engagements stack.

## Motion

- Reveal: `.reveal` supports opacity/translate transition, although current WORK markup does not apply the class to its sections.
- Sticky: none on WORK.
- Hover: media 1.5% scale and link arrow translate.
- Transition: header blur/background on scroll; language text swaps without page reload.
- Reduced motion media query is present.

## Known Rendering Issue

- SCO flagship visual is a placeholder rather than evidence imagery.
- Hongdae 347×201 source is rendered around 752×560 with `cover`, causing visible softness.
- W03 omitted because no SCO documentary/concept image exists; a separate detail capture would duplicate W02's placeholder.
- No broken images, horizontal overflow, or critical console error observed.
