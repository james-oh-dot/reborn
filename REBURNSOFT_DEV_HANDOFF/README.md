# Rebornsoft Website — Developer Source Package

현재 Rebornsoft Website를 로컬에서 실행하고 수정하는 데 필요한 Production 소스와 실제 참조 Asset만 선별한 패키지입니다.

## Local Run

패키지 루트(`REBURNSOFT_DEV_HANDOFF/`)에서 정적 HTTP 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 다음 주소를 엽니다.

```text
http://localhost:8000/prototype/index.html
```

별도 빌드, 패키지 설치, Node.js 의존성은 없습니다. `file://`로도 열 수 있지만, 일관된 Asset 로딩과 브라우저 검증을 위해 HTTP 서버 사용을 권장합니다.

## Entry Files

- `prototype/index.html` — HOME
- `prototype/company.html` — COMPANY
- `prototype/capabilities.html` — CAPABILITIES
- `prototype/work.html` — WORK
- `prototype/contact.html` — CONTACT
- `prototype/css/site.css` — 전체 페이지 공통 Production CSS
- `prototype/js/site.js` — 언어 상태, 모바일 메뉴, reveal/sticky interaction을 담당하는 공통 JavaScript

## Folder Structure

```text
REBURNSOFT_DEV_HANDOFF/
├── README.md
├── DEV_HANDOFF.md
├── prototype/
│   ├── index.html
│   ├── company.html
│   ├── capabilities.html
│   ├── work.html
│   ├── contact.html
│   ├── css/site.css
│   └── js/site.js
├── assets/
│   ├── Hero/
│   ├── evidence/
│   ├── products/
│   └── projects/
└── docs/canonical/
    ├── MASTER_FRAMEWORK_v2.1.md
    ├── EVIDENCE_LEDGER_v2.1.md
    └── SCO_PUBLIC_EVIDENCE_LOCK_v1.0.md
```

`assets/`에는 현재 5개 Production HTML이 실제로 참조하는 파일만 포함되어 있습니다. 별도 favicon, webfont 또는 CSS `url()` Resource는 현재 사이트에서 참조하지 않습니다.

## KR / EN Language Behavior

- 기본 언어: KR
- 화면에는 KR 또는 EN 한 언어만 표시됩니다.
- Header와 Mobile Menu의 `KR / EN` 버튼으로 전환합니다.
- HTML의 `data-ko`, `data-en`, `data-alt-ko`, `data-alt-en` 속성을 `prototype/js/site.js`가 적용합니다.
- 선택 언어는 브라우저 `localStorage`의 `rebornsoft_lang`에 저장되어 페이지 간 유지됩니다.
- 언어 전환 시 문서의 `html[lang]` 값도 `ko` 또는 `en`으로 변경됩니다.

## Source Rules

개발 전에 `docs/canonical/`의 세 문서를 읽으십시오. 프로젝트 상태, Evidence 역할, SCO/Noah 공개 경계와 Company Identity를 임의로 변경해서는 안 됩니다.

