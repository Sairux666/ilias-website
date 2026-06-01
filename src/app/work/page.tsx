import type { Metadata } from 'next'
import { WorkIndex } from '@/components/sections/WorkIndex'

export const metadata: Metadata = {
  title: 'Work | Jason Zubiate',
  description: 'Selected design engineering work — portfolios, products, and brand sites.',
}

export default function WorkPage() {
  return <WorkIndex />
}
