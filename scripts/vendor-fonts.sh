#!/usr/bin/env bash
# Re-vendor the webfonts.
#
# The site must not load any resource from a third-party URL, so the typefaces
# are downloaded once and served from our own origin. This script fetches the
# Google Fonts CSS, keeps the latin subsets, downloads each woff2 into
# app/assets/fonts/ and regenerates app/assets/css/fonts.css.
#
# Run it only when the font list or the weights in main.css change.
set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
fonts_dir="$repo/app/assets/fonts"
css_out="$repo/app/assets/css/fonts.css"
ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
api='https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600;700&family=Martian+Mono:wght@400;500;600;700&display=swap'

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

# The css2 endpoint serves woff2 only to browser-like user agents.
curl -sSf -A "$ua" "$api" -o "$work/gf.css"

mkdir -p "$fonts_dir"
rm -f "$fonts_dir"/*.woff2

UA="$ua" FONTS_DIR="$fonts_dir" CSS_OUT="$css_out" GF_CSS="$work/gf.css" python3 - <<'PY'
import collections, os, pathlib, re, subprocess

KEEP_SUBSETS = {"latin", "latin-ext"}  # the site is English plus a German imprint
fonts_dir = pathlib.Path(os.environ["FONTS_DIR"])
css_out = pathlib.Path(os.environ["CSS_OUT"])
ua = os.environ["UA"]
css = pathlib.Path(os.environ["GF_CSS"]).read_text()

# Each @font-face in the response is preceded by a /* subset */ comment.
blocks = re.findall(r"/\* ([a-z0-9-]+) \*/\s*@font-face \{(.*?)\}", css, re.S)

def field(body, name):
    m = re.search(rf"{name}:\s*([^;]+);", body)
    return m.group(1).strip() if m else None

# A variable font comes back as the same file repeated once per requested
# weight, so group by URL and collapse those into a single weight range.
groups = collections.OrderedDict()
for subset, body in blocks:
    if subset not in KEEP_SUBSETS:
        continue
    key = (field(body, "font-family").strip("'\""), subset,
           re.search(r"url\(([^)]+)\)", body).group(1), field(body, "font-style"))
    g = groups.setdefault(key, {"weights": set(), "range": field(body, "unicode-range")})
    g["weights"].add(int(field(body, "font-weight")))

rules = []
for (family, subset, url, style), g in groups.items():
    weights = sorted(g["weights"])
    tag = f"{weights[0]}-{weights[-1]}" if len(weights) > 1 else str(weights[0])
    name = f"{family.lower().replace(' ', '-')}-{tag}-{subset}.woff2"
    subprocess.run(["curl", "-sSf", "-A", ua, url, "-o", str(fonts_dir / name)], check=True)
    rules.append(
        f"/* {family} — {subset} */\n"
        f"@font-face {{\n"
        f"  font-family: '{family}';\n"
        f"  font-style: {style};\n"
        f"  font-weight: {' '.join(map(str, [weights[0], weights[-1]])) if len(weights) > 1 else weights[0]};\n"
        f"  font-display: swap;\n"
        f"  src: url('../fonts/{name}') format('woff2');\n"
        f"  unicode-range: {g['range']};\n"
        f"}}"
    )

css_out.write_text(
    "/* Self-hosted webfonts — the site must not pull any resource from a third\n"
    "   party, so these are vendored from Google Fonts (all SIL OFL 1.1) and\n"
    "   served from our own origin. Regenerate with scripts/vendor-fonts.sh. */\n\n"
    + "\n\n".join(rules) + "\n"
)
print(f"{len(rules)} @font-face rules -> {css_out}")
PY

ls -lh "$fonts_dir"
