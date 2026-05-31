export type ProjectImage = {
  src: string
  alt: string
  span?: 'full' | 'half'
}

export type Project = {
  slug: string
  title: string
  client?: string
  description: string
  longDescription?: string
  type: string
  year: string
  tags: string[]
  thumbnail: string
  thumbnailVideo?: string
  previewVideo?: string
  category: string
  featured: boolean
  images?: ProjectImage[]
  videos?: string[]
  agency?: string
}

export const projects: Project[] = [
  {
    slug: 'coca-cola-campaign',
    title: 'Coca-Cola Campaign',
    client: 'Coca-Cola',
    description:
      'Brand motion assets and key visuals for a major international Coca-Cola campaign, designed to resonate across global and regional markets.',
    longDescription:
      'Working at VML (WPP Group), I developed the key visual system, OOH adaptations, and motion assets for this multi-market Coca-Cola campaign. The project spanned social media, out-of-home, and digital platforms.',
    type: 'Key Visual · Motion Design',
    year: '2025',
    tags: ['Key Visual', 'Motion Design', 'OOH', 'Social Media'],
    thumbnail: '/images/other/westend.jpg',
    previewVideo: '/videos/westend-preview-compressed.mp4',
    category: 'Motion Design',
    featured: true,
    agency: 'VML (WPP Group)',
    images: [
      { src: '/images/other/westend.jpg', alt: 'Coca-Cola Campaign', span: 'full' },
    ],
  },
  {
    slug: 'spotify-campaign',
    title: 'Spotify Campaign',
    client: 'Spotify',
    description:
      'Social media visuals and animated adaptations for Spotify\'s regional campaign, maintaining global brand consistency while adapting for local markets.',
    longDescription:
      'Developed a suite of animated social assets and key visuals for Spotify\'s regional campaign, with a focus on motion and energy that aligns with Spotify\'s brand identity.',
    type: 'Social Media · Motion',
    year: '2025',
    tags: ['Social Media', 'Motion Design', 'Brand Adaptation'],
    thumbnail: '/images/other/westend.jpg',
    previewVideo: '/videos/socialstats-preview-compressed.mp4',
    category: 'Motion Design',
    featured: true,
    agency: 'VML (WPP Group)',
    images: [
      { src: '/images/other/westend.jpg', alt: 'Spotify Campaign', span: 'full' },
    ],
  },
  {
    slug: 'dacia-campaign',
    title: 'Dacia Brand Visual',
    client: 'Dacia',
    description:
      'Key visual design and OOH/DOOH adaptations for Dacia\'s regional brand campaign, capturing the brand\'s spirit across multiple formats.',
    longDescription:
      'Designed key visuals and full-format OOH/DOOH adaptations for Dacia\'s regional campaign. The work involved creative direction and layout for print and digital display environments.',
    type: 'Key Visual · OOH/DOOH',
    year: '2025',
    tags: ['Key Visual', 'OOH', 'DOOH', 'Brand Design'],
    thumbnail: '/images/other/westend.jpg',
    previewVideo: '/videos/trackstack-preview-compressed.mp4',
    category: 'Brand Identity',
    featured: false,
    agency: 'VML (WPP Group)',
    images: [
      { src: '/images/other/westend.jpg', alt: 'Dacia Campaign', span: 'full' },
    ],
  },
  {
    slug: 'brand-identity-project',
    title: 'Brand Identity System',
    client: 'Freelance Client',
    description:
      'End-to-end brand identity creation: logo, visual system, color palette, typography, and brand guidelines for a digital-first startup.',
    longDescription:
      'A complete brand identity system from scratch — logo design, visual identity, color palette, typography hierarchy, and a full brand guidelines document.',
    type: 'Brand Identity',
    year: '2024',
    tags: ['Logo Design', 'Visual Identity', 'Brand System', 'Brand Guidelines'],
    thumbnail: '/images/other/westend.jpg',
    previewVideo: '/videos/delivrd-preview-compressed.mp4',
    category: 'Brand Identity',
    featured: false,
    images: [
      { src: '/images/other/westend.jpg', alt: 'Brand Identity', span: 'full' },
    ],
  },
  {
    slug: 'motion-campaign',
    title: 'Motion Campaign',
    client: 'Garthbid Studio',
    description:
      'Animated campaign assets for digital platforms, combining illustration and motion to create engaging, story-driven visuals.',
    longDescription:
      'Designed and animated a series of campaign assets for Garthbid Studio, including motion graphics, storyboarding, and final delivery across multiple formats.',
    type: 'Motion Graphics · Illustration',
    year: '2023',
    tags: ['Motion Graphics', 'Animation', 'Illustration', 'Campaign'],
    thumbnail: '/images/other/westend.jpg',
    previewVideo: '/videos/jazmin-wong-preview-compressed.mp4',
    category: 'Motion Design',
    featured: false,
    agency: 'Garthbid Studio',
    images: [
      { src: '/images/other/westend.jpg', alt: 'Motion Campaign', span: 'full' },
    ],
  },
  {
    slug: 'ocp-campaign',
    title: 'OCP Visual Campaign',
    client: 'OCP',
    description:
      'Key visual design and communication assets for OCP\'s institutional campaign, built for impact across print and digital surfaces.',
    longDescription:
      'Developed the visual concept and key assets for OCP\'s institutional campaign, including print materials, digital banners, and presentation visuals.',
    type: 'Key Visual · Digital/Print',
    year: '2025',
    tags: ['Key Visual', 'Print', 'Digital', 'Institutional'],
    thumbnail: '/images/other/westend.jpg',
    previewVideo: '/videos/kickbass-preview-compressed.mp4',
    category: 'Brand Identity',
    featured: false,
    agency: 'VML (WPP Group)',
    images: [
      { src: '/images/other/westend.jpg', alt: 'OCP Campaign', span: 'full' },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
