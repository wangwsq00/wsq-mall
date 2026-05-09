import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const calcTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
})

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: (product, quantity = 1) => {
    const items = [...get().items]
    const existing = items.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.push({ ...product, quantity })
    }
    set({ items, ...calcTotals(items) })
  },
  removeFromCart: (productId) => {
    const items = get().items.filter(item => item.id !== productId)
    set({ items, ...calcTotals(items) })
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }
    const items = get().items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
    set({ items, ...calcTotals(items) })
  },
  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}))
