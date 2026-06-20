#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

required_files=(
  index.html
  assets/styles.css
  assets/js/main.js
  assets/images/profile.jpg
  favicon.svg
  404.html
  sitemap.xml
  robots.txt
  CURRENT_CONTENT.md
  MAINTENANCE.md
)

for file in "${required_files[@]}"; do
  test -f "$file" || { printf 'Missing required file: %s\n' "$file" >&2; exit 1; }
done

required_text=(
  "Xinyue Sun"
  "孙新越"
  "xysun@hit.edu.cn"
  "Associate Research Fellow"
  "Mentorship Philosophy"
  "Selected Publications"
  "CCF-A"
  "Awards &amp; Honors"
  "Academic Services"
  "Mentorship"
  "Google Scholar"
)

for text in "${required_text[@]}"; do
  grep -Fq "$text" index.html || { printf 'Missing required homepage text: %s\n' "$text" >&2; exit 1; }
done

forbidden_text=(
  "Associate Research Professor"
  "Master's Supervisor"
  "Selected for the PC Program"
  "Experience &amp; Funding"
  "Join Us"
  "sunxys@hit.edu.cn"
  "Publication Title"
  "TODO"
  "pending confirmation"
)

for text in "${forbidden_text[@]}"; do
  if grep -Fiq "$text" index.html; then
    printf 'Found retired or placeholder homepage text: %s\n' "$text" >&2
    exit 1
  fi
done

python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
import json

root = Path.cwd()
source = (root / "index.html").read_text(encoding="utf-8")


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.anchors = []
        self.assets = []
        self.in_json_ld = False
        self.json_ld = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        href = values.get("href")
        if href and href.startswith("#") and len(href) > 1:
            self.anchors.append(href[1:])
        for key in ("href", "src"):
            value = values.get(key)
            if not value or value.startswith(("#", "http://", "https://", "mailto:", "tel:", "data:")):
                continue
            self.assets.append(value.split("?", 1)[0].split("#", 1)[0])
        if tag == "script" and values.get("type") == "application/ld+json":
            self.in_json_ld = True

    def handle_endtag(self, tag):
        if tag == "script" and self.in_json_ld:
            self.in_json_ld = False

    def handle_data(self, data):
        if self.in_json_ld:
            self.json_ld.append(data)


parser = SiteParser()
parser.feed(source)

duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
missing_anchors = sorted(set(parser.anchors) - set(parser.ids))
missing_assets = sorted({item for item in parser.assets if not (root / item).is_file()})

if duplicates:
    raise SystemExit(f"Duplicate HTML IDs: {', '.join(duplicates)}")
if missing_anchors:
    raise SystemExit(f"Missing anchor targets: {', '.join(missing_anchors)}")
if missing_assets:
    raise SystemExit(f"Missing local assets: {', '.join(missing_assets)}")

json.loads("".join(parser.json_ld))
PY

grep -Fq "Page Not Found" 404.html
grep -Fq "https://xinyuesun.github.io/" sitemap.xml
grep -Fq "Sitemap: https://xinyuesun.github.io/sitemap.xml" robots.txt
grep -Fq "<svg" favicon.svg

if command -v node >/dev/null 2>&1; then
  node --check assets/js/main.js
fi

printf 'Homepage checks passed.\n'
