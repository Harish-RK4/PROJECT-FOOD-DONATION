-- PHASE 8: MAP INTEGRATION UPDATE
-- INSTRUCTIONS: Open your Supabase Dashboard SQL Editor
-- Paste this file and click "Run" to add Location capabilities to your MVP.

-- This modifies the existing table to support geography.
ALTER TABLE public.donations
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS contact_info TEXT,
ADD COLUMN IF NOT EXISTS latitude FLOAT,
ADD COLUMN IF NOT EXISTS longitude FLOAT,
ADD COLUMN IF NOT EXISTS image_data TEXT;

-- Allow public update for MVP
CREATE POLICY "Allow public update for MVP"
ON public.donations
FOR UPDATE
TO public
USING (true);

-- Allow public delete for MVP
CREATE POLICY "Allow public delete for MVP"
ON public.donations
FOR DELETE
TO public
USING (true);
