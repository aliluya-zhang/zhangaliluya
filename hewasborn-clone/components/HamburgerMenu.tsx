'use client'
/**
 * HamburgerMenu.tsx — 汉堡菜单滑入 + 菜单项递进动画
 * - 面板从右侧 translateX(100%) → 0 滑入
 * - 半透明遮罩
 * - 菜单项依次淡入右移（每项延迟 0.05s）
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/siteConfig'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <>
      {/* 汉堡图标按钮 */}
      <button
        aria-label={open ? '关闭菜单' : '打开菜单'}
        onClick={() => setOpen(v => !v)}
        className="relative z-[200] w-10 h-10 flex flex-col justify-center items-center gap-[6px] group"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block w-6 h-[1.5px] bg-white origin-center"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block w-6 h-[1.5px] bg-white"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block w-6 h-[1.5px] bg-white origin-center"
        />
      </button>

      {/* 半透明遮罩 */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[150] bg-black"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* 菜单面板 */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-[min(420px,90vw)] z-[160]
                       bg-[#0d0d0d] border-l border-white/5 flex flex-col
                       justify-center px-12 py-16 overflow-hidden"
          >
            {/* 装饰性背景文字 */}
            <span className="absolute bottom-8 right-8 text-[120px] font-black text-white/[0.03] select-none leading-none pointer-events-none">
              MENU
            </span>

            <ul className="space-y-2">
              {siteConfig.menuItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-4 py-3 text-4xl font-bold
                               text-white/80 hover:text-accent transition-colors duration-200"
                  >
                    <span className="text-xs text-muted font-mono w-5">
                      0{i + 1}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* 底部社交链接 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-16 flex gap-6"
            >
              {siteConfig.footer.socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-xs text-muted hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
