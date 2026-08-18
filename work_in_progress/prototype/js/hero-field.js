/**
 * Wires the particle wave into a subpage hero.
 *
 * Progressive enhancement over the static SVG that already sits in `.hero-field`: the SVG
 * paints on first byte and stays put if this module never runs, and the canvas crossfades
 * over it once it is actually rendering. No JS, an old browser, or reduced motion all land
 * on the SVG rather than on an empty hero.
 *
 * The canvas is a child of `.hero-field`, so it inherits that element's mask, blend mode,
 * opacity and scroll parallax for free — everything the static field was already tuned for
 * applies unchanged, including the gate that keeps the copy column legible.
 */

import { ParticleWave } from './particle-wave.js';

const host = document.querySelector('.page-hero .hero-field');
const variation = document.body.dataset.field;

/* Reduced motion keeps the SVG. The engine can render a still frame, but a still canvas is
   strictly more work than the picture already on screen for an identical result. */
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* So does anything narrow. These compositions are drawn for a wide frame, and squeezed into
   a phone-shaped hero the structure collapses into the band the copy needs -- measurably
   worse than the SVG, which is already art-directed for that crop by --hero-crop. Phones are
   also where a 60fps canvas costs the most battery for the least gain. */
const wide = matchMedia('(min-width: 768px)');

const mount = () => {
  if (!host || !variation || still || !wide.matches || host.dataset.mounted) return;
  host.dataset.mounted = '1';
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-field-canvas';
  host.appendChild(canvas);

  const field = new ParticleWave(canvas, {
    variation,
    preset: 'brand',
    /* Well under the preset's own 0.62. This one carries a headline, and the number is
       set by the contrast measurement in README.md, not by eye. */
    intensity: 0.28,
    maxDpr: 1.5,
    loopSeconds: 18,
  });

  /* Hand over only once there is something to hand over to — swapping on construction
     shows a black box for a frame or two on a slow first paint. */
  requestAnimationFrame(() => {
    field.frame(0);
    requestAnimationFrame(() => host.classList.add('is-live'));
  });

  /* A hero scrolled past is still a hero being rendered sixty times a second unless
     something stops it, and every subpage here is long. */
  let visible = true;
  let focused = !document.hidden;
  const sync = () => (visible && focused ? field.start() : field.stop());

  if (typeof IntersectionObserver === 'function') {
    new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; sync(); },
      { rootMargin: '96px' },
    ).observe(host.closest('.page-hero'));
  }
  document.addEventListener('visibilitychange', () => { focused = !document.hidden; sync(); });

  sync();

  /* Handed to the page so contrast measurement can step the loop deterministically. */
  canvas.__pw = field;
};

mount();
/* A rotate or a resized window can cross the threshold after load. */
wide.addEventListener('change', mount);
