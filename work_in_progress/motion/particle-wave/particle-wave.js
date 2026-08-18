/**
 * Particle wave field — a live canvas rendering of the flowing-ribbon-and-glitter look.
 *
 * Everything is periodic over `loopSeconds`, so frame t and frame t+loop are identical.
 * That is what lets the same code drive a page in real time and be captured frame by frame
 * into a video with no seam at the wrap. Every travelling term therefore has to complete a
 * whole number of traversals per loop -- the first cut of this used fractional drift rates
 * and 33% of the pixels differed between t=0 and t=1. If you add motion here, add it as
 * sin/cos of `t * TAU * k` or as `(x + t * k) % 1` with k a positive integer, and re-run
 * the seam check in README.md.
 *
 * Glow is drawn from pre-rendered sprites rather than a per-particle radial gradient or
 * ctx.filter. Both of those are correct and both cost far too much: a few thousand
 * gradients per frame will not hold 60fps, and canvas blur re-runs on every draw.
 *
 *   const field = new ParticleWave(canvas, { preset: 'gold' });
 *   field.start();
 *
 * @typedef {Object} Preset
 * @property {string[]} ground      background stops, dark to warm
 * @property {number[]} glowAt      [x, y] of the background bloom, normalised
 * @property {string[]} particles   particle body colours, dim to bright
 * @property {string}   core        the bright crest line
 * @property {number}   intensity   overall multiplier on every alpha
 */

const TAU = Math.PI * 2;

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

/** Catmull-Rom through the control points — the ribbon needs curvature continuity that
 *  smoothstep between pairs does not give, or the crest shows facets where bands meet. */
const splineAt = (points, u) => {
  const last = points.length - 1;
  let i = 0;
  while (i < last - 1 && u > points[i + 1][0]) i += 1;
  const p0 = points[Math.max(0, i - 1)];
  const p1 = points[i];
  const p2 = points[Math.min(last, i + 1)];
  const p3 = points[Math.min(last, i + 2)];
  const span = p2[0] - p1[0] || 1;
  const t = clamp((u - p1[0]) / span, 0, 1);
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    2 * p1[1] +
    (-p0[1] + p2[1]) * t +
    (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
    (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
  );
};

export const PRESETS = {
  /* The reference: warm gold over near-black, full strength. */
  gold: {
    ground: ['#000000', '#150c03', '#2e1c08'],
    glowAt: [0.56, 0.3],
    particles: ['#6b4310', '#a86f1c', '#d99b2c', '#f6cd6a', '#fff0c4'],
    core: '#fff4d8',
    bokeh: '#f0c46a',
    intensity: 1,
  },
  /* The same field on the Rebornsoft brand hue, at the level the site's heroes sit at. */
  brand: {
    ground: ['#000000', '#160406', '#2c080e'],
    glowAt: [0.6, 0.34],
    particles: ['#6e1420', '#a3202f', '#d33345', '#ff6a78', '#ffd9df'],
    core: '#ffe4e8',
    bokeh: '#ff7f8b',
    intensity: 0.62,
  },
};

/* Canvas2d is GPU-accelerated on real hardware and software-rasterised without it, and the
 * two have opposite cost models: a GPU barely notices filled pixels and charges for draw
 * calls, a software rasteriser is the reverse. Rather than tune for one and hope, the
 * field measures its own frame cost and steps down until it fits the budget. */
export const TIERS = {
  high: { dprCap: 2, grains: 30000, particles: 1800, bokeh: 62, columns: 144 },
  medium: { dprCap: 1.5, grains: 17000, particles: 1100, bokeh: 44, columns: 112 },
  low: { dprCap: 1, grains: 8000, particles: 520, bokeh: 26, columns: 72 },
};

const DEFAULTS = {
  preset: 'gold',
  seed: 0x7a1d3f09,
  loopSeconds: 12,
  /** 'auto' benchmarks and settles; a tier name pins it. */
  quality: 'auto',
  /** Frame-to-frame milliseconds the field is allowed to run at before it steps down.
   *  22ms is roughly 45fps -- below vsync but not yet visibly stuttering. */
  budgetMs: 22,
  bokeh: 62,
  /* Ribbons per side of the crest. Each is a filled band, not a stroke — the reference
     reads as sheets of material catching light, which a stroke cannot do. */
  bands: [-0.115, -0.074, -0.042, -0.016, 0, 0.03, 0.068, 0.112, 0.163],
  wave: [[0, 0.4], [0.14, 0.51], [0.3, 0.61], [0.46, 0.655], [0.6, 0.6], [0.74, 0.47], [0.88, 0.33], [1, 0.23]],
  /* Where the surface at the foot of the frame crests. */
  shelf: [[0, 0.86], [0.3, 0.79], [0.52, 0.775], [0.76, 0.82], [1, 0.9]],
  reducedMotion: null,
};

export class ParticleWave {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.opts = { ...DEFAULTS, ...options };
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.preset = PRESETS[this.opts.preset] || PRESETS.gold;
    this.tier = this.opts.quality === 'auto' ? 'high' : this.opts.quality;
    this.limits = { ...TIERS[this.tier] };
    this.cost = 0;
    this.samples = 0;
    this.sprites = new Map();
    this.running = false;
    this.raf = 0;
    this.t = 0;
    this.origin = 0;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.still =
      this.opts.reducedMotion ??
      (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.build();
    this.resize();
    this.onResize = () => this.resize();
    if (typeof addEventListener === 'function') addEventListener('resize', this.onResize);
  }

  /* ------------------------------------------------------------------ setup */

  /** Where the field is allowed to be dense. The reference is not evenly sprinkled: it
   *  packs into a wedge at the upper left and a long run along the right, and leaves the
   *  middle comparatively open. Flat density is the single thing that most makes this
   *  kind of image read as a filter rather than as material. */
  static density(u, offset) {
    const wedge = Math.exp(-Math.pow((u - 0.06) / 0.34, 2)) * 0.62;
    const run = smoothstep(0.4, 0.98, u) * 0.66;
    const spine = Math.exp(-Math.pow(offset / 0.1, 2)) * 0.72;
    const below = smoothstep(-0.02, 0.16, offset) * 0.3;
    return clamp(0.1 + wedge + run + spine + below, 0, 1);
  }

  build() {
    const random = mulberry32(this.opts.seed);
    const { bands } = this.opts;
    const { particles, grains, bokeh } = this.limits;
    const pick = () => bands[Math.floor(random() * bands.length)];

    /* Two populations, because the reference has two. The grain is hard, tiny and very
       numerous — the glitter itself. The sparks are the soft haloed points sitting on top
       of it. One population tuned to the average of both lands on neither and reads as
       mush, which is what the first pass did. */
    this.lo = bands[0] - 0.05;
    this.span = bands[bands.length - 1] - this.lo + 0.09;

    /* Most of the grain never changes brightness, so drawing it as thirty thousand
       fillRects every frame pays for nothing: measured, it was 58ms of a 68ms frame. It is
       baked into a flat strip instead and warped onto the wave as ~144 sheared columns.
       Only the twinkling minority stays live, because that is the part a static bake
       genuinely cannot do. */
    this.baked = [];
    this.grain = [];
    for (let i = 0; i < grains; i += 1) {
      /* Continuous across the whole stack, not snapped to one of the nine bands. Snapping
         is what turned the first grain pass into nine stripes instead of a volume. */
      const offset = this.lo + random() * this.span;
      const u = random();
      if (random() > ParticleWave.density(u, offset)) continue;
      const speck = {
        u,
        band: offset,
        driftU: 1 + Math.floor(random() * 3),
        phase: random() * TAU,
        size: random() < 0.82 ? 1 : 2,
        colour: 1 + Math.min(3, Math.floor(Math.pow(random(), 1.5) * 4)),
        alpha: 0.12 + Math.pow(random(), 1.7) * 0.72,
      };
      if (random() > 0.86) this.grain.push(speck);
      else this.baked.push(speck);
    }
    /* Grouped by colour so the live loop sets fillStyle a handful of times per frame
       instead of once per particle. */
    this.grain.sort((a, b) => a.colour - b.colour);
    this.bakeGrain();

    this.dots = [];
    for (let i = 0; i < particles; i += 1) {
      const layer = i % 4;
      const loose = random() < 0.34;
      const band = pick();
      /* Three uniforms summed approximates a normal, which packs the sparks against their
         band rather than smearing them evenly across the gap. */
      const signed = random() + random() + random() - 1.5;

      this.dots.push({
        u: random(),
        band,
        loose,
        spread: signed * (0.018 + layer * 0.007),
        drop: loose ? Math.pow(random(), 0.6) : 0,
        driftU: 1 + Math.floor(random() * 4),
        phase: random() * TAU,
        phaseB: random() * TAU,
        size: 0.3 + Math.pow(random(), 1.9) * (layer === 3 ? 1.7 : 0.8),
        colour: Math.min(4, Math.floor(Math.pow(random(), 1.7) * 5)),
        alpha: 0.08 + Math.pow(random(), 1.5) * 0.5,
        twinkle: random() > 0.86,
      });
    }

    this.motes = [];
    for (let i = 0; i < bokeh; i += 1) {
      this.motes.push({
        x: random(),
        y: random() * 0.78,
        r: 4 + Math.pow(random(), 2.4) * 26,
        alpha: 0.06 + random() * 0.2,
        phase: random() * TAU,
        /* Bokeh drifts far too slowly to complete a wrap inside one loop, so it orbits a
           fixed point instead. A wrap at this speed is what broke the seam. */
        driftX: 0.01 + random() * 0.05,
        driftY: 0.004 + random() * 0.018,
        depth: 0.3 + random() * 0.7,
      });
    }

    /* Seeded so the crest sparkles land in the same places every run. */
    this.flares = [];
    for (let i = 0; i < 9; i += 1) {
      this.flares.push({ u: random(), band: (random() - 0.5) * 0.09, phase: random() * TAU, size: 1 + random() * 1.6 });
    }
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(this.limits.dprCap, (typeof devicePixelRatio === 'number' ? devicePixelRatio : 1) || 1);
    const width = Math.max(1, Math.round((rect.width || this.canvas.width) * dpr));
    const height = Math.max(1, Math.round((rect.height || this.canvas.height) * dpr));
    if (width === this.width && height === this.height && dpr === this.dpr) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.scale = Math.min(width / 1600, height / 900) || 1;
    this.buildSprites();
    this.paintGround();
    if (!this.running) this.frame(this.t);
  }

  /** One radial sprite per particle colour, drawn once and stamped thereafter. */
  buildSprites() {
    this.sprites.clear();
    const colours = [...this.preset.particles, this.preset.core, this.preset.bokeh];
    const radius = Math.max(16, Math.round(22 * this.scale));
    for (const colour of colours) {
      const size = radius * 2;
      const sprite =
        typeof OffscreenCanvas === 'function' ? new OffscreenCanvas(size, size) : Object.assign(document.createElement('canvas'), { width: size, height: size });
      const ctx = sprite.getContext('2d');
      const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      gradient.addColorStop(0, colour);
      gradient.addColorStop(0.12, colour);
      gradient.addColorStop(0.34, this.fade(colour, 0.42));
      gradient.addColorStop(1, this.fade(colour, 0));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      this.sprites.set(colour, { canvas: sprite, radius });
    }
  }

  fade(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  }

  /* -------------------------------------------------------------- geometry */

  waveAt(u, t) {
    return (
      splineAt(this.opts.wave, u) +
      Math.sin(u * 4.1 + t * TAU) * 0.016 +
      Math.sin(u * 9.3 - t * TAU * 2) * 0.007 +
      Math.sin(u * 15.7 + t * TAU * 3 + 1.2) * 0.003
    );
  }

  /** Ribbons pinch where the crest is brightest and open out toward the edges, which is
   *  what gives the sheets their twist instead of leaving them as parallel copies. */
  bandScale(u) {
    return 0.42 + 0.58 * (1 - smoothstep(0.18, 0.82, u) * 0.72) + Math.sin(u * 3.4) * 0.12;
  }

  ribbonPath(ctx, band, t, thickness) {
    const { width: W, height: H } = this;
    const steps = 96;
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      const y = (this.waveAt(u, t) + band * this.bandScale(u)) * H;
      if (i === 0) ctx.moveTo(u * W, y);
      else ctx.lineTo(u * W, y);
    }
    for (let i = steps; i >= 0; i -= 1) {
      const u = i / steps;
      const y = (this.waveAt(u, t) + (band + thickness) * this.bandScale(u)) * H;
      ctx.lineTo(u * W, y);
    }
    ctx.closePath();
  }

  /* ------------------------------------------------------------ baked grain */

  /** Draw the static glitter once into a flat strip whose axes are (u, band offset).
   *  Resolution is fixed and independent of the canvas: the warp scales it to fit, so a
   *  resize never re-bakes. The content is laid down twice side by side so a column
   *  sampled near u=1 can read past the wrap without a second draw call. */
  bakeGrain() {
    const w = 2048;
    const h = 512;
    this.stripW = w;
    const strip =
      typeof OffscreenCanvas === 'function'
        ? new OffscreenCanvas(w * 2, h)
        : Object.assign(document.createElement('canvas'), { width: w * 2, height: h });
    const ctx = strip.getContext('2d');
    const colours = this.preset.particles;

    ctx.clearRect(0, 0, w * 2, h);
    ctx.globalCompositeOperation = 'lighter';
    let current = -1;
    for (const speck of this.baked) {
      if (speck.colour !== current) {
        current = speck.colour;
        ctx.fillStyle = colours[current];
      }
      ctx.globalAlpha = speck.alpha;
      const x = speck.u * w;
      const y = ((speck.band - this.lo) / this.span) * h;
      const s = speck.size * 1.6;
      ctx.fillRect(x, y, s, s);
      ctx.fillRect(x + w, y, s, s);
    }
    ctx.globalAlpha = 1;
    this.strip = strip;
  }

  /** Warp the baked strip onto the wave. Each column carries the local slope as a shear,
   *  so the sheet follows the curve instead of stair-stepping across it. */
  paintBaked(t) {
    if (!this.strip) return;
    const { ctx, width: W, height: H } = this;
    const cols = this.limits.columns;
    const colW = W / cols;
    const scroll = t;
    const sw = this.stripW / cols;

    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.preset.intensity;
    for (let i = 0; i < cols; i += 1) {
      const u0 = i / cols;
      const u1 = (i + 1) / cols;
      const scale0 = this.bandScale(u0);
      const y0 = (this.waveAt(u0, t) + this.lo * scale0) * H;
      const y1 = (this.waveAt(u1, t) + this.lo * this.bandScale(u1)) * H;
      const dh = this.span * scale0 * H;
      const slope = (y1 - y0) / colW;
      const dx = u0 * W;
      const sx = ((u0 + scroll) % 1) * this.stripW;

      ctx.setTransform(1, slope, 0, 1, 0, 0);
      /* +1 on the destination width closes the hairline seam that rounding leaves
         between adjacent columns. */
      ctx.drawImage(this.strip, sx, 0, sw, 512, dx, y0 - slope * dx, colW + 1, dh);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
  }

  /* --------------------------------------------------------------- drawing */

  paintGround() {
    const { ctx, width: W, height: H } = this;
    const [c0, c1, c2] = this.preset.ground;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = c0;
    ctx.fillRect(0, 0, W, H);

    const [gx, gy] = this.preset.glowAt;
    /* Tight, not broad. A bloom wide enough to touch the corners turns the whole frame
       brown and the glitter loses the black it needs to read against. */
    const bloom = ctx.createRadialGradient(gx * W, gy * H, 0, gx * W, gy * H, Math.max(W, H) * 0.46);
    bloom.addColorStop(0, c2);
    bloom.addColorStop(0.34, c1);
    bloom.addColorStop(1, c0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
  }

  paintShelf(t) {
    const { ctx, width: W, height: H } = this;
    const lift = Math.sin(t * TAU) * 0.004;
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.moveTo(0, H);
    const steps = 64;
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      ctx.lineTo(u * W, (splineAt(this.opts.shelf, u) + lift) * H);
    }
    ctx.lineTo(W, H);
    ctx.closePath();

    /* The surface is not a flat mask: it catches a little of the light above it, which is
       the only thing that makes it read as reflective rather than as a crop. */
    const sheen = ctx.createLinearGradient(0, 0.74 * H, 0, H);
    sheen.addColorStop(0, 'rgba(0,0,0,.55)');
    sheen.addColorStop(0.35, 'rgba(0,0,0,.86)');
    sheen.addColorStop(1, 'rgba(0,0,0,.97)');
    ctx.fillStyle = sheen;
    ctx.fill();

    ctx.globalCompositeOperation = 'lighter';
    const glow = ctx.createLinearGradient(0, 0.74 * H, 0, 0.96 * H);
    glow.addColorStop(0, this.fade(this.preset.particles[1], 0.2 * this.preset.intensity));
    glow.addColorStop(1, this.fade(this.preset.particles[0], 0));
    ctx.fillStyle = glow;
    ctx.fill();

    /* The lit rim along the crest of the surface. Without it the shelf is just a place
       where the picture stops. */
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      const y = (splineAt(this.opts.shelf, u) + lift) * H;
      if (i === 0) ctx.moveTo(u * W, y); else ctx.lineTo(u * W, y);
    }
    const rim = ctx.createLinearGradient(0, 0, W, 0);
    rim.addColorStop(0, this.fade(this.preset.particles[2], 0));
    rim.addColorStop(0.34, this.fade(this.preset.particles[3], 0.3 * this.preset.intensity));
    rim.addColorStop(0.66, this.fade(this.preset.particles[3], 0.22 * this.preset.intensity));
    rim.addColorStop(1, this.fade(this.preset.particles[2], 0));
    ctx.strokeStyle = rim;
    ctx.lineWidth = 1.4 * this.scale;
    ctx.stroke();
  }

  paintRibbons(t) {
    const { ctx, width: W } = this;
    const strength = this.preset.intensity;
    ctx.globalCompositeOperation = 'lighter';

    this.opts.bands.forEach((band, index) => {
      const nearCrest = 1 - Math.min(1, Math.abs(band) / 0.13);
      const thickness = 0.02 + nearCrest * 0.05;
      const breathe = 0.72 + 0.28 * Math.sin(t * TAU + index * 0.7);
      const alpha = (0.035 + nearCrest * 0.115) * breathe * strength;

      const wash = ctx.createLinearGradient(0, 0, W, 0);
      wash.addColorStop(0, this.fade(this.preset.particles[1], 0));
      wash.addColorStop(0.2, this.fade(this.preset.particles[2], alpha * 0.7));
      wash.addColorStop(0.52, this.fade(this.preset.particles[3], alpha));
      wash.addColorStop(0.84, this.fade(this.preset.particles[2], alpha * 0.8));
      wash.addColorStop(1, this.fade(this.preset.particles[1], 0));

      this.ribbonPath(ctx, band, t, thickness);
      ctx.fillStyle = wash;
      ctx.fill();
    });
  }

  paintCore(t) {
    const { ctx, width: W, height: H } = this;
    const strength = this.preset.intensity;
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const trace = (band, phase) => {
      ctx.beginPath();
      const steps = 128;
      for (let i = 0; i <= steps; i += 1) {
        const u = i / steps;
        const y = (this.waveAt(u, t + phase) + band * this.bandScale(u)) * H;
        if (i === 0) ctx.moveTo(u * W, y);
        else ctx.lineTo(u * W, y);
      }
    };

    /* A crest of even brightness end to end reads as a drawn wire. Gating it along its
       length is what makes it read as light travelling through the material. */
    const veil = ctx.createLinearGradient(0, 0, W, 0);
    veil.addColorStop(0, 'rgba(255,255,255,.15)');
    veil.addColorStop(0.16, 'rgba(255,255,255,.62)');
    veil.addColorStop(0.38, 'rgba(255,255,255,.95)');
    veil.addColorStop(0.58, 'rgba(255,255,255,.5)');
    veil.addColorStop(0.78, 'rgba(255,255,255,.9)');
    veil.addColorStop(1, 'rgba(255,255,255,.2)');

    /* Stacked strokes stand in for a blur: widest and faintest first, then tighter and
       brighter, so the crest has a halo without a filter pass. */
    for (const [band, phase, width, alpha] of [
      [-0.004, 0, 34, 0.05],
      [-0.004, 0, 14, 0.09],
      [-0.004, 0, 5, 0.17],
      [-0.004, 0, 1.6, 0.5],
      [0.026, 0.06, 9, 0.05],
      [0.026, 0.06, 2.2, 0.2],
      [-0.032, -0.05, 7, 0.045],
      [-0.032, -0.05, 1.7, 0.16],
    ]) {
      trace(band, phase);
      ctx.save();
      ctx.globalAlpha = alpha * strength;
      ctx.strokeStyle = width > 8 ? this.fade(this.preset.core, 1) : veil;
      ctx.lineWidth = width * this.scale;
      ctx.stroke();
      ctx.restore();
    }

    /* A travelling brightening along the crest, so the light reads as moving through the
       material rather than the whole line pulsing at once. */
    const head = (t * 2) % 1;
    ctx.save();
    ctx.beginPath();
    const sweep = ctx.createLinearGradient((head - 0.26) * W, 0, (head + 0.26) * W, 0);
    sweep.addColorStop(0, this.fade(this.preset.core, 0));
    sweep.addColorStop(0.5, this.fade(this.preset.core, 0.42 * strength));
    sweep.addColorStop(1, this.fade(this.preset.core, 0));
    trace(-0.004, 0);
    ctx.strokeStyle = sweep;
    ctx.lineWidth = 3.4 * this.scale;
    ctx.stroke();
    ctx.restore();
  }

  /** The twinkling minority, on top of the baked strip. fillRect at 1-2px with
   *  globalAlpha per particle: no sprite, no arc, no per-particle fillStyle string. */
  paintGrain(t) {
    const { ctx, width: W, height: H } = this;
    const strength = this.preset.intensity;
    const colours = this.preset.particles;
    ctx.globalCompositeOperation = 'lighter';
    let current = -1;

    for (const g of this.grain) {
      const u = (g.u + t * g.driftU) % 1;
      const y = this.waveAt(u, t) + g.band * this.bandScale(u) + Math.sin(t * TAU * 2 + g.phase) * 0.004;
      const py = y * H;
      if (py < 0 || py > H) continue;

      const shimmer = Math.pow(0.5 + 0.5 * Math.sin(t * TAU * 3 + g.phase), 4);
      const alpha = g.alpha * shimmer * strength;
      if (alpha < 0.02) continue;

      if (g.colour !== current) {
        current = g.colour;
        ctx.fillStyle = colours[current];
      }
      ctx.globalAlpha = alpha > 1 ? 1 : alpha;
      const s = g.size * (this.scale > 1 ? this.scale : 1);
      ctx.fillRect(u * W, py, s, s);
    }
    ctx.globalAlpha = 1;
  }

  paintDots(t) {
    const { ctx, width: W, height: H } = this;
    const strength = this.preset.intensity;
    const colours = this.preset.particles;
    ctx.globalCompositeOperation = 'lighter';

    for (const dot of this.dots) {
      /* driftU is a whole number of traversals per loop, so the flow never jumps at wrap. */
      const u = (dot.u + t * dot.driftU) % 1;
      const base = this.waveAt(u, t);
      const y = dot.loose
        ? base + dot.spread * 3.4 + dot.drop * 0.3 + Math.sin(t * TAU + dot.phase) * 0.012
        : base + (dot.band + dot.spread) * this.bandScale(u) + Math.sin(t * TAU * 2 + dot.phaseB) * 0.006;

      const x = u * W + Math.sin(t * TAU + dot.phase) * 9 * this.scale;
      const py = y * H;
      if (py < -30 || py > H + 30) continue;

      /* Brightest where the crest is brightest, so the glitter and the light agree. */
      const along = 0.42 + 0.58 * Math.sin(smoothstep(0, 1, u) * Math.PI);
      const shimmer = dot.twinkle
        ? Math.pow(0.5 + 0.5 * Math.sin(t * TAU * 3 + dot.phase), 3)
        : 0.62 + 0.38 * Math.sin(t * TAU * 2 + dot.phaseB);
      const alpha = clamp(dot.alpha * along * shimmer * (dot.loose ? 0.5 : 1) * strength, 0, 1);
      if (alpha < 0.012) continue;

      const sprite = this.sprites.get(colours[dot.colour]);
      const r = dot.size * this.scale * (dot.twinkle ? 1.5 : 1) * 3.1;
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite.canvas, x - r, py - r, r * 2, r * 2);
    }
    ctx.globalAlpha = 1;
  }

  paintMotes(t) {
    const { ctx, width: W, height: H } = this;
    const sprite = this.sprites.get(this.preset.bokeh);
    ctx.globalCompositeOperation = 'lighter';
    for (const mote of this.motes) {
      const x = (mote.x + Math.sin(t * TAU + mote.phase) * mote.driftX * mote.depth) * W;
      const y = (mote.y + Math.cos(t * TAU + mote.phase) * mote.driftY * mote.depth) * H;
      const r = mote.r * this.scale * 2.4;
      ctx.globalAlpha = clamp(mote.alpha * (0.6 + 0.4 * Math.sin(t * TAU + mote.phase)) * this.preset.intensity, 0, 1);
      ctx.drawImage(sprite.canvas, x - r, y - r, r * 2, r * 2);
    }
    ctx.globalAlpha = 1;
  }

  paintFlares(t) {
    const { ctx, width: W, height: H } = this;
    const sprite = this.sprites.get(this.preset.core);
    ctx.globalCompositeOperation = 'lighter';
    for (const flare of this.flares) {
      const u = (flare.u + t) % 1;
      const pulse = Math.pow(0.5 + 0.5 * Math.sin(t * TAU * 2 + flare.phase), 6);
      if (pulse < 0.02) continue;
      const x = u * W;
      const y = (this.waveAt(u, t) + flare.band * this.bandScale(u)) * H;
      const r = flare.size * this.scale * 9;
      ctx.globalAlpha = clamp(pulse * 0.55 * this.preset.intensity, 0, 1);
      ctx.drawImage(sprite.canvas, x - r, y - r, r * 2, r * 2);

      /* The cross flare is what sells a highlight as a point of light rather than a blob. */
      ctx.strokeStyle = this.fade(this.preset.core, pulse * 0.3 * this.preset.intensity);
      ctx.lineWidth = 1 * this.scale;
      ctx.beginPath();
      ctx.moveTo(x - r * 1.7, y); ctx.lineTo(x + r * 1.7, y);
      ctx.moveTo(x, y - r * 0.9); ctx.lineTo(x, y + r * 0.9);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ----------------------------------------------------------------- loop */

  /** Render one frame. `t` is loop position in 0..1 — pass it explicitly to capture. */
  frame(t) {
    this.t = t;
    this.paintGround();
    this.paintMotes(t);
    this.paintRibbons(t);
    this.paintBaked(t);
    this.paintGrain(t);
    this.paintDots(t);
    this.paintCore(t);
    this.paintFlares(t);
    this.paintShelf(t);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /** Drop to the next tier down and rebuild. Returns false when already at the floor. */
  stepDown() {
    const order = ['high', 'medium', 'low'];
    const next = order[order.indexOf(this.tier) + 1];
    if (!next) return false;
    this.tier = next;
    this.limits = { ...TIERS[next] };
    this.cost = 0;
    this.samples = 0;
    this.build();
    this.width = 0;
    this.resize();
    this.onTier?.(next);
    return true;
  }

  start() {
    if (this.running) return;
    if (this.still) { this.frame(0.18); return; }
    this.running = true;
    const auto = this.opts.quality === 'auto';
    let previous = 0;
    const tick = (now) => {
      if (!this.running) return;
      if (!this.origin) this.origin = now;
      this.frame(((now - this.origin) / 1000 / this.opts.loopSeconds) % 1);

      if (auto) {
        /* Measured frame to frame, not by timing the draw calls. Canvas2d only queues work
           and returns, so a clock around frame() reports command submission and misses the
           rasterisation entirely -- it read a few ms while the page was visibly at 16fps.
           The interval between callbacks is the only honest signal available here. */
        const delta = previous ? now - previous : 0;
        previous = now;
        /* Skip the opening frames: they carry first paint and warm-up, not steady state. */
        this.samples += 1;
        if (this.samples > 10 && delta > 0 && delta < 400) this.cost += delta;
        if (this.samples === 42) {
          const mean = this.cost / 31;
          if (mean > this.opts.budgetMs && this.stepDown()) {
            previous = 0;
            this.raf = requestAnimationFrame(tick);
            return;
          }
          this.meanFrameMs = mean;
          this.opts.quality = this.tier;
        }
      }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.origin = 0;
  }

  setPreset(name) {
    this.preset = PRESETS[name] || this.preset;
    this.buildSprites();
    this.bakeGrain();
    this.frame(this.t);
  }

  destroy() {
    this.stop();
    if (typeof removeEventListener === 'function') removeEventListener('resize', this.onResize);
  }
}
