'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap, ArrowDown } from 'lucide-react'
import { BRAND_CONFIG } from '@/lib/config'

// ── Ticker strip words
const TICKER = ['DISCIPLINA', 'FOCO', 'EVOLUÇÃO', 'ESTILO', 'PERFORMANCE', 'IDENTIDADE']

// ── Fast stagger variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 44 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.8, delay: 0.6 } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505]">

      {/* ── Background image (desktop) ─────────────────────────────── */}
      {/* Salve a imagem como /public/hero-bg.jpg para ativar */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          onError={() => {/* silently fallback to CSS bg */}}
        />
        {/* Overlay multicamada para manter texto legível */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to right, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.65) 55%, rgba(5,5,5,0.30) 100%)',
              'linear-gradient(to top,   rgba(5,5,5,0.98) 0%, transparent 40%)',
              'linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, transparent 20%)',
            ].join(', '),
          }}
        />
      </div>

      {/* ── Background fallback / mobile: grid + glow ──────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,26,26,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,26,26,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none md:hidden"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(255,26,26,0.14) 0%, transparent 68%)' }}
      />

      {/* ── Left accent line ───────────────────────────────────────── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #ff1a1a 0%, rgba(255,26,26,0.3) 50%, transparent 100%)' }}
      />

      {/* ── Ghost "AX" — mobile only (hidden on desktop, bg image has it) ── */}
      <div
        className="absolute right-[-2vw] top-1/2 -translate-y-[55%] pointer-events-none select-none md:hidden"
        aria-hidden
      >
        <span
          className="font-anton leading-none"
          style={{
            fontSize: 'clamp(18rem, 28vw, 34rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,26,26,0.055)',
            letterSpacing: '-0.04em',
          }}
        >
          AX
        </span>
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 container-max px-6 md:px-8 pt-28 pb-32"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 border border-red-DEFAULT/30 bg-red-DEFAULT/5 backdrop-blur-sm">
            <Zap size={10} fill="#ff1a1a" className="text-red-DEFAULT" />
            <span className="font-epilogue text-[10px] font-semibold tracking-[0.35em] text-red-DEFAULT uppercase">
              Nova Coleção Disponível
            </span>
            <Zap size={10} fill="#ff1a1a" className="text-red-DEFAULT" />
          </div>
        </motion.div>

        {/* Headline — DISCIPLINA */}
        <motion.div variants={item}>
          <span
            className="block font-anton leading-[0.88] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 10.5rem)', textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}
          >
            DISCIPLINA
          </span>
        </motion.div>

        {/* Headline — VIRA (outlined) */}
        <motion.div variants={item}>
          <span
            className="block font-anton leading-[0.88] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10.5rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.22)',
            }}
          >
            VIRA
          </span>
        </motion.div>

        {/* Headline — ESTILO. */}
        <motion.div variants={item} className="mb-10">
          <span
            className="block font-anton leading-[0.88] tracking-[-0.03em] text-red-DEFAULT"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10.5rem)',
              textShadow: '0 0 60px rgba(255,26,26,0.5)',
            }}
          >
            ESTILO.
          </span>
        </motion.div>

        {/* Sub copy */}
        <motion.p
          variants={item}
          className="font-epilogue text-sm md:text-base text-white/50 tracking-[0.12em] uppercase leading-relaxed mb-10 max-w-sm"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.9)' }}
        >
          Roupas fitness streetwear premium.<br />
          Identidade que se impõe.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="#colecao" className="btn-primary inline-flex items-center gap-2">
            VER COLEÇÃO
            <ArrowRight size={16} />
          </Link>
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Vi o site da AESTHIX FIT e quero saber mais.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline backdrop-blur-sm"
          >
            FALAR CONOSCO
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeIn}
          className="flex items-center gap-8 md:gap-12 pt-8 border-t border-white/10"
        >
          {[
            { value: '100%',  label: 'Algodão Premium' },
            { value: 'DROP',  label: 'Exclusivo'       },
            { value: '48H',   label: 'Envio Rápido'    },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="font-anton text-2xl md:text-3xl tracking-widest text-red-DEFAULT"
                style={{ textShadow: '0 0 20px rgba(255,26,26,0.4)' }}
              >
                {stat.value}
              </div>
              <div className="font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-white/30" />
        </motion.div>
        <span className="font-epilogue text-[9px] tracking-[0.35em] text-white/20 uppercase">
          Scroll
        </span>
      </motion.div>

      {/* ── Bottom marquee strip ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 overflow-hidden py-2.5 bg-black/60 backdrop-blur-sm z-10">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...TICKER, ...TICKER].map((word, i) => (
              <span
                key={i}
                className="font-anton text-xs tracking-[0.3em] text-white/20 uppercase mx-8 whitespace-nowrap"
              >
                {word}
                <span className="text-red-DEFAULT mx-4">×</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
