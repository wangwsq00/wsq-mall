import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from 'lucide-react'
import { useCartStore } from '../../store/cart.ts'
import { categories } from '../../data/mock.ts'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const totalItems = useCartStore(state => state.totalItems)
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
              尚品
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              首页
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                分类 <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 min-w-[200px]">
                  {categories.map((cat: { id: string; name: string }) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              全部商品
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索商品"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 h-9 pl-9 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </form>

            <button
              className="sm:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/user" className="p-2 hover:bg-gray-100 rounded-full">
                <User size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden border-t border-gray-100 overflow-hidden"
          >
            <form onSubmit={handleSearch} className="px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索商品"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-100 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              <Link
                to="/"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                首页
              </Link>
              {categories.map((cat: { id: string; name: string }) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="block px-3 py-3 text-base text-gray-600 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/products"
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                全部商品
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
