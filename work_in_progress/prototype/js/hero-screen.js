/**
 * Home hero — motion on the wall, and only on the wall.
 *
 * The subpage heroes run a quiet field behind their whole copy column. This one is the
 * opposite brief: the photograph is a dark exhibition hall with a large blank projection
 * wall on the left, and the motion has to look like it is being projected onto that wall
 * rather than laid over the picture. So everything here is drawn in the wall's own
 * coordinates and then mapped through its perspective.
 *
 * The screen was traced off a live overlay of the photograph rather than guessed
 * from luminance. u/v live in the panel's own coordinates and then map through
 * its perspective, so the current stays on the glass and not on the ceiling, the
 * floor strip, or the family standing in front of it.
 */

/* u runs left to right along the projection screen, v runs top to bottom down it.
   The screen is the dark curved panel on the wall — not the whole wall down to the
   floor strip. It was traced off the live hero: it begins just in from the left edge
   and runs behind the family, ending at the panel's right reveal. */
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

/* Bottom of the panel. Past u=0.35 it sits just above the family's heads; waves
   do not use this edge on the right — they lift toward the top before they get there. */
const BASE = [
  [0.05, 0.764], [0.10, 0.724], [0.15, 0.678], [0.20, 0.641], [0.25, 0.619],
  [0.30, 0.603], [0.35, 0.593], [0.40, 0.591], [0.45, 0.586], [0.50, 0.583],
  [0.55, 0.588], [0.60, 0.591], [0.65, 0.591], [0.70, 0.596], [0.74, 0.600],
];
const baseAt = (u) => sample(BASE, u);

const heightAt = (u) => baseAt(u) - topAt(u);
const H0 = heightAt(U_MIN);

/* From u=0.36 the current climbs toward the top of the panel so it stays above
   the family. 0 at the left, 1 at the far edge. */
const liftAt = (u) => smooth((u - 0.36) / (U_MAX - 0.36));

/* One primary current, then quieter harmonics. They share the lift, so the whole
   bundle goes up together on the right instead of the lower ones clipping the people. */
const MAIN = { v: 0.46, amp: 0.070, freq: 1.22, phase: 0.18, drift: 0.034, width: 1.35, glow: 1.00 };
const WAVES = [
  { v: 0.30, amp: 0.042, freq: 1.88, phase: 1.35, drift: 0.046, width: 0.46, glow: 0.42 },
  { v: 0.60, amp: 0.036, freq: 1.60, phase: 2.70, drift: 0.027, width: 0.30, glow: 0.34 },
  { v: 0.18, amp: 0.028, freq: 2.28, phase: 0.62, drift: 0.041, width: 0.18, glow: 0.26 },
  { v: 0.70, amp: 0.024, freq: 2.04, phase: 3.85, drift: 0.022, width: 0.11, glow: 0.20 },
];

const CORE = 'rgba(255,241,232,';   /* warm white, the part that reads as light */
const GLOW = 'rgba(215,11,28,';     /* brand red, the part that reads as colour */

export class HeroScreen {
  constructor(canvas, media, opts = {}) {
    this.canvas = canvas;
    this.media = media;
    this.copy = opts.copy || null;
    this.shieldStrength = opts.shieldStrength ?? 0.74;
    this.ctx = canvas.getContext('2d');
    this.intensity = opts.intensity ?? 1;
    this.maxDpr = opts.maxDpr ?? 1.75;
    this.still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.running = false;
    this.t = 0;
    this.last = 0;
    this.dt = 0.016;
    this.seedParticles();
    this.resize();
  }

  seedParticles() {
    this.particles = [];
    for (let i = 0; i < 86; i += 1) {
      const wave = i < 38 ? MAIN : WAVES[(i - 38) % WAVES.length];
      this.particles.push(this.makeParticle(wave, true));
    }
  }

  /* Particles start on a wave and peel off it. They are not beads that sit on the
     stroke — that is what made the last pass read as veins. */
  makeParticle(wave, anywhere) {
    return {
      wave,
      u: anywhere ? U_MIN + Math.random() * (U_MAX - U_MIN)
                  : U_MIN + 0.05 + Math.random() * (U_MAX - U_MIN - 0.10),
      speed: 0.045 + Math.random() * 0.055 + (wave === MAIN ? 0.01 : 0),
      off: (Math.random() - 0.5) * 0.010,
      vo: -Math.abs(0.05 + Math.random() * 0.12),
      age: anywhere ? Math.random() * 0.9 : 0,
      life: 0.55 + Math.random() * 0.85,
      size: (wave === MAIN ? 1.05 : 0.65) + Math.random() * 1.25,
    };
  }

  /* The canvas shares the stage box with the photograph, so it has to reproduce the same
     object-fit: cover placement to land on the same pixels. Reading object-position off
     the image rather than hard-coding it keeps the two in step when a breakpoint moves it. */
  resize() {
    const box = this.canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const dpr = Math.min(devicePixelRatio || 1, this.maxDpr);
    this.canvas.width = Math.round(box.width * dpr);
    this.canvas.height = Math.round(box.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const nw = this.media.naturalWidth || 5016, nh = this.media.naturalHeight || 2823;
    const pos = getComputedStyle(this.media).objectPosition.split(' ');
    const frac = (s, i) => (s && s.endsWith('%') ? parseFloat(s) / 100 : i);
    const px = frac(pos[0], 0.5), py = frac(pos[1] ?? pos[0], 0.5);

    const scale = Math.max(box.width / nw, box.height / nh);
    this.fit = { w: nw * scale, h: nh * scale };
    this.fit.x = (box.width - this.fit.w) * px;
    this.fit.y = (box.height - this.fit.h) * py;
    this.box = box;

    /* The headline sits over the wall, so the streams have to give way to it. Guessing at
       the zone in wall coordinates was not good enough -- it missed the top third of the
       headline and let a saturated filament cross it at 2.16:1. The copy's own rectangle is
       read instead, so it follows the breakpoint, the language and the line count. */
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
    const w = Math.max(1, Math.round(this.box.width));
    const h = Math.max(1, Math.round(this.box.height));
    const m = this.mask && this.mask.width === w ? this.mask : Object.assign(document.createElement('canvas'), { width: w, height: h });
    m.width = w; m.height = h;
    const g = m.getContext('2d');
    g.filter = 'blur(64px)';
    g.fillStyle = 'rgba(0,0,0,' + this.shieldStrength + ')';
    const pad = 26;
    g.fillRect(s.l - pad, s.t - pad, (s.r - s.l) + pad * 2, (s.b - s.t) + pad * 2);
    g.filter = 'none';
    this.mask = m;
  }

  /* image fraction -> css pixels on the canvas */
  px(ix, iy) {
    return [this.fit.x + ix * this.fit.w, this.fit.y + iy * this.fit.h];
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

  waveV(s, u, t) {
    const lift = liftAt(u);
    const rest = s.v * (1 - lift * 0.72) + 0.10 * lift;
    const amp = s.amp * (1 - lift * 0.45);
    return rest + amp * Math.sin(Math.PI * 2 * (s.freq * u + s.phase + s.drift * t));
  }

  /* One filled ribbon per wave, not three butted strokes. Splitting the path to
     change width left a visible join in the middle of the main line. The ribbon
     keeps a single outline and still thins with the panel's perspective. */
  strokeWave(s, t) {
    const wallPx = Math.abs(this.fit.h);
    const N = 96;
    const pts = [];
    for (let i = 0; i <= N; i += 1) {
      const u = U_MIN + (U_MAX - U_MIN) * (i / N);
      const h = heightAt(u);
      let v = this.waveV(s, u, t);
      v = Math.max(0.04, Math.min(0.92, v));
      const [x, y] = this.px(u, topAt(u) + v * h);
      const w = Math.max(0.7, (h / H0) * wallPx * 0.013 * s.width);
      pts.push({ x, y, w });
    }
    const a = s.glow * this.intensity;
    this.fillRibbon(pts, 2.4, GLOW + (a * 0.38).toFixed(3) + ')');
    this.fillRibbon(pts, 1.0, CORE + (a * 0.82).toFixed(3) + ')');
  }

  fillRibbon(pts, widthMul, color) {
    if (pts.length < 2) return;
    const { ctx } = this;
    const left = [], right = [];
    for (let i = 0; i < pts.length; i += 1) {
      const p = pts[i];
      const q = i === 0 ? pts[1] : i === pts.length - 1 ? pts[i - 1] : pts[i + 1];
      let dx = q.x - p.x, dy = q.y - p.y;
      if (i === pts.length - 1) { dx = p.x - q.x; dy = p.y - q.y; }
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const hw = p.w * widthMul * 0.5;
      left.push([p.x + nx * hw, p.y + ny * hw]);
      right.push([p.x - nx * hw, p.y - ny * hw]);
    }
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(left[0][0], left[0][1]);
    for (let i = 1; i < left.length; i += 1) ctx.lineTo(left[i][0], left[i][1]);
    for (let i = right.length - 1; i >= 0; i -= 1) ctx.lineTo(right[i][0], right[i][1]);
    ctx.closePath();
    ctx.fill();
    const cap = pts[0].w * widthMul * 0.5;
    const end = pts[pts.length - 1];
    ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, cap, 0, 6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(end.x, end.y, end.w * widthMul * 0.5, 0, 6.2832); ctx.fill();
  }

  /* Soften the far edge so the current dissolves on the panel instead of hitting
     the clip and reading as a cut. Drawn after the waves, still inside the clip. */
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

  stepParticles(dt) {
    for (let i = 0; i < this.particles.length; i += 1) {
      const p = this.particles[i];
      p.age += dt;
      p.u += p.speed * dt;
      p.off += p.vo * dt * (0.35 + p.age * 1.15);
      if (p.u > U_MAX + 0.02 || p.age > p.life) {
        this.particles[i] = this.makeParticle(p.wave, false);
      }
    }
  }

  drawParticles(t) {
    const { ctx } = this;
    const wallPx = Math.abs(this.fit.h);
    ctx.globalCompositeOperation = 'lighter';

    for (const p of this.particles) {
      const h = heightAt(p.u);
      if (h <= 0) continue;
      const v = this.waveV(p.wave, p.u, t) + p.off;
      if (v < 0.02 || v > 0.98) continue;

      const fadeU = smooth((p.u - U_MIN) / 0.07) * smooth((U_MAX - p.u) / 0.16);
      const fadeV = smooth(v / 0.10) * smooth((1 - v) / 0.10);
      const life = 1 - (p.age / p.life);
      const a = fadeU * fadeV * life * this.intensity;
      if (a <= 0.02) continue;

      const [x, y] = this.px(p.u, topAt(p.u) + v * h);
      const r = Math.max(0.45, (h / H0) * wallPx * 0.0022 * p.size);

      ctx.fillStyle = GLOW + (a * 0.38).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(x, y, r * 2.8, 0, 6.2832); ctx.fill();
      ctx.fillStyle = CORE + (a * 0.72).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
  }

  frame(t) {
    const { ctx } = this;
    if (!this.fit) this.resize();
    if (!this.fit) return;
    ctx.clearRect(0, 0, this.box.width, this.box.height);
    ctx.save();
    /* Hard clip to the measured screen. Whatever the waves do, nothing leaves the
       panel or runs through the family below its lower edge. */
    ctx.clip(this.wallPath());

    /* Lines are source-over so overlapping harmonics do not climb into a red mass.
       Particles keep the additive blend so they read as light peeling off the current. */
    ctx.globalCompositeOperation = 'source-over';
    for (const s of WAVES) this.strokeWave(s, t);
    this.strokeWave(MAIN, t);
    if (this.running) this.stepParticles(this.dt);
    this.drawParticles(t);
    this.fadeRight();
    ctx.restore();

    /* Taken out after the clip is released, so the falloff is free to reach past the wall
       edge instead of being cut square against it. */
    if (this.mask) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(this.mask, 0, 0, this.box.width, this.box.height);
      ctx.restore();
    }
  }

  start() {
    if (this.running || this.still) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now) => {
      if (!this.running) return;
      /* Time, not frame count, so a slow device runs the same motion more coarsely
         instead of running it in slow motion. */
      this.dt = Math.min(0.05, (now - this.last) / 1000);
      this.t += this.dt;
      this.last = now;
      this.frame(this.t);
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
