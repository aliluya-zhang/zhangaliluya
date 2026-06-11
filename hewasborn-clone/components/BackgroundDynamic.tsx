'use client'
/**
 * BackgroundDynamic.tsx — 全屏动态背景（Three.js 粒子系统）
 * 用于 Services 等区块，旋转几何体 + 流动粒子
 * 蓝/橙/粉高饱和色，循环运动，不干扰前景内容
 */
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface Props {
  className?: string
}

export default function BackgroundDynamic({ className = '' }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene ──
    const scene    = new THREE.Scene()
    const W = mount.offsetWidth
    const H = mount.offsetHeight
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── 粒子系统 ──
    const PARTICLE_COUNT = 1200
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const palette   = [
      new THREE.Color('#6bb5ff'), // 蓝
      new THREE.Color('#ffb3d9'), // 粉
      new THREE.Color('#fb923c'), // 橙
      new THREE.Color('#a78bfa'), // 紫
      new THREE.Color('#e8c4a0'), // 金
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // ── 旋转几何体（线框） ──
    const geos = [
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TorusGeometry(1.5, 0.04, 16, 80),
    ]
    const meshes = geos.map((g, i) => {
      const m = new THREE.Mesh(
        g,
        new THREE.MeshBasicMaterial({
          color: palette[i].getHex(),
          wireframe: true,
          transparent: true,
          opacity: 0.08,
        })
      )
      m.position.set((i - 1) * 3.5, 0, -2)
      scene.add(m)
      return m
    })

    // ── 动画 ──
    let raf: number
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      particles.rotation.y = t * 0.04
      particles.rotation.x = t * 0.02

      meshes.forEach((m, i) => {
        m.rotation.x = t * (0.15 + i * 0.05)
        m.rotation.y = t * (0.2  + i * 0.03)
        m.position.y = Math.sin(t * 0.5 + i * 1.2) * 0.5
      })

      renderer.render(scene, camera)
    }
    animate()

    // ── 响应 Resize ──
    const onResize = () => {
      const w = mount.offsetWidth
      const h = mount.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  )
}
