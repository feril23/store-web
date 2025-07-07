/*
  # Flexible Content Management System

  1. New Tables
    - `section_content_items`
      - `id` (uuid, primary key)
      - `section_id` (uuid, foreign key to content_sections)
      - `title` (text) - item title
      - `description` (text) - item description
      - `icon_name` (text) - lucide icon name
      - `icon_color` (text) - icon color class
      - `order_index` (integer) - display order
      - `is_active` (boolean) - whether item is displayed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on new table
    - Add policies for admin management and public read access
*/

-- Create section_content_items table
CREATE TABLE IF NOT EXISTS section_content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES content_sections(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  icon_name text DEFAULT 'CheckCircle',
  icon_color text DEFAULT 'text-green-500',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE section_content_items ENABLE ROW LEVEL SECURITY;

-- Create policies for section_content_items
CREATE POLICY "Admin can manage section_content_items"
  ON section_content_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read active section_content_items"
  ON section_content_items
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Create trigger for section_content_items
CREATE TRIGGER update_section_content_items_updated_at
    BEFORE UPDATE ON section_content_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default content items for existing sections
DO $$
DECLARE
    why_must_have_section_id uuid;
    problem_section_id uuid;
    marinasi_section_id uuid;
BEGIN
    -- Get section IDs
    SELECT id INTO why_must_have_section_id FROM content_sections WHERE section_key = 'why_must_have';
    SELECT id INTO problem_section_id FROM content_sections WHERE section_key = 'problem_section';
    SELECT id INTO marinasi_section_id FROM content_sections WHERE section_key = 'marinasi_explanation';

    -- Insert content items for "why_must_have" section
    IF why_must_have_section_id IS NOT NULL THEN
        INSERT INTO section_content_items (section_id, title, description, icon_name, icon_color, order_index) VALUES
        (why_must_have_section_id, 'Resep Teruji - Bukan Coba-Coba', 'Tiap resep dilengkapi takaran gram, solusi masalah umum, dan panduan masak ulang agar hasilnya konsisten dan anti gagal.', 'Award', 'text-yellow-500', 1),
        (why_must_have_section_id, 'Praktis & Bisa Disiapkan Sekali untuk Beberapa Hari', 'Ungkep malam ini, masak besok pagi atau kapan pun kamu sempat. Hemat waktu dan energi di dapur.', 'Clock', 'text-blue-500', 2),
        (why_must_have_section_id, 'Cocok untuk Jualan atau Masak di Rumah', 'Resepnya bisa dipakai untuk keluarga atau skala usaha kecil-menengah. Hemat bumbu, hemat waktu, hasil tetap lezat.', 'Heart', 'text-red-500', 3),
        (why_must_have_section_id, 'Bisa Disimpan - Tidak Perlu Masak Ulang Tiap Hari', 'Panduan lengkap penyimpanan: kulkas, freezer, dan cara panaskan ulang agar tetap juicy.', 'ChefHat', 'text-yellow-500', 4),
        (why_must_have_section_id, 'Dengan Bonus Nutrisi & Pairing Menu', 'Nggak cuma masak enak, tapi juga tahu gizi dan bisa padukan dengan lauk lain secara tepat.', 'CheckCircle', 'text-green-500', 5);
    END IF;

    -- Insert content items for "problem_section"
    IF problem_section_id IS NOT NULL THEN
        INSERT INTO section_content_items (section_id, title, description, icon_name, icon_color, order_index) VALUES
        (problem_section_id, 'Langsung Dimasak Tanpa Marinasi', 'Ayam cenderung kering dan kurang rasa', 'X', 'text-red-500', 1),
        (problem_section_id, 'Bumbu Tidak Ditakar', 'Rasa tidak konsisten', 'X', 'text-red-500', 2),
        (problem_section_id, 'Salah Memadukan Bahan Asam', 'Membuat ayam tidak enak pada lidah', 'X', 'text-red-500', 3),
        (problem_section_id, 'Langsung Digoreng pada Ayam Mentah', 'Bumbu tidak meresap secara optimal', 'X', 'text-red-500', 4);
    END IF;

    -- Insert content items for "marinasi_explanation"
    IF marinasi_section_id IS NOT NULL THEN
        INSERT INTO section_content_items (section_id, title, description, icon_name, icon_color, order_index) VALUES
        (marinasi_section_id, 'Lebih Juicy dan Empuk', 'Tidak hambar walau tanpa tambahan', 'Heart', 'text-green-500', 1),
        (marinasi_section_id, 'Tetap Enak Meski Disimpan dan Dipanaskan Ulang', 'Rasa tetap konsisten', 'Award', 'text-green-500', 2),
        (marinasi_section_id, 'Jika Tanpa Proses Marinasi', 'Ayam cenderung hambar, keras, dan cepat basi', 'Zap', 'text-red-500', 3);
    END IF;
END $$;