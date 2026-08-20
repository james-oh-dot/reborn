# LIVE STATUS — 이어서 작업하기 위한 기준점

작성 기준: 2026-08-20 21:25 KST / 커밋 `880400b`  
라이브 실측: `https://rebornsoft.co.kr/` (TLS 인증서 CN=`rebornsoft.co.kr`)

## 1. 라이브 형상

| 항목 | 값 |
| --- | --- |
| 공개 도메인 | `https://rebornsoft.co.kr/` |
| www | `https://www.rebornsoft.co.kr/` → `https://rebornsoft.co.kr/` (301) |
| HTTP apex | `http://rebornsoft.co.kr/` 는 **200** (HTTPS로 강제되지 않음) |
| GitHub Pages | `build_type: workflow`, CNAME `rebornsoft.co.kr`, status `built` |
| Enforce HTTPS | **꺼짐** (`https_enforced: false`) — 인증서는 발급됨 |
| 배포 | `.github/workflows/deploy-pages.yml` (`main` push) |
| 라이브 커밋 | `880400b` — "Add the work2.html list draft and the three SCO layouts (#17)" |
| 로컬/원격 main | `880400b` 와 동일 (ahead 0 / behind 0) |

즉 **라이브 = origin/main = 현재 작업 트리**. 작업 트리에 사이트 수정은 없고, 미추적 `Source/` · `work_in_progress/assets/projects/kadi/` 만 있다. 커밋하지 않는다.

## 2. 배포되는 것과 안 되는 것

워크플로가 `publish/` 로 올리는 대상은 두 가지뿐이다.

- `work_in_progress/prototype/**` → 도메인 루트 (`/index.html`, `/work.html`, …)
- `work_in_progress/assets/**` → `/assets/**` (`.DS_Store`, `_raw/` 제외)
- `work_in_progress/CNAME` → `/CNAME`, 그리고 `.nojekyll` 생성

`Source/`, `docs/`, `review/`, `Prototype/` 등은 리포에는 있지만 도메인에는 올라가지 않는다.
`/docs/`, `/AGENTS.md`, `/Source/` 는 라이브에서 404.

사이트에 반영되어야 하는 수정은 반드시 `work_in_progress/` 안에서 한다. `main`에 머지되는 순간 배포된다.

## 3. 공개 사이트 (내비·푸터에 연결된 페이지)

5페이지: HOME / COMPANY / CAPABILITIES / WORK / CONTACT

| 페이지 | 라이브에서 확인한 상태 |
| --- | --- |
| HOME | 히어로 전시 루프, WIP 배너 없음, 정식 타이틀/OG. 03 제목 **주요 수행 프로젝트** + 보조문구. 카드 8장(옌청·한단·홍대·FIT-M·하나·현대·7 Cubic·Cityfield). 05 SCO 플래그십 밴드. |
| WORK `/work.html` | 기존 카드 그리드 + 드로어. **시안 페이지로 링크하지 않음.** |
| COMPANY / CAPABILITIES / CONTACT | 공개 IA 유지 |

HOME CSS `site.css?v=121`, JS `site.js?v=48`. 서브페이지 CSS는 아직 `?v=118`인 곳이 있다.

## 4. 시안 (공개 내비에는 없음, 주소 직접 입력)

PR #17로 `work.html`은 그대로 두고 시안만 같이 배포했다. `noindex,nofollow`. HOME/WORK에서 링크 0건.

| 경로 | 내용 |
| --- | --- |
| `/work2.html` | 목록 시안. 01을 SCO 카드 3장(TYPE A/B/C)으로 |
| `/project-sco-ark.html` | SCO 상세 · TYPE A 시네마틱 |
| `/project-sco-ark-b.html` | SCO 상세 · TYPE B 에디토리얼 |
| `/project-sco-ark-c.html` | SCO 상세 · TYPE C 인덱스 |

시안이 확정되면 `work2.html`의 01을 `work.html`로 옮기고 noindex를 걷어낸다.  
SCO 시안 카피·이미지는 **2026.07 기획안 콘셉트**이지 시공 결과가 아니다. 공개 승격 전에 Evidence Ledger / 경계 문구를 다시 본다.

## 5. 다음 세션이 이어받을 때

1. `git fetch origin && git log --oneline -1` — HEAD가 `880400b`인지(또는 그 이후인지) 확인
2. 수정은 `work_in_progress/prototype` + `work_in_progress/assets` 에서만
3. 확인이 끝난 변경만 `main`에 올린다
4. 콘텐츠 변경 전 `AGENTS.md` 와 `docs/canonical/` v2.1 (MASTER_FRAMEWORK / EVIDENCE_LEDGER / CODEX_EXECUTION_SPEC). CONTRACTED ≠ DELIVERED, MOU ≠ COMPLETED, IN PROGRESS ≠ COMPLETED
5. `Source/` 와 `kadi/` 원본은 커밋하지 않는다

## 6. 열려 있는 후속 (지시 대기)

코드는 명시 지시 없이 건드리지 않는다. 우선순위만 적어 둔다.

1. **Enforce HTTPS** — 인증서는 발급됨. Pages 설정에서 켜면 HTTP→HTTPS 강제. `james-oh-dot` 소유자 세션 필요.
2. **SCO 시안 선택** — A/B/C 중 확정 후 `work.html` 승격 여부
3. **HOME 03 / WORK 카드** — 공개 카드 UI는 맞춰 둔 상태. 추가 카피·미디어는 지시 후
4. CSS 캐시 버전 — HOME `v=121`, 일부 서브페이지 `v=118` (기능 이슈는 아님)
