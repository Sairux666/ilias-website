/* Work projects for the /work index and /work/[slug] case studies.
 *
 * Additive data source (legacy projects.ts left untouched). Shaped to match the
 * itsjay.us reference: a card surface (cover/icon/previewVideo/services) plus a
 * case-study body (summary, optional visitUrl, gallery of full / half-pair media).
 * Assets live under /public/images/work/<slug>/ and /public/videos/.
 */

export type LocalMediaItem = { kind: 'image'; src: string; alt?: string } | { kind: 'video'; src: string }

export type MediaItem =
  | LocalMediaItem
  | { kind: 'vimeo'; vimeoId: string; poster: string; alt: string }
  | { kind: 'hosted-video'; src: string; poster: string; alt: string }

export type GalleryRow =
  | { layout: 'full'; items: [MediaItem] }
  | { layout: 'pair'; items: [LocalMediaItem, LocalMediaItem] }

/* Agency-style spec header, directly below the case study title. Every field
 * is optional and each renders as its own column only when present, so
 * portfolio-style projects (no agency, no market) show fewer columns instead
 * of blank ones. */
export type SpecHeader = {
  client?: string
  role?: string
  agency?: string
  /* Second agency name for the "Agency via VML" format, e.g. agency:
   * "Le Pub", agencyVia: "VML". */
  agencyVia?: string
  market?: string
}

export type SpineSection = {
  heading?: string
  body?: string
  media?: MediaItem
}

/* The 4-part case study spine: Brief, Challenge, Approach, Work/Ecosystem.
 * The whole spine collapses if none of the four parts have content, and each
 * part collapses individually if it has none of its own. */
export type Spine = {
  brief?: SpineSection
  challenge?: SpineSection
  approach?: SpineSection
  work?: SpineSection
}

export type AddonSection = {
  heading?: string
  body?: string
  media?: MediaItem[]
  /* Autoplaying, muted, looping background video shown above the media
   * (e.g. an animated social feed loop). */
  loopVideo?: string
  /* Payoff-specific: a single self-hosted video URL plus optional still
   * images, rendered in the WPP 2-column layout (heading left, body + video
   * + stills right) instead of the generic stacked add-on layout. */
  video?: string
  poster?: string
  stills?: MediaItem[]
}

/* Modular add-ons, each an independent conditional slot. */
export type Addons = {
  aiPipeline?: AddonSection
  storyboards?: AddonSection
  ratioRebuilds?: AddonSection
  oohInMarket?: AddonSection
  payoff?: AddonSection
}

export type CreditEntry = { role: string; name: string }

export type WorkProject = {
  slug: string
  title: string
  subtitle?: string
  category: string
  year: string
  icon: string
  cover: string
  previewVideo: string
  services: string[]
  summary: string
  visitUrl?: string
  gallery: GalleryRow[]
  heroAsset?: MediaItem
  spec?: SpecHeader
  spine?: Spine
  addons?: Addons
  /* Either a role/name credits list, or a single descriptive credits
   * paragraph (creditsText) when the work was one person across many roles. */
  credits?: CreditEntry[]
  creditsText?: string
  tools?: string[]
  formats?: string[]
  timeline?: string
}

export const workProjects: WorkProject[] = [
  {
    slug: "fanta",
    title: "FANTA PROMO CAMPAIGN",
    subtitle: "Scan and win, in Darija, in fifteen seconds.",
    category: "Campaign",
    year: "2026",
    icon: "/portfolio/fanta/fanta-logo.webp",
    cover: "/portfolio/fanta/card-fanta.webp",
    previewVideo: "/portfolio/fanta/fanta-promo-campaign-15sec-film.mp4",
    services: [
      "Art Direction",
      "Key Visuals",
      "Campaign Design",
      "OOH & DOOH",
      "Retail & POS",
      "Motion Design",
      "AI Animation",
      "Adaptations",
    ],
    summary:
      "National on-pack promo for Fanta 1.5L bottles giving away scooters, vouchers, and phone credit. Created the master key visual, rolled out the design across billboards and corner stores, and built the 15-second launch film blending AI animation with kinetic motion.",
    gallery: [],
    heroAsset: {
      kind: "image",
      src: "/portfolio/fanta/fanta-promo-campaign-kv.webp",
      alt: "Fanta Promo Campaign master key visual",
    },
    spec: {
      client: "Fanta (The Coca-Cola Company)",
      agency: "VML",
    },
    spine: {
      brief: {
        heading: "The brief",
        body:
          "Fanta ran a national promo on 1.5L bottles. Buy a bottle, scan the QR code on the label, enter the code under the cap, and win a scooter, a phone voucher or phone credit. It needed a key visual and a launch film that could explain all three steps and still look like Fanta. One week from blank page to delivered masters.",
      },
      challenge: {
        heading: "The challenge",
        body:
          "Three steps, fifteen seconds, in Darija. The same idea had to hold on a motorway billboard, corner store POS, and a phone screen held at arm's length.",
      },
      approach: {
        heading: "Make the mechanic the story",
        body:
          "Promo work usually buries the instructions at the end. We led with them instead. Every shot does one job: taste, prize, step one, step two, payoff. Nothing decorative, nothing that slows the read. Darija for the voice, Arabic script and Latin transliteration side by side on screen, because that is how people actually read here.",
      },
      work: {
        heading: "Fifteen seconds, three steps",
        body:
          "Frames were designed as stills, then animated with Seedance 2.0. Type, UI and prize elements animated in After Effects on top. AI handled camera moves and liquid. It did not make the design decisions, and it is not the reason the film works.",
        media: {
          kind: "hosted-video",
          src: "https://github.com/Sairux666/ilias-assets/releases/download/media-v1/fanta-promo-campaign-15sec-film.mp4",
          poster: "/portfolio/fanta/fanta-promo-campaign-kv.webp",
          alt: "Fanta Promo Campaign film, fifteen seconds, three steps",
        },
      },
    },
    addons: {
      storyboards: {
        heading: "Boarded before a single frame was built",
        body:
          "Fifteen seconds leaves no room to find the edit later. The film was boarded shot by shot first, so the pacing and three step mechanic were solved on paper before opening After Effects.",
        media: [
          {
            kind: "image",
            src: "/portfolio/fanta/storyboard.webp",
            alt: "Fanta Promo Campaign storyboard, shot by shot",
          },
        ],
      },
      oohInMarket: {
        heading: "Billboard distance to street level",
        body:
          "Rolled out across Casablanca on urban billboards and digital street totems. Weights, contrast, and typography were set so the three steps remain instantly readable from a moving car and on foot.",
        media: [
          {
            kind: "image",
            src: "/portfolio/fanta/dooh-01.webp",
            alt: "Fanta Promo Campaign billboard in Casablanca",
          },
          {
            kind: "image",
            src: "/portfolio/fanta/dooh-02.webp",
            alt: "Fanta Promo Campaign digital street totem",
          },
        ],
      },
      ratioRebuilds: {
        heading: "Social feeds and channel takeover",
        body:
          "Rebuilt across 16:9, 1:1, and 9:16 rather than scaled down. Extended into animated social feed loops, carousel posts, and a full YouTube channel takeover.",
        loopVideo: "https://github.com/Sairux666/ilias-assets/releases/download/media-v1/animated-instagram.mp4",
        media: [
          {
            kind: "image",
            src: "/portfolio/fanta/social-media-01.webp",
            alt: "Fanta Promo Campaign social media carousel post",
          },
          {
            kind: "image",
            src: "/portfolio/fanta/youtube-banner.webp",
            alt: "Fanta Promo Campaign YouTube channel takeover banner",
          },
        ],
      },
      payoff: {
        heading: "The winners in market",
        body:
          "One of several handover films produced with the VML team as scooters were delivered across the country, closing on the campaign motion end frame.",
        video: "https://github.com/Sairux666/ilias-assets/releases/download/media-v1/fanta-winner.mp4",
        poster: "/portfolio/fanta/winner-cover-01.webp",
        stills: [],
      },
    },
    creditsText:
      "Concept and storyboard. Key visual, built from scratch. Frame design. AI animation. Motion design, type and UI. Adaptations across 16:9, 1:1 and 9:16. Strategy, edit, sound design and voiceover by the team at VML.",
    tools: ["Photoshop", "Illustrator", "After Effects", "Seedance 2.0"],
    formats: ["16:9", "1:1", "9:16"],
    timeline: "One week",
  },
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
            poster: "/portfolio/fanta/fanta-promo-campaign-kv.webp",
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
