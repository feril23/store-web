/*
  # Admin Dashboard Schema for eBook Landing Page

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text)
      - `answer` (text)
      - `order` (integer)
      - `created_at` (timestamp)
    
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `cover_image` (text)
      - `price` (integer)
      - `original_price` (integer)
      - `is_discounted` (boolean)
      - `is_featured` (boolean)
      - `is_free` (boolean)
      - `preview_file_url` (text)
      - `category_id` (uuid, foreign key)
      - `pages` (integer)
      - `recipes` (integer)
      - `rating` (decimal)
      - `reviews` (integer)
      - `created_at` (timestamp)
    
    - `bonus_ebooks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `cover_image` (text)
      - `value` (integer)
      - `linked_book_id` (uuid, foreign key)
      - `order` (integer)
      - `created_at` (timestamp)
    
    - `site_settings`
      - `id` (uuid, primary key)
      - `whatsapp_number` (text)
      - `cta_text` (text)
      - `hero_title` (text)
      - `hero_subtitle` (text)
      - `promo_price` (integer)
      - `promo_deadline` (timestamp)
      - `updated_at` (timestamp)
    
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin users
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  cover_image text,
  price integer NOT NULL DEFAULT 0,
  original_price integer NOT NULL DEFAULT 0,
  is_discounted boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  is_free boolean DEFAULT false,
  preview_file_url text,
  category_id uuid REFERENCES categories(id),
  pages integer DEFAULT 0,
  recipes integer DEFAULT 0,
  rating decimal(2,1) DEFAULT 0.0,
  reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create bonus_ebooks table
CREATE TABLE IF NOT EXISTS bonus_ebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  cover_image text,
  value integer NOT NULL DEFAULT 0,
  linked_book_id uuid REFERENCES books(id),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number text DEFAULT '',
  cta_text text DEFAULT 'Beli Sekarang',
  hero_title text DEFAULT '20 RESEP MARINASI AYAM',
  hero_subtitle text DEFAULT 'Juicy, Pedas, Gurih & Dijamin Laris!',
  promo_price integer DEFAULT 57000,
  promo_deadline timestamptz DEFAULT (now() + interval '7 days'),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonus_ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin)
CREATE POLICY "Admin can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage books"
  ON books
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage faqs"
  ON faqs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage bonus_ebooks"
  ON bonus_ebooks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage site_settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public read access for landing page
CREATE POLICY "Public can read categories"
  ON categories
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can read books"
  ON books
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can read faqs"
  ON faqs
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can read bonus_ebooks"
  ON bonus_ebooks
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can read site_settings"
  ON site_settings
  FOR SELECT
  TO anon
  USING (true);

-- Insert default data
INSERT INTO categories (name, slug) VALUES
  ('marinasi', 'marinasi'),
  ('bakar', 'bakar'),
  ('goreng', 'goreng'),
  ('pedas', 'pedas'),
  ('panggang', 'panggang'),
  ('internasional', 'internasional'),
  ('tradisional', 'tradisional'),
  ('crispy', 'crispy');

-- Insert default site settings
INSERT INTO site_settings (whatsapp_number, cta_text, hero_title, hero_subtitle, promo_price) VALUES
  ('+62 812-3456-7890', 'Dapatkan Sekarang - Harga Promo Terbatas!', '20 RESEP MARINASI AYAM', 'Juicy, Pedas, Gurih & Dijamin Laris!', 57000);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, order_index) VALUES
  ('Apakah eBook ini cocok untuk pemula yang baru belajar masak?', 'Sangat cocok! Setiap resep dijelaskan step-by-step dengan detail, termasuk tips untuk pemula. Kami juga menyediakan konsultasi gratis via WhatsApp jika ada yang kurang jelas.', 1),
  ('Bisa langsung diakses setelah pembayaran?', 'Ya! Setelah pembayaran dikonfirmasi, Anda akan langsung mendapat link download eBook dalam format PDF yang bisa dibuka di HP, tablet, atau laptop.', 2),
  ('Apakah resep-resepnya sudah teruji?', 'Tentu! Semua resep sudah diuji berkali-kali dan terbukti berhasil. Bahkan sudah digunakan oleh ribuan pembeli kami dengan hasil yang memuaskan.', 3),
  ('Bagaimana jika saya tidak puas dengan pembelian ini?', 'Kami berikan garansi 30 hari uang kembali 100% jika Anda tidak puas. Namun sejauh ini, tingkat kepuasan pelanggan mencapai 99.8%!', 4);