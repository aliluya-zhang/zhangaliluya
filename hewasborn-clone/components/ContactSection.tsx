'use client'
/**
 * ContactSection.tsx — 联系区域 + 页脚
 */
import AnimatedSection from './AnimatedSection'
import { siteConfig } from '@/config/siteConfig'

export default function ContactSection() {
  return (
    <>
      <section id="contact" className="py-24 md:py-36 px-6 md:px-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div>
              <p className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase mb-6">
                Get In Touch
              </p>
              <h2 className="text-[clamp(36px,7vw,96px)] font-black text-white leading-tight mb-8">
                Let's create<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-pink to-accent-blue">
                  something great.
                </span>
              </h2>
              <a
                href={`mailto:${siteConfig.footer.email}`}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black
                           font-bold rounded-full hover:bg-accent transition-colors duration-300
                           text-base group"
                data-cursor-hover
              >
                Start a Project
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>

              <p className="mt-6 text-sm text-white/30">
                or email us at{' '}
                <a href={`mailto:${siteConfig.footer.email}`}
                   className="text-white/60 hover:text-white transition-colors underline underline-offset-4">
                  {siteConfig.footer.email}
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-white/[0.06] px-6 md:px-16 py-10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-black text-white tracking-widest text-lg">
            {siteConfig.brand}
          </span>

          <div className="flex gap-6">
            {siteConfig.footer.socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-white/30 hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-white/20 font-mono">
            {siteConfig.footer.copy}
          </p>
        </div>
      </footer>
    </>
  )
}
