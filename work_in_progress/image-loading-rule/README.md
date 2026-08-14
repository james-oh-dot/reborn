# 이미지 로딩 규칙 — 최대 해상도 + 즉시 페인트 (Blur-up)

법무법인 경국 사이트(`gyungkook`)에서 정립한 이미지 파이프라인을 다른 프로젝트에
그대로 옮겨 쓸 수 있도록 일반화한 버전입니다. 프레임워크 종속 부분(React 컴포넌트)은
참고 구현으로 따로 뒀고, 원칙 자체는 프레임워크와 무관합니다.

## 목표 (한 문장)

**원본 화질은 절대 낮추지 않으면서, 화면 진입 즉시 빈 화면 없이 채워지게 한다.**

"화질을 낮춰서 빠르게" 도 "화질은 최상급이지만 늦게 뜬다" 도 답이 아닙니다.
아래 2단계 로드가 둘 다 잡습니다.

## 왜 필요한가

디자이너/기획자에게 받는 원본 사진은 보통 **수 MB급**입니다. 이걸 그대로
`<img src>`에 물리면:

1. 네트워크가 끝나기 전까지 그 자리가 비어 있거나 늦게 나타난다
2. LCP(Largest Contentful Paint)가 나빠진다
3. 모바일/저속망에서는 체감 지연이 훨씬 커진다

그렇다고 최종본 자체를 세게 압축하면 이번엔 상시 화질이 떨어집니다. 그래서
**"즉시성"과 "화질"을 서로 다른 레이어에 맡깁니다.**

## 방법 — Apple / Medium 계열 2단계 로드

```
화면 진입
  ├─ 즉시: 초소형 preview WebP (가로 ~64px, 1~4KB) + CSS blur
  │         → 레이아웃이 바로 채워짐 (빈 화면 없음)
  └─ 동시에: 표시 해상도의 고화질 WebP(q≈90) fetch (병렬, lazy 아님)
       └─ 디코드 완료 후 ~0.2s crossfade → 선명한 최종본
```

| 레이어 | 파일 | 스펙 | 역할 |
|---|---|---|---|
| Preview | `{stem}.preview.webp` | 가로 64px, q≈45 | 즉시 페인트 |
| Full | `{stem}.webp` | 표시 폭에 맞춘 max width, **q=90** | 최종 화질 (타협 없음) |

핵심 원칙: **preview가 즉시성을, full이 화질을 전담한다.** full을 과압축해서
"빠르지만 흐릿하게" 타협하지 않습니다.

## 해상도 / 품질 기준표

목표 표시 크기(CSS px)를 기준으로 삼되, 고DPI 화면(2x)을 감안해 **실제 표시
폭의 최대 2배**까지만 올립니다. 4K 원본을 400px 카드에 그대로 박아 넣지 않습니다.

| 자리 | max width 권장 | quality |
|---|---|---|
| 히어로 / 풀블리드 배경 | 1600~2560px | 90 |
| 섹션 사진 (본문 폭) | 1200~1920px | 90 |
| 카드 / 썸네일 | 600~1200px | 90 |
| 아이콘/서명 등 소형 그래픽 | 원본 그대로 또는 ≤500px | 90 |
| preview (항상 고정) | 64px | 45 |

측정 예시 (실제 도입 사례):

- 6.9MB 원본 → full 842KB + preview 0.4KB
- 5.7MB 원본 → full 281KB + preview 0.3KB

## 구현 계약 — 이 5가지는 반드시 지킬 것

프레임워크와 무관하게 적용되는 하드 룰입니다. React 참고 구현(`react/`)은 이걸
그대로 코드로 옮긴 것입니다.

1. **preview + full은 같은 박스에 절대(absolute) 스택.** `position: absolute; inset: 0`
   두 레이어를 겹쳐 쌓습니다. **in-flow로 세로 배치하면 안 됩니다** — 부모가
   `overflow: hidden` + 고정 높이인 경우(카드, 히어로 등 거의 항상), full 레이어가
   preview **아래**로 잘려나가 "로드 완료(ready)"인데도 빈 구멍만 보이는 버그가
   생깁니다. 실제로 겪은 장애이고, 원인 파악에 제일 오래 걸렸던 부분입니다.
2. **full은 항상 즉시(eager) fetch, 절대 `loading="lazy"` 금지.** blur-up은 두
   레이어가 병렬로 받아져야 성립합니다. lazy를 걸면 화면 밖 요소의 `currentSrc`가
   빈 채로 남아 preview에 영구 고정되는 버그가 있었습니다.
3. **"로드 완료" 판정은 캐시 히트를 반드시 커버.** `onLoad` 이벤트만 믿으면
   브라우저가 캐시에서 즉시 그려버린 경우 이벤트가 안 오거나 늦게 와서 화면이
   깜빡이거나 계속 blur 상태로 남습니다. `img.complete && naturalWidth > 0`을
   레이아웃 이펙트(마운트 동기 시점)에서 직접 체크하세요.
4. **crossfade는 짧게(0.2s 전후).** 너무 길면 두 장이 겹쳐 보이는 이중 노출
   착시가 생깁니다. `prefers-reduced-motion: reduce`에서는 전환/블러를 없앱니다.
5. **LCP 후보(히어로, 첫 화면 카드)는 `fetchpriority="high"` + `<link rel="preload">`.**
   나머지는 auto/기본 우선순위로 충분합니다.

## 하지 않는 것

- full을 과압축해서 "처음부터 선명하지만 화질 나쁜" 타협을 하는 것
- BlurHash/색 블록만으로 끝내는 것 (사진이 실제로 안 보임)
- full을 lazy로 미뤄서 preview만 오래 방치하는 것 (above-fold는 특히 금지)
- 표시 크기보다 훨씬 큰 원본을 그대로 재인코딩만 해서 쓰는 것 (용량 낭비)
- preview/full을 in-flow 블록으로 세로 배치하는 것 (1번 하드 룰 위반)
- `ProgressiveImage` 래퍼에 크기를 안 준 채 absolute 레이어만 두는 것 (박스 높이 0)

## 파일 구조 & 파일명 규칙

한 장의 사진은 **파일 3개**로 존재합니다.

| 파일 | 역할 | 런타임에서 로드? |
|---|---|---|
| `{이름}.jpg` / `.png` (원본) | 마스터, 변환 스크립트 입력 | ✗ |
| `{이름}.webp` | 최종 화질 | ✓ |
| `{이름}.preview.webp` | 즉시 표시용 | ✓ |

**코드에서는 확장자를 쓰지 않습니다.** 하나의 stem(경로, 확장자 제외)에서
`.webp` + `.preview.webp` 두 경로를 만드는 헬퍼 함수 하나만 씁니다
(`react/src/utils/progressiveImage.ts` 참고). 컴포넌트나 데이터 파일에
`.jpg`/`.png` 원본 경로를 직접 박지 마세요.

원본은 손대지 않고 그대로 보관합니다(재변환 시 소스 오브 트루스). webp 쌍은
**손으로 만들지 말고 스크립트로만 생성**합니다.

## 재사용 방법

이 폴더를 그대로 새 프로젝트에 복사해서 씁니다.

```
image-loading-rule/
├─ README.md                          이 문서
├─ scripts/
│  └─ generate-progressive-images.py  webp 쌍 생성 스크립트 (매니페스트 기반)
└─ react/
   └─ src/
      ├─ components/
      │  ├─ ProgressiveImage.tsx      blur-up UI 컴포넌트
      │  └─ ProgressiveImage.css
      └─ utils/
         └─ progressiveImage.ts       stem → { src, preview } 헬퍼
```

### 1. 스크립트 설치

`scripts/generate-progressive-images.py`를 프로젝트의 `scripts/`에 복사합니다.
Pillow가 필요합니다: `pip install Pillow`.

프로젝트 루트(정적 자산 폴더) 옆에 `progressive-images.manifest.json`을 만듭니다.
gyungkook처럼 파일마다 크기가 다르면 개별 지정, 대부분 비슷하면 `defaults`만
씁니다.

```json
{
  "root": "public/assets",
  "defaults": { "max_width": 1600, "quality": 90 },
  "preview": { "width": 64, "quality": 45 },
  "targets": [
    { "path": "hero/hero-01.jpg", "max_width": 1920 },
    { "path": "cards/*.jpg", "max_width": 900 },
    { "path": "icons/signature.png", "max_width": 500, "quality": 95 }
  ]
}
```

- `targets[].path`는 `root` 기준 상대 경로이고 glob(`*`)을 지원합니다.
- `max_width` / `quality`를 생략하면 `defaults`를 씁니다.
- 실행: `python3 scripts/generate-progressive-images.py` (전체) 또는
  `python3 scripts/generate-progressive-images.py hero-01.jpg` (일부만, 파일명 부분일치).

### 2. React 컴포넌트 설치

`react/src/components/ProgressiveImage.{tsx,css}`와
`react/src/utils/progressiveImage.ts`를 프로젝트에 복사합니다. 외부 의존성 없음
(React만 사용).

```tsx
import { ProgressiveImage } from './components/ProgressiveImage'
import { progressiveAsset } from './utils/progressiveImage'

const hero = progressiveAsset('/assets/hero/hero-01')
// → { src: '/assets/hero/hero-01.webp', preview: '/assets/hero/hero-01.preview.webp' }

<ProgressiveImage src={hero.src} preview={hero.preview} alt="…" priority />
```

`priority`는 above-the-fold(히어로, 첫 화면 카드)에만 true로 줍니다.

### 3. React가 아닌 프로젝트

원칙(위 "구현 계약" 5가지)은 그대로 적용하되, 컴포넌트 대신 다음 형태로
구현합니다.

```html
<div class="progressive-image" data-progressive>
  <img class="progressive-image__preview" src="hero-01.preview.webp" alt="" aria-hidden="true" loading="eager" />
  <img class="progressive-image__full" src="hero-01.webp" alt="…" loading="eager"
       onload="this.closest('[data-progressive]').classList.add('is-ready')" />
</div>
```

CSS는 `react/src/components/ProgressiveImage.css`를 그대로 가져다 씁니다
(React 전용 코드 없음, 순수 CSS). 캐시 히트 판정만 JS로 보강하세요:

```js
document.querySelectorAll('.progressive-image__full').forEach((img) => {
  if (img.complete && img.naturalWidth > 0) {
    img.closest('[data-progressive]').classList.add('is-ready')
  }
})
```

## 새 프로젝트에 AGENTS.md / CLAUDE.md로 넣을 규칙 블록

AI 코딩 어시스턴트가 프로젝트 규칙 파일을 참고하는 경우, 아래를 그대로
붙여넣으면 gyungkook에서와 같은 실수를 반복하지 않습니다.

```markdown
### 이미지 로딩 (blur-up, 최대 해상도 유지)
- 사진은 항상 `{stem}.webp`(q=90, 표시 크기에 맞춘 max width) +
  `{stem}.preview.webp`(64px, q=45) 쌍으로 쓴다. 원본 `.jpg`/`.png`를
  `<img src>`에 직접 물리지 않는다.
- 두 레이어는 반드시 `position: absolute; inset: 0`으로 같은 박스에 겹쳐
  쌓는다. in-flow로 세로 배치 금지 — overflow:hidden 부모가 full을 클리핑해서
  "로드 완료인데 빈 화면" 버그가 난다.
- full은 항상 eager 로드. `loading="lazy"`를 걸지 않는다.
- "로드 완료" 판정은 `img.complete && naturalWidth > 0`을 마운트 시점에 직접
  체크한다(onLoad만 믿지 않는다) — 캐시 히트 시 이벤트가 안 온다.
- 새 사진을 추가하면 매니페스트에 등록하고
  `python3 scripts/generate-progressive-images.py`로 재생성한다. webp 쌍을
  손으로 만들지 않는다.
```
