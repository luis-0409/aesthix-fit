import type { Metadata, Viewport } from 'next'
import { Toaster } from 'react-hot-toast'
import { SITE_META } from '@/lib/config'
import GrainOverlay from '@/components/GrainOverlay'
import Cart from '@/components/Cart'
import './globals.css'

export const metadata: Metadata = {
  title:       SITE_META.title,
  description: SITE_META.description,
  openGraph: {
    title:       SITE_META.title,
    description: SITE_META.description,
    url:         SITE_META.url,
    siteName:    'AESTHIX FIT',
    locale:      'pt_BR',
    type:        'website',
  },
  keywords: ['roupas fitness', 'streetwear', 'academia', 'moda fitness', 'aesthix fit', 'camiseta treino'],
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width:         'device-width',
  initialScale:  1,
  themeColor:    '#050505',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Epilogue:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white font-epilogue overflow-x-hidden">
        {/* Grain overlay — always on top */}
        <GrainOverlay />

        {/* Global cart drawer */}
        <Cart />

        {/* Toast notifications */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background:   '#111111',
              color:        '#ffffff',
              border:       '1px solid rgba(255,26,26,0.2)',
              fontFamily:   'Epilogue, sans-serif',
              fontSize:     '13px',
              letterSpacing: '0.05em',
            },
            success: {
              iconTheme: { primary: '#ff1a1a', secondary: '#ffffff' },
            },
          }}
        />

        {children}
      </body>
    </html>
  )
}
