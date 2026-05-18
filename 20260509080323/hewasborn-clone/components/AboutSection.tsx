'use client'
/**
 * AboutSection.tsx — 关于区 + 数字计数器
 */
import AnimatedSection from './AnimatedSection'
import Counter from './Counter'
import { siteConfig } from '@/config/siteConfig'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-16 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* 左侧文字 */}
        <AnimatedSection>
          <div>
            <p className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase mb-6">
              About Us
            </p>
            <h2 className="text-[clamp(28px,4vw,52px)] font-black text-white leading-[1.1] whitespace-pre-line mb-8">
              {siteConfig.about.title}
            </h2>
            <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-lg">
              {siteConfig.about.body}
            </p>
          </div>
        </AnimatedSection>

        {/* 右侧统计数字 */}
        <AnimatedSection
          className="grid grid-cols-2 gap-8 pt-4"
          baseDelay={0.2}
          stagger={0.12}
        >
          {siteConfig.stats.map(stat => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
