/* Work projects for the /work index and /work/[slug] case studies.
 *
 * Additive data source (legacy projects.ts left untouched). Shaped to match the
 * itsjay.us reference: a card surface (cover/icon/previewVideo/services) plus a
 * case-study body (summary, optional visitUrl, gallery of full / half-pair media).
 * Assets live under /public/images/work/<slug>/ and /public/videos/.
 */

export type LocalMediaItem = { kind: 'image'; src: string } | { kind: 'video'; src: string }

export type MediaItem =
  | LocalMediaItem
  | { kind: 'vimeo'; vimeoId: string; poster: string; alt: string }
  | { kind: 'hosted-video'; src: string; poster: string; alt: string }

export type GalleryRow =
  | { layout: 'full'; items: [MediaItem] }
  | { layout: 'pair'; items: [LocalMediaItem, LocalMediaItem] }

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
    slug: "jazmin-wong",
    title: "Jazmin Wong",
    category: "Portfolio",
    year: "2025",
    icon: "/images/work/jazmin-wong/jazmin-wong-icon.png",
    cover: "/images/work/jazmin-wong/cover.jpg",
    previewVideo: "/videos/jazmin-wong-preview-compressed.mp4",
    services: ["Art Direction", "Voice & Tone", "UI", "UX", "Next.js", "Tailwind CSS", "GSAP", "Motion", "Matter.js", "Lenis", "Vercel"],
    summary:
      "Designed and developed a personal website for Jazmin Wong, a creative content strategist. The project emphasized a bold, engaging layout with playful micro-interactions to reflect her dynamic approach to content creation.",
    visitUrl: "https://jazzicreates.tv",
    gallery: [
      { layout: 'full', items: [{ kind: "image", src: "/images/work/jazmin-wong/image-01.png" }] },
      { layout: 'full', items: [{ kind: "video", src: "/videos/work/jazmin-wong/video-01.mp4" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/jazmin-wong/image-03.png" }, { kind: "image", src: "/images/work/jazmin-wong/image-04.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/jazmin-wong/image-05.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/jazmin-wong/image-06.png" }] },
      {
        layout: 'full',
        items: [
          {
            kind: "hosted-video",
            src: "/portfolio/fanta/fanta-promo-campaign-15sec-film.mp4",
            poster: "/portfolio/fanta/fanta-promo-campaign-film-poster.webp",
            alt: "Fanta Morocco, Scani W Rbe7, 15 second film",
          },
        ],
      },
    ],
  },
  {
    slug: "trackstack",
    title: "Trackstack",
    category: "Product",
    year: "2025",
    icon: "/images/work/trackstack/trackstack-icon.png",
    cover: "/images/work/trackstack/cover.jpg",
    previewVideo: "/videos/trackstack-preview-compressed.mp4",
    services: ["Art Direction", "Naming & Copywriting", "Voice & Tone", "Brand Design", "Strategy", "UX", "UI", "Web Design", "Product Design", "Media Production"],
    summary:
      "Redesigned the website for a UK-based software company supporting 10,000+ high-performance DJs and labels. The goal was to communicate their mission of streamlining career growth. I currently work on their product team as a developer.",
    gallery: [
      { layout: 'full', items: [{ kind: "image", src: "/images/work/trackstack/image-01.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/trackstack/image-02.png" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/trackstack/image-07.png" }, { kind: "image", src: "/images/work/trackstack/image-03.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/trackstack/image-05.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/trackstack/image-06.png" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/trackstack/image-04.png" }, { kind: "image", src: "/images/work/trackstack/image-08.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/trackstack/image-09.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/trackstack/image-10.png" }] },
    ],
  },
  {
    slug: "kick-bass",
    title: "Kick & Bass",
    category: "Services",
    year: "2024",
    icon: "/images/work/kick-bass/kick-bass-icon.png",
    cover: "/images/work/kick-bass/cover.png",
    previewVideo: "/videos/kickbass-preview-compressed.mp4",
    services: ["Art Direction", "Web Design", "Responsive Design", "Next.js", "Tailwind CSS", "GSAP", "Motion", "Lenis", "Contentful", "Vercel", "Shopify API"],
    summary:
      "Designed & developed the primary website for an artist-run tech house coaching and mentoring community. The focus was on creating a visually striking and intuitive user experience to optimize visitor-to-paid-member conversion.",
    visitUrl: "https://kick-bass.com",
    gallery: [
      { layout: 'full', items: [{ kind: "image", src: "/images/work/kick-bass/image-01.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/kick-bass/image-02.png" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/kick-bass/image-03.png" }, { kind: "image", src: "/images/work/kick-bass/image-04.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/kick-bass/image-05.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/kick-bass/image-06.png" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/kick-bass/image-07.png" }, { kind: "image", src: "/images/work/kick-bass/image-08.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/kick-bass/image-09.png" }] },
    ],
  },
  {
    slug: "socialstats",
    title: "Socialstats",
    category: "Product",
    year: "2024",
    icon: "/images/work/socialstats/socialstats-icon.png",
    cover: "/images/work/socialstats/cover.png",
    previewVideo: "/videos/socialstats-preview-compressed.mp4",
    services: ["Research & Insights", "Naming & Copywriting", "Competitive Study", "Voice & Tone", "Workshops", "Strategy", "UX", "UI", "Web Design", "Responsive Design"],
    summary:
      "Designed the home and pricings page for a social media analytics platform that helps artists and creators track their social media performance. This 4-week project focused on seamless UX and efficient developer handoff.",
    gallery: [
      { layout: 'full', items: [{ kind: "image", src: "/images/work/socialstats/image-01.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/socialstats/image-02.png" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/socialstats/image-03.png" }, { kind: "image", src: "/images/work/socialstats/image-04.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/socialstats/image-05.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/socialstats/image-06.png" }] },
    ],
  },
  {
    slug: "westend",
    title: "Westend",
    category: "Portfolio",
    year: "2024",
    icon: "/images/work/westend/westend-icon.png",
    cover: "/images/other/westend.jpg",
    previewVideo: "/videos/westend-preview-compressed.mp4",
    services: ["Art Direction", "Web Design", "Responsive Design", "Next.js", "Tailwind CSS", "GSAP", "Lenis", "Contentful", "Vercel"],
    summary:
      "Designed and developed the official website for professional DJ and producer Westend, focusing on showcasing his latest releases, past performances, and upcoming tour dates.",
    visitUrl: "https://itsthewestend.com",
    gallery: [
      { layout: 'full', items: [{ kind: "image", src: "/images/work/westend/image-01.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/westend/image-02.png" }] },
      {
        layout: 'pair',
        items: [{ kind: "image", src: "/images/work/westend/image-03.png" }, { kind: "image", src: "/images/work/westend/image-04.png" }],
      },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/westend/image-05.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/westend/image-06.png" }] },
    ],
  },
  {
    slug: "delivrd",
    title: "DELIVRD",
    category: "Showcase",
    year: "2023",
    icon: "/images/work/delivrd/delivrd-icon.png",
    cover: "/images/work/delivrd/cover.jpg",
    previewVideo: "/videos/delivrd-preview-compressed.mp4",
    services: ["Next.js", "Tailwind CSS", "GSAP", "Lenis", "Supabase", "Vercel", "Web Design", "Responsive Design"],
    summary:
      "Developed a website that helps aspiring EDM producers easily find and submit demos to popular labels. Designed with a clean, minimal aesthetic and subtle micro-animations for an engaging user experience. I continue to maintain and improve the site.",
    visitUrl: "https://delivrd.live",
    gallery: [
      { layout: 'full', items: [{ kind: "image", src: "/images/work/delivrd/image-01.png" }] },
      { layout: 'full', items: [{ kind: "image", src: "/images/work/delivrd/image-02.png" }] },
    ],
  },
]

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug)
}
