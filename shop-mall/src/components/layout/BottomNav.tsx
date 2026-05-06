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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 lg:hidden">
      <div className="flex items-center justify-around h-16 pb-safe">
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              <div className="relative inline-flex">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'text-gray-900' : 'text-gray-400'} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold leading-none">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                'text-[10px] mt-0.5',
                isActive ? 'text-gray-900 font-medium' : 'text-gray-400'
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
