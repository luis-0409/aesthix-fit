'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag, Ruler, Shirt, CheckCircle } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/cart-store'
import { DEMO_PRODUCTS, BRAND_CONFIG } from '@/lib/config'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Cart from '@/components/Cart'

const SIZE_GUIDE = [
  { size: 'P',  chest: '88–94',   waist: '74–80',  length: '68' },
  { size: 'M',  chest: '95–101',  waist: '81–87',  length: '70' },
  { size: 'G',  chest: '102–108', waist: '88–94',  length: '72' },
  { size: 'GG', chest: '109–116', waist: '95–101', length: '74' },
]

export default function ProductPage() {
  const params      = useParams()
  const router      = useRouter()
  const { addItem } = useCartStore()

  const [product,       setProduct]       = useState<Product | null>(null)
  const [selectedSize,  setSelectedSize]  = useState('')
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity,      setQuantity]      = useState(1)
  const [added,         setAdded]         = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  useEffect(() => {
    const id    = params?.id as string
    const found = DEMO_PRODUCTS.find((p) => p.id === id) as Product | undefined
    if (found) {
      setProduct(found)
      setSelectedSize(found.sizes[0])
    }
  }, [params?.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-anton text-6xl text-white/5 mb-4">404</div>
          <p className="font-epilogue text-sm text-white/30 tracking-widest uppercase mb-6">
            Produto não encontrado
          </p>
          <Link href="/" className="btn-primary">Voltar à Loja</Link>
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

      {/* pb-28 no mobile para não esconder conteúdo atrás do botão sticky */}
      <main className="min-h-screen bg-[#050505] pt-16 pb-28 md:pb-0">
        <div className="container-max px-4 md:px-6 py-6 md:py-10">

          {/* Breadcrumb / Voltar */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6 md:mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-epilogue text-xs tracking-wider uppercase cursor-pointer"
            >
              <ArrowLeft size={14} />
              Voltar
            </button>
            <span className="text-white/15 text-xs">/</span>
            <span className="font-epilogue text-xs text-white/25 uppercase tracking-wider truncate max-w-[160px] md:max-w-none">
              {product.name}
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16">

            {/* ── Imagem ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full overflow-hidden bg-gray-900"
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
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
              {product.featured && (
                <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-red-DEFAULT">
                  <span className="font-anton text-[10px] tracking-[0.2em] text-white uppercase">Destaque</span>
                </div>
              )}
            </motion.div>

            {/* ── Informações ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Categoria */}
              <span className="font-epilogue text-[10px] font-semibold tracking-[0.3em] text-red-DEFAULT uppercase mb-3">
                {product.category || 'AESTHIX FIT'}
              </span>

              {/* Nome */}
              <h1 className="font-anton text-[clamp(2rem,7vw,3.5rem)] leading-none tracking-[-0.01em] text-white uppercase mb-4">
                {product.name}
              </h1>

              {/* Preço */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-anton text-3xl md:text-4xl text-white tracking-wide">
                  {priceFormatted}
                </span>
                <span className="font-epilogue text-xs text-white/25 tracking-wider">à vista no WhatsApp</span>
              </div>

              {/* Descrição */}
              <p className="font-epilogue text-sm text-white/50 leading-relaxed mb-6 max-w-md">
                {product.description}
              </p>

              {/* Cor */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Cor</span>
                    <span className="font-epilogue text-xs text-white/70">{color.name}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(i)}
                        title={c.name}
                        className={`relative w-9 h-9 rounded-full transition-all duration-200 cursor-pointer ${
                          selectedColor === i
                            ? 'ring-2 ring-red-DEFAULT ring-offset-2 ring-offset-[#050505]'
                            : 'ring-1 ring-white/10'
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
              )}

              {/* Tamanho */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Tamanho</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 font-epilogue text-xs text-red-DEFAULT cursor-pointer"
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
                      className={`w-12 h-12 font-epilogue text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer border touch-manipulation ${
                        selectedSize === size
                          ? 'bg-red-DEFAULT border-red-DEFAULT text-white'
                          : 'bg-transparent border-white/15 text-white/50 hover:border-white/40 hover:text-white/90'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Tabela de medidas */}
                <AnimatePresence>
                  {showSizeGuide && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="border border-white/8 overflow-x-auto -mx-4 md:mx-0">
                        <table className="w-full text-left min-w-[280px]">
                          <thead>
                            <tr className="border-b border-white/8">
                              {['Tam', 'Peito (cm)', 'Cintura (cm)', 'Comp. (cm)'].map((h) => (
                                <th key={h} className="px-3 md:px-4 py-2.5 font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {SIZE_GUIDE.map((row) => (
                              <tr key={row.size} className={`border-b border-white/5 ${row.size === selectedSize ? 'bg-red-DEFAULT/5' : ''}`}>
                                <td className={`px-3 md:px-4 py-2.5 font-epilogue text-xs font-bold ${row.size === selectedSize ? 'text-red-DEFAULT' : 'text-white/70'}`}>{row.size}</td>
                                <td className="px-3 md:px-4 py-2.5 font-epilogue text-xs text-white/50">{row.chest}</td>
                                <td className="px-3 md:px-4 py-2.5 font-epilogue text-xs text-white/50">{row.waist}</td>
                                <td className="px-3 md:px-4 py-2.5 font-epilogue text-xs text-white/50">{row.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quantidade — desktop */}
              <div className="hidden md:flex items-center gap-4 mb-6">
                <span className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Quantidade</span>
                <div className="flex items-center border border-white/10">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-epilogue text-lg">–</button>
                  <span className="w-10 text-center font-epilogue font-semibold text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-epilogue text-lg">+</button>
                </div>
              </div>

              {/* Botões — desktop */}
              <div className="hidden md:flex flex-col gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.97 }}
                  disabled={!selectedSize}
                  className="btn-primary w-full text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={16} />
                  {added ? 'Adicionado ao Carrinho ✓' : 'Adicionar ao Carrinho'}
                </motion.button>

                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Olá! Tenho interesse: ${product.name} | Cor: ${color.name} | Tamanho: ${selectedSize}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full text-sm text-center"
                >
                  Perguntar no WhatsApp
                </a>
              </div>

              {/* Detalhes do tecido */}
              {product.fabric_details && product.fabric_details !== 'Em breve' && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Shirt size={14} className="text-red-DEFAULT" />
                    <h3 className="font-epilogue text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                      Detalhes do Tecido
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.fabric_details.split('|').map((detail, i) => (
                      <span key={i} className="font-epilogue text-xs text-white/40 border border-white/8 px-3 py-1.5">
                        {detail.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-4">
                {['100% Algodão premium', 'Entrega em 48h', 'Troca facilitada'].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-red-DEFAULT" />
                    <span className="font-epilogue text-[10px] text-white/30 uppercase tracking-wider">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Barra sticky de compra — só mobile ──────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0a0a0a] border-t border-white/8 px-4 py-3 safe-area-pb">
        {/* Quantidade + tamanho selecionado */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="font-epilogue text-xs text-white/40 uppercase tracking-wider">Qtd</span>
            <div className="flex items-center border border-white/10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-white/50 active:bg-white/10 transition-colors touch-manipulation"
              >–</button>
              <span className="w-8 text-center font-epilogue text-sm font-semibold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 flex items-center justify-center text-white/50 active:bg-white/10 transition-colors touch-manipulation"
              >+</button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-epilogue text-xs text-white/40 uppercase">Tam:</span>
            <span className="font-epilogue text-sm font-bold text-white">{selectedSize}</span>
            <span className="font-anton text-base text-white ml-2">{priceFormatted}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.97 }}
            disabled={!selectedSize}
            className="flex-1 flex items-center justify-center gap-2 bg-red-DEFAULT py-3 font-anton text-sm tracking-[0.15em] text-white uppercase disabled:opacity-40 touch-manipulation"
          >
            <ShoppingBag size={15} />
            {added ? 'Adicionado ✓' : 'Adicionar'}
          </motion.button>

          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `Olá! Tenho interesse: ${product.name} | Cor: ${color.name} | Tamanho: ${selectedSize}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-[#25D366] touch-manipulation"
          >
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
