'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

export default function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    generateWhatsAppUrl,
    clearCart,
  } = useCartStore()

  const count = totalItems()
  const total = totalPrice()

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleWhatsApp = () => {
    window.open(generateWhatsAppUrl(), '_blank')
  }

  const priceFormatted = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: '#0a0a0a', borderLeft: '1px solid rgba(255,26,26,0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-red-DEFAULT" />
                <h2 className="font-anton text-lg tracking-[0.1em] text-white uppercase">
                  Carrinho
                </h2>
                {count > 0 && (
                  <span className="bg-red-DEFAULT text-white font-epilogue text-xs font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-red-DEFAULT/50 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <ShoppingBag size={40} className="text-white/10 mb-4" />
                    <p className="font-epilogue text-sm text-white/30 tracking-wider uppercase">
                      Carrinho vazio
                    </p>
                    <p className="font-epilogue text-xs text-white/20 mt-2">
                      Adicione produtos para continuar
                    </p>
                    <button
                      onClick={closeCart}
                      className="mt-6 text-red-DEFAULT font-epilogue text-xs font-semibold tracking-[0.15em] uppercase hover:text-red-bright transition-colors cursor-pointer"
                    >
                      Ver Coleção →
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 hover:border-red-DEFAULT/20 transition-colors"
                    >
                      {/* Thumb */}
                      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-gray-900">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-anton text-xl text-white/10">AF</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-epilogue text-sm font-semibold text-white/90 leading-tight mb-1 truncate">
                          {item.product.name}
                        </h4>

                        {/* Variants */}
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span className="font-epilogue text-[10px] text-white/40 uppercase">
                            {item.color.name}
                          </span>
                          <span className="text-white/20">·</span>
                          <span className="font-epilogue text-[10px] font-semibold tracking-wider text-white/40 border border-white/10 px-1.5 py-0.5 uppercase">
                            {item.size}
                          </span>
                        </div>

                        {/* Qty + price row */}
                        <div className="flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                              aria-label="Diminuir"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-7 text-center font-epilogue text-xs font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                              aria-label="Aumentar"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-epilogue text-sm font-bold text-white">
                              {priceFormatted(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              className="w-7 h-7 flex items-center justify-center text-white/20 hover:text-red-DEFAULT transition-colors cursor-pointer"
                              aria-label="Remover"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer — subtotal + CTA */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/5">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-epilogue text-sm text-white/50 tracking-wider uppercase">
                    Subtotal
                  </span>
                  <span className="font-epilogue text-sm font-bold text-white">
                    {priceFormatted(total)}
                  </span>
                </div>
                <p className="font-epilogue text-[10px] text-white/25 mb-6 tracking-wider">
                  Frete calculado no WhatsApp
                </p>

                {/* WhatsApp CTA */}
                <motion.button
                  onClick={handleWhatsApp}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#20bd5a] transition-colors font-anton tracking-[0.15em] text-white uppercase text-sm cursor-pointer"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Finalizar no WhatsApp
                </motion.button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-center font-epilogue text-[10px] text-white/20 hover:text-white/50 transition-colors cursor-pointer tracking-widest uppercase py-2"
                >
                  Limpar carrinho
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
