import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/cart.ts'
import type { CartItem } from '../types/index.ts'

export default function CartPage() {
  const items = useCartStore(state => state.items)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const clearCart = useCartStore(state => state.clearCart)
  const totalPrice = useCartStore(state => state.totalPrice)

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center bg-gray-50 min-h-screen rounded-t-3xl">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">购物车是空的</h2>
        <p className="text-gray-500 mb-8">快去挑选心仪的商品吧</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          去逛逛 <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 bg-gray-50 min-h-screen rounded-t-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          购物车
          <span className="ml-2 text-base font-normal text-gray-400">({items.length}件)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          清空购物车
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100"
          >
            <Link to={`/product/${item.id}`} className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link to={`/product/${item.id}`}>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
              </Link>

              <div className="mt-auto pt-3 flex items-end justify-between">
                <span className="text-lg font-bold text-gray-900">
                  &yen;{item.price}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm text-gray-500">
            <span>商品合计</span>
            <span>&yen;{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>运费</span>
            <span className="text-green-600">免费</span>
          </div>
          <div className="pt-3 border-t border-gray-200 flex justify-between">
            <span className="font-medium text-gray-900">应付总额</span>
            <span className="text-2xl font-bold text-gray-900">&yen;{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
          结算 ({items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}件)
        </button>
      </div>
    </div>
  )
}
