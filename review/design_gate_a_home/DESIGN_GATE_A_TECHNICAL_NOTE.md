# Design Gate A — HOME Technical Note

현재 Working Baseline의 동작을 사실 기준으로 기록한다. 디자인 평가나 변경 제안은 포함하지 않는다.

## 1. Desktop max-width / Grid

- `.wrap` 최대 폭: `1760px`
- 좌우 gutter: `clamp(28px, 4vw, 72px)`
- 기본 grid: 12 columns, `24px` gap
- Section vertical spacing: `clamp(104px, 11vw, 184px)`

## 2. Breakpoints

- `max-width: 1023px`: Desktop navigation을 mobile menu로 전환하고 Capability sticky를 stacked sequence로 변경
- `max-width: 767px`: gutter `20px`, section spacing `96px`, 주요 grid를 단일 column으로 변경
- `prefers-reduced-motion: reduce`: transition/animation duration 최소화, smooth scroll 해제, reveal을 즉시 표시

## 3. Typography

- Font stack: Pretendard, Inter, Arial, Noto Sans KR, sans-serif
- Hero KR: `clamp(52px, 6.1vw, 92px)`, line-height `1.02`
- Hero EN: `clamp(58px, 6.8vw, 108px)`, line-height `.95`
- Mobile Hero KR: `clamp(43px, 12vw, 58px)`; EN: `clamp(46px, 12vw, 61px)`
- Section title: `clamp(40px, 4.8vw, 76px)`, line-height `1.03`
- Large body: `clamp(19px, 1.7vw, 25px)`, line-height `1.6`
- Standard copy: `16px`, line-height `1.72`
- Meta/eyebrow/status: `11px` 계열, uppercase/letter-spacing 적용

## 4. Hero sizing / crop

- Desktop Hero와 inner container는 최소 `100svh`
- Hero image는 absolute fill, 높이 `104%`, `object-fit: cover`, 기본 `object-position: center`
- 1023px 이하 최소 높이는 `max(92svh, 700px)`
- 767px 이하 image position은 `60% center`; shade는 좌우형에서 세로형 gradient로 전환

## 5. Capability sticky / scroll

- Desktop `.cap-overview`: `min-height: 280vh`
- `.cap-sticky`: top `0`, height `100svh`, sticky
- JavaScript는 폭 `1024px` 이상에서 section scroll progress를 세 구간으로 계산해 active copy/visual/node를 변경
- 1023px 이하에서는 sticky/visual panel을 해제하고 세 Capability와 mobile evidence를 순서대로 표시

## 6. Reveal / motion

- `body.loaded`가 Hero image scale/fade와 네 개 Hero copy 요소의 staggered entrance를 활성화
- 일반 `.reveal`은 opacity `0`, translateY `28px`에서 `.8s` transition
- IntersectionObserver threshold `.15`, bottom root margin `-8%`에서 `.visible` 적용
- Header는 scrollY `48px` 이후 translucent background, blur, divider를 적용

## 7. Image object-fit

- 일반 `.media img`: `object-fit: cover`
- Capability/Selected Work의 FIT-M·Hana thumb 및 proof image: `contain`
- Capability mobile Hana evidence는 `.contain`; 7 Cubic/Yancheng mobile evidence는 `cover`
- 일반 media hover는 image scale `1.015`

## 8. KR / EN switching

- 기본 문서 언어는 KR
- `[data-ko][data-en]` text와 `[data-alt-ko][data-alt-en]` alt를 JavaScript가 교체
- 선택 언어는 `rebornsoft_lang` 키로 저장되며 페이지 간 유지
- `<html lang>`과 language button의 active/`aria-pressed` 상태를 함께 갱신

## 9. Mobile navigation

- 1023px 이하에서 `MENU` trigger가 표시됨
- 전체 viewport fixed panel을 열고 `body.menu-open`으로 배경 scroll을 차단
- 링크 선택 또는 Escape 입력으로 닫힘
- Mobile panel 내부에 별도 KR/EN controls 존재

## 10. Known technical observations

- 검수 캡처 시 HOME content image 요청은 모두 정상 응답했으며 horizontal overflow는 확인되지 않음
- 문서에 favicon 선언이 없어 로컬 서버에서 `/favicon.ico` 요청이 404로 기록됨
- Desktop Full-page screenshot은 `position: sticky` Capability 구간을 브라우저의 full-page stitching 방식으로 기록하므로 동일 sticky stage가 여러 viewport segment에 나타날 수 있음

## Prototype integrity baseline

Review Package 생성 전 SHA-256:

- `prototype/index.html`: `2b7dd796604251e57d36e5da0d21296313bc8c628171b73f5aabffdbbf642370`
- `prototype/css/site.css`: `c19db633e49cdba0ae8e69a8a301123964f20e9fb91a64d14ee2f4d297b417d6`
- `prototype/js/site.js`: `36ce77f09347d8b1d860c50bd7e586fe13ac8304206f4d5dde8dae4ce92a5148`
