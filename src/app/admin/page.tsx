'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Pencil, Trash2, LogOut, Package,
  Star, RefreshCw, AlertCircle, Loader2,
  Search, ChevronUp, ChevronDown,
} from 'lucide-react'
import { Product } from '@/types'
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  getSession, signOut,
} from '@/lib/supabase'
import { DEMO_PRODUCTS } from '@/lib/config'
import ProductForm from '@/components/admin/ProductForm'

type SortKey = 'name' | 'price' | 'created_at'

export default function AdminPage() {
  const router = useRouter()
  const [products,    setProducts]    = useState<Product[]>([])
  const [loading,     setLoading]     = useState(true)
  const [authed,      setAuthed]      = useState(false)
  const [showForm,    setShowForm]    = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleting,    setDeleting]    = useState<string | null>(null)
  const [search,      setSearch]      = useState('')
  const [sortKey,     setSortKey]     = useState<SortKey>('created_at')
  const [sortAsc,     setSortAsc]     = useState(false)
  const [demoMode,    setDemoMode]    = useState(false)

  // Auth check
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/admin/login')
      } else {
        setAuthed(true)
        loadProducts()
      }
    })
  }, [])

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch {
      // Supabase not configured — use demo products
      setProducts(DEMO_PRODUCTS as Product[])
      setDemoMode(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  const handleCreate = async (data: Omit<Product, 'id' | 'created_at'>) => {
    if (demoMode) {
      // Simulate add in demo mode
      const fakeProduct: Product = {
        ...data,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
      }
      setProducts((prev) => [fakeProduct, ...prev])
    } else {
      const created = await createProduct(data)
      setProducts((prev) => [created, ...prev])
    }
    setShowForm(false)
  }

  const handleUpdate = async (data: Omit<Product, 'id' | 'created_at'>) => {
    if (!editProduct) return
    if (demoMode) {
      setProducts((prev) =>
        prev.map((p) => p.id === editProduct.id ? { ...p, ...data } : p)
      )
    } else {
      const updated = await updateProduct(editProduct.id, data)
      setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p))
    }
    setEditProduct(null)
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return
    setDeleting(id)
    try {
      if (!demoMode) await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch {}
    setDeleting(null)
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditProduct(null)
  }

  // Filter + sort
  const displayed = products
    .filter((p) =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let diff = 0
      if (sortKey === 'name')       diff = a.name.localeCompare(b.name)
      if (sortKey === 'price')      diff = a.price - b.price
      if (sortKey === 'created_at') diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      return sortAsc ? diff : -diff
    })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  if (!authed && loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 size={24} className="text-red-DEFAULT animate-spin" />
      </div>
    )
  }

  const stats = [
    { label: 'Produtos',  value: products.length,                       icon: Package },
    { label: 'Destaque',  value: products.filter((p) => p.featured).length, icon: Star },
    { label: 'Estoque',   value: products.length > 0 ? 'Ativo' : '—',  icon: RefreshCw },
  ]

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Sidebar / Header */}
      <div
        className="sticky top-0 z-20 border-b border-white/5"
        style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between px-4 md:px-8 h-14">
          <div className="flex items-center gap-4">
            <h1 className="font-anton text-base tracking-[0.15em] text-white uppercase">
              AESTHIX <span className="text-red-DEFAULT">ADMIN</span>
            </h1>
            {demoMode && (
              <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 font-epilogue text-[10px] tracking-widest text-yellow-400/80 uppercase">
                Demo
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="font-epilogue text-xs text-white/30 hover:text-white transition-colors"
            >
              Ver site →
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 font-epilogue text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* Demo mode banner */}
        {demoMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 mb-6 border border-yellow-500/20 bg-yellow-500/5"
          >
            <AlertCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-epilogue text-sm text-yellow-400 font-semibold">Modo demonstração</p>
              <p className="font-epilogue text-xs text-white/40 mt-1">
                Configure o Supabase em <code className="text-white/60">.env.local</code> para persistir dados.
                As alterações só existem enquanto a página estiver aberta.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#0d0d0d] border border-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon size={14} className="text-white/30" />
                <span className="font-epilogue text-[10px] tracking-[0.2em] text-white/25 uppercase">
                  {label}
                </span>
              </div>
              <div className="font-anton text-2xl text-white tracking-wide">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <ProductForm
                product={editProduct}
                onSave={editProduct ? handleUpdate : handleCreate}
                onCancel={handleCancelForm}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="input-dark pl-9 text-sm"
            />
          </div>

          {!showForm && (
            <button
              onClick={() => { setEditProduct(null); setShowForm(true) }}
              className="btn-primary text-sm py-2.5 px-5 whitespace-nowrap"
            >
              <Plus size={15} />
              Novo Produto
            </button>
          )}
        </div>

        {/* Products table */}
        <div className="border border-white/5 overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 bg-[#0a0a0a] border-b border-white/5">
            {[
              { key: 'name' as SortKey, label: 'Produto' },
              { key: 'price' as SortKey, label: 'Preço' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                className="flex items-center gap-1 font-epilogue text-[10px] tracking-[0.2em] text-white/30 uppercase cursor-pointer hover:text-white/60 transition-colors text-left"
              >
                {label}
                {sortKey === key ? (
                  sortAsc ? <ChevronUp size={10} /> : <ChevronDown size={10} />
                ) : null}
              </button>
            ))}
            <span className="font-epilogue text-[10px] tracking-[0.2em] text-white/30 uppercase">Destaque</span>
            <span className="font-epilogue text-[10px] tracking-[0.2em] text-white/30 uppercase">Tamanhos</span>
            <span className="font-epilogue text-[10px] tracking-[0.2em] text-white/30 uppercase">Ações</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={20} className="text-red-DEFAULT animate-spin" />
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package size={32} className="text-white/10 mb-3" />
              <p className="font-epilogue text-sm text-white/25 tracking-widest uppercase">
                {search ? 'Nenhum resultado' : 'Nenhum produto cadastrado'}
              </p>
            </div>
          ) : (
            <div>
              {displayed.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-4 py-4 border-b border-white/5 hover:bg-white/[0.015] transition-colors"
                >
                  {/* Product name + image */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-12 flex-shrink-0 overflow-hidden bg-gray-900">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-anton text-sm text-white/10">AF</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-epilogue text-sm font-semibold text-white/90 leading-tight">
                        {product.name}
                      </p>
                      <p className="font-epilogue text-[10px] text-white/30 mt-0.5 uppercase tracking-wider">
                        {product.category || '—'}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="font-epilogue text-sm text-white/70 font-semibold">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>

                  {/* Featured */}
                  <div>
                    {product.featured ? (
                      <span className="inline-flex items-center gap-1 font-epilogue text-[10px] tracking-wider text-red-DEFAULT uppercase">
                        <Star size={10} fill="#ff1a1a" />
                        Destaque
                      </span>
                    ) : (
                      <span className="font-epilogue text-[10px] text-white/20">—</span>
                    )}
                  </div>

                  {/* Sizes */}
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="font-epilogue text-[9px] font-semibold tracking-wider text-white/30 border border-white/8 px-1.5 py-0.5 uppercase"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:text-red-DEFAULT hover:border-red-DEFAULT/40 transition-colors cursor-pointer disabled:opacity-50"
                      title="Excluir"
                    >
                      {deleting === product.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <p className="font-epilogue text-[10px] text-white/15 mt-4 text-center tracking-widest uppercase">
          {displayed.length} de {products.length} produtos
        </p>
      </div>
    </div>
  )
}
