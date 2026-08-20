# Work list + SCO detail snapshot (2026-08-20)

Frozen copy of the last list/detail implementation, taken from `main` @ `1fe61ac` before restoring the classic WORK page (SCO narrative at top).

## Contents

| Path | Role |
| --- | --- |
| `prototype/work.html` | Live WORK with TYPE A cover card → `project-sco-ark.html` |
| `prototype/work2.html` | List draft with TYPE A/B/C covers |
| `prototype/project-sco-ark.html` | Public SCO detail (TYPE A) |
| `prototype/project-sco-ark-a.html` | TYPE A comparison |
| `prototype/project-sco-ark-b.html` | TYPE B comparison |
| `prototype/project-sco-ark-c.html` | TYPE C comparison |
| `css/project-flagship.css` | Cover card + detail shared styles |
| `css/project-sco.css` | Floor/band layout for detail types |

## Re-apply onto live prototype

From repo root:

```bash
cp work_in_progress/archive/work-list-detail-20260820/prototype/*.html \
  work_in_progress/prototype/
cp work_in_progress/archive/work-list-detail-20260820/css/*.css \
  work_in_progress/prototype/css/
```

Then point HOME / COMPANY SCO CTAs back to `project-sco-ark.html` if that routing is wanted again.

Asset dependencies stay under `work_in_progress/assets/projects/sco-ark/` (not duplicated here).
