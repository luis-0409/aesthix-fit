'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/cart-store'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered,    setHovered]    = useState(false)
  const [imgError,   setImgError]   = useState(false)
  const [quickAdded, setQuickAdded] = useState(false)
  const { addItem }                 = useCartStore()
  const router                      = useRouter()

  const primaryColor = product.colors[0]
  const primarySize  = product.sizes[0]
  const image1       = product.images[0] || ''

  // Só dispara no desktop (não abre carrinho em touch)
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, primarySize, primaryColor)
    setQuickAdded(true)
    setTimeout(() => setQuickAdded(false), 1800)
  }

  const priceFormatted = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  // ── Coming Soon ───────────────────────────────────────────────
  if (product.coming_soon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="card-dark overflow-hidden opacity-70 cursor-not-allowed select-none">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/50 flex flex-col items-center justify-center gap-3">
              <span className="text-3xl">🔥</span>
              <span className="font-anton text-white text-xl tracking-[0.2em] uppercase">Em Breve</span>
              <span className="font-epilogue text-[10px] text-white/40 tracking-[0.25em] uppercase">Em lançamento</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
              <span className="font-anton text-6xl text-white/5">AF</span>
            </div>
          </div>
          <div className="p-3 md:p-4">
            <h3 className="font-epilogue text-xs md:text-sm font-semibold text-white/40 leading-tight mb-1">
              {product.category}
            </h3>
            <p className="font-epilogue text-[10px] md:text-xs text-white/20 mb-2">Em breve 🔥</p>
            <span className="font-anton text-sm tracking-wide text-white/20">— — —</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-red-DEFAULT/40 to-transparent animate-pulse" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/produto/${product.id}`} className="group block">
        <div
          className="card-dark overflow-hidden glow-card-hover"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* ── Imagem ────────────────────────────────────── */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">

            {product.featured && (
              <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 px-2 py-0.5 bg-red-DEFAULT">
                <span className="font-anton text-[8px] md:text-[9px] tracking-[0.2em] text-white uppercase">
                  Destaque
                </span>
              </div>
            )}

            {!imgError && image1 ? (
              <Image
                src={image1}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  hovered ? 'scale-105' : 'scale-100'
                }`}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950">
                <span className="font-anton text-4xl text-white/10">AF</span>
                <span className="font-epilogue text-[10px] text-white/20 mt-2 tracking-widest uppercase">
                  {product.category || 'Produto'}
                </span>
              </div>
            )}

            {/*
              Overlay de hover — APENAS desktop (pointer-events-none no mobile).
              No touch, mouseenter dispara brevemente e o tap batia no Quick Add.
              Solução: pointer-events-none sempre no mobile via CSS.
            */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-end justify-center pb-4 md:pb-6 gap-2 md:gap-3
                pointer-events-none
                md:transition-opacity md:duration-300
                ${hovered ? 'md:opacity-100 md:pointer-events-auto' : 'md:opacity-0'}`}
            >
              <button
                onClick={handleQuickAdd}
                className="hidden md:flex items-center gap-2 bg-red-DEFAULT px-4 py-2.5 cursor-pointer"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                <ShoppingBag size={14} className="text-white" />
                <span className="font-anton text-[11px] tracking-[0.15em] text-white uppercase">
                  {quickAdded ? 'Adicionado!' : `${primarySize} — Quick Add`}
                </span>
              </button>

              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/produto/${product.id}`) }}
                className="hidden md:flex w-10 h-10 bg-white/10 backdrop-blur-sm items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Eye size={14} className="text-white" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* ── Info ──────────────────────────────────────── */}
          <div className="p-3 md:p-4">
            {/* Color dots */}
            <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  title={color.name}
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="font-epilogue text-[10px] text-white/30 ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-epilogue text-xs md:text-sm font-semibold text-white/90 leading-tight mb-1 line-clamp-2 group-hover:text-white transition-colors">
              {product.name}
            </h3>

            {/* Description — hidden on mobile to economizar espaço */}
            <p className="hidden md:block font-epilogue text-xs text-white/35 leading-relaxed line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Price + sizes */}
            <div className="flex items-center justify-between mt-2 md:mt-0">
              <span className="font-anton text-base md:text-lg tracking-wide text-white">
                {priceFormatted}
              </span>
              <div className="flex items-center gap-0.5 md:gap-1">
                {product.sizes.slice(0, 3).map((size) => (
                  <span
                    key={size}
                    className="font-epilogue text-[8px] md:text-[9px] font-semibold tracking-wider text-white/30 border border-white/10 px-1 md:px-1.5 py-0.5 uppercase"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Linha vermelha hover */}
          <div
            className={`h-px bg-red-DEFAULT origin-left transition-transform duration-300 ${
              hovered ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </div>
      </Link>
    </motion.div>
  )
}
