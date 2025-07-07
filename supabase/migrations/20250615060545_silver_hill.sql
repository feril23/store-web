/*
  # Enhanced Site Settings with Dynamic Content

  1. New Tables
    - `content_sections`
      - `id` (uuid, primary key)
      - `section_key` (text, unique) - identifier for each section
      - `title` (text) - section title
      - `subtitle` (text) - section subtitle/description
      - `content` (text) - main content
      - `is_active` (boolean) - whether section is displayed
      - `order_index` (integer) - display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `whatsapp_testimonials`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `chat_image` (text) - screenshot of WhatsApp chat
      - `description` (text) - brief description of the chat
      - `order_index` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)

  2. Enhanced site_settings
    - Add more customizable fields

  3. Security
    - Enable RLS on new tables
    - Add policies for admin management and public read access
*/

-- Create content_sections table
CREATE TABLE IF NOT EXISTS content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  content text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create whatsapp_testimonials table
CREATE TABLE IF NOT EXISTS whatsapp_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  chat_image text NOT NULL,
  description text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Add new fields to site_settings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings' AND column_name = 'footer_text'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN footer_text text DEFAULT 'Platform #1 untuk resep kuliner terlengkap dan terpercaya di Indonesia.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings' AND column_name = 'contact_email'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN contact_email text DEFAULT 'info@chikarasa.com';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings' AND column_name = 'business_hours'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN business_hours text DEFAULT 'Senin - Minggu: 08:00 - 22:00 WIB';
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for content_sections
CREATE POLICY "Admin can manage content_sections"
  ON content_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read active content_sections"
  ON content_sections
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Create policies for whatsapp_testimonials
CREATE POLICY "Admin can manage whatsapp_testimonials"
  ON whatsapp_testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read active whatsapp_testimonials"
  ON whatsapp_testimonials
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Insert default content sections
INSERT INTO content_sections (section_key, title, subtitle, content, order_index) VALUES
  ('problem_section', 'Apakah Ini yang Sering Anda Alami Saat Masak atau Jualan Ayam!!', 'Banyak yang masak ayam asal-asalan...', 'KESALAHAN UMUM SAAT MEMASAK AYAM', 1),
  ('marinasi_explanation', 'Apa Itu Marinasi & Kenapa Penting?', 'Marinasi adalah teknik merendam ayam dengan bumbu cair agar rasa benar-benar meresap hingga ke dalam daging.', 'Inilah rahasia ayam yang lebih juicy, empuk, dan tetap enak meski disimpan dan dipanaskan ulang.', 2),
  ('restaurant_quality', 'Dengan marinasi yang tepat, kamu bisa hasilkan ayam seekor resto', 'langsung dari dapur rumah.', 'Bagaimana Resep Ini Bekerja? Ayam Segar → Bumbu Marinasi → Proses Marinasi → Ayam Siap Masak!', 3),
  ('why_must_have', 'Mengapa Anda WAJIB Punya eBook Ini?', 'Solusi lengkap untuk ayam yang selalu juicy, gurih, dan bikin keluarga ketagihan!', 'Resep teruji, praktis, cocok untuk jualan atau masak di rumah, bisa disimpan, dengan bonus nutrisi & pairing menu.', 4);

-- Insert sample WhatsApp testimonials
INSERT INTO whatsapp_testimonials (customer_name, chat_image, description, order_index) VALUES
  ('Ibu Sari - Jakarta', 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop', 'Konsultasi resep ayam geprek untuk jualan', 1),
  ('Pak Budi - Surabaya', 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop', 'Bantuan troubleshooting marinasi ayam bakar', 2),
  ('Ibu Maya - Bandung', 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop', 'Konsultasi bisnis kuliner ayam crispy', 3),
  ('Pak Andi - Medan', 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop', 'Update resep ayam bumbu bali terbaru', 4);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for content_sections
CREATE TRIGGER update_content_sections_updated_at
    BEFORE UPDATE ON content_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();