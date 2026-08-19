/**
 * Mounts the wall motion on the home hero.
 *
 * Split from hero-screen.js for the same reason hero-field.js is split from
 * particle-wave.js: the engine is the thing worth testing on its own, and the page wiring
 * -- when to run, when to stop, what to do about reduced motion -- is what changes.
 */

import { HeroScreen } from './hero-screen.js?v=13';

const stage = document.querySelector('.home-hero .hero-stage');
const canvas = stage?.querySelector('.hero-screen');
const media = stage?.querySelector('.progressive-image__full');

if (canvas && media) {
  /* Stronger than the subpage fields on purpose. Those sit behind a whole copy column and
     have to stay out of the way at 0.58; this one has a wall of its own to fill and copy
     that only reaches the lower left, where the streams fade themselves out. */
  const screen = new HeroScreen(canvas, media, {
    intensity: 1, maxDpr: 1.75,
    copy: document.querySelector('.home-hero .hero-copy'),
  });

  /* The geometry is measured against the photograph's natural size, so it cannot be laid
     out until the photograph has one. */
  const begin = () => { screen.resize(); screen.frame(screen.still ? 2.4 : 0); sync(); };

  let visible = true;
  let focused = !document.hidden;
  const sync = () => (visible && focused ? screen.start() : screen.stop());

  if (media.complete && media.naturalWidth) begin();
  else media.addEventListener('load', begin, { once: true });

  if (typeof IntersectionObserver === 'function') {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: '64px' })
      .observe(stage.closest('.home-hero'));
  }
  document.addEventListener('visibilitychange', () => { focused = !document.hidden; sync(); });

  let t;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => { screen.resize(); if (!screen.running) screen.frame(screen.t); }, 120);
  }, { passive: true });

  canvas.__hs = screen;
}
