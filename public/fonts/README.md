# /public/fonts/

Self-hosted WOFF2 fonts. Download the variable-font versions and drop them here.

## Required files

| File | Source |
|---|---|
| `BarlowCondensed-VariableFont_wght.woff2` | https://fonts.google.com/specimen/Barlow+Condensed |
| `Inter-VariableFont_opsz,wght.woff2` | https://fonts.google.com/specimen/Inter |
| `JetBrainsMono-VariableFont_wght.woff2` | https://fonts.google.com/specimen/JetBrains+Mono |

## How to get WOFF2 files

Google Fonts ships TTF by default. Two options:

### Option A — Fontsource (easiest)

```bash
npm install @fontsource-variable/barlow-condensed @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

Then copy the `.woff2` files from `node_modules/@fontsource-variable/*/files/` into this directory and rename to match the expected filenames above.

### Option B — Manual conversion

1. Download the TTF variable font files from Google Fonts.
2. Convert to WOFF2 using [google/woff2](https://github.com/google/woff2) or [everything-fonts.com](https://everythingfonts.com/ttf-to-woff2).
3. Subset to Latin charset using [glyphhanger](https://github.com/zachleat/glyphhanger) or [fontTools' pyftsubset](https://fonttools.readthedocs.io/en/latest/subset/index.html):

```bash
pip install fonttools brotli
pyftsubset BarlowCondensed-VariableFont_wght.ttf \
  --output-file=BarlowCondensed-VariableFont_wght.woff2 \
  --flavor=woff2 \
  --layout-features='*' \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

Latin subset typically reduces file size 30–70%.
