'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const WORDS = ['DISCIPLINA', '•', 'FOCO', '•', 'EVOLUÇÃO']

const MANIFESTO_LINES = [
  { text: 'A academia não é um lugar.', accent: false },
  { text: 'É um estado de espírito.',   accent: false },
  { text: 'Você não veste roupa.',       accent: false },
  { text: 'Você veste identidade.',      accent: true  },
]

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Big bg text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-anton text-[clamp(8rem,20vw,20rem)] tracking-tighter leading-none text-white whitespace-nowrap"
          style={{ opacity: 0.015 }}
        >
          AESTHIX
        </span>
      </div>

      {/* Scrolling word strips */}
      <div className="relative mb-16 overflow-hidden">
        <motion.div style={{ x: x1 }} className="flex gap-12 whitespace-nowrap">
          {[...WORDS, ...WORDS, ...WORDS].map((word, i) => (
            <span
              key={i}
              className={`font-anton text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-[-0.01em] uppercase ${
                word === '•' ? 'text-red-DEFAULT' : 'text-white/10'
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Manifesto text */}
      <div className="container-max px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {MANIFESTO_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-anton text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.01em] uppercase ${
                line.accent ? 'text-red-DEFAULT glow-red-text' : 'text-white/80'
              } ${i < MANIFESTO_LINES.length - 1 ? 'mb-2' : ''}`}
            >
              {line.text}
            </motion.div>
          ))}

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px mt-10 mb-8 origin-left"
            style={{ background: 'linear-gradient(90deg, #ff1a1a, transparent)' }}
          />

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-epilogue text-sm md:text-base text-white/35 leading-relaxed max-w-lg"
          >
            Cada peça da AESTHIX FIT foi criada para os que levam a evolução a sério.
            Do treino às ruas. Do espelho às redes. A identidade não tem horário.
          </motion.p>
        </div>
      </div>

      {/* Second scrolling strip */}
      <div className="relative mt-16 overflow-hidden">
        <motion.div style={{ x: x2 }} className="flex gap-12 whitespace-nowrap">
          {[...WORDS, ...WORDS, ...WORDS].map((word, i) => (
            <span
              key={i}
              className={`font-anton text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-[-0.01em] uppercase ${
                word === '•' ? 'text-red-DEFAULT' : 'text-white/5'
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
