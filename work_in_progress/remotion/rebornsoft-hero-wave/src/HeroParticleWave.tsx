import {useLayoutEffect, useMemo, useRef} from 'react';
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const WIDTH = 1920;
const HEIGHT = 1080;
const TAU = Math.PI * 2;
const DISPLAY_RIGHT = 1577;
const PERSON_X = 1207 / DISPLAY_RIGHT;

type Particle = {
  u: number;
  v: number;
  layer: number;
  phase: number;
  phaseB: number;
  size: number;
  alpha: number;
  cool: number;
  trail: boolean;
};

const topBoundary = [
  [0, 122],
  [131, 189],
  [344, 304],
  [534, 394],
  [694, 411],
  [855, 408],
  [1031, 388],
  [1238, 356],
  [1420, 312],
  [1577, 278],
];

const bottomBoundary = [
  [1577, 723],
  [1406, 696],
  [1238, 679],
  [1031, 671],
  [797, 679],
  [581, 701],
  [394, 741],
  [197, 793],
  [0, 844],
];

const wavePoints = [
  [0, 0.41],
  [0.16, 0.47],
  [0.29, 0.59],
  [0.4, 0.54],
  [0.5, 0.49],
  [0.62, 0.54],
  [0.76, 0.6],
  [0.88, 0.48],
  [1, 0.29],
];

const mulberry32 = (seed: number) => {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const waveAt = (u: number) => {
  for (let index = 0; index < wavePoints.length - 1; index += 1) {
    const a = wavePoints[index];
    const b = wavePoints[index + 1];
    if (u <= b[0]) {
      const t = smoothstep(a[0], b[0], u);
      return a[1] + (b[1] - a[1]) * t;
    }
  }
  return wavePoints[wavePoints.length - 1][1];
};

const buildDisplayMask = () => {
  const mask = new Path2D();
  mask.moveTo(topBoundary[0][0], topBoundary[0][1]);
  for (let index = 1; index < topBoundary.length; index += 1) {
    mask.lineTo(topBoundary[index][0], topBoundary[index][1]);
  }
  for (const point of bottomBoundary) {
    mask.lineTo(point[0], point[1]);
  }
  mask.closePath();

  mask.moveTo(1192, 590);
  mask.bezierCurveTo(1194, 578, 1202, 574, 1211, 576);
  mask.bezierCurveTo(1221, 579, 1225, 590, 1225, 601);
  mask.bezierCurveTo(1234, 608, 1238, 624, 1237, 644);
  mask.lineTo(1232, 761);
  mask.lineTo(1178, 761);
  mask.bezierCurveTo(1175, 710, 1177, 653, 1180, 624);
  mask.bezierCurveTo(1182, 606, 1187, 597, 1192, 590);
  mask.closePath();

  mask.moveTo(1020, 668);
  mask.lineTo(1465, 674);
  mask.lineTo(1465, 757);
  mask.lineTo(1020, 757);
  mask.closePath();
  return mask;
};

const makeParticles = () => {
  const seeded = mulberry32(0x52425756);
  const particles: Particle[] = [];
  for (let index = 0; index < 7800; index += 1) {
    const layer = index % 4;
    const u = seeded();
    const fieldParticle = seeded() < 0.28;
    const branch = Math.floor(seeded() * 3);
    const center = waveAt(u) + (branch === 1 ? 0.085 : branch === 2 ? -0.07 : 0);
    const signed = seeded() + seeded() + seeded() - 1.5;
    const v = fieldParticle ? 0.16 + seeded() * 0.58 : center + signed * (0.072 + layer * 0.011);
    particles.push({
      u,
      v: Math.max(0.12, Math.min(0.78, v)),
      layer,
      phase: seeded() * TAU,
      phaseB: seeded() * TAU,
      size: 0.42 + seeded() * (layer === 3 ? 1.15 : 0.8),
      alpha: (fieldParticle ? 0.025 : 0.065) + seeded() * (fieldParticle ? 0.06 : 0.13),
      cool: seeded(),
      trail: seeded() > 0.91,
    });
  }
  return particles;
};

const traceWave = (
  ctx: CanvasRenderingContext2D,
  phase: number,
  offset: number,
  amplitude: number,
) => {
  ctx.beginPath();
  for (let step = 0; step <= 220; step += 1) {
    const u = step / 220;
    const x = u * DISPLAY_RIGHT + Math.sin(phase + u * 5.2) * 9;
    const presence = Math.exp(-Math.pow((u - PERSON_X) / 0.085, 2));
    const side = u < PERSON_X ? -1 : 1;
    const y =
      (waveAt(u) + offset) * HEIGHT +
      Math.sin(u * 8.2 + phase) * amplitude +
      Math.sin(u * 18.5 - phase * 2) * 4 +
      side * presence * (8 + 5 * (1 - Math.cos(phase)));
    if (step === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
};

const drawWaveCurrents = (ctx: CanvasRenderingContext2D, phase: number) => {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const gradient = ctx.createLinearGradient(0, 0, DISPLAY_RIGHT, 0);
  gradient.addColorStop(0, 'rgba(61, 123, 168, 0.08)');
  gradient.addColorStop(0.45, 'rgba(131, 200, 243, 0.2)');
  gradient.addColorStop(0.78, 'rgba(217, 241, 255, 0.27)');
  gradient.addColorStop(1, 'rgba(61, 123, 168, 0.06)');

  traceWave(ctx, phase, 0, 12);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 19;
  ctx.filter = 'blur(10px)';
  ctx.stroke();

  traceWave(ctx, phase, 0, 12);
  ctx.strokeStyle = 'rgba(158, 218, 255, 0.2)';
  ctx.lineWidth = 4;
  ctx.filter = 'blur(2px)';
  ctx.setLineDash([70, 145, 34, 190]);
  ctx.lineDashOffset = -(phase / TAU) * 439;
  ctx.stroke();

  for (const [offset, width, alpha, speed] of [
    [-0.071, 1.1, 0.16, 590],
    [0.084, 1.3, 0.13, 510],
  ] as const) {
    traceWave(ctx, phase + offset * 3, offset, 8);
    ctx.strokeStyle = `rgba(131, 200, 243, ${alpha})`;
    ctx.lineWidth = width;
    ctx.filter = 'none';
    ctx.setLineDash([18, 86, 9, 120]);
    ctx.lineDashOffset = -(phase / TAU) * speed;
    ctx.stroke();
  }
  ctx.restore();
};

const ParticleCanvas = ({particles}: {particles: Particle[]}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', {alpha: true});
    if (!ctx) return;

    const loop = frame / durationInFrames;
    const phase = loop * TAU;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    ctx.clip(buildDisplayMask(), 'evenodd');
    drawWaveCurrents(ctx, phase);
    ctx.globalCompositeOperation = 'screen';

    for (const particle of particles) {
      const depth = 0.72 + particle.layer * 0.14;
      const drift =
        Math.sin(phase - 0.48 + particle.layer * 0.11) * (26 + particle.layer * 9) +
        Math.sin(phase * 2 + particle.phaseB) * 5;
      let x = particle.u * DISPLAY_RIGHT + drift;
      let y = particle.v * HEIGHT;

      y += Math.sin(particle.u * 8.2 + phase + particle.phase * 0.1) * 20 * depth;
      y += Math.sin(particle.u * 17.4 - phase * 2 + particle.phaseB) * 6;
      x += Math.sin(particle.v * 9.6 + phase + particle.phase) * 8 * depth;

      for (const [region, center] of [0.18, 0.43, 0.69, 0.88].entries()) {
        const delta = x / DISPLAY_RIGHT - center;
        const influence = Math.exp(-(delta * delta) / 0.01);
        const gather = Math.sin(phase + region * 1.57) * 0.02;
        x -= delta * DISPLAY_RIGHT * influence * gather;
        y += influence * Math.sin(phase + particle.phaseB + region) * 8;
      }

      const px = x / DISPLAY_RIGHT - PERSON_X;
      const py = (y / HEIGHT - 0.63) * 0.85;
      const presence = Math.max(0, 1 - (px * px + py * py) / 0.018);
      if (presence > 0) {
        x += (px < 0 ? -1 : 1) * presence * presence * 38 * (0.86 + 0.1 * (1 - Math.cos(phase)));
        y += Math.sin(particle.phaseB + phase) * presence * 6;
      }

      if (x < 1 || x > DISPLAY_RIGHT - 1 || y < 100 || y > 860) continue;
      const currentPhase = TAU * (x / DISPLAY_RIGHT - loop) + Math.sin(y / 135) * 0.38;
      const movingCurrent = 0.74 + 0.36 * (0.5 + 0.5 * Math.cos(currentPhase));
      const opacityBreath = 0.82 + 0.18 * Math.cos(phase + particle.phase);
      const alpha = particle.alpha * movingCurrent * opacityBreath * (0.88 + particle.layer * 0.07);
      const [red, green, blue] =
        particle.cool > 0.92 ? [217, 241, 255] : particle.cool > 0.48 ? [131, 200, 243] : [61, 123, 168];

      if (particle.trail) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * 0.28})`;
        ctx.lineWidth = Math.max(0.35, particle.size * 0.5);
        ctx.moveTo(x - 5 - particle.layer * 2, y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      ctx.arc(x, y, particle.size, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }, [durationInFrames, frame, particles]);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} style={{position: 'absolute', inset: 0}} />;
};

export const HeroParticleWave = () => {
  const particles = useMemo(makeParticles, []);
  return (
    <AbsoluteFill style={{backgroundColor: '#050a10', overflow: 'hidden'}}>
      <Img
        src={staticFile('HERO.png')}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill'}}
      />
      <ParticleCanvas particles={particles} />
    </AbsoluteFill>
  );
};
