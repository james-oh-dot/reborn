export type ProgressiveSrc = {
  src: string
  preview: string
}

/**
 * Build a progressive (blur-up) pair from an asset path stem (no extension).
 * Example: `progressiveAsset('/assets/hero/hero-01')`
 * → { src: '/assets/hero/hero-01.webp', preview: '/assets/hero/hero-01.preview.webp' }
 *
 * Never reference `.jpg` / `.png` masters directly in components or data —
 * always go through this so the two runtime files stay in lockstep with the
 * stem, and the extension never gets hardcoded in more than one place.
 */
export function progressiveAsset(stem: string): ProgressiveSrc {
  const normalized = stem.replace(/\.(jpe?g|png|webp)$/i, '')
  return {
    src: `${normalized}.webp`,
    preview: `${normalized}.preview.webp`,
  }
}
