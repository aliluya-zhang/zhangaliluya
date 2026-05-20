'use client'
/**
 * ScrollContainer.tsx — 全局 Lenis 平滑滚动 + 橡皮筋弹性效果
 * - 使用 Lenis 实现平滑滚动（替代 framer-motion drag 方案）
 * - 页面顶部 / 底部弹性回弹效果（Framer Motion spring）
 */
import { useEffect, useRef, ReactNode } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'

interface Props { children: ReactNode }

export default function ScrollContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 橡皮筋位移量
  const rawY    = useMotionValue(0)
  const springY = useSpring(rawY, { stiffness: 200, damping: 25, mass: 0.8 })

  useEffect(() => {
    let ticking = false
    let lastScroll = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const s = window.scrollY
        const overTop    = Math.min(0, s)           // 负数：超过顶部
        const overBottom = Math.max(0, s - maxScroll) // 正数：超过底部

        if (overTop < 0) {
          // 上边界弹性
          rawY.set(-overTop * 0.3)
        } else if (overBottom > 0) {
          // 下边界弹性
          rawY.set(-overBottom * 0.3)
        } else {
          rawY.set(0)
        }

        lastScroll = s
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [rawY])

  return (
    <motion.div
      ref={containerRef}
      style={{ y: springY }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}
