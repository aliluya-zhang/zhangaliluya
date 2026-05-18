'use client'
/**
 * HeroSection.tsx — 首页 Banner
 * - 全屏背景（视频 or 纯色渐变）
 * - Canvas 波光叠层（WaveCanvas）
 * - 标题文字底部居中，带鼠标视差位移
 * - 滚动时内容淡出（parallax）
 */
import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import WaveCanvas from './WaveCanvas'
import { siteConfig } from '@/config/siteConfig'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // 滚动视差：标题随滚动上移
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const titleY   = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // 鼠标视差
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const spY = useSpring(mouseY, { stiffness: 80, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - left) / width  - 0.5) * 20)
    mouseY.set(((e.clientY - top)  / height - 0.5) * 20)
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── 背景层 ── */}
      {/* 渐变背景（可替换为 <video> 标签） */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f14] to-[#0a0a10]" />

      {/* 噪点纹理叠层 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url(/noise.png)', backgroundSize: '256px' }}
      />

      {/* Canvas 波光动画 */}
      <WaveCanvas />

      {/* ── 内容层 ── */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-6 z-10"
      >
        <motion.div style={{ x: spX, y: spY }} className="text-center">
          {/* 小标签 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-mono tracking-[0.35em] text-white/40 mb-6 uppercase"
          >
            {siteConfig.hero.subline}
          </motion.p>

          {/* 主标题：每行独立动画 */}
          {siteConfig.hero.headline.split('\n').map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 2.0 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-[clamp(36px,7vw,90px)] font-black text-white leading-[1.05] tracking-tight"
              >
                {line}
              </motion.h1>
            </div>
          ))}

          {/* CTA 按钮 */}
          <motion.a
            href={siteConfig.hero.cta.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 inline-flex items-center gap-3 px-7 py-3.5 border border-white/20
                       text-sm text-white/80 hover:text-white hover:border-white/60
                       rounded-full transition-all duration-300 group"
          >
            {siteConfig.hero.cta.label}
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* 底部渐变遮罩，与下方 section 融合 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
