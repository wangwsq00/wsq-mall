import { useState } from 'react'
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { user, orders } from '../data/mock.ts'
import type { Order } from '../types/index.ts'

type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: '待发货', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  shipped: { label: '运输中', icon: Truck, color: 'text-blue-600 bg-blue-50' },
  delivered: { label: '已签收', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  cancelled: { label: '已取消', icon: XCircle, color: 'text-gray-500 bg-gray-100' },
}

type TabType = 'orders' | 'profile'

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<TabType>('orders')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">手机号: {user.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          <p className="text-xs text-gray-500 mt-1">全部订单</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter(o => o.status === 'pending' || o.status === 'shipped').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">进行中</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">已完成</p>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={classNames(
            'flex-1 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          )}
        >
          我的订单
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={classNames(
            'flex-1 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'profile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          )}
        >
          个人信息
        </button>
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {orders.map((order: Order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">订单号: {order.id}</span>
                  </div>
                  <div className={classNames('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', status.color)}>
                    <StatusIcon size={12} />
                    {status.label}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex gap-3 mb-4">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{order.date}</span>
                    <span className="text-sm font-medium text-gray-900">
                      共 {order.items.length} 件 &yen;{order.total}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-400" />
                <span className="text-sm text-gray-900">用户名</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{user.name}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-gray-400" />
                <span className="text-sm text-gray-900">收货地址</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Package size={20} className="text-gray-400" />
                <span className="text-sm text-gray-900">发票管理</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-gray-400" />
                <span className="text-sm text-gray-900">账户设置</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-white rounded-xl border border-gray-100 hover:bg-red-50 transition-colors mt-4">
            <LogOut size={18} />
            <span className="text-sm font-medium">退出登录</span>
          </button>
        </div>
      )}
    </div>
  )
}
