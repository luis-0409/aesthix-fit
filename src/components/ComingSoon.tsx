'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Zap } from 'lucide-react'
import { BRAND_CONFIG } from '@/lib/config'

// Drop date — altere conforme necessário
const DROP_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias a partir de agora

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(DROP_DATE)
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  const units = [
    { value: days,    label: 'Dias'     },
    { value: hours,   label: 'Horas'    },
    { value: minutes, label: 'Minutos'  },
    { value: seconds, label: 'Segundos' },
  ]

  return (
    <section
      id="drop"
      className="relative py-24 md:py-36 px-4 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none diagonal-lines"
        style={{ opacity: 0.5 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,26,26,0.07) 0%, transparent 100%)',
        }}
      />

      {/* Red top/bottom lines */}
      <div className="red-line absolute top-0 left-0 right-0" />
      <div className="red-line absolute bottom-0 left-0 right-0" />

      <div className="container-max relative text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 border border-red-DEFAULT/40 bg-red-DEFAULT/5 px-4 py-2 mb-8"
        >
          <Lock size={11} className="text-red-DEFAULT" />
          <span className="font-epilogue text-[10px] font-semibold tracking-[0.35em] text-red-DEFAULT uppercase">
            Drop Exclusivo
          </span>
          <Lock size={11} className="text-red-DEFAULT" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-anton text-[clamp(3rem,9vw,8rem)] tracking-[-0.02em] text-white leading-none mb-4"
        >
          DROP EM BREVE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-epilogue text-sm md:text-base text-white/40 tracking-wider uppercase mb-14 max-w-md mx-auto"
        >
          A próxima coleção está chegando. <br />
          Seja o primeiro a saber.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 md:gap-8 mb-16"
        >
          {units.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-4 md:gap-8">
              <div className="text-center">
                <motion.div
                  key={value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-anton text-5xl md:text-7xl tracking-widest leading-none"
                  style={{ color: label === 'Segundos' ? '#ff1a1a' : 'white' }}
                >
                  {String(value).padStart(2, '0')}
                </motion.div>
                <div className="font-epilogue text-[9px] md:text-[10px] tracking-[0.25em] text-white/25 mt-2 uppercase">
                  {label}
                </div>
              </div>
              {i < units.length - 1 && (
                <span className="font-anton text-3xl text-white/10 -mt-3">:</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-sm mx-auto"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-4"
            >
              <Zap size={16} fill="#ff1a1a" className="text-red-DEFAULT" />
              <span className="font-epilogue text-sm text-white/70 tracking-wider uppercase">
                Você está na lista!
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="input-dark flex-1 text-sm"
                style={{ borderRight: 'none' }}
              />
              <button
                type="submit"
                className="btn-primary px-5 text-xs"
                style={{ clipPath: 'none' }}
              >
                Avisar
              </button>
            </form>
          )}
          <p className="font-epilogue text-[10px] text-white/20 mt-3 tracking-wider">
            Sem spam. Só drops.
          </p>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent('Quero ser avisado sobre o próximo drop da AESTHIX FIT!')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-[#25D366] font-epilogue text-xs font-semibold tracking-[0.2em] uppercase hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Receber aviso no WhatsApp
        </motion.a>
      </div>
    </section>
  )
}
