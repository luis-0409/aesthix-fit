'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { BRAND_CONFIG } from '@/lib/config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,26,26,0.04) 0%, transparent 100%)',
        }}
      />

      <div className="container-max px-4 md:px-6 pt-16 pb-10">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/5">

          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-anton text-3xl tracking-[0.2em] text-white mb-4">
              AESTHIX FIT
            </h2>
            <p className="text-white/40 font-epilogue text-sm leading-relaxed max-w-xs">
              Não é só roupa. É identidade. Feita para quem não separa treino de estilo.
            </p>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-white/50 hover:text-white transition-colors font-epilogue text-sm"
            >
              <Instagram size={16} className="text-red-DEFAULT" />
              {BRAND_CONFIG.instagram}
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-anton text-sm tracking-[0.2em] text-white/40 mb-6 uppercase">
              Navegação
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Coleção', href: '#colecao' },
                { label: 'Best Sellers', href: '#best-sellers' },
                { label: 'Drop em Breve', href: '#drop' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white font-epilogue text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-red-DEFAULT/50 group-hover:w-6 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-anton text-sm tracking-[0.2em] text-white/40 mb-6 uppercase">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white font-epilogue text-sm transition-colors flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-[#25D366]/50 group-hover:w-6 transition-all duration-300" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white font-epilogue text-sm transition-colors flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-pink-500/50 group-hover:w-6 transition-all duration-300" />
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-white/20 hover:text-white/50 font-epilogue text-xs transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-epilogue text-xs text-white/20 tracking-widest uppercase">
            © {year} AESTHIX FIT. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-DEFAULT animate-pulse" />
            <span className="font-epilogue text-xs text-white/20 tracking-widest uppercase">
              Disciplina • Foco • Evolução
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
