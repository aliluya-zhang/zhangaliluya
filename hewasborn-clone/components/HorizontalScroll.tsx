'use client'
/**
 * HorizontalScroll.tsx — 横向滚动视差区
 * 纵向滚动时，卡片组横向平移（useScroll + useTransform）
 * 用于展示横向排列的精选项目
 */
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { projects } from '@/config/projects'

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // 纵向滚动 0→1 映射为横向位移 0 → -(卡片总宽 - 视口宽) px
  // 用百分比让不同屏幕宽度自适应
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-[#0a0a0a]"
      aria-label="精选作品横向展示"
    >
      {/* 粘性容器 */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* 区块标题 */}
        <div className="px-6 md:px-16 mb-10">
          <p className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Selected<br />Projects
          </h2>
        </div>

        {/* 横向滑动轨道 */}
        <motion.div
          style={{ x: xTranslate }}
          className="flex gap-6 pl-6 md:pl-16 will-change-transform"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative shrink-0 w-[clamp(280px,40vw,520px)] rounded-2xl overflow-hidden
                         bg-surface cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-cursor-hover
            >
              {/* 图片 */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="40vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${project.accentColor}55, transparent)` }}
                />
              </div>

              {/* 文字 */}
              <div className="p-5">
                <span className="text-[11px] font-mono text-white/40 tracking-wider">
                  {project.category} · {project.year}
                </span>
                <h3 className="mt-1.5 font-bold text-white group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
              </div>

              {/* 序号 */}
              <span className="absolute top-4 right-4 text-4xl font-black text-white/[0.06] select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}

          {/* 末端 CTA */}
          <div className="shrink-0 w-[clamp(200px,25vw,320px)] flex items-center justify-center">
            <a
              href="#works"
              className="flex flex-col items-center gap-3 text-white/40 hover:text-white transition-colors group"
            >
              <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center
                               group-hover:border-white/60 transition-colors text-xl">
                →
              </span>
              <span className="text-sm font-mono tracking-wider">View All</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
