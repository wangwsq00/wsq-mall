import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.tsx'
import { products, categories } from '../data/mock.ts'
import type { Category } from '../types/index.ts'

const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'sales', label: '销量优先' },
  { value: 'rating', label: '评分优先' },
]

function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const categoryFilter = searchParams.get('category') || ''
  const searchQuery = searchParams.get('search') || ''
  const sortValue = searchParams.get('sort') || 'default'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const ITEMS_PER_PAGE = 8

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t: string) => t.toLowerCase().includes(query))
      )
    }

    switch (sortValue) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'sales':
        result.sort((a, b) => b.sales - a.sales)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [categoryFilter, searchQuery, sortValue])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const currentCategory = categories.find(c => c.id === categoryFilter)

  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  const hasFilters = categoryFilter || searchQuery || sortValue !== 'default'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 bg-gray-50 min-h-screen rounded-t-3xl">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {searchQuery
            ? `搜索 "${searchQuery}"`
            : currentCategory
            ? currentCategory.name
            : '全部商品'}
        </h1>
        <p className="text-sm text-gray-500">
          共 {filteredProducts.length} 件商品
          {hasFilters && (
            <button onClick={clearFilters} className="ml-2 text-gray-400 hover:text-gray-600 underline">
              清除筛选
            </button>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal size={16} /> 筛选
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {sortOptions.find(s => s.value === sortValue)?.label || '默认排序'}
              <ChevronDown size={14} />
            </button>

            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px] z-20">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        updateParams({ sort: opt.value, page: '1' })
                        setSortOpen(false)
                      }}
                      className={classNames(
                        'w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors',
                        sortValue === opt.value ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-600'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {hasFilters && (
          <div className="hidden sm:flex items-center gap-2">
            {categoryFilter && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                {currentCategory?.name}
                <button onClick={() => updateParams({ category: null, page: '1' })}>
                  <X size={12} />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                搜索: {searchQuery}
                <button onClick={() => updateParams({ search: null, page: '1' })}>
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {filterOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mb-6 overflow-hidden"
        >
          <div className="bg-gray-50 rounded-2xl p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">分类筛选</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  updateParams({ category: '', page: '1' })
                  setFilterOpen(false)
                }}
                className={classNames(
                  'px-4 py-2 rounded-full text-sm transition-colors',
                  !categoryFilter
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
              >
                全部
              </button>
              {categories.map((cat: Category) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    updateParams({ category: cat.id, page: '1' })
                    setFilterOpen(false)
                  }}
                  className={classNames(
                    'px-4 py-2 rounded-full text-sm transition-colors',
                    categoryFilter === cat.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {paginatedProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-lg mb-4">没有找到相关商品</p>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 underline hover:text-gray-900"
          >
            清除筛选条件
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => updateParams({ page: String(Math.max(1, page - 1)) })}
            disabled={page <= 1}
            className="px-4 py-2 text-sm rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            上一页
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => updateParams({ page: String(p) })}
              className={classNames(
                'w-10 h-10 text-sm rounded-lg transition-colors',
                page === p
                  ? 'bg-gray-900 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              )}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => updateParams({ page: String(Math.min(totalPages, page + 1)) })}
            disabled={page >= totalPages}
            className="px-4 py-2 text-sm rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  )
}
