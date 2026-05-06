export interface Category {
  id: string
  name: string
  icon: string
  image: string
}

export interface Product {
  id: string
  name: string
  title: string
  price: number
  originalPrice: number
  image: string
  images: string[]
  category: string
  description: string
  specs: string[]
  rating: number
  sales: number
  stock: number
  tags: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  avatar: string
  phone: string
  email: string
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: { name: string; image: string; quantity: number; price: number }[]
}
