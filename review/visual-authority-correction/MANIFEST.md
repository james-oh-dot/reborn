# Visual Authority Correction Manifest

All sizes are bytes. All hashes are SHA-256. `MANIFEST.md` is excluded from its own embedded hash table because a file cannot contain its final self-hash.

## Production Change Integrity

| Production file | Before SHA-256 | After SHA-256 | Change |
|---|---|---|---|
| `prototype/index.html` | `7b8a3af40df6d82483a0a217dd559900f1178ad7413849c925507aaf9421edc6` | `fc7f1770d2c030c2428fe652e2712f3875adcf80ecc99404f51c0d657d92c40b` | Body scope class only |
| `prototype/work.html` | `7c3c98049c96d6fbf89c82bedd56551dba5a9b6e0bff6ed9a44f1811c388a975` | same | Unmodified |
| `prototype/company.html` | `342cbce777b59d797d6cffed8824b2fe2188168bb3bf900af2315b76c9d4ce4f` | `76940ae0a1297595c7de0548cb143488bac6172f542c11e48b27bb7b3e9c70d1` | Body scope class only |
| `prototype/capabilities.html` | `8864ed991b30d8b6deb4c180fe3942c38cf075a924cdc4406cc364a360e98e47` | `d14938cd9f47752ad106d1657f982065ca9ef5d590a92130ea1e93a2bf47168f` | Body scope class only |
| `prototype/contact.html` | `39878c0f2ccd509897234914900c657280601eae29106c1f8848c06c892d9173` | same | Unmodified |
| `prototype/css/site.css` | `16f91fb68fba43eed9d1cf23d8c47542bb37d9b6f2bc76e7ec3a7fac2eba8530` | `085bb4871b9b8aecf70773d02669fe4aeeef593d7e57983455bd51e8cfcd800d` | Visual authority rules appended |
| `prototype/js/site.js` | `d195e5506338e8467f13334ecf0725a08d19512d0d796a72537431669ed959c6` | same | Unmodified |

## Review Package Files

| Relative path | Size | SHA-256 |
|---|---:|---|
| `BEFORE_AFTER_INDEX.md` | 1518 | `66174e6035bd228fd28c1f76e77081f42cd6e624202061284b7a202065d95fbe` |
| `VISUAL_AUTHORITY_IMPLEMENTATION_REPORT.md` | 4279 | `36774b959f57adc7f88cb6e68a7ff73106fcbaccee417009a666a881881f0d3f` |
| `VISUAL_WEIGHT_SECTION_MATRIX.md` | 3054 | `a1740d895c957478a1abf14dafdb78782cedb5d85d5fce02bb24c9345fcc030f` |
| `after/01_HOME_EVOLUTION_1440.png` | 591479 | `b345b8c24543bd8467bf899c64195d2511d7ce22ee4a4c5788b669fecd16dd98` |
| `after/02_HOME_CAPABILITIES_1440.png` | 548518 | `ba45c8f3487c5ff55a50149901968ee0cf908a41d40a8272b70d9bbaa9c717c6` |
| `after/03_HOME_SELECTED_WORK_1440.png` | 630253 | `53f0841b920954a1feaf06cb2d0528651ccdc3cfe5629aa544b2da9c57a2b4a3` |
| `after/04_HOME_TECHNOLOGY_PROOF_1440.png` | 554745 | `dfea635b0a149c0a2c383e9dc5d254000a1f42a1469a63e8ed3279d36bd98ebc` |
| `after/05_HOME_CURRENT_PROJECT_1440.png` | 536693 | `c4c97dac41ce077dac9712780c3926b1b3c9eca4d0ce8b52eb9a60e797e55f5b` |
| `after/06_WORK_NOAH_1440.png` | 524836 | `f49bc80432a97d4e984e6e5bf312ab5a5cc390e93c09ee0b9b8a9d3c11b11f86` |
| `after/07_WORK_YANCHENG_1440.png` | 444385 | `3b843351f1bd89072153ef6dfb301fd3b9f1d89d449ada0dfa02b586e727ea37` |
| `after/08_CAPABILITIES_CORE02_1440.png` | 235634 | `de390a54f2c285609fd8f037252f2e55f98de0e610098936ce1c065bb2dd26f1` |
| `after/09_HOME_MOBILE_390.png` | 159443 | `5e2313dad1057db6c89ae0414f02f58257014564dbb6056395b39aac99ee52f0` |
| `after/10_WORK_NOAH_MOBILE_390.png` | 177067 | `3cd35f83d0c23f2384d8872822e95005daa974fb9dd94e12d6d6424e049d1fae` |
| `after/11_WORK_YANCHENG_MOBILE_390.png` | 151863 | `b583e9ed37f2a7cbce83d5f95b2db57e3ea67d4b369e436b3b1357fa5103eae7` |
| `after/12_CAPABILITIES_MOBILE_390.png` | 142842 | `00ddf852d41044b6ebfd8b093ae52f62e1eff6d5b18359a6ccccc4f611941d33` |
| `before/01_HOME_EVOLUTION_1440.png` | 568232 | `382fb4870d68f2310960e6b55a154d95fa83641f4a835d53040a29e9aa93b411` |
| `before/02_HOME_CAPABILITIES_1440.png` | 575320 | `c073fd862d0da47106dee3ce1ed409061deb470414bd3ae5c56882accfdd129e` |
| `before/03_HOME_SELECTED_WORK_1440.png` | 594682 | `0ed1ad90001653b2ba61aca4b6f77bd97b0dd586d9e505d6d8835a0bb84ef486` |
| `before/04_HOME_TECHNOLOGY_PROOF_1440.png` | 560715 | `db7f8682ee3c5c41c4f39927d189f029c50a30c51e2bda496573fe116ce5f6df` |
| `before/05_HOME_CURRENT_PROJECT_1440.png` | 571218 | `446bc9663bedec35a225c6db4c86b79f4b48e296d567d60bbedb1799d82b5b86` |
| `before/06_WORK_NOAH_1440.png` | 543169 | `fd62cfb23c296f46201e8ba5d1cb60e3f3f637fb33534c58a44999050bc9a330` |
| `before/07_WORK_YANCHENG_1440.png` | 510697 | `1045f1fe8c906a61228e0263517cf6daecc9afa5562701f6adc7723de6add179` |
| `before/08_CAPABILITIES_CORE02_1440.png` | 252013 | `941f8095e7c76dd24b6c2d699313d25a45607d9a42821f51654442094d1ae251` |
| `before/09_HOME_MOBILE_390.png` | 161023 | `87ab798128b7133b90537cc74739ab111d21a3b8a5d3f6d67d1334cc131a320a` |
| `before/10_WORK_NOAH_MOBILE_390.png` | 194021 | `393942a9011a7442947bdb48adbefbb9fa7ab93a7e2b928c10c086866f37b074` |
| `before/11_WORK_YANCHENG_MOBILE_390.png` | 174092 | `4b5936a789df3b77c8f5dfda15fb403edd0caa68d0ca7b7fb138aee4697d4e93` |
| `before/12_CAPABILITIES_MOBILE_390.png` | 144041 | `c6c8ddf5ca91b7dbef58256b3f5ee97c294d1f129b47e0986d7406486c42eca5` |
| `source_snapshot/capabilities.html` | 8732 | `d14938cd9f47752ad106d1657f982065ca9ef5d590a92130ea1e93a2bf47168f` |
| `source_snapshot/company.html` | 12516 | `76940ae0a1297595c7de0548cb143488bac6172f542c11e48b27bb7b3e9c70d1` |
| `source_snapshot/index.html` | 15477 | `fc7f1770d2c030c2428fe652e2712f3875adcf80ecc99404f51c0d657d92c40b` |
| `source_snapshot/site.before.css` | 25062 | `16f91fb68fba43eed9d1cf23d8c47542bb37d9b6f2bc76e7ec3a7fac2eba8530` |
| `source_snapshot/site.css` | 32643 | `085bb4871b9b8aecf70773d02669fe4aeeef593d7e57983455bd51e8cfcd800d` |
