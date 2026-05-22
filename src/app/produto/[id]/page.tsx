'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ShoppingBag,
  ChevronRight,
  Ruler,
  Shirt,
  CheckCircle,
} from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/cart-store'
import { DEMO_PRODUCTS, BRAND_CONFIG } from '@/lib/config'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Cart from '@/components/Cart'

// Size guide table data
const SIZE_GUIDE = [
  { size: 'P',  chest: '88–94',  waist: '74–80',  length: '68' },
  { size: 'M',  chest: '95–101', waist: '81–87',  length: '70' },
  { size: 'G',  chest: '102–108',waist: '88–94',  length: '72' },
  { size: 'GG', chest: '109–116',waist: '95–101', length: '74' },
]

export default function ProductPage() {
  const params   = useParams()
  const router   = useRouter()
  const { addItem } = useCartStore()

  const [product,        setProduct]        = useState<Product | null>(null)
  const [activeImage,    setActiveImage]    = useState(0)
  const [selectedSize,   setSelectedSize]   = useState('')
  const [selectedColor,  setSelectedColor]  = useState(0)
  const [quantity,       setQuantity]       = useState(1)
  const [added,          setAdded]          = useState(false)
  const [showSizeGuide,  setShowSizeGuide]  = useState(false)

  useEffect(() => {
    const id   = params?.id as string
    const found = DEMO_PRODUCTS.find((p) => p.id === id) as Product | undefined
    if (found) {
      setProduct(found)
      setSelectedSize(found.sizes[0])
    }
  }, [params?.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="font-anton text-6xl text-white/5 mb-4">404</div>
          <p className="font-epilogue text-sm text-white/30 tracking-widest uppercase mb-6">
            Produto não encontrado
          </p>
          <Link href="/" className="btn-primary">
            Voltar à Loja
          </Link>
        </div>
      </div>
    )
  }

  const color = product.colors[selectedColor]

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize, color, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const priceFormatted = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <>
      <Navbar />
      <Cart />
      <WhatsAppButton />

      <main className="min-h-screen bg-[#050505] pt-16">
        <div className="container-max px-4 md:px-6 py-10">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-epilogue text-xs tracking-wider uppercase cursor-pointer"
            >
              <ArrowLeft size={13} />
              Voltar
            </button>
            <ChevronRight size={10} className="text-white/20" />
            <span className="font-epilogue text-xs text-white/20 uppercase tracking-wider">
              {product.category || 'Produto'}
            </span>
            <ChevronRight size={10} className="text-white/20" />
            <span className="font-epilogue text-xs text-white/40 uppercase tracking-wider truncate max-w-[120px] md:max-w-none">
              {product.name}
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">

            {/* ── Left: Gallery ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3"
            >
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-2 w-16">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-20 overflow-hidden border transition-all duration-200 cursor-pointer ${
                        activeImage === i
                          ? 'border-red-DEFAULT'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-gray-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {product.images[activeImage] ? (
                      <Image
                        src={product.images[activeImage]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
                        <span className="font-anton text-6xl text-white/10">AF</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-DEFAULT">
                    <span className="font-anton text-[10px] tracking-[0.2em] text-white uppercase">
                      Destaque
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Right: Info ─────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Category */}
              <span className="font-epilogue text-[10px] font-semibold tracking-[0.3em] text-red-DEFAULT uppercase mb-4">
                {product.category || 'AESTHIX FIT'}
              </span>

              {/* Name */}
              <h1 className="font-anton text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[-0.01em] text-white uppercase mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-anton text-3xl md:text-4xl text-white tracking-wide">
                  {priceFormatted}
                </span>
                <span className="font-epilogue text-xs text-white/25 tracking-wider">
                  à vista no WhatsApp
                </span>
              </div>

              {/* Description */}
              <p className="font-epilogue text-sm text-white/50 leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              {/* Color selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                    Cor
                  </span>
                  <span className="font-epilogue text-xs text-white/70">
                    {color.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      title={c.name}
                      className={`relative w-8 h-8 rounded-full transition-all duration-200 cursor-pointer ${
                        selectedColor === i
                          ? 'ring-2 ring-red-DEFAULT ring-offset-2 ring-offset-[#050505]'
                          : 'ring-1 ring-white/10 hover:ring-white/30'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor === i && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle
                            size={14}
                            className={c.hex === '#f5f5f5' || c.hex === '#ffffff' ? 'text-black' : 'text-white'}
                            strokeWidth={2.5}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                    Tamanho
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 font-epilogue text-xs text-red-DEFAULT hover:text-red-bright transition-colors cursor-pointer"
                  >
                    <Ruler size={11} />
                    Guia de medidas
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 font-epilogue text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer border ${
                        selectedSize === size
                          ? 'bg-red-DEFAULT border-red-DEFAULT text-white'
                          : 'bg-transparent border-white/15 text-white/50 hover:border-white/40 hover:text-white/90'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size guide table */}
                <AnimatePresence>
                  {showSizeGuide && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="border border-white/8 overflow-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/8">
                              <th className="px-4 py-2.5 font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase">Tam</th>
                              <th className="px-4 py-2.5 font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase">Peito (cm)</th>
                              <th className="px-4 py-2.5 font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase">Cintura (cm)</th>
                              <th className="px-4 py-2.5 font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase">Comp. (cm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SIZE_GUIDE.map((row, i) => (
                              <tr
                                key={row.size}
                                className={`border-b border-white/5 ${
                                  row.size === selectedSize ? 'bg-red-DEFAULT/5' : ''
                                }`}
                              >
                                <td className={`px-4 py-2.5 font-epilogue text-xs font-bold ${row.size === selectedSize ? 'text-red-DEFAULT' : 'text-white/70'}`}>{row.size}</td>
                                <td className="px-4 py-2.5 font-epilogue text-xs text-white/50">{row.chest}</td>
                                <td className="px-4 py-2.5 font-epilogue text-xs text-white/50">{row.waist}</td>
                                <td className="px-4 py-2.5 font-epilogue text-xs text-white/50">{row.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                  Quantidade
                </span>
                <div className="flex items-center border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-epilogue text-lg"
                  >
                    –
                  </button>
                  <span className="w-10 text-center font-epilogue font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-epilogue text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                disabled={!selectedSize}
                className="btn-primary w-full text-sm mb-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} />
                {added ? 'Adicionado ao Carrinho ✓' : 'Adicionar ao Carrinho'}
              </motion.button>

              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Olá! Tenho interesse no produto: ${product.name} | Cor: ${color.name} | Tamanho: ${selectedSize}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full text-sm"
              >
                Perguntar no WhatsApp
              </a>

              {/* Fabric details */}
              {product.fabric_details && (
                <div className="mt-10 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Shirt size={14} className="text-red-DEFAULT" />
                    <h3 className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                      Detalhes do Tecido
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.fabric_details.split('|').map((detail, i) => (
                      <span
                        key={i}
                        className="font-epilogue text-xs text-white/40 border border-white/8 px-3 py-1.5"
                      >
                        {detail.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  '100% Algodão premium',
                  'Entrega em 48h',
                  'Troca facilitada',
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-red-DEFAULT" />
                    <span className="font-epilogue text-[10px] text-white/30 uppercase tracking-wider">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
