'use client'
/**
 * WaveCanvas.tsx — 波光动画 Canvas
 * 页面加载时叠加流动光影纹理，营造水面反射的柔和光感
 * Logo 文字同步从模糊/不透明 → 清晰/消失（1.5s）
 */
import { useEffect, useRef } from 'react'
import { motion, useAnimate } from 'framer-motion'

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let raf: number

    // 绘制流动光波
    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const time = frame * 0.008

      // 多层正弦波叠加
      const layers = [
        { amp: 0.04, freq: 1.2, speed: 0.6,  alpha: 0.06, color: '232,196,160' },
        { amp: 0.03, freq: 2.0, speed: -0.4, alpha: 0.04, color: '107,181,255' },
        { amp: 0.05, freq: 0.8, speed: 0.3,  alpha: 0.05, color: '255,179,217' },
      ]

      layers.forEach(({ amp, freq, speed, alpha, color }) => {
        ctx.beginPath()
        for (let x = 0; x <= width; x += 2) {
          const nx  = x / width
          const y   = height * 0.5
                    + Math.sin(nx * Math.PI * 2 * freq + time * speed) * height * amp
                    + Math.sin(nx * Math.PI * 4 * freq + time * speed * 1.3) * height * amp * 0.5
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        // 延伸到底部形成填充区
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.fill()
      })

      // 横向流光线条
      for (let i = 0; i < 5; i++) {
        const progress = ((time * 0.15 + i * 0.2) % 1)
        const x = progress * width
        const grad = ctx.createLinearGradient(x - 120, 0, x + 120, 0)
        grad.addColorStop(0,   'rgba(255,255,255,0)')
        grad.addColorStop(0.5, 'rgba(255,255,255,0.04)')
        grad.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.fillRect(x - 120, 0, 240, height)
      }

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()

    // Logo 透明度 + 模糊淡出动画（1.5s 后消失）
    animate(
      scope.current,
      { opacity: [1, 0], filter: ['blur(0px)', 'blur(12px)'] },
      { duration: 1.5, delay: 0.5, ease: 'easeInOut' }
    )

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [animate, scope])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Logo 波光入场 */}
      <motion.div
        ref={scope}
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, filter: 'blur(0px)' }}
      >
        <span className="text-white/20 text-[clamp(48px,10vw,120px)] font-black tracking-[0.3em] select-none">
          ALILUYA
        </span>
      </motion.div>
    </div>
  )
}
