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

/* Thirteen streams, each a wave in wall space. The frequencies and drifts are deliberately not
   multiples of one another and five of them run backwards, so crossings keep moving
   instead of settling into a repeating knot. */
const STREAMS = [
  { v: 0.18, amp: 0.085, freq: 1.7, phase: 0.00, drift: 0.055, weight: 1.00 },
  { v: 0.30, amp: 0.120, freq: 2.3, phase: 1.20, drift: -0.041, weight: 0.85 },
  { v: 0.42, amp: 0.070, freq: 3.1, phase: 2.40, drift: 0.067, weight: 1.00 },
  { v: 0.50, amp: 0.145, freq: 1.3, phase: 0.60, drift: -0.029, weight: 0.75 },
  { v: 0.58, amp: 0.095, freq: 2.7, phase: 3.10, drift: 0.048, weight: 0.90 },
  { v: 0.66, amp: 0.060, freq: 4.1, phase: 1.80, drift: -0.073, weight: 0.70 },
  { v: 0.74, amp: 0.130, freq: 1.9, phase: 4.20, drift: 0.036, weight: 0.80 },
  { v: 0.84, amp: 0.075, freq: 3.5, phase: 2.90, drift: -0.052, weight: 0.60 },
  { v: 0.92, amp: 0.050, freq: 5.3, phase: 0.35, drift: 0.061, weight: 0.45 },
  { v: 0.24, amp: 0.105, freq: 2.9, phase: 5.10, drift: -0.058, weight: 0.80 },
  { v: 0.36, amp: 0.065, freq: 4.7, phase: 3.70, drift: 0.079, weight: 0.65 },
  { v: 0.62, amp: 0.115, freq: 2.1, phase: 1.45, drift: -0.044, weight: 0.85 },
  { v: 0.79, amp: 0.088, freq: 3.3, phase: 5.80, drift: 0.033, weight: 0.70 },
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
    this.resize();
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

  frame(t) {
    const { ctx } = this;
    if (!this.fit) this.resize();
    if (!this.fit) return;
    ctx.clearRect(0, 0, this.box.width, this.box.height);
    ctx.save();
    /* Hard clip to the measured wall. Whatever the streams do, nothing reaches the
       ceiling, the floor or the structures on the right. */
    ctx.clip(this.wallPath());
    ctx.globalCompositeOperation = 'lighter';

    const wallPx = Math.abs(this.fit.h);
    /* Fine enough that the sprites overlap into a filament. Any coarser and the stream
       reads as a string of beads, which is a different and much cheaper-looking thing. */
    const step = 0.0016;

    for (const s of STREAMS) {
      for (let u = U_MIN; u <= U_MAX; u += step) {
        const h = heightAt(u);
        const v = s.v + s.amp * Math.sin(Math.PI * 2 * (s.freq * u + s.phase + s.drift * t));
        if (v < 0.02 || v > 0.98) continue;

        /* Fade at every boundary the eye could catch an edge on: the two ends of the wall
           and the top and bottom of the band. */
        const fadeU = smooth((u - U_MIN) / 0.09) * smooth((U_MAX - u) / 0.07);
        const fadeV = smooth(v / 0.10) * smooth((1 - v) / 0.10);
        let a = s.weight * fadeU * fadeV * this.intensity;
        if (a <= 0.002) continue;

        /* A brightness packet travelling along the stream is what makes it read as flow
           rather than as a static dotted line. */
        const packet = 0.45 + 0.55 * Math.pow(
          Math.max(0, Math.sin(Math.PI * 2 * (u * 2.1 - s.drift * t * 3.4 + s.phase))), 3);
        a *= packet;

        const [x, y] = this.px(u, topAt(u) + v * h);
        /* Size follows the wall, so the far end of the stream is finer than the near end. */
        const r = Math.max(0.5, (h / 0.725) * wallPx * 0.0030);

        ctx.fillStyle = GLOW + (a * 0.30).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, 6.2832); ctx.fill();
        ctx.fillStyle = CORE + (a * 0.52).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      }
    }
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
      this.t += Math.min(0.05, (now - this.last) / 1000);
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
