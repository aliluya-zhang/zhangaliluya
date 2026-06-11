// ============================================================
// siteConfig.ts — 全站文字、导航、统计数据集中配置
// 修改这里即可更新网站内容，无需动组件代码
// ============================================================

export const siteConfig = {
  /** 品牌名 / Logo 文字 */
  brand: 'ALILUYA',

  /** 首页 Hero 区 */
  hero: {
    headline: "We craft\nexperiences\nthat matter.",
    subline: 'Design Studio · Motion · Branding',
    cta: { label: 'View Work', href: '#works' },
  },

  /** 导航链接 */
  nav: [
    { label: 'Works',    href: '#works' },
    { label: 'About',    href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact',  href: '#contact' },
  ],

  /** 汉堡菜单全屏导航项（可与 nav 不同） */
  menuItems: [
    { label: 'Home',     href: '/' },
    { label: 'Works',    href: '#works' },
    { label: 'About',    href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact',  href: '#contact' },
  ],

  /** 统计数字卡片 */
  stats: [
    { value: 120, suffix: '+', label: 'Projects Delivered' },
    { value: 8,   suffix: ' yrs', label: 'Industry Experience' },
    { value: 40,  suffix: '+', label: 'Global Clients' },
    { value: 15,  suffix: '',  label: 'Awards Won' },
  ],

  /** About 区 */
  about: {
    title: 'We believe\ndesign changes\neverything.',
    body: `A multidisciplinary creative studio operating at the intersection of design, technology and brand strategy. We partner with ambitious teams to create experiences that leave a lasting impression.`,
  },

  /** Services 区 */
  services: [
    { icon: '✦', title: 'Brand Identity', desc: 'Visual systems, logo design, guidelines and brand strategy.' },
    { icon: '◈', title: 'Motion Design',  desc: 'Micro-interactions, animation systems and cinematic storytelling.' },
    { icon: '⬡', title: 'Web & Digital', desc: 'Full-stack product design, development and performance optimisation.' },
    { icon: '◉', title: 'Art Direction', desc: 'Campaign concepts, photography direction and editorial design.' },
  ],

  /** 页脚 */
  footer: {
    email: 'hello@aliluya.studio',
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'Behance',   href: '#' },
      { label: 'LinkedIn',  href: '#' },
      { label: 'Twitter/X', href: '#' },
    ],
    copy: '© 2026 Aliluya Studio. All rights reserved.',
  },
}
