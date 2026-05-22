// ============================================================
// AESTHIX FIT — CONFIGURAÇÃO CENTRAL
// Altere aqui sem tocar no resto do código
// ============================================================

export const BRAND_CONFIG = {
  name: 'AESTHIX FIT',
  tagline: 'DISCIPLINA VIRA ESTILO.',
  instagram: '@aesthix.fitt',
  instagramUrl: 'https://instagram.com/aesthix.fitt',

  // WhatsApp — substitua pelo número real (somente dígitos, com DDI)
  whatsappNumber: '5511999999999',

  // Mensagem de intro antes dos produtos
  whatsappIntro: 'Olá! Quero fazer um pedido na AESTHIX FIT:',

  // Email do admin (para Supabase Auth)
  adminEmail: 'admin@aesthixfit.com',
} as const

export const SITE_META = {
  title:       'AESTHIX FIT — Disciplina Vira Estilo',
  description: 'Roupas fitness streetwear premium. Disciplina, foco e evolução.',
  url:         'https://aesthixfit.com',
  ogImage:     '/og-image.jpg',
} as const

// Produtos de exemplo (exibidos enquanto o Supabase não está configurado)
export const DEMO_PRODUCTS = [
  {
    id: 'demo-1',
    name: 'Camiseta Discipline Oversized',
    description: 'Oversized premium com acabamento drop-shoulder. Tecido 100% algodão penteado 280g. Feita para quem não pede desculpa.',
    price: 189.90,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
      { name: 'Branco', hex: '#f5f5f5' },
      { name: 'Cinza Carvão', hex: '#222222' },
    ],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder | Corte oversized | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Camiseta New Era Black',
    description: 'Corte regular com impressão frontal bold. Algodão premium. Identidade que se impõe.',
    price: 149.90,
    images: [
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
      { name: 'Vermelho', hex: '#ff1a1a' },
    ],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 220g/m² | Corte regular | Estampa silk screen | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    name: 'Regata Performance Dry',
    description: 'Regata técnica com dry-fit avançado. Máxima performance no treino sem abrir mão do estilo.',
    price: 119.90,
    images: [
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
      { name: 'Cinza', hex: '#444444' },
      { name: 'Vermelho', hex: '#ff1a1a' },
    ],
    featured: false,
    category: 'Regatas',
    fabric_details: 'Poliester 92% + Elastano 8% | Dry-fit | Corte slim | Tecnologia antimicrobiana',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    name: 'Moletom Discipline Hood',
    description: 'Moletom pesado com capuz duplo. Para os dias de treino na madrugada e nas ruas.',
    price: 289.90,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
      { name: 'Cinza Carvão', hex: '#1a1a1a' },
    ],
    featured: true,
    category: 'Moletons',
    fabric_details: 'Fleece 80% algodão 20% poliester 400g/m² | Capuz duplo | Bolso canguru | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    name: 'Shorts Tactical Black',
    description: 'Shorts técnico com bolsos laterais. Do treino à rua sem trocar de roupa.',
    price: 169.90,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80',
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
      { name: 'Carvão', hex: '#222222' },
    ],
    featured: false,
    category: 'Shorts',
    fabric_details: 'Poliamida 85% + Elastano 15% | Bolsos laterais | Elástico com cordão | Tecnologia UV50+',
    created_at: new Date().toISOString(),
  },
  {
    id: 'demo-6',
    name: 'Camiseta Focus Longline',
    description: 'Longline com corte diferenciado e bainha irregular. Estética streetwear pura.',
    price: 159.90,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
      { name: 'Branco', hex: '#f5f5f5' },
    ],
    featured: false,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 260g/m² | Corte longline | Bainha irregular | Caimento oversized',
    created_at: new Date().toISOString(),
  },
]
