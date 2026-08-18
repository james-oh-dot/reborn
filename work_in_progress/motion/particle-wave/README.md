# Particle Wave — 흐르는 리본 + 반짝이 필드

레퍼런스 이미지(골드 파동 + 글리터)를 **실시간 캔버스 애니메이션**으로 옮긴 것.
같은 코드가 페이지에서 실시간으로 돌고, 프레임 단위로 캡처해 영상으로도 뽑힌다.

```
index.html          데모 — 팔레트/모션 토글, FPS·품질 티어 표시
particle-wave.js    엔진 (의존성 없음, ES 모듈)
```

```js
import { ParticleWave } from './particle-wave.js';
const field = new ParticleWave(canvas, { preset: 'gold' });
field.start();
```

## 왜 영상이 아니라 캔버스인가

홈 히어로 영상은 3.5MB다. 이 필드는 JS 12KB로 같은 계열의 인상을 내고,
해상도에 걸리지 않으며, 팔레트를 런타임에 바꿀 수 있다. 대신 프레임 예산을
직접 관리해야 한다 — 아래 참조.

## 프리셋

| 이름 | 용도 | intensity |
|---|---|---|
| `gold` | 레퍼런스 재현. 골드 / 근접 블랙 | 1.0 |
| `brand` | 같은 필드를 브랜드 레드로. 사이트 히어로가 앉는 강도 | 0.62 |

`PRESETS`에 항목을 추가하면 새 팔레트가 된다. 색은 5단계(어두운 몸통 → 밝은 하이라이트)
+ `core`(크레스트 라인) + `bokeh`.

## 루프는 반드시 닫혀야 한다

모든 움직임이 `loopSeconds` 주기의 **정수배**여야 한다. 즉 새 모션을 넣을 때는
`sin/cos(t * TAU * k)` 또는 `(x + t * k) % 1` 형태로만 쓰고 `k`는 양의 정수여야 한다.

첫 구현은 드리프트를 `t * 0.5`, `t * 0.275` 같은 분수배로 넣었고, 그 결과 t=0과 t=1이
403,200픽셀 중 131,533개(33%)에서 달랐다. 눈으로는 "대충 이어지는 것 같다"로 보였기
때문에 검증 없이는 못 잡는다. 모션을 건드렸으면 아래를 다시 돌릴 것:

```js
// 브라우저 콘솔에서
const f = window.__field; f.stop();
const grab = t => { f.frame(t); return f.ctx.getImageData(0, 0, f.width, f.height).data; };
const a = grab(0), z = grab(1);
let diff = 0;
for (let i = 0; i < a.length; i += 4)
  if (a[i] !== z[i] || a[i+1] !== z[i+1] || a[i+2] !== z[i+2]) diff++;
console.log('differing pixels:', diff);   // 0 이어야 함
```

## 성능 — 품질 티어

`quality: 'auto'`(기본)이면 시작 후 프레임 간격을 재고 예산(`budgetMs`, 기본 22ms ≈ 45fps)을
넘으면 `high → medium → low`로 내려간다. 티어를 고정하려면 `quality: 'high'`.

| 티어 | dpr 상한 | grains | sparks | 워프 컬럼 |
|---|---|---|---|---|
| high | 2 | 30,000 | 1,800 | 144 |
| medium | 1.5 | 17,000 | 1,100 | 112 |
| low | 1 | 8,000 | 520 | 72 |

**측정은 rAF 콜백 간격으로 한다.** `performance.now()`로 draw 호출을 감싸면 안 된다 —
canvas2d는 명령을 큐에 넣고 즉시 반환하므로, 실제로 16fps로 그려지는 동안에도
그 방식은 몇 ms를 보고한다. 처음에 그렇게 짰고 스텝다운이 전혀 발동하지 않았다.

### 두 개의 입자 집단

레퍼런스에는 성격이 다른 두 가지가 있다 — 작고 단단한 글리터, 크고 흐릿한 보케.
둘의 평균으로 하나만 만들면 어느 쪽도 아닌 뭉갠 그림이 된다. 그래서:

- **grain** — 미세한 하드 파티클. 대부분은 평평한 스트립(2048×512)에 미리 굽고,
  프레임마다 파동을 따라 ~144개 전단(shear) 컬럼으로 워프한다. 반짝이는 소수(14%)만
  라이브로 `fillRect`. 굽기 전에는 30,000개 fillRect가 68ms 프레임 중 58ms를 먹었다.
- **sparks** — 후광 있는 점. 미리 만든 radial 스프라이트를 `drawImage`로 찍는다.
  파티클마다 radial gradient를 만들거나 `ctx.filter`를 쓰면 안 된다.

### GPU 관련 주의

canvas2d는 실제 하드웨어에선 GPU 가속이지만 이 저장소의 헤드리스 컨테이너에는 GPU가
없다(SwiftShader). 두 환경은 비용 모델이 **반대**다 — GPU는 채운 픽셀에 관대하고 드로우
콜에 민감하며, 소프트웨어 래스터라이저는 그 반대다. 그래서 여기서 잰 절대 수치
(high 티어 프레임 ~55ms)는 실기기 수치가 아니다. 런타임 자동 티어가 있는 이유다.

## 구성 손잡이

| 옵션 | 뜻 |
|---|---|
| `wave` | 크레스트 중심선 제어점 `[u, v]`. 구도의 뼈대 |
| `bands` | 리본 오프셋. 개수 = 시트 수 |
| `shelf` | 아래쪽 반사면 능선 |
| `density(u, offset)` | 글리터가 몰리는 곳. **균일 분포는 금물** — 재질이 아니라 필터처럼 보인다 |
| `loopSeconds` | 루프 길이 (기본 12) |
| `seed` | 고정 시드. 같은 시드 = 같은 그림 |

## 영상 추출

`t`를 직접 넘길 수 있으므로 렌더 속도와 무관하게 정확한 프레임을 뽑는다.

```js
field.stop();
for (let i = 0; i < N; i++) { field.frame(i / N); /* 캡처 */ }
```

이 저장소 컨테이너의 ffmpeg는 Playwright 번들이라 매우 제한적이다 — 디코더는 MJPEG뿐,
먹서는 WebM뿐, 인코더는 VP8뿐이고 `image2` 시퀀스 디먹서와 `pipe:` 프로토콜이 없다.
그래서 JPEG로 캡처해 하나로 이어붙인 뒤 `image2pipe`로 넣는다:

```sh
cat frames/f*.jpg > all.mjpeg
ffmpeg -f image2pipe -c:v mjpeg -framerate 25 -i all.mjpeg \
       -c:v libvpx -b:v 2400k -pix_fmt yuv420p -auto-alt-ref 0 out.webm
```

## 접근성

`prefers-reduced-motion: reduce`면 정지 프레임(t=0.18)만 그리고 rAF를 돌리지 않는다.
캔버스는 장식이므로 실제 페이지에 얹을 때 `aria-hidden="true"`를 붙일 것.
히어로 카피를 얹는다면 서브페이지 필드와 같은 기준으로 대비를 측정해야 한다 —
이 필드는 그쪽보다 훨씬 밝아서 카피 뒤쪽을 반드시 가려야 한다.
