'use client'
/**
 * ProjectCard.tsx — 作品集卡片
 * hover: scale 1.03 + 白色光晕边框 + 图片轻微放大 + 文字颜色变主题色
 */
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Project } from '@/config/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.03 }}
      // 整体 transition 控制 scale，box-shadow 用 CSS transition 处理
      style={{ transition: 'box-shadow 0.3s ease, scale 0.25s ease-out' }}
      className="group relative overflow-hidden rounded-2xl bg-surface cursor-pointer
                 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_20px_60px_rgba(0,0,0,0.5)]"
      data-cursor-hover
    >
      {/* 图片 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* hover 时叠加渐变遮罩 */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}22, transparent 60%)`,
          }}
        />

        {/* 分类标签 */}
        <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-mono
                         bg-black/50 backdrop-blur-sm text-white/70 rounded-full tracking-wider">
          {project.category}
        </span>
      </div>

      {/* 文字区 */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-white/90 group-hover:text-accent transition-colors duration-200 text-base leading-tight">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-white/40 group-hover:text-white/60 transition-colors duration-200 line-clamp-2">
            {project.desc}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-xs text-white/30 font-mono">{project.year}</span>
          <motion.span
            className="mt-2 text-lg text-white/20 group-hover:text-accent transition-colors duration-200"
            whileHover={{ x: 4 }}
          >
            ↗
          </motion.span>
        </div>
      </div>
    </motion.article>
  )
}
