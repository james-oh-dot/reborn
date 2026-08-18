#!/usr/bin/env node
/**
 * Subpage hero fields — one seeded particle/wave graphic per menu.
 *
 * The home hero carries the real thing: a photographed room with the particle
 * wave running across its LED wall (see remotion/rebornsoft-hero-wave). Subpages
 * must not compete with it, so they get the same visual language rendered as a
 * quiet static field: the same current-and-dust vocabulary, roughly a fifth of
 * the amplitude, no photography, no video.
 *
 * Every menu deforms that one field differently, and each deformation restates
 * the geometric identity the page already had in site.css section 07:
 *
 *   COMPANY       strata      currents lie flat and stack — accumulated layers
 *   CAPABILITIES  focus       the field bends into a lens at 76%/44% — recognition
 *   WORK          spread      one travelling current, clustered at measured marks
 *   CONTACT       converge    a fan collapsing to a single point at 88%/74%
 *
 * Colour is the hero's own palette. The hero video's blue particles were rotated
 * onto the brand hue in ff38fbc (blue median 215.3 -> red 353.7); the three
 * particle colours below are that same rotation applied to the three source
 * colours in hyperframes/rebornsoft-hero-particle/DESIGN.md.
 *
 * Output is deterministic: same seed, same bytes. Re-run after editing PAGES.
 *
 *   node work_in_progress/scripts/generate-hero-fields.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1600;
const H = 900;
const TAU = Math.PI * 2;
const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/hero-fields');

/* ---------------------------------------------------------------- helpers */

const mulberry32 = (seed) => {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Smoothstep interpolation across control points — the hero's waveAt(). */
const splineAt = (points, u) => {
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    if (u <= b[0]) return a[1] + (b[1] - a[1]) * smoothstep(a[0], b[0], u);
  }
  return points[points.length - 1][1];
};

const num = (value) => {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

const alphaText = (value) => value.toFixed(2).replace(/^0/, '');

/* ---------------------------------------------------------------- palette */
/* The hero's three particle colours, hue-rotated onto the brand red the same way
   the hero video was: body, illumination, and the rare highlight. At the alphas
   used here the rotated #A83D48 read as grey against the ink, so the body sits a
   little nearer the brand itself. */
const BODY = '#B02334';
const GLOW = '#FF5C6B';
const SPARK = '#FFD9DF';
const PARTICLE_COLOURS = [BODY, GLOW, SPARK];

/* ------------------------------------------------------------------ pages */

const PAGES = [
  {
    /* COMPANY — strata. Thirteen currents run flat and evenly spaced, no single one
       leading: a company read as accumulated layers rather than as one event. */
    name: 'company',
    seed: 0x434f4d50,
    wave: [[0, 0.3], [0.26, 0.335], [0.52, 0.375], [0.78, 0.415], [1, 0.45]],
    bands: [-0.28, -0.228, -0.182, -0.14, -0.101, -0.065, -0.03, 0.008, 0.05, 0.096, 0.146, 0.202],
    amp: 7,
    core: 0.34,
    coreBand: -0.03,
    count: 1450,
    dust: 0.58,
    spread: 0.075,
    dustV: (r) => 0.06 + Math.pow(r(), 0.7) * 0.86,
    gathers: [],
    warp: null,
    ripple: [11, 5, 8],
    grad: [[0, 0.02], [0.2, 0.12], [0.5, 0.28], [0.78, 0.32], [1, 0.13]],
    mask: { cx: 0.68, cy: 0.38, rx: 0.74, ry: 0.72, in: 0.3, out: 1.12 },
    dash: ['300 62 128 74', '420 78 190 96', '224 54 96 68'],
  },
  {
    /* CAPABILITIES — focus. The whole field bends into a lens at 76%/44%, where the
       old CSS reticle sat: splayed at the left edge, locked onto one point. */
    name: 'capabilities',
    seed: 0x43415041,
    wave: [[0, 0.47], [0.32, 0.45], [0.58, 0.435], [0.79, 0.43], [1, 0.45]],
    bands: [-0.27, -0.222, -0.176, -0.134, -0.095, -0.058, -0.024, 0.012, 0.05, 0.092, 0.138, 0.19, 0.248],
    amp: 9,
    core: 0.72,
    coreBand: -0.024,
    count: 1520,
    dust: 0.5,
    spread: 0.08,
    dustV: (r) => 0.06 + r() * 0.88,
    gathers: [[0.76, 0.44, 0.09, 0.03]],
    warp: (x, y) => {
      const dx = x / W - 0.76;
      const dy = y / H - 0.44;
      const pull = Math.exp(-((dx * dx) / 0.13 + (dy * dy) / 0.07));
      return [x - dx * W * pull * 0.42, y - dy * H * pull * 0.62];
    },
    ripple: [17, 7, 11],
    grad: [[0, 0.03], [0.28, 0.12], [0.62, 0.26], [0.82, 0.36], [1, 0.1]],
    mask: { cx: 0.74, cy: 0.42, rx: 0.72, ry: 0.74, in: 0.28, out: 1.1 },
    dash: ['92 66 40 84', '118 80 52 104'],
  },
  {
    /* WORK — spread. One current genuinely travelling, with four denser marks at
       measured intervals: work plotted across a field, not gathered in one place. */
    name: 'work',
    seed: 0x574f524b,
    wave: [[0, 0.56], [0.18, 0.43], [0.35, 0.54], [0.51, 0.4], [0.68, 0.51], [0.84, 0.37], [1, 0.44]],
    bands: [-0.2, -0.158, -0.12, -0.085, -0.052, -0.02, 0.012, 0.048, 0.088, 0.132, 0.18],
    amp: 26,
    core: 0.6,
    coreBand: 0.012,
    count: 1500,
    dust: 0.52,
    spread: 0.07,
    dustV: (r) => 0.06 + r() * 0.88,
    gathers: [
      [0.15, 0.5, 0.055, 0.008],
      [0.39, 0.5, 0.062, 0.008],
      [0.63, 0.5, 0.055, 0.008],
      [0.87, 0.5, 0.066, 0.008],
    ],
    warp: null,
    ripple: [24, 10, 13],
    grad: [[0, 0.04], [0.22, 0.15], [0.52, 0.24], [0.76, 0.32], [1, 0.15]],
    mask: { cx: 0.7, cy: 0.44, rx: 0.78, ry: 0.74, in: 0.32, out: 1.14 },
    dash: ['112 78 50 100', '140 94 62 120'],
  },
  {
    /* CONTACT — converge. Every current fans in from the left and collapses onto a
       single point at 88%/74%, where the old CSS conic lines already met. */
    name: 'contact',
    seed: 0x434f4e54,
    wave: [[0, 0.31], [0.3, 0.43], [0.6, 0.57], [0.85, 0.7], [1, 0.76]],
    bands: [-0.34, -0.276, -0.216, -0.162, -0.112, -0.066, -0.024, 0.02, 0.068, 0.122, 0.182, 0.25],
    amp: 10,
    core: 0.66,
    coreBand: -0.024,
    count: 1400,
    dust: 0.44,
    spread: 0.095,
    dustV: (r) => 0.06 + r() * 0.86,
    gathers: [[0.88, 0.74, 0.1, 0.024]],
    /* the fan: every offset from the centre line shrinks to nothing at the meeting point */
    collapse: (u) => Math.pow(1 - smoothstep(0.02, 0.93, u), 1.3),
    warp: null,
    ripple: [14, 6, 9],
    grad: [[0, 0.05], [0.3, 0.14], [0.62, 0.24], [0.86, 0.34], [1, 0.1]],
    mask: { cx: 0.72, cy: 0.5, rx: 0.76, ry: 0.78, in: 0.3, out: 1.12 },
    dash: ['96 70 42 88', '124 84 56 108'],
  },
];

/* ------------------------------------------------------------------ build */

/** Visibility of the field at a point — an ellipse of light in the upper right,
 *  falling to nothing over the bottom-left block where the hero copy sits. The
 *  SVG <mask> below is the exact same function, so culling here changes nothing
 *  visually; it only keeps invisible circles out of the file. */
const maskAt = (cfg, x, y) => {
  const dx = (x / W - cfg.mask.cx) / cfg.mask.rx;
  const dy = (y / H - cfg.mask.cy) / cfg.mask.ry;
  return 1 - smoothstep(cfg.mask.in, cfg.mask.out, Math.hypot(dx, dy));
};

const bandOffset = (cfg, offset, u) => (cfg.collapse ? offset * cfg.collapse(u) : offset);

const currentPath = (cfg, offset, amp, phase, steps = 132) => {
  const parts = [];
  for (let step = 0; step <= steps; step += 1) {
    const u = step / steps;
    let x = u * W + Math.sin(phase + u * 5.2) * 13;
    let y =
      (splineAt(cfg.wave, u) + bandOffset(cfg, offset, u)) * H +
      Math.sin(u * 8.2 + phase) * amp +
      Math.sin(u * 18.5 - phase * 2) * 6;
    if (cfg.warp) [x, y] = cfg.warp(x, y);
    parts.push(`${step ? 'L' : 'M'}${num(x)} ${num(y)}`);
  }
  return parts.join('');
};

const buildCurrents = (cfg) => {
  const random = mulberry32(cfg.seed ^ 0x9e3779b9);
  const lines = [];
  const grad = cfg.grad
    .map(([offset, opacity]) => `<stop offset="${num(offset * 100)}%" stop-color="${GLOW}" stop-opacity="${alphaText(opacity)}"/>`)
    .join('');
  const sparkGrad = cfg.grad
    .map(([offset, opacity]) => `<stop offset="${num(offset * 100)}%" stop-color="${SPARK}" stop-opacity="${alphaText(opacity * 0.82)}"/>`)
    .join('');

  lines.push(`<linearGradient id="c" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">${grad}</linearGradient>`);
  lines.push(`<linearGradient id="s" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">${sparkGrad}</linearGradient>`);

  const paths = [];
  /* Soft core: three stacked strokes stand in for the hero's blurred glow, which
     would otherwise need an feGaussianBlur re-rasterised on every viewport resize. */
  const core = currentPath(cfg, cfg.coreBand, cfg.amp * 1.05, 0.4);
  const w = cfg.core;
  paths.push(`<path d="${core}" stroke="url(#c)" stroke-width="${num(30 * w + 8)}" stroke-opacity="${alphaText(0.2 * w)}" stroke-linecap="round"/>`);
  paths.push(`<path d="${core}" stroke="url(#c)" stroke-width="${num(9 * w + 2)}" stroke-opacity="${alphaText(0.34 * w)}" stroke-linecap="round"/>`);
  paths.push(`<path d="${core}" stroke="url(#s)" stroke-width="${num(2 * w + 0.8)}" stroke-opacity="${alphaText(0.5 * w)}" stroke-dasharray="120 88 52 132" stroke-linecap="round"/>`);

  cfg.bands.forEach((offset, index) => {
    const distance = Math.abs(offset - cfg.coreBand) / 0.3;
    const weight = clamp(1 - distance * 0.72, 0.3, 1);
    const width = (0.85 + weight * 1.35).toFixed(2);
    const opacity = (0.24 + weight * 0.4).toFixed(2);
    /* Without the jitter the stack tiles into a regular texture and stops reading
       as a field -- it looks like scratches on film. */
    const jitter = 0.7 + random() * 0.7;
    const path = currentPath(cfg, offset, cfg.amp * (0.6 + weight * 0.55) * jitter, index * 0.42 - 1.1);
    paths.push(
      `<path d="${path}" stroke="url(#c)" stroke-width="${width}" stroke-opacity="${opacity}" stroke-dasharray="${cfg.dash[index % cfg.dash.length]}" stroke-dashoffset="${num(random() * 340)}"/>`,
    );
  });

  return { defs: lines.join(''), paths: paths.join('') };
};

const buildParticles = (cfg) => {
  const random = mulberry32(cfg.seed);
  const groups = new Map();
  const trails = [];

  for (let index = 0; index < cfg.count; index += 1) {
    const layer = index % 4;
    const depth = 0.72 + layer * 0.14;
    const u = random();
    const isDust = random() < cfg.dust;
    const branch = Math.floor(random() * 3);
    const branchShift = branch === 1 ? 0.072 : branch === 2 ? -0.06 : 0;
    const signed = random() + random() + random() - 1.5;
    const centre = splineAt(cfg.wave, u) + bandOffset(cfg, branchShift, u);
    const offset = signed * (cfg.spread + layer * 0.011);
    const v = isDust ? cfg.dustV(random) : clamp(centre + bandOffset(cfg, offset, u), 0.06, 0.94);

    const phase = random() * TAU;
    const phaseB = random() * TAU;
    const [rippleY, rippleY2, rippleX] = cfg.ripple;

    let x = u * W + Math.sin(v * 9.6 + phase) * rippleX * depth;
    let y =
      v * H +
      Math.sin(u * 8.2 + phase * 0.1) * rippleY * depth +
      Math.sin(u * 17.4 + phaseB) * rippleY2;

    for (const [gx, gy, strength, falloff] of cfg.gathers) {
      const dx = x / W - gx;
      const dy = (y / H - gy) * 0.8;
      const influence = Math.exp(-(dx * dx + dy * dy) / falloff);
      x -= dx * W * influence * strength;
      y -= dy * H * influence * strength * 0.9;
    }

    if (cfg.warp) [x, y] = cfg.warp(x, y);
    if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;
    if (maskAt(cfg, x, y) < 0.03) continue;

    const size = 0.5 + random() * (layer === 3 ? 1.45 : 1);
    const cool = random();
    const colour = cool > 0.9 ? 2 : cool > 0.44 ? 1 : 0;
    const base = (isDust ? 0.06 : 0.15) + random() * (isDust ? 0.14 : 0.28);
    const alpha = clamp(base * (0.88 + layer * 0.07), 0.03, 0.5);
    const bucket = Math.max(0.03, Math.round(alpha * 50) / 50);
    const key = `${colour}|${bucket}`;
    if (!groups.has(key)) groups.set(key, { colour, bucket, dots: [] });
    groups.get(key).dots.push(`<circle cx="${num(x)}" cy="${num(y)}" r="${size.toFixed(1)}"/>`);

    if (!isDust && random() > 0.87) {
      trails.push(
        `<path d="M${num(x - 9 - layer * 3)} ${num(y)}L${num(x)} ${num(y)}" stroke-opacity="${alphaText(clamp(alpha * 0.45, 0.02, 0.2))}"/>`,
      );
    }
  }

  const dots = [...groups.values()]
    .sort((a, b) => a.colour - b.colour || a.bucket - b.bucket)
    .map((g) => `<g fill="${PARTICLE_COLOURS[g.colour]}" fill-opacity="${alphaText(g.bucket)}">${g.dots.join('')}</g>`)
    .join('');

  const trailGroup = trails.length
    ? `<g stroke="${GLOW}" stroke-width=".7" stroke-linecap="round">${trails.join('')}</g>`
    : '';

  return dots + trailGroup;
};

const buildSvg = (cfg) => {
  const { defs, paths } = buildCurrents(cfg);
  const particles = buildParticles(cfg);
  const { cx, cy, rx, ry } = cfg.mask;
  /* Luminance mask, identical to maskAt(): the field is only allowed where it
     will not sit behind the hero's headline and body copy. */
  const maskStops = [
    [cfg.mask.in, 1],
    [cfg.mask.in + (cfg.mask.out - cfg.mask.in) * 0.35, 0.78],
    [cfg.mask.in + (cfg.mask.out - cfg.mask.in) * 0.62, 0.38],
    [cfg.mask.in + (cfg.mask.out - cfg.mask.in) * 0.84, 0.11],
    [cfg.mask.out, 0],
  ]
    .map(([offset, value]) => `<stop offset="${num((offset / cfg.mask.out) * 100)}%" stop-color="#fff" stop-opacity="${alphaText(value)}"/>`)
    .join('');

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">`,
    '<defs>',
    defs,
    `<radialGradient id="m" cx="${num(cx * W)}" cy="${num(cy * H)}" r="${num(rx * cfg.mask.out * W)}" gradientUnits="userSpaceOnUse" gradientTransform="translate(${num(cx * W)} ${num(cy * H)}) scale(1 ${(ry / rx).toFixed(3)}) translate(${num(-cx * W)} ${num(-cy * H)})">${maskStops}</radialGradient>`,
    `<mask id="f" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#m)"/></mask>`,
    '</defs>',
    '<g mask="url(#f)">',
    `<g fill="none" stroke-linejoin="round">${paths}</g>`,
    particles,
    '</g>',
    '</svg>',
    '',
  ].join('\n');
};

mkdirSync(OUT_DIR, { recursive: true });
for (const cfg of PAGES) {
  const svg = buildSvg(cfg);
  const file = join(OUT_DIR, `${cfg.name}.svg`);
  writeFileSync(file, svg);
  console.log(`${cfg.name.padEnd(13)} ${(svg.length / 1024).toFixed(1)} KB`);
}
