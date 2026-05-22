'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, Trash2, Upload, Loader2 } from 'lucide-react'
import { Product, ProductColor } from '@/types'
import { uploadProductImage } from '@/lib/supabase'

interface ProductFormProps {
  product?:  Product | null
  onSave:    (data: Omit<Product, 'id' | 'created_at'>) => Promise<void>
  onCancel:  () => void
}

const DEFAULT_SIZES  = ['P', 'M', 'G', 'GG']
const DEFAULT_COLORS: ProductColor[] = [
  { name: 'Preto',  hex: '#050505' },
  { name: 'Branco', hex: '#f5f5f5' },
]

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [name,          setName]         = useState(product?.name          || '')
  const [description,   setDescription]  = useState(product?.description   || '')
  const [price,         setPrice]        = useState(product?.price?.toString() || '')
  const [category,      setCategory]     = useState(product?.category      || 'Camisetas')
  const [fabric,        setFabric]       = useState(product?.fabric_details || '')
  const [featured,      setFeatured]     = useState(product?.featured       || false)
  const [images,        setImages]       = useState<string[]>(product?.images || [])
  const [sizes,         setSizes]        = useState<string[]>(product?.sizes || DEFAULT_SIZES)
  const [colors,        setColors]       = useState<ProductColor[]>(product?.colors || DEFAULT_COLORS)
  const [imageUrl,      setImageUrl]     = useState('')
  const [newColorName,  setNewColorName] = useState('')
  const [newColorHex,   setNewColorHex]  = useState('#ff1a1a')
  const [uploading,     setUploading]    = useState(false)
  const [saving,        setSaving]       = useState(false)
  const [error,         setError]        = useState('')

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const addColor = () => {
    if (!newColorName) return
    setColors((prev) => [...prev, { name: newColorName, hex: newColorHex }])
    setNewColorName('')
    setNewColorHex('#ff1a1a')
  }

  const removeColor = (i: number) => {
    setColors((prev) => prev.filter((_, idx) => idx !== i))
  }

  const addImageUrl = () => {
    if (!imageUrl) return
    setImages((prev) => [...prev, imageUrl])
    setImageUrl('')
  }

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadProductImage(file, product?.id || `temp-${Date.now()}`)
      setImages((prev) => [...prev, url])
    } catch {
      setError('Erro ao fazer upload. Configure o Supabase Storage.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !price || images.length === 0 || sizes.length === 0 || colors.length === 0) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }
    setSaving(true)
    try {
      await onSave({
        name,
        description,
        price:          parseFloat(price),
        category,
        fabric_details: fabric,
        featured,
        images,
        sizes,
        colors,
      })
    } catch (err: any) {
      setError(err?.message || 'Erro ao salvar produto.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d0d0d] border border-white/8 p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-anton text-xl tracking-[0.1em] text-white uppercase">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        <button onClick={onCancel} className="text-white/40 hover:text-white transition-colors cursor-pointer">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
              Nome *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nome do produto"
              className="input-dark"
            />
          </div>
          <div>
            <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
              Preço (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="0.00"
              className="input-dark"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-dark"
            >
              {['Camisetas', 'Regatas', 'Moletons', 'Shorts', 'Acessórios'].map((c) => (
                <option key={c} value={c} style={{ background: '#111111' }}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setFeatured(!featured)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
                  featured ? 'bg-red-DEFAULT' : 'bg-white/10'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    featured ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </div>
              <span className="font-epilogue text-sm text-white/70">Destaque</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Descrição do produto"
            className="input-dark resize-none"
          />
        </div>

        <div>
          <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
            Detalhes do Tecido
          </label>
          <input
            type="text"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            placeholder="Ex: 100% Algodão 280g | Corte oversized | Lavagem a frio"
            className="input-dark"
          />
          <p className="font-epilogue text-[10px] text-white/20 mt-1">
            Separe detalhes com |
          </p>
        </div>

        {/* Images */}
        <div>
          <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">
            Imagens *
          </label>

          {/* URL input */}
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://url-da-imagem.com/foto.jpg"
              className="input-dark flex-1 text-sm"
            />
            <button
              type="button"
              onClick={addImageUrl}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors font-epilogue text-sm cursor-pointer whitespace-nowrap"
            >
              + URL
            </button>
          </div>

          {/* File upload */}
          <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-white/10 hover:border-red-DEFAULT/40 transition-colors cursor-pointer mb-3">
            {uploading ? (
              <Loader2 size={16} className="text-red-DEFAULT animate-spin" />
            ) : (
              <Upload size={16} className="text-white/30" />
            )}
            <span className="font-epilogue text-sm text-white/40">
              {uploading ? 'Enviando...' : 'Upload de imagem (Supabase)'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative group w-20 h-24 overflow-hidden border border-white/10">
                  <img
                    src={img}
                    alt={`Imagem ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  >
                    <Trash2 size={14} className="text-red-DEFAULT" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">
            Tamanhos *
          </label>
          <div className="flex gap-2 flex-wrap">
            {DEFAULT_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-12 h-12 font-epilogue text-sm font-semibold tracking-wider border transition-all cursor-pointer ${
                  sizes.includes(size)
                    ? 'bg-red-DEFAULT border-red-DEFAULT text-white'
                    : 'bg-transparent border-white/15 text-white/40 hover:border-white/40'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-epilogue text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">
            Cores *
          </label>

          {/* Existing colors */}
          <div className="flex flex-wrap gap-2 mb-3">
            {colors.map((color, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10"
              >
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-epilogue text-xs text-white/70">{color.name}</span>
                <button
                  type="button"
                  onClick={() => removeColor(i)}
                  className="text-white/20 hover:text-red-DEFAULT transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>

          {/* Add color */}
          <div className="flex gap-2">
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className="w-10 h-10 cursor-pointer bg-transparent border border-white/10 p-0.5"
            />
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="Nome da cor"
              className="input-dark flex-1 text-sm"
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer font-epilogue text-sm"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="font-epilogue text-sm text-red-DEFAULT">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-white/5">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : product ? (
              'Salvar Alterações'
            ) : (
              'Criar Produto'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline px-6"
          >
            Cancelar
          </button>
        </div>
      </form>
    </motion.div>
  )
}
