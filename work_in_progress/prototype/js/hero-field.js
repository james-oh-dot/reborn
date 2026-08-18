/**
 * Wires the particle wave into a subpage hero.
 *
 * This is the hero's only background layer — the static SVG fields and the per-page CSS
 * patterns it used to sit on top of are gone. That removes the fallback the old markup
 * leaned on, so the failure modes matter more than they did: a browser without ES modules
 * or without canvas gets a plain dark hero, which is the same ground the copy already sits
 * on and reads as deliberate rather than broken.
 *
 * The canvas is a child of `.hero-field`, so it inherits that element's mask, blend mode
 * and scroll parallax — including the gate that keeps the copy column legible.
 */

import { ParticleWave } from './particle-wave.js';

const host = document.querySelector('.page-hero .hero-field');
const variation = document.body.dataset.field;

if (host && variation) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-field-canvas';
  host.appendChild(canvas);

  const field = new ParticleWave(canvas, {
    variation,
    preset: 'brand',
    /* Both set by the contrast measurement in motion/particle-wave/README.md, not by eye.
       The crest is damped separately because it, not the glitter, is what lands on glyphs:
       every failure measured has been a near-white core pixel. Holding it back is what lets
       the field run at 0.46 rather than the 0.28 it managed when the two moved together. */
    intensity: 0.58,
    coreScale: 0.45,
    maxDpr: 1.5,
    loopSeconds: 18,
  });

  /* Reduced motion still gets the picture, just not the movement. The engine detects the
     preference itself and paints a single frame instead of starting the loop; with nothing
     underneath any more, drawing nothing would leave an empty hero rather than a calm one. */
  requestAnimationFrame(() => {
    field.frame(field.still ? 0.18 : 0);
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
}
