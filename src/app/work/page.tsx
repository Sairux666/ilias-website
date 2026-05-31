import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Footer'
import { WorkGrid } from '@/components/sections/WorkGrid'

export const metadata: Metadata = {
  title: 'Work — Ilias Chakri',
  description: 'Selected projects by Ilias Chakri — Brand Identity, Motion Design, and Digital/Print.',
}

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <WorkGrid />
      </main>
      <Footer />
    </>
  )
}
