import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">尚品</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              品质生活，从这里开始。<br />
              精选好物，用心服务。
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">购物指南</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">全部商品</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">新品上市</a></li>
              <li><a href="#" className="hover:text-white transition-colors">限时优惠</a></li>
              <li><a href="#" className="hover:text-white transition-colors">品牌专区</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">售后服务</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">退换货政策</a></li>
              <li><a href="#" className="hover:text-white transition-colors">配送说明</a></li>
              <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
              <li><a href="#" className="hover:text-white transition-colors">联系客服</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">联系我们</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gray-500" />
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gray-500" />
                <span>service@shopmall.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-500" />
                <span>上海市浦东新区</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2024 尚品商城. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">用户协议</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">京ICP备XXXXXXXX号</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
