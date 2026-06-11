'use client'
/**
 * Counter.tsx — 数字递增计数器
 * 进入视口时从 0 递增到 value，时长 1.5s，easeOut 缓动
 */
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  suffix?: string
  label: string
  duration?: number
}

/** easeOut 缓动函数 */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export default function Counter({ value, suffix = '', label, duration = 1500 }: Props) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeOut(progress)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="text-[clamp(36px,5vw,64px)] font-black text-white tabular-nums">
        {count}
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="text-sm text-white/40 tracking-wide">{label}</span>
    </div>
  )
}
