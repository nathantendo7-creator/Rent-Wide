-- ============================================================
-- RentWide Database Schema — Supabase PostgreSQL
-- ============================================================

-- ── ENUMS ────────────────────────────────────────────────────
CREATE TYPE listing_type AS ENUM ('RENT', 'SALE');
CREATE TYPE listing_category AS ENUM ('HOUSE', 'APARTMENT', 'OFFICE', 'LAND');
CREATE TYPE price_frequency AS ENUM ('MONTHLY', 'ONE_TIME');
CREATE TYPE listing_status AS ENUM ('AVAILABLE', 'UNDER_OFFER', 'SOLD');

-- ── AGENTS ───────────────────────────────────────────────────
CREATE TABLE agents (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  email      TEXT NOT NULL,
  photo_url  TEXT,
  bio        TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── NEIGHBORHOODS ────────────────────────────────────────────
CREATE TABLE neighborhoods (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  feature_image TEXT,
  center_lat    DOUBLE PRECISION,
  center_lng    DOUBLE PRECISION,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ── LISTINGS ─────────────────────────────────────────────────
CREATE TABLE listings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code             TEXT UNIQUE NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  type             listing_type NOT NULL DEFAULT 'RENT',
  category         listing_category NOT NULL DEFAULT 'HOUSE',
  price            INTEGER NOT NULL,
  currency         TEXT DEFAULT 'UGX',
  price_frequency  price_frequency DEFAULT 'MONTHLY',
  bedrooms         INTEGER NOT NULL DEFAULT 0,
  bathrooms        INTEGER NOT NULL DEFAULT 0,
  area_sqm         DOUBLE PRECISION DEFAULT 0,
  description      TEXT DEFAULT '',
  neighborhood_id  UUID REFERENCES neighborhoods(id),
  agent_id         UUID REFERENCES agents(id),
  status           listing_status DEFAULT 'AVAILABLE',
  lat              DOUBLE PRECISION DEFAULT 0,
  lng              DOUBLE PRECISION DEFAULT 0,
  thumb_url        TEXT,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ── LISTING IMAGES ───────────────────────────────────────────
CREATE TABLE listing_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- ── CONTACTS ─────────────────────────────────────────────────
CREATE TABLE contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT,
  phone      TEXT NOT NULL,
  message    TEXT NOT NULL,
  listing_id UUID REFERENCES listings(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── VIEWINGS ─────────────────────────────────────────────────
CREATE TABLE viewings (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id         UUID NOT NULL REFERENCES listings(id),
  name               TEXT NOT NULL,
  phone              TEXT NOT NULL,
  preferred_datetime TIMESTAMPTZ NOT NULL,
  message            TEXT DEFAULT '',
  created_at         TIMESTAMPTZ DEFAULT now()
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX idx_listings_type ON listings(type);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_slug ON listings(slug);
CREATE INDEX idx_listings_neighborhood ON listings(neighborhood_id);
CREATE INDEX idx_listings_agent ON listings(agent_id);

-- ── SEED DATA ────────────────────────────────────────────────

-- Agents
INSERT INTO agents (id, name, phone, email, photo_url, bio) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Sarah Nakamya', '+256700100001', 'sarah@rentwide.ug', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200', 'Luxury property specialist in Kampala with 8 years experience.'),
  ('a1000000-0000-0000-0000-000000000002', 'James Okello', '+256700100002', 'james@rentwide.ug', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 'Commercial and residential expert covering Greater Kampala.'),
  ('a1000000-0000-0000-0000-000000000003', 'Grace Auma', '+256700100003', 'grace@rentwide.ug', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200', 'Specializes in family homes and gated communities.');

-- Neighborhoods
INSERT INTO neighborhoods (id, name, slug, description, center_lat, center_lng) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Kololo', 'kololo', 'Upscale residential area on Kololo Hill with panoramic views of Kampala.', 0.3389, 32.5861),
  ('b1000000-0000-0000-0000-000000000002', 'Naguru', 'naguru', 'Leafy suburb adjacent to Kololo, popular with diplomats and expats.', 0.3350, 32.6000),
  ('b1000000-0000-0000-0000-000000000003', 'Ntinda', 'ntinda', 'Bustling middle-class neighbourhood with excellent amenities.', 0.3540, 32.6150),
  ('b1000000-0000-0000-0000-000000000004', 'Muyenga', 'muyenga', 'Hilltop residential area known as Tank Hill with stunning lake views.', 0.2950, 32.6050),
  ('b1000000-0000-0000-0000-000000000005', 'Bugolobi', 'bugolobi', 'Quiet residential area with a mix of old and modern homes.', 0.3150, 32.6100);

-- Listings
INSERT INTO listings (id, code, slug, title, type, category, price, currency, price_frequency, bedrooms, bathrooms, area_sqm, description, neighborhood_id, agent_id, status, lat, lng, thumb_url) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'RW-001', 'luxury-4bed-villa-kololo', 'Luxury 4-Bed Villa in Kololo', 'RENT', 'HOUSE', 5000000, 'UGX', 'MONTHLY', 4, 3, 350, 'Stunning 4-bedroom villa nestled in the prestigious Kololo neighbourhood. Features include a private garden, swimming pool, modern finishes throughout, and 24-hour security. Perfect for diplomatic families or senior executives.', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'AVAILABLE', 0.3395, 32.5870, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'),
  ('c1000000-0000-0000-0000-000000000002', 'RW-002', 'modern-3bed-apartment-naguru', 'Modern 3-Bed Apartment in Naguru', 'RENT', 'APARTMENT', 3500000, 'UGX', 'MONTHLY', 3, 2, 180, 'Contemporary apartment with open-plan living, floor-to-ceiling windows, and a private balcony overlooking the city. Located in a secure compound with gym and rooftop terrace.', 'b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'AVAILABLE', 0.3355, 32.6010, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'),
  ('c1000000-0000-0000-0000-000000000003', 'RW-003', 'family-home-5bed-muyenga', 'Family Home — 5 Bedrooms in Muyenga', 'SALE', 'HOUSE', 850000000, 'UGX', 'ONE_TIME', 5, 4, 500, 'Expansive family residence on Tank Hill with breathtaking views of Lake Victoria. Features include a spacious compound, boys quarters, double garage, and mature landscaped gardens.', 'b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'AVAILABLE', 0.2955, 32.6060, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'),
  ('c1000000-0000-0000-0000-000000000004', 'RW-004', 'cozy-2bed-ntinda', 'Cozy 2-Bed Apartment in Ntinda', 'RENT', 'APARTMENT', 1800000, 'UGX', 'MONTHLY', 2, 1, 95, 'Well-maintained apartment in a quiet Ntinda cul-de-sac. Close to shopping centres, schools, and public transport. Ideal for young professionals or small families.', 'b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'AVAILABLE', 0.3545, 32.6155, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'),
  ('c1000000-0000-0000-0000-000000000005', 'RW-005', 'executive-office-kololo', 'Executive Office Space in Kololo', 'RENT', 'OFFICE', 8000000, 'UGX', 'MONTHLY', 0, 2, 250, 'Premium Grade-A office space in the heart of Kololo. Open-plan layout, dedicated parking, backup generator, and fibre internet. Suitable for corporate headquarters or embassy offices.', 'b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'AVAILABLE', 0.3380, 32.5850, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'),
  ('c1000000-0000-0000-0000-000000000006', 'RW-006', 'garden-townhouse-bugolobi', 'Garden Townhouse in Bugolobi', 'RENT', 'HOUSE', 4000000, 'UGX', 'MONTHLY', 3, 3, 220, 'Charming townhouse in a gated Bugolobi estate. Private garden, modern kitchen, and a quiet neighbourhood perfect for families who value peace and security.', 'b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003', 'AVAILABLE', 0.3155, 32.6105, 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800');

-- Listing images
INSERT INTO listing_images (listing_id, url, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', 0),
  ('c1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200', 1),
  ('c1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200', 2),
  ('c1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200', 0),
  ('c1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200', 1),
  ('c1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200', 0),
  ('c1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200', 1),
  ('c1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200', 0),
  ('c1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200', 0),
  ('c1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1497366754888-5e8a15e2fdca?w=1200', 1),
  ('c1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200', 0),
  ('c1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200', 1);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewings ENABLE ROW LEVEL SECURITY;

-- Public read access for listings, neighborhoods, agents, images
CREATE POLICY "Public read access" ON agents FOR SELECT USING (true);
CREATE POLICY "Public read access" ON neighborhoods FOR SELECT USING (true);
CREATE POLICY "Public read access" ON listings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON listing_images FOR SELECT USING (true);

-- Contacts and viewings: anyone can insert (public forms)
CREATE POLICY "Public insert access" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON viewings FOR INSERT WITH CHECK (true);
CREATE POLICY "Service read contacts" ON contacts FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service read viewings" ON viewings FOR SELECT USING (auth.role() = 'service_role');
