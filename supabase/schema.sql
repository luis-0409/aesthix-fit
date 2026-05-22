-- ============================================================
-- AESTHIX FIT — Supabase Schema
-- Execute no SQL Editor do Supabase
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Tabela: products ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  description   TEXT,
  price         NUMERIC(10, 2) NOT NULL DEFAULT 0,
  images        TEXT[] DEFAULT '{}',
  sizes         TEXT[] DEFAULT '{"P","M","G","GG"}',
  colors        JSONB DEFAULT '[]',
  featured      BOOLEAN DEFAULT false,
  category      TEXT DEFAULT 'Camisetas',
  fabric_details TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: leitura pública
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- ── Tabela: admin_users ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- ── Storage Bucket: product-images ──────────────────────────
-- Execute separadamente ou via Dashboard > Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- ── Seed: Produtos de exemplo ────────────────────────────────
INSERT INTO products (name, description, price, images, sizes, colors, featured, category, fabric_details) VALUES
(
  'Camiseta Discipline Oversized',
  'Oversized premium com acabamento drop-shoulder. Tecido 100% algodão penteado 280g. Feita para quem não pede desculpa.',
  189.90,
  ARRAY['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'],
  ARRAY['P','M','G','GG'],
  '[{"name":"Preto","hex":"#050505"},{"name":"Branco","hex":"#f5f5f5"}]'::jsonb,
  true,
  'Camisetas',
  '100% Algodão penteado 280g/m² | Drop-shoulder | Corte oversized | Lavagem a frio'
),
(
  'Camiseta New Era Black',
  'Corte regular com impressão frontal bold. Algodão premium. Identidade que se impõe.',
  149.90,
  ARRAY['https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80'],
  ARRAY['P','M','G','GG'],
  '[{"name":"Preto","hex":"#050505"},{"name":"Vermelho","hex":"#ff1a1a"}]'::jsonb,
  true,
  'Camisetas',
  '100% Algodão penteado 220g/m² | Corte regular | Estampa silk screen | Lavagem a frio'
),
(
  'Moletom Discipline Hood',
  'Moletom pesado com capuz duplo. Para os dias de treino na madrugada e nas ruas.',
  289.90,
  ARRAY['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80'],
  ARRAY['P','M','G','GG'],
  '[{"name":"Preto","hex":"#050505"},{"name":"Cinza Carvão","hex":"#1a1a1a"}]'::jsonb,
  true,
  'Moletons',
  'Fleece 80% algodão 20% poliester 400g/m² | Capuz duplo | Bolso canguru | Lavagem a frio'
);
