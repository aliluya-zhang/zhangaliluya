'use client'
/**
 * Navbar.tsx — 顶部导航栏
 * - 滚动后加载毛玻璃背景
 * - 右侧汉堡菜单
 */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HamburgerMenu from './HamburgerMenu'
import { siteConfig } from '@/config/siteConfig'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5
                 flex items-center justify-between transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.7)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <a href="/" className="text-white font-black text-xl tracking-widest">
        {siteConfig.brand}
      </a>

      {/* 桌面导航 */}
      <nav className="hidden md:flex gap-8">
        {siteConfig.nav.map(item => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* 汉堡菜单（移动端始终显示，桌面端也保留） */}
      <HamburgerMenu />
    </motion.header>
  )
}
