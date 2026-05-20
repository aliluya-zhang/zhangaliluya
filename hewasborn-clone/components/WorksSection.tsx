'use client'
/**
 * WorksSection.tsx — 作品网格区
 */
import AnimatedSection from './AnimatedSection'
import ProjectCard from './ProjectCard'
import { projects } from '@/config/projects'

export default function WorksSection() {
  return (
    <section id="works" className="py-24 md:py-36 px-6 md:px-16 bg-[#0a0a0a]">
      <AnimatedSection className="mb-16">
        <div>
          <p className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase mb-4">
            Our Work
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Projects
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
