# Home Final Punch Pass — Change Trace

## A. Changed Files

- `prototype/index.html`
- `prototype/css/site.css`
- `prototype/js/site.js`

## B. Punch 01 — Capability Node

- 판정: screenshot timing 문제가 아닌 실제 state bug였다.
- root cause: progress markup에는 node가 하나뿐이었고, JavaScript가 `i <= idx` 누적 상태를 사용했다. 따라서 copy/visual은 전환되지만 progress가 현재 상태 하나를 명확히 가리키지 못했다.
- 수정 logic: 기존 line/label/sticky logic을 유지하면서 node를 3개로 구성하고, state 조건을 `i === idx`로 변경했다. 각 node 위치는 `0`, `33.333%`, `66.666%`로 지정했다.
- before: 한 node가 INTELLIGENT 시작점에 머물렀다.
- after: CORE 01/02/03에서 각각 INTELLIGENT/DIGITAL/EXPERIENCE node 하나만 active다.

## C. Punch 02 — CORE 02

- selector: `.product-primary`
- before: `width: 82%; height: 68%`
- after: `width: 72%; height: 60%`
- 실제 7 Cubic primary UI, secondary detail 2개, metadata, sticky sequence는 유지했다.

## D. Punch 03 — Selected Work

- selector: `@media(min-width:1024px) body .selected-work-section .lead-work .work-info`
- change: desktop-only `transform: translateY(-44px)`
- result: 1440 × 900 자연스러운 viewport에서 section heading, Yancheng image, `DELIVERED · 2022`, `옌청 자동차 테마파크`가 함께 보인다. 검증 시 title rect는 viewport y `557–698px`였다.

## E. Locked Areas

Hero, global system, Evolution, CORE 01/03 composition, mobile Capability architecture, Technology Proof/KISA, Current Project, Closing Bridge, copy/status/IA, Company/Capabilities/Work/Contact 페이지는 수정하지 않았다.

## F. Regressions

5개 페이지 × 3개 viewport × 2개 언어, 총 30개 조합에서 언어 mismatch, broken image, horizontal overflow가 없었다. Mobile menu와 KR/EN preference persistence도 정상이다. 명백한 rendering 또는 critical console issue는 발견되지 않았다.
