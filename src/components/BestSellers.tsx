'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import { Flame } from 'lucide-react'

interface BestSellersProps {
  products: Product[]
}

export default function BestSellers({ products }: BestSellersProps) {
  const featured = products.filter((p) => p.featured).slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section id="best-sellers" className="section-padding relative overflow-hidden">
      {/* Subtle top border */}
      <div className="red-line mb-0 absolute top-0 left-0 right-0" />

      {/* Background effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,26,26,0.03) 0%, transparent 100%)',
        }}
      />

      <div className="container-max relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <Flame size={16} className="text-red-DEFAULT" />
            <span className="font-epilogue text-xs font-semibold tracking-[0.3em] text-red-DEFAULT uppercase">
              Mais Vendidos
            </span>
            <Flame size={16} className="text-red-DEFAULT" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-anton text-[clamp(2.5rem,6vw,5rem)] text-white tracking-[-0.02em] leading-none mb-4"
          >
            OS FAVORITOS
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-px w-24 bg-red-DEFAULT"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
