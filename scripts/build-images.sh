#!/usr/bin/env bash
# Generates the web-ready hero crops from sorted/ sources.
# Sources are 5000-10500px wide and must never be referenced directly.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC_D="sorted/02_portrait_xl_vertical/parisian-woman-black-suit-wet-street.jpg"          # 10529x7067  3:2
SRC_M="sorted/02_portrait_xl_vertical/hero-parisian-woman-black-suit-hands-pockets-street.jpg"  # 5000x7453  2:3
OUT="assets/hero"

# Grade match (measured): brings the portrait to the landscape's mean luminance
# and R/B ratio so the crops do not flash colour across the 768px breakpoint.
# Art direction, not just resizing.
#  Desktop: crop the right edge back so the subject sits at 45-75% instead of
#           dead centre, leaving a clean left half of wet street for the type
#           column. Also letterboxes to ~1.82, close to a desktop viewport, so
#           object-fit has almost nothing left to crop.
#  Mobile:  drop the top 14%, which is blown-out overcast sky — it was forcing
#           an opaque black bar behind the header to keep the toggle legible.
GRADE_D="crop=iw*0.88:ih*0.72:0:ih*0.10"
GRADE_M="crop=iw:ih*0.86:0:ih*0.14,eq=gamma=1.10,colorbalance=rm=0.030:bm=-0.034"

mkdir -p "$OUT"

gen () {  # src filter basename widths...
  local src="$1" filt="$2" base="$3"; shift 3
  for w in "$@"; do
    ffmpeg -loglevel error -y -i "$src" -vf "$filt,scale=${w}:-1:flags=lanczos" \
           -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT/${base}-${w}.webp"
    ffmpeg -loglevel error -y -i "$src" -vf "$filt,scale=${w}:-1:flags=lanczos" \
           -map_metadata -1 -q:v 5 "$OUT/${base}-${w}.jpg"
  done
}

gen "$SRC_D" "$GRADE_D" wet-street    1400 2000 2800
gen "$SRC_M" "$GRADE_M" hands-pockets  480  800 1200

# --- Hero variant B, "The Plate" -------------------------------------------
# Used as a full-height vertical plate beside a bone type column, so it keeps
# its native 2:3 and lets object-fit crop the height. No crop applied here —
# pre-cropping would remove the latitude that different viewport ratios need.
SRC_P="sorted/02_portrait_xl_vertical/parisian-woman-blue-shirt-leather-skirt-street.jpg"

# The falloff is BAKED here, not applied in CSS. A CSS gradient over this image
# left visible ghost architecture: the frame's upper-left is intrinsically
# bright (storm sky, lit stone), so a partial overlay hazes it instead of
# crushing it, and the eye reads that as a rectangular error rather than as
# atmosphere. A 2D falloff anchored on the figure resolves it photographically —
# she emerges from shadow and every edge reaches the ground colour (#1F1A17),
# so the plate has no boundary left to see.
AX=0.68; AY=0.62; RX=0.62; RY=0.80; T0=0.20; T1=0.85
D="sqrt(pow((X/W-$AX)/$RX\,2)+pow((Y/H-$AY)/$RY\,2))"
T="clip(($D-$T0)/($T1-$T0)\,0\,1)"
S="(1-($T*$T*(3-2*$T)))"
FALL="format=rgb24,geq=r='r(X\,Y)*$S+31*(1-$S)':g='g(X\,Y)*$S+26*(1-$S)':b='b(X\,Y)*$S+23*(1-$S)'"

for w in 600 900 1400 2000; do
  ffmpeg -loglevel error -y -i "$SRC_P" -vf "scale=${w}:-1:flags=lanczos,$FALL" \
         -map_metadata -1 -c:v libwebp -quality 82 -compression_level 6 "$OUT/blue-shirt-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_P" -vf "scale=${w}:-1:flags=lanczos,$FALL" \
         -map_metadata -1 -q:v 5 "$OUT/blue-shirt-${w}.jpg"
done

# --- Hero variant D, "The Exhibition" ---------------------------------------
# B&W grand-staircase editorial as a HUNG PRINT: keeps its native 2:3, no falloff
# baked, no scrim — the frame is the boundary, and the print's own left half is
# near-black, which is where the display type crosses it. The frame is drawn in
# CSS (hairline), so the asset stays an honest photograph.
# NOTE: source still lives in images/; belongs in sorted/02_portrait_xl_vertical.
SRC_X="images/editorial-woman-tweed-suit-grand-staircase-bw.jpg"   # 5000x7499  2:3
for w in 800 1200 1800; do
  ffmpeg -loglevel error -y -i "$SRC_X" -vf "scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 82 -compression_level 6 "$OUT/staircase-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_X" -vf "scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -q:v 5 "$OUT/staircase-${w}.jpg"
done

# --- Hero variant E, "The Overture" -----------------------------------------
# Hotel-corridor silhouette letterboxed to 2.55:1 for the cinemascope band. The
# window light and the figure both sit inside the vertical centre band, so a
# centre crop keeps them; object-fit then trims further per viewport.
# NOTE: source still lives in images/; belongs in sorted/04_landscape_editorial.
SRC_O="images/luxury-hotel-corridor-silhouette-window-light.jpg"   # 6400x4267  3:2
CROP_O="crop=iw:ih*0.588:0:ih*0.206"   # 6400x2509 ≈ 2.55:1, vertically centred
for w in 1400 2000 2800; do
  ffmpeg -loglevel error -y -i "$SRC_O" -vf "$CROP_O,scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT/corridor-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_O" -vf "$CROP_O,scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -q:v 5 "$OUT/corridor-${w}.jpg"
done

# --- Section 02 — "Explore Dar SF" -------------------------------------------
OUT2="assets/explore"
mkdir -p "$OUT2"

# Threshold: the hands-pockets portrait (same shoot as the hero band — one
# grade). Extra width for the section column.
ffmpeg -loglevel error -y -i "$SRC_M" -vf "$GRADE_M,scale=1800:-1:flags=lanczos" \
       -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT2/hands-pockets-1800.webp"
ffmpeg -loglevel error -y -i "$SRC_M" -vf "$GRADE_M,scale=1800:-1:flags=lanczos" \
       -map_metadata -1 -q:v 5 "$OUT2/hands-pockets-1800.jpg"

# Exhibition: the sports-car B&W editorial, native 2:3 — "Fig. 02", and the
# Velocity Noir case study plate later. Sources in images/ → sorted/04 pending.
SRC_S="images/editorial-fashion-woman-sports-car-bw.jpg"          # 5000x7496  2:3
for w in 800 1200 1800; do
  ffmpeg -loglevel error -y -i "$SRC_S" -vf "scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 78 -compression_level 6 "$OUT2/sports-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_S" -vf "scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -q:v 5 "$OUT2/sports-${w}.jpg"
done

# Overture: the candlelit wellness treatment — the corridor's exact amber
# grade, hospitality subject. 4:5 source cropped to 2:3, biased slightly left
# where the candlelight lives.
SRC_W="images/wellness-spa-massage-candlelit-treatment.jpg"       # 5000x6248  4:5
CROP_W="crop=iw*0.8332:ih:iw*0.0834:0"                            # 4166x6248 ≈ 2:3
for w in 800 1200 1800; do
  ffmpeg -loglevel error -y -i "$SRC_W" -vf "$CROP_W,scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT2/spa-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_W" -vf "$CROP_W,scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -q:v 5 "$OUT2/spa-${w}.jpg"
done

# --- Section 03 — service rows: 4:5 hover preview tiles -----------------------
# The brief's own pairings (Maison-SF.mapped.md image map): moodboard → Brand
# Presence, flatlay → Creative Direction, workspace → Digital Experiences,
# notebook → Intelligent Brand Growth. Exhibition takes desaturated, slightly
# warm-silver variants — its world is black-and-white.
OUT3="assets/services"
mkdir -p "$OUT3"

MONO="hue=s=0,colorbalance=rm=0.020:bm=-0.030"   # neutral → warm silver
tile () {  # src filter basename
  local src="$1" filt="$2" base="$3"
  ffmpeg -loglevel error -y -i "$src" -vf "$filt,scale=480:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT3/${base}-480.webp"
  ffmpeg -loglevel error -y -i "$src" -vf "$filt,scale=480:-1:flags=lanczos" \
         -map_metadata -1 -q:v 5 "$OUT3/${base}-480.jpg"
  ffmpeg -loglevel error -y -i "$src" -vf "$filt,$MONO,scale=480:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT3/${base}-mono-480.webp"
}

tile "images/creative-moodboard-studio-inspiration-wall.jpg" "crop=ih*0.8:ih"  tile-moodboard
tile "images/luxury-lifestyle-flatlay-ysl-chanel.jpg"         "null"           tile-flatlay
tile "images/digital-experiences-workspace-laptop-camera.jpg" "crop=ih*0.8:ih"  tile-workspace
tile "images/dar-brand-growth-notebook-charts.jpg"            "crop=iw:ih*0.838:0:ih*0.081" tile-notebook

# --- Section 05 — founder plates ------------------------------------------------
# One portrait, three voices: Threshold keeps the spread's colour (no falloff —
# that was baked for the Plate's umber ground, wrong on paper); Exhibition takes
# the warm-silver mono its world runs on. Overture reuses the hands-pockets
# plate built above — its dusk grade is already the film's.
for w in 800 1200 1800; do
  ffmpeg -loglevel error -y -i "$SRC_P" -vf "scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT2/founder-blue-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_P" -vf "scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -q:v 5 "$OUT2/founder-blue-${w}.jpg"
  ffmpeg -loglevel error -y -i "$SRC_P" -vf "$MONO,scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT2/founder-blue-mono-${w}.webp"
done

# --- Section 05 — the founder's signature ---------------------------------------
# Source is a clean knockout: ivory strokes on true alpha (verified via the
# extracted alpha channel — solid coverage, no glow halo). Two variants:
#   cream — strokes as delivered, for the noir grounds;
#   ink   — strokes premultiplied toward #141414 (--ink), for paper / bone.
# Crop to the ~86×44% content window so no dead canvas rides along.
SRC_G="images/souhir-fhima-neon-signature.png"
SIG="crop=iw*0.86:ih*0.44:(iw-iw*0.86)/2:(ih-ih*0.44)/2"
for w in 600 900; do
  ffmpeg -loglevel error -y -i "$SRC_G" -vf "$SIG,scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT2/signature-cream-${w}.webp"
  ffmpeg -loglevel error -y -i "$SRC_G" \
         -vf "$SIG,format=rgba,geq=r='20*alpha(X\,Y)/255':g='20*alpha(X\,Y)/255':b='20*alpha(X\,Y)/255':a='alpha(X\,Y)',scale=${w}:-1:flags=lanczos" \
         -map_metadata -1 -c:v libwebp -quality 80 -compression_level 6 "$OUT2/signature-ink-${w}.webp"
done

ls -lh "$OUT" | awk 'NR>1{printf "  %-28s %s\n", $9, $5}'
ls -lh "$OUT2" | awk 'NR>1{printf "  %-28s %s\n", $9, $5}'
ls -lh "$OUT3" | awk 'NR>1{printf "  %-28s %s\n", $9, $5}'
