/* Work projects for the /work index and /work/[slug] case studies.
 *
 * NOTE: This is a NEW, additive data source (the legacy `projects.ts` is left
 * untouched for now). It is shaped to match the itsjay.us reference: a card
 * surface (cover/icon/previewVideo/services) plus a case-study body
 * (summary, optional visitUrl, and a gallery of full-width / half-pair media).
 *
 * Content currently uses the two projects that have real assets in /public
 * (jazmin-wong, trackstack) so every image/video resolves. To add a project,
 * append an entry and drop its assets under /public/images/work/<slug>/ and
 * /public/videos/. Set `visitUrl` to surface the "Visit site" link.
 */

export type MediaItem = { kind: 'image' | 'video'; src: string }

/* A gallery is a vertical stack of rows: a `full`-width tile, or a `pair` of
 * two half-width tiles shown side by side. */
export type GalleryRow =
  | { layout: 'full'; items: [MediaItem] }
  | { layout: 'pair'; items: [MediaItem, MediaItem] }

export type WorkProject = {
  slug: string
  title: string
  category: string
  year: string
  icon: string
  cover: string
  previewVideo: string
  services: string[]
  summary: string
  visitUrl?: string
  gallery: GalleryRow[]
}

export const workProjects: WorkProject[] = [
  {
    slug: 'jazmin-wong',
    title: 'Jazmin Wong',
    category: 'Portfolio',
    year: '2025',
    icon: '/images/work/jazmin-wong/jazmin-wong-icon.png',
    cover: '/images/work/jazmin-wong/cover.jpg',
    previewVideo: '/videos/jazmin-wong-preview-compressed.mp4',
    services: [
      'Art Direction',
      'Voice & Tone',
      'UI',
      'UX',
      'Next.js',
      'Tailwind CSS',
      'GSAP',
      'Motion',
      'Matter.js',
      'Lenis',
      'Vercel',
    ],
    summary:
      'Designed and developed a personal website for Jazmin Wong, a creative content strategist. The build pairs an editorial visual language with playful, physics-driven motion to give the portfolio a tactile, memorable feel.',
    gallery: [
      { layout: 'full', items: [{ kind: 'image', src: '/images/work/jazmin-wong/cover.jpg' }] },
      { layout: 'full', items: [{ kind: 'video', src: '/videos/work/jazmin-wong/video-01.mp4' }] },
      {
        layout: 'pair',
        items: [
          { kind: 'video', src: '/videos/jazmin-wong-preview-compressed.mp4' },
          { kind: 'image', src: '/images/work/jazmin-wong/cover.jpg' },
        ],
      },
    ],
  },
  {
    slug: 'trackstack',
    title: 'Trackstack',
    category: 'Product',
    year: '2025',
    icon: '/images/work/trackstack/trackstack-icon.png',
    cover: '/images/work/trackstack/cover.jpg',
    previewVideo: '/videos/trackstack-preview-compressed.mp4',
    services: [
      'Art Direction',
      'Naming & Copywriting',
      'Voice & Tone',
      'Brand Design',
      'Strategy',
      'UX',
      'UI',
      'Web Design',
      'Product Design',
      'Media Production',
    ],
    summary:
      'End-to-end brand and product design for Trackstack — a tool that helps music curators manage submissions. The work spanned naming, identity, and a polished, motion-led marketing site and product UI.',
    gallery: [
      { layout: 'full', items: [{ kind: 'image', src: '/images/work/trackstack/cover.jpg' }] },
      { layout: 'full', items: [{ kind: 'video', src: '/videos/trackstack-preview-compressed.mp4' }] },
    ],
  },
]

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug)
}
