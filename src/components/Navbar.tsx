'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { BRAND_CONFIG } from '@/lib/config'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const { totalItems, openCart }      = useCartStore()
  const count                         = totalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Coleção',     href: '#colecao' },
    { label: 'Best Sellers', href: '#best-sellers' },
    { label: 'Drop',        href: '#drop' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,  opacity: 1  }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-max flex items-center justify-between h-16 px-4 md:px-6">

          {/* Left — Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/60 hover:text-white transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center — Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-anton text-xl tracking-[0.25em] text-white hover:text-red-DEFAULT transition-colors"
          >
            AESTHIX FIT
          </Link>

          {/* Right — Icons */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex text-white/50 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-DEFAULT rounded-full text-[10px] font-bold text-white flex items-center justify-center font-epilogue"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="flex flex-col py-6 px-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-anton text-2xl tracking-[0.15em] text-white/80 hover:text-red-DEFAULT transition-colors uppercase border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 pt-4 text-white/50 hover:text-white transition-colors font-epilogue text-sm"
              >
                <Instagram size={16} />
                {BRAND_CONFIG.instagram}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
