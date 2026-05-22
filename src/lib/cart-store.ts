import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductColor } from '@/types'
import { BRAND_CONFIG } from './config'

interface CartStore {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem:        (product: Product, size: string, color: ProductColor, quantity?: number) => void
  removeItem:     (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart:      () => void
  openCart:       () => void
  closeCart:      () => void
  toggleCart:     () => void

  // Computed
  totalItems:   () => number
  totalPrice:   () => number
  generateWhatsAppUrl: () => string
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      addItem: (product, size, color, quantity = 1) => {
        const cartItemId = `${product.id}-${size}-${color.name}`
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { product, size, color, quantity, cartItemId }],
          }
        })
        // Auto-open cart on add
        set({ isOpen: true })
      },

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        })),

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart:   () => set({ items: [] }),
      openCart:    () => set({ isOpen: true }),
      closeCart:   () => set({ isOpen: false }),
      toggleCart:  () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),

      generateWhatsAppUrl: () => {
        const { items } = get()
        const total = get().totalPrice()

        const lines = items
          .map(
            (i) =>
              `• ${i.product.name} | ${i.color.name} | ${i.size} | QTD ${i.quantity}`
          )
          .join('\n')

        const totalFormatted = total.toLocaleString('pt-BR', {
          style:    'currency',
          currency: 'BRL',
        })

        const message = [
          BRAND_CONFIG.whatsappIntro,
          '',
          lines,
          '',
          `Total: ${totalFormatted}`,
        ].join('\n')

        const encoded = encodeURIComponent(message)
        return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`
      },
    }),
    {
      name: 'aesthix-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
