import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { workProjects, getWorkProject } from '@/data/work'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { CaseStudyNav } from '@/components/ui/CaseStudyNav'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return workProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getWorkProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} | Ilias Chakri`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getWorkProject(slug)
  if (!project) notFound()

  const index = workProjects.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? workProjects[index - 1] : null
  const next = index < workProjects.length - 1 ? workProjects[index + 1] : null

  return (
    <>
      <CaseStudy project={project} />
      <CaseStudyNav prev={prev} next={next} />
    </>
  )
}
