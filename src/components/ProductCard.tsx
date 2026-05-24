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
  const [quickAdded, setQuickAdded] = useState(false)
  // Fallback: images[0] local → images[2] Unsplash; images[1] local → images[3] Unsplash
  const [img1Fail,   setImg1Fail]   = useState(false)
  const [img2Fail,   setImg2Fail]   = useState(false)
  const { addItem }                 = useCartStore()
  const router                      = useRouter()

  const primaryColor = product.colors[0]
  const primarySize  = product.sizes[0]

  // Resolve srcs with automatic fallback
  const src1 = img1Fail
    ? (product.images[2] || '')   // Unsplash fallback
    : (product.images[0] || '')   // local primary

  const src2 = img2Fail
    ? (product.images[3] || src1) // Unsplash fallback or same as primary
    : (product.images[1] || src1) // local secondary

  const imgError = img1Fail && !product.images[2]  // total failure only if no Unsplash
  const image1   = src1
  const image2   = src2

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

  // ── Coming Soon card ──────────────────────────────────────────
  if (product.coming_soon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="card-dark overflow-hidden opacity-70 cursor-not-allowed select-none">
          {/* Image container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
            {/* Blur overlay */}
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/50 flex flex-col items-center justify-center gap-3">
              <span className="text-3xl">🔥</span>
              <span className="font-anton text-white text-xl tracking-[0.2em] uppercase">Em Breve</span>
              <span className="font-epilogue text-[10px] text-white/40 tracking-[0.25em] uppercase">Em lançamento</span>
            </div>
            {/* Blurred background image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
              <span className="font-anton text-6xl text-white/5">AF</span>
            </div>
          </div>
          {/* Info */}
          <div className="p-4">
            <h3 className="font-epilogue text-sm font-semibold text-white/40 leading-tight mb-1">
              {product.category}
            </h3>
            <p className="font-epilogue text-xs text-white/20 leading-relaxed mb-3">
              Em breve 🔥
            </p>
            <div className="flex items-center justify-between">
              <span className="font-anton text-sm tracking-wide text-white/20">
                — — —
              </span>
            </div>
          </div>
          {/* Animated bottom line */}
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
      <Link href={`/produto/${product.id}`} className="group block cursor-pointer">
        <div
          className="card-dark overflow-hidden glow-card-hover"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">

            {/* Featured badge */}
            {product.featured && (
              <div className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-red-DEFAULT">
                <span className="font-anton text-[9px] tracking-[0.2em] text-white uppercase">
                  Destaque
                </span>
              </div>
            )}

            {/* Image */}
            {!imgError && image1 ? (
              <>
                <Image
                  src={image1}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    hovered && image2 !== image1 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                  onError={() => setImg1Fail(true)}
                />
                {image2 && image2 !== image1 && (
                  <Image
                    src={image2}
                    alt={`${product.name} — detalhe`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] absolute inset-0 ${
                      hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                    onError={() => setImg2Fail(true)}
                  />
                )}
              </>
            ) : (
              /* Placeholder */
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950">
                <span className="font-anton text-4xl text-white/10">AF</span>
                <span className="font-epilogue text-[10px] text-white/20 mt-2 tracking-widest uppercase">
                  {product.category || 'Produto'}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 flex items-end justify-center pb-6 gap-3"
            >
              <motion.button
                onClick={handleQuickAdd}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-2 bg-red-DEFAULT px-4 py-2.5 cursor-pointer"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                <ShoppingBag size={14} className="text-white" />
                <span className="font-anton text-[11px] tracking-[0.15em] text-white uppercase">
                  {quickAdded ? 'Adicionado!' : `${primarySize} — Quick Add`}
                </span>
              </motion.button>

              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/produto/${product.id}`) }}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Eye size={14} className="text-white" />
              </button>
            </motion.div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Info */}
          <div className="p-4">
            {/* Color dots */}
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  title={color.name}
                  className="w-3 h-3 rounded-full border border-white/10"
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
            <h3 className="font-epilogue text-sm font-semibold text-white/90 leading-tight mb-1 line-clamp-2 group-hover:text-white transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="font-epilogue text-xs text-white/35 leading-relaxed line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Price row */}
            <div className="flex items-center justify-between">
              <span className="font-anton text-lg tracking-wide text-white">
                {priceFormatted}
              </span>
              {/* Size pills */}
              <div className="flex items-center gap-1">
                {product.sizes.slice(0, 3).map((size) => (
                  <span
                    key={size}
                    className="font-epilogue text-[9px] font-semibold tracking-wider text-white/30 border border-white/10 px-1.5 py-0.5 uppercase"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-px bg-red-DEFAULT origin-left"
          />
        </div>
      </Link>
    </motion.div>
  )
}
