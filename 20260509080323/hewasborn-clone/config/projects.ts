// ============================================================
// projects.ts — 作品集项目数据
// 替换 image 为真实图片路径或 URL 即可
// ============================================================

export interface Project {
  id: string
  title: string
  category: string
  year: string
  /** 图片路径（放入 public/images/ 后填写 /images/xxx.jpg） */
  image: string
  /** 悬停时显示的简短描述 */
  desc: string
  href: string
  /** 卡片背景主色（渐变起点） */
  accentColor: string
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Aura — Brand Identity',
    category: 'Branding',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80',
    desc: 'Full brand system for a luxury wellness brand.',
    href: '#',
    accentColor: '#c9a96e',
  },
  {
    id: 'p2',
    title: 'Kinetic — Motion System',
    category: 'Motion',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=800&q=80',
    desc: 'Comprehensive animation language for a fintech app.',
    href: '#',
    accentColor: '#6bb5ff',
  },
  {
    id: 'p3',
    title: 'Bloom — E-Commerce',
    category: 'Web Design',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    desc: 'Immersive shopping experience for a florist brand.',
    href: '#',
    accentColor: '#ffb3d9',
  },
  {
    id: 'p4',
    title: 'Void — Art Direction',
    category: 'Art Direction',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    desc: 'Dark-themed editorial campaign for a fashion label.',
    href: '#',
    accentColor: '#a78bfa',
  },
  {
    id: 'p5',
    title: 'Pulse — Dashboard UI',
    category: 'Product Design',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    desc: 'Real-time analytics platform for healthcare.',
    href: '#',
    accentColor: '#34d399',
  },
  {
    id: 'p6',
    title: 'Echo — Brand Film',
    category: 'Motion',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80',
    desc: 'Brand story film for an AI startup.',
    href: '#',
    accentColor: '#fb923c',
  },
]
