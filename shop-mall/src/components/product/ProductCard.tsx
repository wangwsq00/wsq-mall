import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '../../types/index.ts'
import { useCartStore } from '../../store/cart.ts'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart)

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-md font-medium">
              -{discount}%
            </span>
          )}
          {product.tags.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {product.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-0.5 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-1.5">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">{product.rating}</span>
          <span className="text-xs text-gray-400">|</span>
          <span className="text-xs text-gray-400">已售 {product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万+` : product.sales}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              &yen;{product.price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              &yen;{product.originalPrice}
            </span>
          </div>

          <button
            onClick={e => {
              e.preventDefault()
              addToCart(product)
            }}
            className="p-2 rounded-full transition-all duration-200 bg-gray-100 hover:bg-gray-900 hover:text-white"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
