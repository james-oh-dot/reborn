# 작업 중 (Work In Progress)

공개 사이트 소스는 여기만 씁니다.

- `prototype/` — HOME / COMPANY / CAPABILITIES / WORK / CONTACT
- `assets/` — 페이지가 `../assets/` 로 불러오는 이미지·영상

`Source/`, `docs/`, `review/` 는 이 폴더 밖에 있으며 도메인에 올라가지 않습니다.

도메인 연결(가비아 DNS + GitHub Pages)은 `DOMAIN.md` 를 따릅니다.

## Local Run

```bash
cd work_in_progress
python3 -m http.server 8001
```

브라우저: http://127.0.0.1:8001/prototype/index.html
