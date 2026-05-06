import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Shirt, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.tsx'
import { categories, products } from '../data/mock.ts'
import type { Category, Product } from '../types/index.ts'

const categoryIcons: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  shirt: Shirt,
  home: Smartphone,
  sparkles: Smartphone,
  apple: Smartphone,
  dumbbell: Smartphone,
}

export default function Home() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] sm:h-[75vh] lg:h-[80vh] overflow-hidden bg-gray-900">
        <img
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury+shopping+experience+modern+minimal+store+interior+soft+ambient+lighting+premium+products+display+elegant+atmosphere+wide+angle+cinematic&image_size=landscape_16_9"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative h-full flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm sm:text-base text-gray-300 font-medium tracking-wider uppercase mb-4"
              >
                2024 春夏新品
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
              >
                品质生活<br />从这里开始
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-lg text-gray-300 mb-8 max-w-md"
              >
                精选全球好物，为你的每一天带来美好体验。
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  立即选购 <ArrowRight size={18} />
                </Link>
                <Link
                  to="/products?category=electronics"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  数码专区
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">热门分类</h2>
            <p className="text-gray-500">发现你需要的每一件好物</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 lg:gap-6">
            {categories.map((cat: Category, i: number) => {
              const Icon = categoryIcons[cat.icon] || Smartphone
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="group flex flex-col items-center gap-3 p-4 lg:p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">精选推荐</h2>
              <p className="text-gray-500">为你挑选的优质好物</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              查看全部 <ChevronRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product: Product, i: number) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
            >
              查看全部商品 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium+shopping+bag+lifestyle+flat+lay+minimal+composition+soft+natural+light+neutral+tones+elegant+products+arrangement&image_size=landscape_16_9"
              alt="CTA"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-md px-8 sm:px-12 lg:px-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  新用户专享优惠
                </h3>
                <p className="text-gray-300 mb-6">
                  注册即享首单 9 折，更有新人专属礼包等你来领。
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  立即注册 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
