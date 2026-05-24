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
  whatsappNumber: '5585987408431',

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

// Produtos reais da AESTHIX FIT
export const DEMO_PRODUCTS = [
  {
    id: 'camiseta-the-king',
    name: 'Camiseta The King',
    description: 'Leão de Judá. Oversized premium com estampa full-back exclusiva. "Behold, the Lion of the Tribe of Judah" — Revelation 5:5.',
    price: 219.90,
    images: ['/products/the-king-frente.jpg'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Preto', hex: '#050505' }],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-mentality',
    name: 'Camiseta MENTALITY',
    description: 'Feel the fear and do it anyway. That is the mentality. Even if you are scared, just do it.',
    price: 199.90,
    images: ['/products/mentality-frente.jpg'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Preto', hex: '#050505' }],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-disciplina',
    name: 'Camiseta DISCIPLINA',
    description: 'Skull warrior no levantamento. Disciplina não é opção — é identidade.',
    price: 199.90,
    images: ['/products/disciplina-frente.jpg'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Preto', hex: '#050505' }],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-messiah',
    name: 'Camiseta MESSIAH',
    description: 'Coroa de espinhos em chamas. Arte gráfica intensa com referência bíblica. Para quem carrega fé e atitude.',
    price: 219.90,
    images: ['/products/messiah-frente.jpg'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Preto', hex: '#050505' }],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-faltou-carbo-preto',
    name: 'Camiseta Faltou Carbo? — Preta',
    description: 'Faltou carbo? Aumenta a poha do ódio. Death Potion. A camiseta mais honesta do seu treino.',
    price: 179.90,
    images: ['/products/faltou-carbo-preto-frente.jpg'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Preto', hex: '#050505' }],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-faltou-carbo-branco',
    name: 'Camiseta Faltou Carbo? — Branca',
    description: 'Faltou carbo? Aumenta a poha do ódio. Death Potion. A camiseta mais honesta do seu treino. Versão branca.',
    price: 179.90,
    images: ['/products/faltou-carbo-branco-frente.jpg'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Branco', hex: '#f5f5f5' }],
    featured: false,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'shorts-em-breve',
    name: 'Shorts AESTHIX FIT',
    description: 'Em breve. Aguarde o lançamento da linha de shorts da AESTHIX FIT. 🔥',
    price: 169.90,
    images: [],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Preto', hex: '#050505' }],
    featured: false,
    coming_soon: true,
    category: 'Shorts',
    fabric_details: 'Em breve',
    created_at: new Date().toISOString(),
  },
]
