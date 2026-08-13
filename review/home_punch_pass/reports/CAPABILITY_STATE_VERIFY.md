# Capability State Verification

검증 환경: local browser, 1440 × 900, zoom 100%, KR. 각 상태는 `.cap-overview`의 실제 scroll position에서 확정한 뒤 캡처했다. 임시 DOM/CSS state 조작은 사용하지 않았다.

## CORE 01

- active copy: `CORE 01 / 지능형 인터랙션`
- active visual: `.cap-visual:nth-child(1).active`
- active node: `INTELLIGENT`, node index `0`
- active class/state: copy `0`, visual `0`, node `0`; node classes `[on, off, off]`
- node computed position / transform: `left: 0px`; transform `none`; viewport x ≈ `58px`

## CORE 02

- active copy: `CORE 02 / 디지털 환경`
- active visual: `.cap-visual:nth-child(2).active` (7 Cubic)
- active node: `DIGITAL`, node index `1`
- active class/state: copy `1`, visual `1`, node `1`; node classes `[off, on, off]`
- node computed position / transform: `left: 179.328px` (`33.333%`); transform `none`; viewport x ≈ `237px`

## CORE 03

- active copy: `CORE 03 / 경험 시스템`
- active visual: `.cap-visual:nth-child(3).active` (Yancheng)
- active node: `EXPERIENCE`, node index `2`
- active class/state: copy `2`, visual `2`, node `2`; node classes `[off, off, on]`
- node computed position / transform: `left: 358.656px` (`66.666%`); transform `none`; viewport x ≈ `416px`

결론: copy, visual, progress node가 세 scroll state에서 1:1로 동기화된다.
