import type { Metadata } from 'next'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Lab — Ilias Chakri',
  description: 'Experiments, personal work, and explorations by Ilias Chakri.',
}

const labItems = [
  { src: '/images/lab/03.png', title: 'Motion Experiment 01', year: '2024' },
  { src: '/images/lab/04.png', title: 'Typography Study', year: '2024' },
  { src: '/images/lab/05.png', title: 'Visual Exploration', year: '2024' },
  { src: '/images/lab/06.png', title: 'Brand Concept', year: '2023' },
  { src: '/images/lab/08.png', title: 'Color Study', year: '2023' },
  { src: '/images/lab/09.png', title: 'Illustration Series', year: '2023' },
  { src: '/images/lab/10.png', title: 'Poster Design', year: '2023' },
  { src: '/images/lab/11.png', title: 'Digital Collage', year: '2022' },
  { src: '/images/lab/12.png', title: 'Motion Loop', year: '2022' },
]

export default function LabPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 lg:pt-28 px-5 lg:px-8 pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <h1
              className="font-display uppercase text-[#f5f5f5] leading-none mb-4"
              style={{ fontSize: 'clamp(48px,8vw,130px)' }}
            >
              Lab
            </h1>
            <p className="text-[#888] text-base max-w-[400px]">
              Personal experiments, explorations, and work in progress.
            </p>
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6">
            {labItems.map((item, i) => (
              <div
                key={i}
                className="break-inside-avoid group relative overflow-hidden rounded-xl bg-[#111] border border-white/5"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-[#f5f5f5] text-sm font-medium">{item.title}</span>
                  <span className="text-[#888] text-xs">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
