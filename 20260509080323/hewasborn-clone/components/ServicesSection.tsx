'use client'
/**
 * ServicesSection.tsx — 服务区块（Three.js 动态背景）
 */
import dynamic from 'next/dynamic'
import AnimatedSection from './AnimatedSection'
import { siteConfig } from '@/config/siteConfig'

// Three.js 仅在客户端渲染，避免 SSR 报错
const BackgroundDynamic = dynamic(() => import('./BackgroundDynamic'), { ssr: false })

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-36 px-6 md:px-16 bg-[#080810] overflow-hidden"
    >
      {/* Three.js 粒子背景 */}
      <BackgroundDynamic />

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <div>
            <p className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase mb-4">
              What We Do
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Services
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          stagger={0.1}
        >
          {siteConfig.services.map(service => (
            <div
              key={service.title}
              className="group p-7 rounded-2xl border border-white/[0.06]
                         bg-white/[0.02] backdrop-blur-sm
                         hover:border-white/20 hover:bg-white/[0.05]
                         transition-all duration-300"
              data-cursor-hover
            >
              <span className="block text-3xl mb-5 text-accent">{service.icon}</span>
              <h3 className="font-bold text-white mb-3 text-base group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
