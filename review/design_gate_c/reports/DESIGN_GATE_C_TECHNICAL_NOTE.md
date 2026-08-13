# Design Gate C Technical Note

## Global
- Max width: `1760px`; gutter: `clamp(28px,4vw,72px)`, mobile `20px`.
- Grid: 12 columns / 24px gap; tablet layouts collapse at 1023px; mobile refinements at 767px.
- Typography: Display `clamp(52px,7vw,112px)`; section title `clamp(40px,4.8vw,76px)`; body-large `clamp(19px,1.7vw,25px)`.
- Section spacing: `clamp(104px,11vw,184px)`, mobile `96px`.
- Page hero: 72svh desktop, 65svh tablet, 72svh mobile; CSS orbital decoration.

## COMPANY
- Definition uses an offset 12-column statement.
- Evolution uses bordered 2/3/6 phase rows; History uses 2/4/6 timeline rows; both stack on mobile.
- Credibility uses certificate image plus proof rows. Current Chapter uses shared current-grid treatment.
- Motion is shared global reveal/hover behavior.

## CAPABILITIES
- Each Core uses a 4/7 split with a 620px evidence field; mobile stacks text then 72vw evidence.
- No sticky interaction on this long-form page.
- Integration is a separate graphite band with a five-stage horizontal system; mobile becomes vertical.

## CONTACT
- Inquiry list uses 3/7/2 editorial rows, reduced to 3/7 tablet and stacked mobile.
- No form, mailto, verified contact action, or profile download is implemented.

## Known issues
- CONTACT includes public-facing prototype placeholders and no actionable business endpoint.
- Gate C evidence assets are Q3; Yancheng and KISA production originals remain desirable.
- Long English sections increase height but did not overflow or clip.
