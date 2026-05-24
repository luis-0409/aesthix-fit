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

// Produtos reais da AESTHIX FIT
export const DEMO_PRODUCTS = [
  {
    id: 'camiseta-the-king',
    name: 'Camiseta The King',
    description: 'Leão de Judá. Oversized premium com estampa full-back exclusiva. "Behold, the Lion of the Tribe of Judah" — Revelation 5:5.',
    price: 219.90,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
    ],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-mentality',
    name: 'Camiseta MENTALITY',
    description: 'Feel the fear and do it anyway. That is the mentality. Even if you are scared, just do it. Estátua de guerreiro com chamas.',
    price: 199.90,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
    ],
    featured: true,
    category: 'Camisetas',
    fabric_details: '100% Algodão penteado 280g/m² | Drop-shoulder oversized | Estampa DTF full-back | Lavagem a frio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'camiseta-disciplina',
    name: 'Camiseta DISCIPLINA',
    description: 'Skull warrior no levantamento. Disciplina não é opção — é identidade. Estampa full-back com arte exclusiva.',
    price: 199.90,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
    ],
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
    images: [
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
    ],
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
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
      'https://images.unsplash.com/photo-1516826957135-700dedafdef9?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
    ],
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
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Branco', hex: '#f5f5f5' },
    ],
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
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#050505' },
    ],
    featured: false,
    coming_soon: true,
    category: 'Shorts',
    fabric_details: 'Em breve',
    created_at: new Date().toISOString(),
  },
]
