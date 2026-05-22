'use client'

import { useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BestSellers from '@/components/BestSellers'
import ProductGrid from '@/components/ProductGrid'
import ComingSoon from '@/components/ComingSoon'
import Manifesto from '@/components/Manifesto'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { DEMO_PRODUCTS } from '@/lib/config'
import { Product } from '@/types'

// In production, replace with server-side Supabase fetch.
// For now, demo products are used so the site works without backend.
export default function HomePage() {
  const products = useMemo(() => DEMO_PRODUCTS as Product[], [])

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Best sellers */}
      <BestSellers products={products} />

      {/* 3. Full catalog */}
      <ProductGrid products={products} />

      {/* 4. Manifesto */}
      <Manifesto />

      {/* 5. Coming soon / drop */}
      <ComingSoon />

      {/* 6. Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </main>
  )
}
