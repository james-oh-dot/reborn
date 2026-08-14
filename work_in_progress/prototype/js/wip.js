/* WIP label — temporary; remove this file and its <script>/<link> before production handoff. */
(() => {
  const banner = document.querySelector('.wip-banner');
  if (!banner) return;
  const sync = () => {
    document.documentElement.style.setProperty('--wip-h', banner.offsetHeight + 'px');
  };
  sync();
  addEventListener('resize', sync);
  if ('ResizeObserver' in window) new ResizeObserver(sync).observe(banner);
})();
