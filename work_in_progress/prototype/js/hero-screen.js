/**
 * Home hero — the subpage particle field, drawn on the wall.
 *
 * The four menu curves (company strata, capabilities pinch, work travelling
 * crests, contact converge) are the motion language of the site. This page
 * does not invent a fifth: it composites those four onto the projection
 * screen in the photograph. Contact's fan originally fell to the lower right,
 * which would run through the family, so it is inverted to climb with the
 * others. Left-to-right flow, the up-right lift past the people, and the
 * far-edge fade are the wall's own geometry — they are not part of the field.
 */

import { ParticleWave, VARIATIONS } from './particle-wave.js?v=14';

const U_MIN = 0.05, U_MAX = 0.74;

const sample = (table, u) => {
  if (u <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i += 1) {
    if (u <= table[i][0]) {
      const [ua, va] = table[i - 1], [ub, vb] = table[i];
      return va + (vb - va) * ((u - ua) / (ub - ua));
    }
  }
  return table[table.length - 1][1];
};

/* Top of the panel. It drops with the wall's perspective until about u=0.40, then
   the curve turns and the far edge rises again — that rise is what lets the waves
   climb over the family instead of running through them. */
const TOP = [
  [0.05, 0.096], [0.10, 0.156], [0.15, 0.202], [0.20, 0.245], [0.25, 0.277],
  [0.30, 0.315], [0.35, 0.344], [0.40, 0.359], [0.45, 0.356], [0.50, 0.347],
  [0.55, 0.335], [0.60, 0.325], [0.65, 0.315], [0.70, 0.298], [0.74, 0.260],
];
const topAt = (u) => sample(TOP, u);

const BASE = [
  [0.05, 0.764], [0.10, 0.724], [0.15, 0.678], [0.20, 0.641], [0.25, 0.619],
  [0.30, 0.603], [0.35, 0.593], [0.40, 0.591], [0.45, 0.586], [0.50, 0.583],
  [0.55, 0.588], [0.60, 0.591], [0.65, 0.591], [0.70, 0.596], [0.74, 0.600],
];
const baseAt = (u) => sample(BASE, u);

const heightAt = (u) => baseAt(u) - topAt(u);

/* From u=0.36 the current climbs toward the top of the panel so it stays above
   the family. 0 at the left, 1 at the far edge. */
const liftAt = (u) => smooth((u - 0.36) / (U_MAX - 0.36));

/* Contact's identity is a fan collapsing to a point. On the subpage that point
   is the lower right; here the same collapse has to finish at the upper right
   or it walks through the people. invertY is that remap. Weights are below 1
   because four additive crests on one wall would read as a red mass. */
const HOME_LAYERS = [
  { ...VARIATIONS.company, weight: 0.90 },
  { ...VARIATIONS.capabilities, weight: 0.55 },
  { ...VARIATIONS.work, weight: 0.50 },
  { ...VARIATIONS.contact, invertY: true, weight: 0.42 },
];

export class HeroScreen {
  constructor(canvas, media, opts = {}) {
    this.canvas = canvas;
    this.media = media;
    this.copy = opts.copy || null;
    this.shieldStrength = opts.shieldStrength ?? 0.74;
    this.maxDpr = opts.maxDpr ?? 1.5;
    this.t = 0;
    this.running = false;
    this.field = new ParticleWave(canvas, {
      managed: true,
      transparent: true,
      leaveClear: true,
      preset: 'brand',
      seed: 0x484f4d45,
      intensity: opts.intensity ?? 0.64,
      coreScale: 0.42,
      maxDpr: this.maxDpr,
      loopSeconds: 18,
      layers: HOME_LAYERS,
      project: (u, y) => this.projectField(u, y),
    });
    this.ctx = this.field.ctx;
    this.still = this.field.still;
    this.resize();
  }

  /* The canvas shares the stage box with the photograph, so it has to reproduce the same
     object-fit: cover placement to land on the same pixels. Reading object-position off
     the image rather than hard-coding it keeps the two in step when a breakpoint moves it. */
  resize() {
    const box = this.canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const dpr = Math.min(devicePixelRatio || 1, this.maxDpr, this.field.limits.dprCap);
    this.dpr = dpr;
    this.canvas.width = Math.round(box.width * dpr);
    this.canvas.height = Math.round(box.height * dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    const nw = this.media.naturalWidth || 5016, nh = this.media.naturalHeight || 2823;
    const pos = getComputedStyle(this.media).objectPosition.split(' ');
    const frac = (s, i) => (s && s.endsWith('%') ? parseFloat(s) / 100 : i);
    const px = frac(pos[0], 0.5), py = frac(pos[1] ?? pos[0], 0.5);

    const scale = Math.max(box.width / nw, box.height / nh);
    this.fit = { w: nw * scale, h: nh * scale };
    this.fit.x = (box.width - this.fit.w) * px;
    this.fit.y = (box.height - this.fit.h) * py;
    this.box = box;

    this.field.opts.hostDpr = dpr;
    this.field.width = 0;
    this.field.resize();

    if (this.copy) {
      const c = this.copy.getBoundingClientRect();
      this.shield = { l: c.left - box.left, t: c.top - box.top,
                      r: c.right - box.left, b: c.bottom - box.top };
      this.buildMask();
    }
  }

  /* The headline sits on the wall, not beside it, so two obvious fixes both failed.
     Cutting the streams out where the copy is left almost no wall to run on -- emitted
     light fell 86 per cent and the hero ended up quieter than the subpages it is meant to
     beat. Scaling each sprite's alpha down there did not work either, because the blend is
     additive: overlapping samples climbed back to 205 of 255 however low one sample was set.

     What is bounded has to be the composited result, so the streams draw at full strength
     and one feathered mask is taken back out of them afterwards. destination-out scales
     whatever is underneath by a known factor, so the worst pixel is predictable no matter
     how many filaments crossed there. The mask is built once per resize -- a blur this wide
     is not something to run sixty times a second -- and costs one drawImage per frame. */
  buildMask() {
    const s = this.shield;
    if (!s || !this.box) { this.mask = null; return; }
    const dpr = this.dpr;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const m = this.mask && this.mask.width === w ? this.mask : Object.assign(document.createElement('canvas'), { width: w, height: h });
    m.width = w; m.height = h;
    const g = m.getContext('2d');
    g.filter = 'blur(' + (64 * dpr) + 'px)';
    g.fillStyle = 'rgba(0,0,0,' + this.shieldStrength + ')';
    const pad = 26 * dpr;
    g.fillRect(s.l * dpr - pad, s.t * dpr - pad,
               (s.r - s.l) * dpr + pad * 2, (s.b - s.t) * dpr + pad * 2);
    g.filter = 'none';
    this.mask = m;
  }

  /* image fraction -> device pixels on the canvas */
  px(ix, iy) {
    return [(this.fit.x + ix * this.fit.w) * this.dpr, (this.fit.y + iy * this.fit.h) * this.dpr];
  }

  /* Field u,y (0–1, the same space the subpages use) onto the measured screen.
     liftAt pulls the whole composite toward the top as it travels right. */
  projectField(u, yNorm) {
    if (!this.fit) return [0, 0];
    const su = U_MIN + u * (U_MAX - U_MIN);
    const lift = liftAt(su);
    let v = yNorm * (1 - lift * 0.72) + 0.08 * lift;
    if (v < 0.02) v = 0.02;
    if (v > 0.96) v = 0.96;
    return this.px(su, topAt(su) + v * heightAt(su));
  }

  wallPath() {
    const p = new Path2D();
    const N = 40;
    for (let i = 0; i <= N; i += 1) {
      const u = U_MIN + (U_MAX - U_MIN) * (i / N);
      const [x, y] = this.px(u, topAt(u));
      i ? p.lineTo(x, y) : p.moveTo(x, y);
    }
    for (let i = N; i >= 0; i -= 1) {
      const u = U_MIN + (U_MAX - U_MIN) * (i / N);
      const [x, y] = this.px(u, baseAt(u));
      p.lineTo(x, y);
    }
    p.closePath();
    return p;
  }

  /* Soften the far edge so the current dissolves on the panel instead of hitting
     the clip and reading as a cut. Drawn after the field, still inside the clip. */
  fadeRight() {
    const { ctx } = this;
    const [x0] = this.px(U_MAX - 0.16, 0.5);
    const [x1] = this.px(U_MAX + 0.01, 0.5);
    const g = ctx.createLinearGradient(x0, 0, x1, 0);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.45, 'rgba(0,0,0,0.35)');
    g.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = g;
    ctx.fill(this.wallPath());
  }

  frame(t) {
    const { ctx } = this;
    if (!this.fit) this.resize();
    if (!this.fit) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    /* Hard clip to the measured screen. Whatever the four curves do, nothing leaves
       the panel or runs through the family below its lower edge. */
    ctx.clip(this.wallPath());
    this.field.frame(t);
    this.fadeRight();
    ctx.restore();

    if (this.mask) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(this.mask, 0, 0);
      ctx.restore();
    }
  }

  start() {
    if (this.running || this.still) return;
    this.running = true;
    this.origin = 0;
    const auto = this.field.opts.quality === 'auto';
    let previous = 0;
    const loop = (now) => {
      if (!this.running) return;
      if (!this.origin) this.origin = now;
      this.t = ((now - this.origin) / 1000 / this.field.opts.loopSeconds) % 1;
      this.frame(this.t);

      if (auto) {
        const delta = previous ? now - previous : 0;
        previous = now;
        this.field.samples += 1;
        if (this.field.samples > 10 && delta > 0 && delta < 400) this.field.cost += delta;
        if (this.field.samples === 42) {
          const mean = this.field.cost / 31;
          if (mean > this.field.opts.budgetMs && this.field.stepDown()) {
            previous = 0;
            this.resize();
          }
          this.field.opts.quality = this.field.tier;
        }
      }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}

const smooth = (x) => {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
};
