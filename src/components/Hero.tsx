'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown, Zap } from 'lucide-react'

const PHRASES = [
  'DISCIPLINA',
  'FOCO',
  'EVOLUÇÃO',
  'ESTILO',
  'PERFORMANCE',
  'IDENTIDADE',
]

const MotionWords = ['DISCIPLINA', 'VIRA', 'ESTILO.']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.5], [0, 80])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,26,26,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,26,26,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Red radial glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255,26,26,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Red radial glow — bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(255,26,26,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Vertical red line — left */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 md:left-16 top-0 bottom-0 w-px origin-top"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,26,26,0.5), transparent)' }}
      />
      {/* Vertical red line — right */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-8 md:right-16 top-0 bottom-0 w-px origin-bottom"
        style={{ background: 'linear-gradient(to top, transparent, rgba(255,26,26,0.3), transparent)' }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 border border-red-DEFAULT/30 bg-red-DEFAULT/5"
        >
          <Zap size={10} fill="#ff1a1a" className="text-red-DEFAULT" />
          <span className="font-epilogue text-[10px] font-semibold tracking-[0.3em] text-red-DEFAULT uppercase">
            Nova Coleção Disponível
          </span>
          <Zap size={10} fill="#ff1a1a" className="text-red-DEFAULT" />
        </motion.div>

        {/* Main headline — word by word */}
        <div className="mb-4">
          {MotionWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60, skewX: -5 }}
              animate={{ opacity: 1, y: 0, skewX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-4 md:mr-6 font-anton text-[clamp(4rem,12vw,10rem)] leading-[0.88] tracking-[-0.02em] text-white"
              style={
                word === 'VIRA'
                  ? {
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                    }
                  : {}
              }
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Sub headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10"
        >
          {['NÃO É SÓ ROUPA.', 'É IDENTIDADE.', 'A NOVA ERA CHEGOU.'].map(
            (phrase, i) => (
              <span
                key={phrase}
                className="font-epilogue text-sm md:text-base font-medium tracking-[0.15em] uppercase"
                style={{
                  color: i === 0 ? 'rgba(255,255,255,0.7)' :
                         i === 1 ? 'rgba(255,26,26,0.9)'   :
                                   'rgba(255,255,255,0.4)',
                }}
              >
                {phrase}
              </span>
            )
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="#colecao" className="btn-primary">
            VER COLEÇÃO
          </Link>
          <a
            href={`https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Vi o site da AESTHIX FIT e quero saber mais.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            FALAR CONOSCO
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex items-center gap-10 mt-16 pt-10 border-t border-white/5"
        >
          {[
            { value: '100%',  label: 'Algodão Premium' },
            { value: 'DROP',  label: 'Exclusivo' },
            { value: '48H',   label: 'Envio Rápido' },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="font-anton text-2xl md:text-3xl tracking-widest text-red-DEFAULT">
                {stat.value}
              </div>
              <div className="font-epilogue text-[10px] tracking-[0.2em] text-white/30 uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-white/30" />
        </motion.div>
        <span className="font-epilogue text-[9px] tracking-[0.3em] text-white/20 uppercase">
          Scroll
        </span>
      </motion.div>

      {/* Bottom marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 overflow-hidden py-2 bg-red-DEFAULT/5">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...PHRASES, ...PHRASES].map((phrase, i) => (
              <span
                key={i}
                className="font-anton text-xs tracking-[0.3em] text-white/20 uppercase mx-8 whitespace-nowrap"
              >
                {phrase}
                <span className="text-red-DEFAULT mx-4">×</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
