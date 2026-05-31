export type Service = {
  number: string
  title: string
  description: string
  items: string[]
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Brand Identity & Strategy',
    description: 'Building distinctive brands from concept to complete visual system.',
    items: [
      'Logo design',
      'Visual identity',
      'Brand systems',
      'Brand guidelines',
      'Naming',
      'Creative direction',
    ],
  },
  {
    number: '02',
    title: 'Digital & Print Design',
    description: 'Impactful design crafted for every surface and format.',
    items: [
      'Key visuals',
      'OOH / DOOH',
      'Social media visuals',
      'Web design',
      'Marketing materials',
      'Presentations',
    ],
  },
  {
    number: '03',
    title: 'Motion Design',
    description: 'Bringing ideas to life through purposeful animation.',
    items: [
      'Motion graphics',
      'Animated campaigns',
      'Video content',
      'Storyboards',
      'Animated adaptations',
    ],
  },
]
