# AESTHIX FIT — Loja Fitness Streetwear

> "Disciplina vira estilo." — Site premium para marca de roupas fitness/streetwear com visual dark, glow vermelho e carrinho via WhatsApp.

---

## Stack

| Tech | Uso |
|------|-----|
| **Next.js 14** (App Router) | Framework |
| **TypeScript** | Tipagem |
| **TailwindCSS** | Estilização |
| **Framer Motion** | Animações |
| **Zustand** | Carrinho (estado global) |
| **Supabase** | Banco de dados + Auth + Storage |
| **Anton + Epilogue** | Tipografia |

---

## Início Rápido

### 1. Instalar dependências

```bash
cd C:\projetos\aesthix-fit
npm install
```

### 2. Configurar variáveis de ambiente

```bash
copy .env.local.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase.

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Abra: http://localhost:3000

> **Sem Supabase?** Funciona em modo demo com produtos de exemplo. Veja `src/lib/config.ts`.

---

## Configuração

### WhatsApp
Edite `src/lib/config.ts`:
```ts
whatsappNumber: '5511999999999', // ← número real (somente dígitos, com DDI)
```

### Instagram
```ts
instagram:    '@aesthix.fitt',
instagramUrl: 'https://instagram.com/aesthix.fitt',
```

### Produtos demo
Os produtos de exemplo estão em `DEMO_PRODUCTS` no mesmo arquivo `config.ts`.

---

## Supabase Setup

### 1. Criar projeto em supabase.com

### 2. Executar o schema
No SQL Editor do Supabase, execute o conteúdo de `supabase/schema.sql`.

### 3. Criar usuário admin
No Dashboard: **Authentication → Users → Add User**

Insira o email e senha do administrador.

### 4. Storage
O bucket `product-images` é criado pelo schema SQL.
Verifique em: **Storage → product-images → Settings → Public**

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Root layout (grain, cart, toast)
│   ├── page.tsx            # Homepage
│   ├── produto/[id]/       # Página do produto
│   └── admin/
│       ├── page.tsx        # Dashboard admin
│       └── login/          # Login admin
├── components/
│   ├── Hero.tsx            # Seção hero fullscreen
│   ├── Navbar.tsx          # Navegação com blur
│   ├── ProductCard.tsx     # Card do produto
│   ├── ProductGrid.tsx     # Grid com filtros
│   ├── Cart.tsx            # Carrinho slide-over
│   ├── BestSellers.tsx     # Seção mais vendidos
│   ├── ComingSoon.tsx      # Drop + countdown
│   ├── Manifesto.tsx       # Seção identidade
│   ├── Footer.tsx          # Rodapé premium
│   ├── WhatsAppButton.tsx  # Botão flutuante
│   ├── GrainOverlay.tsx    # Textura grain
│   └── admin/
│       └── ProductForm.tsx # Form CRUD
├── lib/
│   ├── supabase.ts         # Client + queries
│   ├── cart-store.ts       # Zustand store
│   └── config.ts           # Configurações da marca
└── types/
    └── index.ts            # TypeScript types
```

---

## Identidade Visual

| Elemento | Valor |
|---------|-------|
| Fundo | `#050505` (OLED Black) |
| Vermelho | `#ff1a1a` |
| Heading | Anton (condensed, uppercase) |
| Body | Epilogue (400–700) |
| Efeitos | Grain noise, red glow, glass blur |
| Clip-path | Canto cortado em botões/badges |

---

## Funcionalidades

- ✅ Hero fullscreen com animações (Framer Motion)
- ✅ Grid de produtos com filtro por categoria
- ✅ Hover com troca de imagem nos cards
- ✅ Página do produto com galeria + guia de medidas
- ✅ Carrinho slide-over (Zustand + persistência localStorage)
- ✅ Envio do pedido via WhatsApp (wa.me)
- ✅ Seção "Mais Vendidos" (produtos com `featured: true`)
- ✅ Countdown + captação de email para drops
- ✅ Manifesto com parallax scroll
- ✅ Admin: login Supabase Auth
- ✅ Admin: CRUD completo de produtos
- ✅ Admin: upload de imagens (Supabase Storage)
- ✅ Grain overlay + red glow + custom scrollbar
- ✅ Totalmente responsivo (mobile-first)
- ✅ SEO básico (meta tags, Open Graph)
- ✅ Modo demo (sem Supabase)

---

## Build para Produção

```bash
npm run build
npm start
```

Ou deploy na **Vercel** (recomendado para Next.js):
1. Push para GitHub
2. Import no vercel.com
3. Adicionar env vars no painel da Vercel

---

*AESTHIX FIT — Não é só roupa. É identidade.*
