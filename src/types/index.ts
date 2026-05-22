export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  sizes: string[]
  colors: ProductColor[]
  featured: boolean
  category?: string
  fabric_details?: string
  created_at: string
}

export interface ProductColor {
  name: string
  hex: string
}

export interface CartItem {
  product: Product
  size: string
  color: ProductColor
  quantity: number
  cartItemId: string
}

export interface AdminUser {
  id: string
  email: string
}

export type ProductFormData = Omit<Product, 'id' | 'created_at'>
