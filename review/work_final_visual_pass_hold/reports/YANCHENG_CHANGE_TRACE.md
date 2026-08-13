# Yancheng Change Trace

## Before ratio

- CSS: `grid-template-columns: 1.15fr .85fr`
- Effective ratio: approximately 57.5 : 42.5

## After ratio

- CSS: `.work-page .work-duo { grid-template-columns:65fr 35fr; }`
- Effective desktop result at 1440×900: 514.305px : 276.938px
- Final ratio: 65 : 35

## Primary

- Simulator
- `assets/projects/yancheng/simulator.png`
- 810×646 PNG
- Role: finished experiential result / curved-screen racing simulator

## Secondary

- Installation
- `assets/projects/yancheng/installation.png`
- 864×592 PNG
- Role: on-site execution documentary evidence

## Responsive behavior

- Desktop 1440×900: 65:35 grid; both images remain 720px high with existing `object-fit:cover` treatment.
- Tablet 820×1180: 65:35 grid retained; verified rendered columns approximately 486.5px : 261.9px.
- Mobile 390×844: existing stacked layout retained; both images render at equal readable width in original sequence.

## Locked areas

Project title, status `DELIVERED · 2022`, copy, lead hierarchy, image files, height, crop treatment, Hongdae and all other WORK sections remain unchanged.

Final balance: PASS.
