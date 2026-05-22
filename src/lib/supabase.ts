import { createClient } from '@supabase/supabase-js'
import { Product } from '@/types'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://placeholder.supabase.co'
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnon)
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ── Products ─────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data as Product
}

export async function createProduct(
  product: Omit<Product, 'id' | 'created_at'>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()
  if (error) throw error
  return data as Product
}

export async function updateProduct(
  id: string,
  product: Partial<Omit<Product, 'id' | 'created_at'>>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// ── Storage ───────────────────────────────────────────────────

export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  const ext      = file.name.split('.').pop()
  const filename = `${productId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filename, file, { cacheControl: '3600', upsert: false })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filename)

  return data.publicUrl
}

export async function deleteProductImage(url: string): Promise<void> {
  // Extract path from URL
  const path = url.split('/product-images/')[1]
  if (!path) return
  await supabase.storage.from('product-images').remove([path])
}

// ── Auth ──────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
