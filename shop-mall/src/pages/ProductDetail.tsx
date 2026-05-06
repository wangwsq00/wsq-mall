import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, RotateCcw, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { products } from '../data/mock.ts'
import { useCartStore } from '../store/cart.ts'
import type { Product } from '../types/index.ts'

function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addToCart = useCartStore(state => state.addToCart)
  const product = products.find((p: Product) => p.id === id)

  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSpec, setSelectedSpec] = useState(0)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-400 text-lg mb-4">商品不存在</p>
        <button
          onClick={() => navigate('/products')}
          className="text-sm text-gray-600 underline hover:text-gray-900"
        >
          返回商品列表
        </button>
      </div>
    )
  }

  const allImages = [product.image, ...product.images]
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  const relatedProducts = products
    .filter((p: Product) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const nextImage = () => setCurrentImage(prev => (prev + 1) % allImages.length)
  const prevImage = () => setCurrentImage(prev => (prev - 1 + allImages.length) % allImages.length)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> 返回
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <img
              src={allImages[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-lg font-medium">
                省 {discount}%
              </span>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={classNames(
                    'w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors',
                    currentImage === i ? 'border-gray-900' : 'border-transparent'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-snug mb-3">
              {product.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-medium text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                已售 {product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万+` : product.sales}
              </span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">&yen;{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">&yen;{product.originalPrice}</span>
              )}
            </div>
            {product.tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 bg-red-50 text-red-600 text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">产品规格</h3>
            <div className="flex flex-wrap gap-2">
              {product.specs.map((spec: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedSpec(i)}
                  className={classNames(
                    'px-4 py-2 text-sm rounded-lg border transition-colors',
                    selectedSpec === i
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  )}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">数量</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                +
              </button>
              <span className="text-sm text-gray-400 ml-2">库存 {product.stock} 件</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                addToCart(product, quantity)
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart size={18} /> 加入购物车
            </button>
            <button className="p-3.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={20} className="text-gray-400" />
              <span className="text-xs text-gray-500">免费配送</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield size={20} className="text-gray-400" />
              <span className="text-xs text-gray-500">正品保障</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw size={20} className="text-gray-400" />
              <span className="text-xs text-gray-500">7天退换</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 lg:mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">相关推荐</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((p: Product) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</h3>
                <p className="text-sm font-bold text-gray-900 mt-1">&yen;{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
