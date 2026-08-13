# Reference-Locked V2 Manifest

All sizes are bytes and all hashes are SHA-256. `MANIFEST.md` is excluded from its own embedded hash table because a file cannot contain its final self-hash.

## V1 Integrity

| V1 file | Before SHA-256 | After SHA-256 | Result |
|---|---|---|---|
| `prototype/index.html` | `fc7f1770d2c030c2428fe652e2712f3875adcf80ecc99404f51c0d657d92c40b` | `fc7f1770d2c030c2428fe652e2712f3875adcf80ecc99404f51c0d657d92c40b` | PASS |
| `prototype/work.html` | `7c3c98049c96d6fbf89c82bedd56551dba5a9b6e0bff6ed9a44f1811c388a975` | `7c3c98049c96d6fbf89c82bedd56551dba5a9b6e0bff6ed9a44f1811c388a975` | PASS |
| `prototype/company.html` | `76940ae0a1297595c7de0548cb143488bac6172f542c11e48b27bb7b3e9c70d1` | `76940ae0a1297595c7de0548cb143488bac6172f542c11e48b27bb7b3e9c70d1` | PASS |
| `prototype/capabilities.html` | `d14938cd9f47752ad106d1657f982065ca9ef5d590a92130ea1e93a2bf47168f` | `d14938cd9f47752ad106d1657f982065ca9ef5d590a92130ea1e93a2bf47168f` | PASS |
| `prototype/contact.html` | `39878c0f2ccd509897234914900c657280601eae29106c1f8848c06c892d9173` | `39878c0f2ccd509897234914900c657280601eae29106c1f8848c06c892d9173` | PASS |
| `prototype/css/site.css` | `085bb4871b9b8aecf70773d02669fe4aeeef593d7e57983455bd51e8cfcd800d` | `085bb4871b9b8aecf70773d02669fe4aeeef593d7e57983455bd51e8cfcd800d` | PASS |
| `prototype/js/site.js` | `d195e5506338e8467f13334ecf0725a08d19512d0d796a72537431669ed959c6` | `d195e5506338e8467f13334ecf0725a08d19512d0d796a72537431669ed959c6` | PASS |

## Review Package Files

| Relative path | Size | SHA-256 |
|---|---:|---|
| `REFERENCE_ANATOMY.md` | 4356 | `f6170654578d62af914fbf8e57d92d45905ae8bebd3bb5b264e47ae7b13e85a7` |
| `V1_V2_COMPARISON_MATRIX.md` | 2247 | `86f3b399b3b346f575229b38d4c18b95d4f64f7eca10c6620d254c11c889e8c8` |
| `V2_HOME_ARCHITECTURE.md` | 2191 | `407590d34f47fae5d1e69f84f9cd3327e22accd54de5536492e074107a261666` |
| `V2_IMPLEMENTATION_REPORT.md` | 3435 | `c2d0a60b19ebfae562b524daba09f8ac4fe6455d892b24d242fbe27d66e44a0e` |
| `V2_WORK_ARCHITECTURE.md` | 2123 | `b3fe24bd14d0a51f034335563db59dc5b5aaf683114a60a078ed1923d3040416` |
| `after/screenshots/HOME_CAPABILITIES_1440.png` | 629103 | `1507495a5feede23d96fccf304b9c7478a2c3ad0fe9eeaf99a754279c0cb9965` |
| `after/screenshots/HOME_CURRENT_1440.png` | 563874 | `268d72fb18ad584d89dcff592106302316130529a92cbff7a2bdfab66d7c0f73` |
| `after/screenshots/HOME_FULL_1440.png` | 2017771 | `6c6b0704034e7a9e512894a3731458f0c2b90a7826b5e0662a65ac9cb3c9a7a5` |
| `after/screenshots/HOME_FULL_390.png` | 1105936 | `c28e7de8da669ff1fb8356d62bfb05a75f316a1d3ec1d0671858c06c3529df86` |
| `after/screenshots/HOME_HERO_FIRST_1440.png` | 658334 | `492b76a2817dbd7b4dd7dc4f159c1675f699bd9d4ce8e2140429c447aee2ef8b` |
| `after/screenshots/HOME_PROOF_1440.png` | 552797 | `27a20d4b00734965130829c2a767f8a3768df0a9bd27d2b42e9acc24c21b8d68` |
| `after/screenshots/HOME_SELECTED_WORK_1440.png` | 615959 | `a30217de758bfeefa8e1a9e3266445684d896fbb5cf2b5e4390e646a7be2d75a` |
| `after/screenshots/WORK_FULL_1440.png` | 281503 | `94bb86ac50742899a27f7e643ad3a5d6467e7d34369d89ba81b777a76ea1e72e` |
| `after/screenshots/WORK_FULL_390.png` | 104641 | `1769f9bb08156e5fb562e9c06fdc794d9df2716182ddfd85b74c577b5ae7e67a` |
| `after/screenshots/WORK_NOAH_1440.png` | 255393 | `57f2848f16fbcf92c1aaaa26d23a625a20e9e2a0468059605b84e4e44e2d24c0` |
| `after/screenshots/WORK_NOAH_390.png` | 143156 | `77b21d76c5e6d427928714e4abc551cb73533a576629648c0ff30d6b6ca91d51` |
| `after/screenshots/WORK_SECONDARY_1440.png` | 237693 | `52b949bba21303a369300f3add0e38f87f5e68b98c59ea407932b8759266faba` |
| `after/screenshots/WORK_YANCHENG_1440.png` | 230893 | `53eaa4d238184e696124471d5de215f1579e5bc7ab36b6d0ceed537865aee060` |
| `after/screenshots/WORK_YANCHENG_390.png` | 138327 | `c374df53fdbda1a1a844e9041b4723434228853a72d6b832eadf3eaea8795dca` |
| `before/screenshots/HOME_CAPABILITIES_1440.png` | 587581 | `36d5ef24edc59d73adf840a93df85b490445df79e7a4959a66bf2f88071742dc` |
| `before/screenshots/HOME_CURRENT_1440.png` | 558196 | `48d2caadd3af1ab59c38d0cb53ddd6638dc1ef87866bdf3227445847ac30829c` |
| `before/screenshots/HOME_FULL_1440.png` | 3871873 | `2c26a8a433165d1822155d459bae32b3eb8ce0b993e4d55242cd8138be921cc4` |
| `before/screenshots/HOME_FULL_390.png` | 1052754 | `6eba505bd9ad0faa11077e349b53a0eb1745ff323665ca07490a5fd749d66ec5` |
| `before/screenshots/HOME_HERO_FIRST_1440.png` | 628748 | `e9d2d933c5700d7725462731d6a06d4ce67fd20fe70696cd6936ef7efc6db9d8` |
| `before/screenshots/HOME_PROOF_1440.png` | 568681 | `1929cd1f79bb79a3fc55aeafdfaee6119f9c0c3431e9a67d9e587d36b2cbf43d` |
| `before/screenshots/HOME_SELECTED_WORK_1440.png` | 598443 | `d570f1b3d04156c2a080d0e6ef2fe4c8d37e84c0b01d775f59f76bddd8e31638` |
| `before/screenshots/WORK_FULL_1440.png` | 215485 | `31528358fdfe4a8401c6e4d8849a76a448528c77d3cc80bf54dba8aaf84aaa25` |
| `before/screenshots/WORK_FULL_390.png` | 101285 | `4dcb3c50bd683c16fa74754345a404532c77c68b8d1052c0ae901bf9bec152b1` |
| `before/screenshots/WORK_NOAH_1440.png` | 495687 | `5ac0fab72623ee125648a328cf4cf9f67a6c530b4ec49e8dc63689ee805ce43e` |
| `before/screenshots/WORK_NOAH_390.png` | 178455 | `b94304f2ab03b4a56c5dcedc549c766bf2d8fa04bf320d1c5bd94741aedf81ea` |
| `before/screenshots/WORK_SECONDARY_1440.png` | 422166 | `3b502ddfc7612f78b6c529202678793da504a30d611d910cbb94f880649a11ac` |
| `before/screenshots/WORK_YANCHENG_1440.png` | 392450 | `45beec5f7211897088b306629c7725354d85fb3ae6725923b1578f443d366fb9` |
| `before/screenshots/WORK_YANCHENG_390.png` | 151864 | `9bb1de5b2cd54f40b19c5ee4cd38d06d8eefc3dd0edbfe212e8f9491dd95093c` |
| `source_snapshot/prototype_reference_v2/capabilities.html` | 8732 | `d14938cd9f47752ad106d1657f982065ca9ef5d590a92130ea1e93a2bf47168f` |
| `source_snapshot/prototype_reference_v2/company.html` | 12516 | `76940ae0a1297595c7de0548cb143488bac6172f542c11e48b27bb7b3e9c70d1` |
| `source_snapshot/prototype_reference_v2/contact.html` | 5752 | `39878c0f2ccd509897234914900c657280601eae29106c1f8848c06c892d9173` |
| `source_snapshot/prototype_reference_v2/css/site.css` | 42905 | `6bca82b41c6c112d73ef19323ecd364ff5788f0799dd85a64d588f6286fd0c53` |
| `source_snapshot/prototype_reference_v2/index.html` | 15477 | `fc7f1770d2c030c2428fe652e2712f3875adcf80ecc99404f51c0d657d92c40b` |
| `source_snapshot/prototype_reference_v2/js/site.js` | 2700 | `d195e5506338e8467f13334ecf0725a08d19512d0d796a72537431669ed959c6` |
| `source_snapshot/prototype_reference_v2/work.html` | 14434 | `7c3c98049c96d6fbf89c82bedd56551dba5a9b6e0bff6ed9a44f1811c388a975` |
