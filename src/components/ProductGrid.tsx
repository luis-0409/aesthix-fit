'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
}

const CATEGORIES = ['Todos', 'Camisetas', 'Regatas', 'Moletons', 'Shorts']

export default function ProductGrid({
  products,
  title   = 'COLEÇÃO COMPLETA',
  subtitle = 'Cada peça. Uma declaração.',
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered =
    activeCategory === 'Todos'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section id="colecao" className="section-padding">
      <div className="container-max">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-epilogue text-xs font-semibold tracking-[0.3em] text-red-DEFAULT uppercase mb-3"
            >
              — Loja
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-anton text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.02em] text-white leading-none"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-epilogue text-sm text-white/40 mt-3 tracking-wider uppercase"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Filter icon */}
          <div className="flex items-center gap-2 text-white/30">
            <SlidersHorizontal size={14} />
            <span className="font-epilogue text-xs tracking-widest uppercase">
              {filtered.length} peças
            </span>
          </div>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-epilogue text-xs font-semibold tracking-[0.15em] uppercase border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-DEFAULT border-red-DEFAULT text-white'
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <span className="font-anton text-6xl text-white/5 mb-4">AF</span>
            <p className="font-epilogue text-sm text-white/30 tracking-widest uppercase">
              Nenhum produto nesta categoria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
