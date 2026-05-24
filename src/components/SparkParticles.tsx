'use client'

import { useEffect, useRef } from 'react'

interface Ember {
  x:       number
  y:       number
  vx:      number
  vy:      number
  life:    number
  maxLife: number
  size:    number
  hue:     number   // 0 = red, 40 = orange/amber
}

export default function SparkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const embers: Ember[] = []
    const MAX_EMBERS = 65

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function spawn(): Ember {
      return {
        x:       Math.random() * canvas.width,
        y:       canvas.height * 0.4 + Math.random() * canvas.height * 0.6,
        vx:      (Math.random() - 0.5) * 1.1,
        vy:      -(Math.random() * 1.6 + 0.5),
        life:    0,
        maxLife: Math.random() * 130 + 60,
        size:    Math.random() * 1.6 + 0.3,
        hue:     Math.random() * 40,
      }
    }

    // Pre-seed with embers scattered across the page
    for (let i = 0; i < MAX_EMBERS; i++) {
      const e = spawn()
      e.life = Math.random() * e.maxLife
      e.y    = Math.random() * canvas.height
      embers.push(e)
    }

    function tick() {
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new embers gradually
      if (embers.length < MAX_EMBERS && Math.random() < 0.35) {
        embers.push(spawn())
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]

        e.life += 1
        e.x    += e.vx
        e.y    += e.vy
        e.vx   += (Math.random() - 0.5) * 0.12   // organic drift
        e.vy   -= 0.006                             // gentle acceleration up

        if (e.life >= e.maxLife || e.y < -20) {
          embers.splice(i, 1)
          continue
        }

        const t     = e.life / e.maxLife
        const alpha = Math.pow(1 - t, 1.8) * 0.38  // subtle max opacity

        // --- outer glow ---
        const r = e.size * 3.5
        const grd = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, r)
        grd.addColorStop(0,   `hsla(${15 + e.hue}, 100%, 65%, ${alpha})`)
        grd.addColorStop(0.5, `hsla(${e.hue},     100%, 50%, ${alpha * 0.5})`)
        grd.addColorStop(1,   `hsla(${e.hue},     100%, 40%, 0)`)

        ctx!.beginPath()
        ctx!.arc(e.x, e.y, r, 0, Math.PI * 2)
        ctx!.fillStyle = grd
        ctx!.fill()

        // --- core bright dot ---
        ctx!.beginPath()
        ctx!.arc(e.x, e.y, e.size * 0.55, 0, Math.PI * 2)
        ctx!.fillStyle = `hsla(${30 + e.hue}, 100%, 85%, ${alpha * 1.6})`
        ctx!.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  )
}
