'use client'
/**
 * Cursor.tsx — 自定义光标跟随 + 悬停反馈
 * - 跟随圆点 20px 白色半透明
 * - hover 可点击元素时放大 2x 并改变颜色
 * - 移动端自动隐藏（pointer: coarse）
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // SSR 默认 true，避免闪烁

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const springCfg = { stiffness: 500, damping: 40, mass: 0.5 }
  const x = useSpring(rawX, springCfg)
  const y = useSpring(rawY, springCfg)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    setIsMobile(mq.matches)
    if (mq.matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovered(!!el.closest('a, button, [data-cursor-hover]'))
    }
    const onLeave = () => setHovered(false)
    const onOut   = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout',  onLeave)
    document.documentElement.addEventListener('mouseleave', onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout',  onLeave)
      document.documentElement.removeEventListener('mouseleave', onOut)
    }
  }, [rawX, rawY])

  if (isMobile) return null

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width:  hovered ? 44 : 20,
        height: hovered ? 44 : 20,
        backgroundColor: hovered
          ? 'rgba(232,196,160,0.9)'
          : 'rgba(255,255,255,0.85)',
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    />
  )
}
