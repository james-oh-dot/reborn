#!/usr/bin/env python3
"""
Generate progressive (blur-up) image pairs for any project.

For each master photo listed in a manifest, writes two WebP files next to it:
  - `{stem}.webp`          — display-sized, high quality (final sharp layer)
  - `{stem}.preview.webp`  — ~64px wide, low quality (paints instantly)

The master (`.jpg` / `.png`) is left untouched and is never referenced at
runtime — only the two generated WebP files are.

Usage (from project root):
  python3 scripts/generate-progressive-images.py
      # uses ./progressive-images.manifest.json
  python3 scripts/generate-progressive-images.py --manifest path/to/manifest.json
  python3 scripts/generate-progressive-images.py hero-01     # only targets whose
                                                               # path contains this

Manifest format (progressive-images.manifest.json):
{
  "root": "public/assets",
  "defaults": { "max_width": 1600, "quality": 90 },
  "preview": { "width": 64, "quality": 45 },
  "targets": [
    { "path": "hero/hero-01.jpg", "max_width": 1920 },
    { "path": "cards/*.jpg", "max_width": 900 },
    { "path": "icons/signature.png", "max_width": 500, "quality": 95 }
  ]
}

- `targets[].path` is relative to `root` and supports glob (`*`, `**`).
- `max_width` / `quality` fall back to `defaults` when omitted.

Requires: Pillow (`pip install Pillow`)
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image

DEFAULT_MANIFEST = "progressive-images.manifest.json"


def load_manifest(path: Path) -> dict:
    if not path.exists():
        print(f"missing manifest: {path}")
        print(f"create one at ./{DEFAULT_MANIFEST} — see the docstring for the format.")
        sys.exit(1)
    return json.loads(path.read_text(encoding="utf-8"))


def resolve_targets(manifest: dict, root: Path) -> list[dict]:
    """Expand each manifest target (glob-aware) into concrete file entries."""
    defaults = manifest.get("defaults", {})
    default_w = defaults.get("max_width", 1600)
    default_q = defaults.get("quality", 90)

    resolved: list[dict] = []
    for entry in manifest.get("targets", []):
        pattern = entry["path"]
        max_w = entry.get("max_width", default_w)
        quality = entry.get("quality", default_q)
        matches = sorted(root.glob(pattern)) if any(c in pattern for c in "*?[") else [root / pattern]
        for src in matches:
            if src.suffix.lower() not in (".jpg", ".jpeg", ".png"):
                continue
            resolved.append({"src": src, "max_width": max_w, "quality": quality})
    return resolved


def stem_pair(src: Path) -> tuple[Path, Path]:
    base = src.with_suffix("")
    return Path(str(base) + ".webp"), Path(str(base) + ".preview.webp")


def load_image(path: Path) -> Image.Image:
    im = Image.open(path)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        return im.convert("RGBA")
    return im.convert("RGB")


def main() -> None:
    args = sys.argv[1:]
    manifest_path = Path(DEFAULT_MANIFEST)
    if "--manifest" in args:
        i = args.index("--manifest")
        manifest_path = Path(args[i + 1])
        del args[i : i + 2]
    requested = args  # remaining args = substring filters on the path

    manifest = load_manifest(manifest_path)
    root = Path(manifest.get("root", "public/assets"))
    preview_cfg = manifest.get("preview", {})
    preview_w = preview_cfg.get("width", 64)
    preview_q = preview_cfg.get("quality", 45)

    if not root.is_dir():
        print(f"missing asset root: {root}")
        sys.exit(1)

    targets = resolve_targets(manifest, root)
    if requested:
        targets = [t for t in targets if any(r in str(t["src"]) for r in requested)]

    if not targets:
        print("no targets matched")
        return

    for t in targets:
        src: Path = t["src"]
        if not src.exists():
            print(f"MISSING {src}")
            continue

        full_path, preview_path = stem_pair(src)
        im = load_image(src)
        w, h = im.size

        # Preview
        pw = preview_w
        ph = max(1, round(h * (pw / w)))
        prev = im.resize((pw, ph), Image.Resampling.LANCZOS)
        prev.save(preview_path, format="WEBP", quality=preview_q, method=6)

        # Full — never upscale past the source
        max_w = t["max_width"]
        if w > max_w:
            nh = round(h * (max_w / w))
            full = im.resize((max_w, nh), Image.Resampling.LANCZOS)
        else:
            full = im
        full.save(full_path, format="WEBP", quality=t["quality"], method=6)

        rel = src.relative_to(root)
        print(
            f"{rel}: {src.stat().st_size / 1024 / 1024:.2f}MB → "
            f"full {full_path.stat().st_size / 1024:.0f}KB + "
            f"preview {preview_path.stat().st_size / 1024:.1f}KB"
        )


if __name__ == "__main__":
    main()
