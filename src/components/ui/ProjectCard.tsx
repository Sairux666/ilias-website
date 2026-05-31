'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'

type Props = {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    if (videoRef.current && project.previewVideo) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article
        className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-[#111] border border-white/5 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Static image */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hovered ? 'scale-105' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Video overlay */}
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Dark overlay on hover */}
          <div
            className={`absolute inset-0 bg-[#0a0a0a]/40 transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Arrow indicator */}
          <div
            className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center transition-all duration-500 ${
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="#0a0a0a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Category pill */}
          <div className="absolute bottom-4 left-4">
            <span className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/70 backdrop-blur-sm text-[#f5f5f5] text-[10px] font-medium tracking-wide uppercase border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 lg:p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-[#f5f5f5] text-base lg:text-lg mb-1 group-hover:opacity-70 transition-opacity duration-300">
              {project.title}
            </h3>
            <p className="text-[#888] text-sm">{project.type}</p>
          </div>
          <span className="shrink-0 text-[#888] text-sm font-medium mt-0.5">
            {project.year}
          </span>
        </div>
      </article>
    </Link>
  )
}
