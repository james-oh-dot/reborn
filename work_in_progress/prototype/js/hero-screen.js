/**
 * Home hero — motion on the wall, and only on the wall.
 *
 * The subpage heroes run a quiet field behind their whole copy column. This one is the
 * opposite brief: the photograph is a dark exhibition hall with a large blank projection
 * wall on the left, and the motion has to look like it is being projected onto that wall
 * rather than laid over the picture. So everything here is drawn in the wall's own
 * coordinates and then mapped through its perspective.
 *
 * The wall was measured off the photograph rather than guessed. Sampling luminance and
 * blueness down columns finds two edges: the ceiling junction, where a lit bluish ceiling
 * drops to flat black, and the base, which is the warm light strip along the floor and is
 * the brightest thing in the lower half. Both are recorded below as fractions of the
 * image, so they survive any crop the hero happens to make.
 */

/* u runs left to right along the wall, v runs top to bottom down it. The wall stops at
   0.52 because the raised platform and the console table take over past that. */
const U_MIN = 0.0, U_MAX = 0.52;

/* Ceiling junction: measured 0.21 at u=0.20 and 0.33 at u=0.35, which is a straight line
   in this projection. The left end is unlit and has no edge to find, so it is the same
   line extrapolated rather than a separate reading. */
const topAt = (u) => 0.05 + 0.80 * u;

/* Base: the warm floor strip, sampled every 0.05 and kept as the samples. It is close to
   straight for the first two thirds and then flattens as the wall turns away, and a fitted
   curve was a worse match than the readings themselves. */
const BASE = [
  [0.00, 0.775], [0.05, 0.752], [0.10, 0.730], [0.15, 0.708], [0.20, 0.686],
  [0.25, 0.663], [0.30, 0.640], [0.35, 0.625], [0.40, 0.619], [0.45, 0.618], [0.50, 0.620], [0.52, 0.621],
];
const baseAt = (u) => {
  for (let i = 1; i < BASE.length; i += 1) {
    if (u <= BASE[i][0]) {
      const [ua, va] = BASE[i - 1], [ub, vb] = BASE[i];
      return va + (vb - va) * ((u - ua) / (ub - ua));
    }
  }
  return BASE[BASE.length - 1][1];
};

/* Wall height in image fractions. It falls from 0.725 at the left edge to 0.232 at the
   right end, which is the whole perspective: anything drawn in wall space inherits it, so
   streams converge and their particles shrink toward the far end without being told to. */
const heightAt = (u) => baseAt(u) - topAt(u);

/* One primary current, then quieter harmonics of different weights. The previous version
   drew thirteen bead-filaments of similar thickness; they crossed into something that
   read as veins. These stay roughly parallel, travel the same way, and leave the braiding
   to particles peeling off the lines rather than to the lines themselves. */
const MAIN = { v: 0.50, amp: 0.072, freq: 1.28, phase: 0.18, drift: 0.034, width: 1.35, glow: 1.00 };
const WAVES = [
  { v: 0.32, amp: 0.040, freq: 1.92, phase: 1.35, drift: 0.046, width: 0.46, glow: 0.42 },
  { v: 0.68, amp: 0.034, freq: 1.64, phase: 2.70, drift: 0.027, width: 0.30, glow: 0.34 },
  { v: 0.20, amp: 0.028, freq: 2.36, phase: 0.62, drift: 0.041, width: 0.18, glow: 0.26 },
  { v: 0.80, amp: 0.024, freq: 2.10, phase: 3.85, drift: 0.022, width: 0.11, glow: 0.20 },
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
    const sign = Math.random() < 0.5 ? -1 : 1;
    return {
      wave,
      u: anywhere ? U_MIN + Math.random() * (U_MAX - U_MIN)
                  : U_MIN + 0.05 + Math.random() * (U_MAX - U_MIN - 0.10),
      speed: 0.045 + Math.random() * 0.055 + (wave === MAIN ? 0.01 : 0),
      off: (Math.random() - 0.5) * 0.012,
      vo: sign * (0.07 + Math.random() * 0.16),
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

    const nw = this.media.naturalWidth || 3344, nh = this.media.naturalHeight || 1882;
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
    return s.v + s.amp * Math.sin(Math.PI * 2 * (s.freq * u + s.phase + s.drift * t));
  }

  /* One continuous stroke per span, not a chain of round-capped segments.
     Short round-capped pieces stacked into overlapping circles, which is why the
     last pass still read as beads even after the filament count dropped. Width is
     stepped in three spans so the far end still thins with the wall. */
  strokeWave(s, t) {
    const { ctx } = this;
    const wallPx = Math.abs(this.fit.h);
    const spans = [[0, 0.34], [0.34, 0.67], [0.67, 1]];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const [a, b] of spans) {
      const midU = U_MIN + (U_MAX - U_MIN) * ((a + b) / 2);
      const w = Math.max(0.7, (heightAt(midU) / 0.725) * wallPx * 0.014 * s.width);
      const N = 28;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= N; i += 1) {
        const u = U_MIN + (U_MAX - U_MIN) * (a + (b - a) * (i / N));
        const h = heightAt(u);
        const v = this.waveV(s, u, t);
        if (v < 0.02 || v > 0.98) { started = false; continue; }
        const [x, y] = this.px(u, topAt(u) + v * h);
        if (!started) { ctx.moveTo(x, y); started = true; }
        else ctx.lineTo(x, y);
      }
      if (!started) continue;

      const fade = smooth(((a + b) / 2) / 0.10) * smooth((1 - (a + b) / 2) / 0.12);
      const aGlow = s.glow * fade * this.intensity;
      ctx.strokeStyle = GLOW + (aGlow * 0.38).toFixed(3) + ')';
      ctx.lineWidth = w * 2.4;
      ctx.stroke();
      ctx.strokeStyle = CORE + (aGlow * 0.82).toFixed(3) + ')';
      ctx.lineWidth = w;
      ctx.stroke();
    }
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

      const fadeU = smooth((p.u - U_MIN) / 0.07) * smooth((U_MAX - p.u) / 0.05);
      const fadeV = smooth(v / 0.10) * smooth((1 - v) / 0.10);
      const life = 1 - (p.age / p.life);
      const a = fadeU * fadeV * life * this.intensity;
      if (a <= 0.02) continue;

      const [x, y] = this.px(p.u, topAt(p.u) + v * h);
      const r = Math.max(0.45, (h / 0.725) * wallPx * 0.0022 * p.size);

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
    /* Hard clip to the measured wall. Whatever the waves do, nothing reaches the
       ceiling, the floor or the structures on the right. */
    ctx.clip(this.wallPath());

    /* Lines are source-over so overlapping harmonics do not climb into a red mass.
       Particles keep the additive blend so they read as light peeling off the current. */
    ctx.globalCompositeOperation = 'source-over';
    for (const s of WAVES) this.strokeWave(s, t);
    this.strokeWave(MAIN, t);
    if (this.running) this.stepParticles(this.dt);
    this.drawParticles(t);
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
