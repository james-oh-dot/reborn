# 가비아 도메인 → 이 사이트 연결

구매한 도메인을 **가비아 DNS**에 두고, 실제 사이트는 **GitHub Pages**가 호스팅합니다.  
도메인 루트(`https://도메인/`)에는 `work_in_progress`의 공개 페이지만 올라갑니다. `Source/`, `docs/`, `review/` 같은 저장소 나머지는 공개되지 않습니다.

가비아 **웹 포워딩**은 쓰지 마세요. 주소만 넘기거나 iframe으로 감싸서 HTTPS·북마크가 깨집니다. **DNS 레코드**로 연결합니다.

---

## 0. 한 번만 하는 GitHub 설정

1. 이 저장소를 `main`에 푸시합니다. `Deploy site` 워크플로가 `work_in_progress/prototype` + `assets`만 Pages로 올립니다.
2. GitHub 저장소 → **Settings** → **Pages**
   - **Source**: **GitHub Actions** (Branch / `main` / root 가 아님)
3. 첫 배포가 끝나면 주소는 당분간 이렇게 됩니다.  
   `https://james-oh-dot.github.io/reborn/`
4. 같은 Pages 화면에서 **Custom domain**에 구매한 도메인을 넣습니다.  
   - 루트만 쓸 때: `rebornsoft.com`  
   - www를 대표로 쓸 때: `www.rebornsoft.com`  
   하나만 적습니다. GitHub가 나머지를 그쪽으로 리다이렉트합니다.
5. DNS가 잡히면 **Enforce HTTPS**에 체크합니다. 회색이면 아직 인증서가 안 나온 상태입니다. 보통 수분, 최대 하루입니다.

도메인 이름을 이 저장소에도 심어두면 배포마다 같이 나갑니다.

```bash
# work_in_progress/CNAME  — 확장자 없이, 한 줄만
www.rebornsoft.com
```

`CNAME.example`을 복사해 만들고, 실제 도메인으로 고친 뒤 커밋하면 됩니다.

---

## 1. 가비아 DNS 레코드

가비아 로그인 → **마이가비아** → **서비스 관리** → 해당 도메인 → **DNS 관리**  
(화면 이름이 **네임호스트 DNS**, **DNS 설정**인 경우도 같습니다.)

가비아 주차/기본 홈페이지용 **A 레코드가 이미 있으면 삭제**한 뒤 아래만 남깁니다. 예전 레코드가 남아 있으면 GitHub HTTPS가 발급되지 않습니다.

### 루트 도메인 (`rebornsoft.com`처럼 www 없는 주소)

| 타입 | 호스트 | 값 / 연결 주소 | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 600 또는 3600 |
| A | `@` | `185.199.109.153` | 같게 |
| A | `@` | `185.199.110.153` | 같게 |
| A | `@` | `185.199.111.153` | 같게 |

가능하면 IPv6도 같이:

| 타입 | 호스트 | 값 |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

가비아에서 호스트 `@`가 안 되면 **비워 두거나** 도메인 이름 그대로 넣는 UI입니다.

### www

| 타입 | 호스트 | 값 |
| --- | --- | --- |
| CNAME | `www` | `james-oh-dot.github.io` |

값 끝에 점(`.`)을 요구하면 `james-oh-dot.github.io.` 로 넣습니다.  
**저장소 경로(`/reborn`)는 넣지 않습니다.**

저장 후 `dig` 또는 가비아의 DNS 조회로 A / CNAME이 위와 같은지 확인합니다. 전파는 보통 수분, 길면 몇 시간입니다.

---

## 2. 확인 순서

1. GitHub Actions 탭에서 **Deploy site** 가 초록인지
2. `https://james-oh-dot.github.io/reborn/` 에 홈이 열리는지 (`/work_in_progress/prototype/` 가 아님)
3. 브라우저에서 `http://구매도메인` → GitHub 사이트로 가는지
4. GitHub Pages에서 DNS 체크가 통과한 뒤 **Enforce HTTPS**
5. `https://구매도메인` 과 `https://www.구매도메인` 둘 다 열리는지

---

## 3. 가비아 웹호스팅을 이미 쓰는 경우

도메인에 **가비아 호스팅 A 레코드**가 묶여 있으면 GitHub IP로 바꿀 수 없습니다. 둘 중 하나입니다.

- **GitHub Pages를 쓴다** (권장): 호스팅 연결을 끊고 위 DNS만 남긴다. HTTPS는 GitHub가 처리합니다.
- **가비아 호스팅에 올린다**: FTP/SFTP로 `work_in_progress/prototype/` 내용과 `work_in_progress/assets/` 폴더를 웹 루트에 올립니다. HTML이 `../assets/` 를 쓰므로 서버에서 구조가 이렇게 되어야 합니다.

  ```
  (웹 루트)/index.html          ← prototype/index.html
  (웹 루트)/company.html
  (웹 루트)/assets/             ← work_in_progress/assets/
  ```

  가비아 호스팅은 별도 SSL 신청이 필요할 수 있습니다.

---

## 4. 로컬 미리보기 (배포와 무관)

```bash
cd work_in_progress
python3 -m http.server 8001
```

브라우저: http://127.0.0.1:8001/prototype/index.html
