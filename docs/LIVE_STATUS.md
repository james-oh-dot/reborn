# LIVE STATUS — 이어서 작업하기 위한 기준점

작성 기준: 2026-08-20 / 커밋 `737e24f`

## 1. 라이브 형상

| 항목 | 값 |
| --- | --- |
| 도메인 | rebornsoft.co.kr (`work_in_progress/CNAME`) |
| 배포 방식 | GitHub Pages, `.github/workflows/deploy-pages.yml` (`main` push / 수동 실행) |
| 마지막 배포 | run #7, `737e24f`, success |
| 라이브 커밋 | `737e24f` — "Retitle HOME selected work and add a support line under it." |
| 로컬/원격 main | `737e24f` 와 동일 (ahead 0 / behind 0) |

즉 **라이브 = origin/main = 현재 작업 트리**이며, 미배포 변경분이나 열려 있는 PR은 없다.

## 2. 배포되는 것과 안 되는 것

워크플로가 `publish/` 트리로 올리는 대상은 두 가지뿐이다.

- `work_in_progress/prototype/**` → 도메인 루트 (`/index.html`, `/work.html`, …)
- `work_in_progress/assets/**` → `/assets/**` (`.DS_Store`, `_raw/` 제외)
- `work_in_progress/CNAME` → `/CNAME`, 그리고 `.nojekyll` 생성

`Source/`, `docs/`, `review/`, `Prototype/`, `prototype_reference_v2|v3`,
`REBURNSOFT_DEV_HANDOFF/` 는 리포에는 있지만 도메인에는 올라가지 않는다.
따라서 **사이트에 반영되어야 하는 수정은 반드시 `work_in_progress/` 안에서** 해야 한다.

## 3. 현재 사이트 구성

페이지 5종: `index.html`, `company.html`, `capabilities.html`, `work.html`, `contact.html`

- CSS: `css/site.css` (약 138KB), `css/cap-flow.css`, `css/progressive-image.css`
- JS: `js/site.js` (약 74KB), `js/particle-wave.js`, `js/hero-screen.js`,
  `js/hero-screen-mount.js`, `js/hero-field.js` — 전부 바닐라 JS
- assets: `projects/` 약 98MB, `Hero/` 약 24MB, `products/` 약 8MB, `evidence/`,
  파비콘 세트 + `og-image.png`

최근 반영된 항목: WIP 배너 제거 및 정식 메타/OG/파비콘 게시, HOME 히어로 전시 루프,
HOME selected work 레일(한단 카드 포함) 과 Work 페이지 정합, 커스텀 도메인 고정.

## 4. 무결성 점검 (이번 확인분)

- `work_in_progress/prototype` 안의 모든 `../assets/...` 참조가 실제 파일로 해석됨 — 깨진 링크 0건
- 배포에서 제외되는 `_raw/` 를 참조하는 코드 없음
- `../assets/` 밖을 가리키는 상대 경로 참조 없음
- 워크플로 최근 7회 전부 success

## 5. 다음 세션이 이어받을 때

1. `git fetch origin main && git log --oneline -1` 로 라이브 커밋이 여전히 위 값인지 확인
2. 사이트 수정은 `work_in_progress/prototype` + `work_in_progress/assets` 에서만
3. `main` 에 머지되는 순간 배포되므로, 확인이 끝난 변경만 올린다
4. 이 환경에서는 egress 프록시가 `rebornsoft.co.kr` 를 막고 있어 실제 페이지를
   직접 받아볼 수 없다. 라이브 형상 확인은 위와 같이 **배포 워크플로 run + 커밋 SHA**
   기준으로 판단한다.
5. 콘텐츠/문구 변경 전에는 `AGENTS.md` 와 `docs/canonical/` 의 v2.1 문서
   (MASTER_FRAMEWORK / EVIDENCE_LEDGER / CODEX_EXECUTION_SPEC) 를 먼저 확인한다.
   CONTRACTED ≠ DELIVERED, MOU ≠ COMPLETED 원칙이 카피에 그대로 적용된다.

## 6. 시안 확인 경로 (라이브 목록은 그대로)

GitHub Pages의 `github-pages` 환경은 기본 브랜치에서만 배포를 허용한다. 그래서 브랜치를
`/preview/<slug>/` 로 올리는 워크플로는 러너를 받기 전에 거부됐고, 결국 **별도 URL을 본문에
같이 배포하는 방식**으로 바꿨다. (권한을 열려면 Settings → Environments → `github-pages` →
Deployment branches 에 `claude/*` 추가. 여는 경우 `deploy-preview.yml` 을 되살리면 된다 —
git 이력에 남아 있다.)

현재 구조:

| 경로 | 내용 |
| --- | --- |
| `/work.html` | 라이브 프로젝트 페이지. **변경 없음** |
| `/work2.html` | 새 목록 시안 — 01을 큰 비주얼 카드 3장으로. 어디에서도 링크하지 않음 |
| `/project-sco-ark.html` | SCO 상세 · TYPE A 시네마틱 |
| `/project-sco-ark-b.html` | SCO 상세 · TYPE B 에디토리얼 |
| `/project-sco-ark-c.html` | SCO 상세 · TYPE C 인덱스 |

시안 4종에는 `noindex,nofollow` 를 걸어 검색에 노출되지 않게 했다. 링크가 어디에도 없으므로
주소를 직접 입력해야 들어갈 수 있다. 시안이 확정되면 `work2.html` 의 01 섹션을 `work.html` 로
옮기고 noindex를 걷어내면 된다.
