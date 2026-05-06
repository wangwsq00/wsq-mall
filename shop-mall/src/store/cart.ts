import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1) => {
    const items = [...get().items]
    const existing = items.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.push({ ...product, quantity })
    }
    set({ items })
  },
  removeFromCart: (productId) => {
    set({ items: get().items.filter(item => item.id !== productId) })
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }
    set({
      items: get().items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })
  },
  clearCart: () => set({ items: [] }),
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
  get totalPrice() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
}))
