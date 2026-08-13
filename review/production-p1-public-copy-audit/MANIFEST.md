# Production Pass P1 Package Manifest

Package root: `production-p1-public-copy-audit/`

Audit mode: AUDIT ONLY  
Production modification: NONE  
Canonical modification: NONE  
Asset modification: NONE

## Package contents and SHA-256

| Path | SHA-256 |
|---|---|
| P1_COPY_CHANGE_MATRIX.md | `e73c1a8c1075b5b9acf984e4e0be00b9f2f90273773117ff77ad3e316271a59d` |
| P1_CURRENT_PUBLIC_COPY_INVENTORY.md | `3c7e561c8b7f3c42442351e354fa4be07e8c9e986f01fac203ff4cecc7ad61b3` |
| P1_PASS_SUMMARY.md | `75772509d443f11b45962c4eed8f47c62ab21f49f930a2247060bd2eff0c8133` |
| P1_PUBLIC_COPY_AUDIT.md | `8626e1a487b05f08e2294ca3a033e946810b81e7a197c69c416632e0dda74311` |
| P1_RENDERED_VISIBLE_COPY_CAPTURE.md | `5c9382d115769ce201acc1d4fee2b76641e07fc1e4eb691657ca303ded782967` |
| canonical_review/EVIDENCE_LEDGER_v2.1.md | `3a9b12b1008f4f2551ce45042ce52ac91a1f55b0e5a5bfa9403c041139a2f55b` |
| canonical_review/MASTER_FRAMEWORK_v2.1.md | `b60ee250192d1f68a600d61268a693d2dde50d42581a653caad214da829135c7` |
| canonical_review/SCO_PUBLIC_EVIDENCE_LOCK_v1.0.md | `2a3807b82e7818df9422c45fbdb1dff5e65c5d5b6e35172f36b0f87fb17673f4` |
| screenshots/P1_CONTACT_ENDPOINT_EN_1440.png | `91740b45081470384b1a0fbf74c69c15cab4edc3bdfe9255bf7f45aa53bab1b3` |
| screenshots/P1_CONTACT_ENDPOINT_KR_1440.png | `f132ce0003c579e2223083782fa0f5eb7d8abd9c331ed7f0041075c7c0e61070` |
| screenshots/P1_MOBILE_NAV_EN_390.png | `a6f07a07dd2ff241aee73b3f2d2b161f05c0fe3228fdcdd50673591cbba0d7c8` |
| screenshots/P1_MOBILE_NAV_KR_390.png | `7e70ffddbb0d082aa3fca08b9c48c54992bf1797174dd20eef65d756616a3ea9` |
| screenshots/P1_WORK_DISCLAIMER_EN_1440.png | `be85516de737d6bed3e355deade4696bef7c8304499704475b15072e67c79c2d` |
| screenshots/P1_WORK_DISCLAIMER_KR_1440.png | `dc37b486dfb581c0a3c0d8d2898343cb2e55d8a82c442f9ee645d2eaa0b5abac` |
| source_snapshot/capabilities.html | `8864ed991b30d8b6deb4c180fe3942c38cf075a924cdc4406cc364a360e98e47` |
| source_snapshot/company.html | `342cbce777b59d797d6cffed8824b2fe2188168bb3bf900af2315b76c9d4ce4f` |
| source_snapshot/contact.html | `39878c0f2ccd509897234914900c657280601eae29106c1f8848c06c892d9173` |
| source_snapshot/index.html | `7b8a3af40df6d82483a0a217dd559900f1178ad7413849c925507aaf9421edc6` |
| source_snapshot/site.js | `d195e5506338e8467f13334ecf0725a08d19512d0d796a72537431669ed959c6` |
| source_snapshot/work.html | `7c3c98049c96d6fbf89c82bedd56551dba5a9b6e0bff6ed9a44f1811c388a975` |

`MANIFEST.md` is intentionally excluded from its own embedded hash table because a file cannot contain its final self-hash. Its actual hash is validated in the ZIP extraction comparison.

## Source snapshot rule

`site.css` is not included because source and computed-style audits found no readable `content:` text. Only empty decorative pseudo-elements exist.

## ZIP verification rule

The final ZIP SHA-256 is reported externally in the completion report because embedding a ZIP's final hash inside that same ZIP is self-referential. The ZIP is unpacked to a temporary directory and compared file-for-file with this package directory.
