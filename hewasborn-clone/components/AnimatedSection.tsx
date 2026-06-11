'use client'
/**
 * AnimatedSection.tsx — 滚动触发动画（淡入/位移/模糊）
 * 子元素进入视口时：opacity 0→1，y 50→0，blur 8px→0
 * 每个子项延迟 0.1s 依次触发
 */
import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  /** 第一个子项延迟起点（秒），默认 0 */
  baseDelay?: number
  /** 相邻子项间隔（秒），默认 0.1 */
  stagger?: number
  /** 触发阈值（0~1），默认 0.15 */
  threshold?: number
}

export default function AnimatedSection({
  children,
  className = '',
  baseDelay = 0,
  stagger = 0.1,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: threshold })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: baseDelay,
        staggerChildren: stagger,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* 将直接子节点包裹一层 motion.div 应用 itemVariants */}
      {Array.isArray(children)
        ? (children as ReactNode[]).map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        )
      }
    </motion.div>
  )
}
