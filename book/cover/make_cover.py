#!/usr/bin/env python3
"""Generate the front cover as SVG (1600x2560, 2:3) and render it to PNG with headless Chromium."""
import math
import os
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
INK = "#2a0a4a"
AUTHOR = "[AUTHOR NAME]"

W, H = 1600, 2560
o = []
add = o.append


def star(cx, cy, r_out, r_in, n, rot=0):
    pts = []
    for i in range(n * 2):
        r = r_out if i % 2 == 0 else r_in
        a = math.pi * i / n + math.radians(rot)
        pts.append(f"{cx + r * math.cos(a):.1f},{cy + r * math.sin(a):.1f}")
    return " ".join(pts)


add(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
add('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#150e5c"/><stop offset="0.35" stop-color="#4b238f"/>
  <stop offset="0.62" stop-color="#a73a94"/><stop offset="0.8" stop-color="#ee6a6a"/><stop offset="1" stop-color="#ffb347"/>
</linearGradient>
<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3.2" fill="#ffffff" opacity="0.07"/></pattern>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="10" dy="12" stdDeviation="0" flood-color="#e0307a"/></filter>
<g id="flake" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none">
  <path d="M0,-34V34M-29,-17L29,17M-29,17L29,-17"/>
  <path d="M0,-22l-8,-8M0,-22l8,-8M0,22l-8,8M0,22l8,8" stroke-width="5"/>
</g>
</defs>''')

# Sky + halftone
add(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
add(f'<rect width="{W}" height="{H}" fill="url(#dots)"/>')

# Background stars / flakes
for x, y, s in [(150, 880, .8), (1450, 760, .9), (700, 830, .7), (1250, 900, .6), (90, 1330, .9), (1500, 1480, .8), (430, 1180, .6)]:
    add(f'<use href="#flake" transform="translate({x},{y}) scale({s}) rotate({(x*7)%60})"/>')

# Double rainbow
bands = ["#ff3b3b", "#ff9a2a", "#ffe14d", "#4ede6e", "#3ba9ff", "#9a5cff"]
cx, cy = 800, 1720
for i, c in enumerate(bands):
    r = 720 - i * 30
    add(f'<path d="M{cx-r},{cy} A{r},{r} 0 0 1 {cx+r},{cy}" fill="none" stroke="{c}" stroke-width="31"/>')
for i, c in enumerate(reversed(bands[:4])):
    r = 900 - i * 24
    add(f'<path d="M{cx-r},{cy} A{r},{r} 0 0 1 {cx+r},{cy}" fill="none" stroke="{c}" stroke-width="22" opacity="0.45"/>')


def puff(x, y, s=1.0, fill="#f4eefc"):
    for dx, dy, r in [(-70, 10, 55), (-20, -25, 75), (45, -10, 65), (90, 20, 48), (10, 25, 70)]:
        add(f'<circle cx="{x+dx*s}" cy="{y+dy*s}" r="{r*s+8}" fill="{INK}"/>')
    for dx, dy, r in [(-70, 10, 55), (-20, -25, 75), (45, -10, 65), (90, 20, 48), (10, 25, 70)]:
        add(f'<circle cx="{x+dx*s}" cy="{y+dy*s}" r="{r*s}" fill="{fill}"/>')


puff(150, 1740, 1.0)
puff(1460, 1740, 1.0)

# UFO lenticular cloud (top-left)
add('<polygon points="250,970 410,970 520,1250 140,1250" fill="#fff6a8" opacity="0.28"/>')
add(f'<ellipse cx="330" cy="945" rx="215" ry="44" fill="#d9d0f0" stroke="{INK}" stroke-width="9"/>')
add(f'<ellipse cx="330" cy="912" rx="118" ry="46" fill="#efe9fb" stroke="{INK}" stroke-width="9"/>')
for x in (230, 290, 350, 410):
    add(f'<circle cx="{x}" cy="950" r="9" fill="#ffe14d"/>')

# Fire tornado
flames = [("#e8301c", 1.0), ("#ff8a1f", 0.72), ("#ffd93b", 0.42)]
for k, (col, sc) in enumerate(flames):
    for i, (y, rx) in enumerate([(1300, 200), (1385, 175), (1470, 150), (1555, 125), (1640, 102), (1725, 80), (1810, 60), (1895, 44), (1975, 30)]):
        off = (14 if i % 2 else -14) * sc
        stroke = f' stroke="{INK}" stroke-width="8"' if k == 0 else ""
        add(f'<ellipse cx="{300+off}" cy="{y + (0 if k==0 else 10)}" rx="{rx*sc}" ry="{50*sc if k else 50}" fill="{col}"{stroke}/>')
for fx, fy, fh in [(180, 1290, 140), (260, 1250, 190), (340, 1245, 170), (420, 1290, 120)]:
    add(f'<path d="M{fx-34},{fy+40} Q{fx-20},{fy-fh*0.5} {fx},{fy-fh} Q{fx+10},{fy-fh*0.35} {fx+36},{fy+40} Z" fill="#ff8a1f" stroke="{INK}" stroke-width="7"/>')
    add(f'<path d="M{fx-16},{fy+30} Q{fx-8},{fy-fh*0.3} {fx},{fy-fh*0.6} Q{fx+6},{fy-fh*0.2} {fx+18},{fy+30} Z" fill="#ffe14d"/>')
for ex, ey in [(150, 1500), (470, 1620), (120, 1780), (500, 1450)]:
    add(f'<circle cx="{ex}" cy="{ey}" r="9" fill="#ffd93b"/>')

# Big stressed cloud
cloud = [(560, 1320, 150), (700, 1200, 170), (860, 1160, 190), (1020, 1230, 160), (1110, 1350, 140), (910, 1430, 185), (700, 1430, 170)]
for x, y, r in cloud:
    add(f'<circle cx="{x}" cy="{y}" r="{r+12}" fill="{INK}"/>')
for x, y, r in cloud:
    add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#efe8fb"/>')
for x, y, r in cloud:
    add(f'<circle cx="{x+14}" cy="{y+26}" r="{r*0.78}" fill="#d6caf0" opacity="0.55"/>')
# mammatus pouches
for x, y in [(640, 1585), (730, 1620), (830, 1630), (930, 1620), (1030, 1585)]:
    add(f'<circle cx="{x}" cy="{y}" r="52" fill="{INK}"/><circle cx="{x}" cy="{y}" r="44" fill="#9b87cf"/>')
add(f'<ellipse cx="830" cy="1530" rx="430" ry="80" fill="#efe8fb"/>')

# Face
def eye(x):
    add(f'<circle cx="{x}" cy="1295" r="66" fill="{INK}"/><circle cx="{x}" cy="1295" r="56" fill="#fff"/>')
    add(f'<circle cx="{x+16}" cy="1305" r="22" fill="{INK}"/><circle cx="{x+24}" cy="1297" r="7" fill="#fff"/>')
    add(f'<path d="M{x-48},1350 Q{x},1380 {x+48},1350" fill="none" stroke="#8a6fc0" stroke-width="9" stroke-linecap="round"/>')


eye(720)
eye(940)
add(f'<path d="M650,1215 L780,1245" stroke="{INK}" stroke-width="18" stroke-linecap="round"/>')   # furrowed brow
add(f'<path d="M880,1220 Q930,1170 1010,1205" fill="none" stroke="{INK}" stroke-width="18" stroke-linecap="round"/>')  # raised brow
add('<circle cx="635" cy="1375" r="38" fill="#ff8fb5" opacity="0.7"/><circle cx="1030" cy="1375" r="38" fill="#ff8fb5" opacity="0.7"/>')
add(f'<rect x="725" y="1405" width="230" height="78" rx="32" fill="{INK}"/>')
for x in range(745, 945, 40):
    add(f'<rect x="{x}" y="1415" width="34" height="26" rx="5" fill="#fff"/><rect x="{x}" y="1447" width="34" height="26" rx="5" fill="#fff"/>')
for x, y in [(575, 1210), (1080, 1170)]:
    add(f'<path d="M{x},{y-34} Q{x+26},{y+4} {x},{y+26} Q{x-26},{y+4} {x},{y-34}Z" fill="#6ad0ff" stroke="{INK}" stroke-width="6"/>')

# Lightning
add('<polygon points="1190,1470 1290,1470 1235,1700 1350,1700 1130,2090 1190,1790 1085,1790" fill="#7ee8ff" filter="url(#glow)" opacity="0.9"/>')
add(f'<polygon points="1190,1470 1290,1470 1235,1700 1350,1700 1130,2090 1190,1790 1085,1790" fill="#ffe14d" stroke="{INK}" stroke-width="9" stroke-linejoin="round"/>')
add('<polygon points="1215,1490 1262,1490 1210,1710 1300,1710 1170,1950 1210,1770 1130,1770" fill="#fff8c4"/>')

# Falling fish + umbrella frog
add('<g transform="translate(540,1030) rotate(28)">')
add(f'<path d="M-70,0 L-120,-38 L-120,38 Z" fill="#ff8a1f" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>')
add(f'<ellipse cx="0" cy="0" rx="78" ry="42" fill="#ffb347" stroke="{INK}" stroke-width="8"/>')
add(f'<circle cx="40" cy="-8" r="11" fill="#fff" stroke="{INK}" stroke-width="5"/><circle cx="43" cy="-8" r="4.5" fill="{INK}"/>')
add(f'<path d="M-10,-30 Q10,0 -10,30" fill="none" stroke="{INK}" stroke-width="6"/>')
add('</g>')
add(f'<path d="M1040,1015 L1040,1130" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>')
add(f'<path d="M945,1035 Q1040,900 1135,1035 Q1090,1010 1040,1035 Q990,1010 945,1035Z" fill="#ff3b3b" stroke="{INK}" stroke-width="9" stroke-linejoin="round"/>')
add(f'<ellipse cx="1040" cy="1165" rx="52" ry="42" fill="#5fd35f" stroke="{INK}" stroke-width="8"/>')
add(f'<circle cx="1018" cy="1132" r="17" fill="#5fd35f" stroke="{INK}" stroke-width="7"/><circle cx="1062" cy="1132" r="17" fill="#5fd35f" stroke="{INK}" stroke-width="7"/>')
add(f'<circle cx="1018" cy="1132" r="7" fill="{INK}"/><circle cx="1062" cy="1132" r="7" fill="{INK}"/>')
add(f'<path d="M1020,1172 Q1040,1190 1060,1172" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>')

# Ground
add(f'<path d="M0,2070 Q300,1990 600,2040 T1200,2030 T1600,2060 L1600,2560 L0,2560Z" fill="#1c1234"/>')
add(f'<path d="M0,2110 Q400,2050 800,2095 T1600,2100 L1600,2560 L0,2560Z" fill="#150d2b"/>')

# Van
add(f'<rect x="300" y="1930" width="270" height="130" rx="22" fill="#e8d9a8" stroke="{INK}" stroke-width="8"/>')
add(f'<path d="M570,1965 L640,1965 Q670,1970 676,2000 L676,2060 L570,2060Z" fill="#e8d9a8" stroke="{INK}" stroke-width="8"/>')
add(f'<rect x="590" y="1975" width="62" height="38" rx="8" fill="#8fd3ff" stroke="{INK}" stroke-width="6"/>')
add(f'<rect x="330" y="1955" width="90" height="46" rx="8" fill="#8fd3ff" stroke="{INK}" stroke-width="6"/>')
add(f'<rect x="440" y="1955" width="90" height="46" rx="8" fill="#8fd3ff" stroke="{INK}" stroke-width="6"/>')
for x in (390, 610):
    add(f'<circle cx="{x}" cy="2065" r="30" fill="#2b2b3a" stroke="{INK}" stroke-width="6"/><circle cx="{x}" cy="2065" r="11" fill="#bbb"/>')
add(f'<path d="M420,1930 L420,1895 M400,1895 L440,1895 M460,1930 L470,1880" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>')

# Storm chaser in yellow raincoat, filming upward
add(f'<path d="M870,2090 L880,2000 L960,2000 L972,2090Z" fill="#ffd21f" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>')
add(f'<path d="M880,2090 L880,2150 M965,2090 L965,2150" stroke="{INK}" stroke-width="14" stroke-linecap="round"/>')
add(f'<path d="M868,1992 Q920,1920 985,1992 L972,2030 L880,2030Z" fill="#ffd21f" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>')
add(f'<circle cx="926" cy="1965" r="34" fill="#f1c8a0" stroke="{INK}" stroke-width="7"/>')
add(f'<path d="M886,1955 Q926,1905 968,1955 Q926,1945 886,1955Z" fill="#ffd21f" stroke="{INK}" stroke-width="7"/>')
add(f'<rect x="948" y="1930" width="64" height="44" rx="8" fill="#333" stroke="{INK}" stroke-width="6" transform="rotate(-25 980 1952)"/>')
add(f'<circle cx="1000" cy="1928" r="13" fill="#9bd" stroke="{INK}" stroke-width="5"/>')
add(f'<path d="M960,2020 L1000,1960" stroke="#ffd21f" stroke-width="22" stroke-linecap="round"/>')

# Title
def title(txt, x, y, size, length, rot):
    add(f'<g transform="rotate({rot} {x} {y})">')
    add(f'<text x="{x}" y="{y}" text-anchor="middle" font-family="Impact, \'Arial Black\', \'DejaVu Sans\', sans-serif" font-weight="900" font-size="{size}" textLength="{length}" lengthAdjust="spacingAndGlyphs" fill="#e0307a" stroke="#e0307a" stroke-width="22" stroke-linejoin="round" transform="translate(12,14)">{txt}</text>')
    add(f'<text x="{x}" y="{y}" text-anchor="middle" font-family="Impact, \'Arial Black\', \'DejaVu Sans\', sans-serif" font-weight="900" font-size="{size}" textLength="{length}" lengthAdjust="spacingAndGlyphs" fill="#ffe14d" stroke="{INK}" stroke-width="16" stroke-linejoin="round" paint-order="stroke">{txt}</text>')
    add('</g>')


title("THE SKY IS", 800, 300, 150, 760, -2)
title("HAVING A", 800, 470, 190, 980, 1.5)
title("BREAKDOWN", 800, 700, 215, 1300, -1.5)

# Starburst badge
add(f'<g transform="rotate(12 1380 975)"><polygon points="{star(1380, 975, 175, 140, 14)}" fill="#ff3b3b" stroke="{INK}" stroke-width="9" stroke-linejoin="round"/>')
add(f'<polygon points="{star(1380, 975, 142, 116, 14)}" fill="#ffe14d" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>')
for t, y, s in [("CAUGHT", 950, 38), ("ON", 990, 30), ("CAMERA!", 1032, 38)]:
    add(f'<text x="1380" y="{y}" text-anchor="middle" font-family="Impact, \'Arial Black\', \'DejaVu Sans\', sans-serif" font-weight="900" font-size="{s}" fill="{INK}">{t}</text>')
add('</g>')

# Subtitle banner + author
add(f'<rect x="90" y="2165" width="1420" height="210" rx="18" fill="#ffe14d" stroke="{INK}" stroke-width="9"/>')
add(f'<rect x="108" y="2183" width="1384" height="174" rx="10" fill="none" stroke="{INK}" stroke-width="3"/>')
for txt, y in [("400+ TRUE STORIES OF FIRE TORNADOES, RAINING FISH,", 2236), ("CLOUD MONSTERS, AND THE STRANGEST WEATHER EVER", 2292), ("CAUGHT ON CAMERA", 2348)]:
    add(f'<text x="800" y="{y}" text-anchor="middle" font-family="\'DejaVu Sans\', Arial, sans-serif" font-weight="bold" font-size="42" textLength="{1290 if "CAMERA" not in txt else 560}" lengthAdjust="spacingAndGlyphs" fill="{INK}">{txt}</text>')
add(f'<text x="800" y="2430" text-anchor="middle" font-family="\'DejaVu Sans\', Arial, sans-serif" font-weight="bold" font-size="54" letter-spacing="10" fill="#fff">{AUTHOR}</text>')
add('</svg>')

svg_path = os.path.join(HERE, "cover.svg")
with open(svg_path, "w", encoding="utf-8") as fh:
    fh.write("\n".join(o))

png_path = os.path.join(HERE, "cover.png")
subprocess.run(["node", os.path.join(HERE, "render.cjs"), svg_path, png_path, str(W), str(H)],
               check=True, env={**os.environ, "NODE_PATH": subprocess.check_output(["npm", "root", "-g"], text=True).strip()})
print("wrote", svg_path, png_path)
