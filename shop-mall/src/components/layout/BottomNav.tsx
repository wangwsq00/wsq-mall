import { Link, useLocation } from 'react-router-dom'
import { Home, Grid3X3, ShoppingCart, User } from 'lucide-react'
import { useCartStore } from '../../store/cart.ts'
import { cn } from '../../lib/utils.ts'

export default function BottomNav() {
  const location = useLocation()
  const totalItems = useCartStore(state => state.totalItems)

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/products', icon: Grid3X3, label: '分类' },
    { path: '/cart', icon: ShoppingCart, label: '购物车', badge: totalItems },
    { path: '/user', icon: User, label: '我的' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path))
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-0.5"
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} className={cn(
                  'transition-colors duration-200',
                  isActive ? 'text-red-500' : 'text-gray-400'
                )} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-[4px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none border border-white">
                    {item.badge! > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                'text-[11px] transition-colors duration-200',
                isActive ? 'text-red-500 font-semibold' : 'text-gray-400'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
