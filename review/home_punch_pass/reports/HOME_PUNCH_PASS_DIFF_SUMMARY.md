# Home Final Punch Pass — Diff Summary

## FILE: `prototype/index.html`

WHY: Capability progress가 세 상태를 각각 표현하도록 state target을 제공.

SELECTOR / FUNCTION: `.integration-line`

BEFORE: progress node `<i>` 1개.

AFTER: 동일 line 안에 node `<i>` 3개. label과 line 구조는 유지.

## FILE: `prototype/js/site.js`

WHY: 누적 progress가 아니라 현재 Capability state 하나만 표시.

SELECTOR / FUNCTION: `updateCap()`의 `nodes.forEach`.

BEFORE: `i <= idx`

AFTER: `i === idx`

## FILE: `prototype/css/site.css`

WHY: node 위치 지정, CORE 02 visual weight 축소, Yancheng title 노출 시점 개선.

SELECTOR / FUNCTION: `.integration-line i:nth-of-type(...)`, `.product-primary`, desktop `.selected-work-section .lead-work .work-info`.

BEFORE: node 1개/시작 위치; primary `82% × 68%`; work info offset 없음.

AFTER: nodes `0 / 33.333 / 66.666%`; primary `72% × 60%`; desktop work info `translateY(-44px)`.
