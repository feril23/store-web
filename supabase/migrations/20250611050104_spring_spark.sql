/*
  # Add preview fields to books table

  1. Changes
    - Add `preview_images` field for storing multiple preview images
    - Add `preview_content` field for markdown content
    - Add `preview_type` field to specify preview type (images or markdown)

  2. Security
    - Maintain existing RLS policies
*/

-- Add new fields to books table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'books' AND column_name = 'preview_images'
  ) THEN
    ALTER TABLE books ADD COLUMN preview_images text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'books' AND column_name = 'preview_content'
  ) THEN
    ALTER TABLE books ADD COLUMN preview_content text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'books' AND column_name = 'preview_type'
  ) THEN
    ALTER TABLE books ADD COLUMN preview_type text DEFAULT 'images' CHECK (preview_type IN ('images', 'markdown'));
  END IF;
END $$;