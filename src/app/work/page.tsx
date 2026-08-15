import type { Metadata } from 'next'
import { WorkIndex } from '@/components/sections/WorkIndex'

export const metadata: Metadata = {
  title: 'Work | Ilias Chakri',
  description:
    'Selected campaign design, motion and AI production work by Ilias Chakri, graphic and motion designer in Casablanca.',
}

export default function WorkPage() {
  return <WorkIndex />
}
