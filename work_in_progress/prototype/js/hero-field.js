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

import { ParticleWave } from './particle-wave.js?v=14';

const host = document.querySelector('.page-hero .hero-field');
const variation = document.body.dataset.field;

if (host && variation) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-field-canvas';
  host.appendChild(canvas);

  const field = new ParticleWave(canvas, {
    variation,
    preset: 'brand',
    /* intensity comes from the contrast measurement in motion/particle-wave/README.md, not
       from eye. What actually buys it is the masking in site.css, not this number.

       coreScale does far less than its name suggests, and the honest version is worth
       recording. It was added on the theory that the bright crest was what landed on glyphs
       and blew the contrast. Measurement said otherwise: sweeping it from 0.35 to 0.55 moved
       the worst-case ratio by under 0.01, because the limiting pixel is the glitter mass, not
       the crest. It stays at 0.45 purely because a slightly restrained crest sits better next
       to a bright field. Do not reach for it to fix a contrast failure. */
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
