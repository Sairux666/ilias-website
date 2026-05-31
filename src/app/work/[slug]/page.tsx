import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Footer'
import { ProjectNav } from '@/components/ui/ProjectNav'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Ilias Chakri`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
          <div className="absolute bottom-8 left-5 lg:left-8 right-5 lg:right-8 flex items-end justify-between">
            <div>
              <p className="text-[#888] text-xs font-medium tracking-widest uppercase mb-2">
                {project.category} · {project.year}
              </p>
              <h1
                className="font-display uppercase text-[#f5f5f5] leading-none"
                style={{ fontSize: 'clamp(32px,5vw,80px)' }}
              >
                {project.title}
              </h1>
            </div>
            {project.agency && (
              <span className="hidden lg:block text-[#888] text-sm font-medium">
                {project.agency}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 lg:px-8 py-16 lg:py-20 max-w-[1400px] mx-auto">
          {/* Meta row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px border border-white/5 rounded-2xl overflow-hidden mb-14 lg:mb-20">
            {[
              { label: 'Client', value: project.client ?? '—' },
              { label: 'Type', value: project.type },
              { label: 'Year', value: project.year },
              { label: 'Agency', value: project.agency ?? 'Freelance' },
            ].map((item) => (
              <div key={item.label} className="p-5 lg:p-6 bg-[#111]">
                <p className="text-[#888] text-xs font-medium tracking-wide uppercase mb-2">{item.label}</p>
                <p className="text-[#f5f5f5] font-medium text-sm lg:text-base">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 mb-16 lg:mb-20">
            <div className="lg:col-span-7 lg:col-start-1">
              <p className="text-[clamp(18px,2vw,26px)] font-medium leading-relaxed text-[#f5f5f5] mb-6">
                {project.description}
              </p>
              {project.longDescription && (
                <p className="text-[#888] text-base leading-relaxed">
                  {project.longDescription}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="lg:col-span-4 lg:col-start-9 mt-8 lg:mt-0">
              <p className="text-[#888] text-xs font-medium tracking-wide uppercase mb-4">Tags</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-white/10 text-[#888] text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Images */}
          {project.images && project.images.length > 0 && (
            <div className="flex flex-col gap-4 lg:gap-6 mb-16 lg:mb-20">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl lg:rounded-2xl ${
                    img.span === 'full' ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 90vw"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Preview video */}
          {project.previewVideo && (
            <div className="mb-16 lg:mb-20">
              <video
                src={project.previewVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full rounded-xl lg:rounded-2xl aspect-video object-cover"
              />
            </div>
          )}
        </div>

        {/* Project navigation */}
        <ProjectNav prev={prevProject} next={nextProject} />
      </main>
      <Footer />
    </>
  )
}
