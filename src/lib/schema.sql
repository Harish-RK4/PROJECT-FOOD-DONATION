-- Supabase Schema Setup for FoodConnect
-- INSTRUCTIONS: Open your Supabase Dashboard
-- Paste this entire file into the SQL Editor and click "Run".

CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_id TEXT NOT NULL, -- Clerk User ID
    title TEXT NOT NULL,
    quantity TEXT NOT NULL,
    expiry_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Reserved', 'Delivered')),
    type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow read access to anyone (public)
CREATE POLICY "Allow public read access"
ON public.donations
FOR SELECT
TO public
USING (true);

-- Allow authenticated users (using Clerk) to insert their own records
-- Note: A custom JWT integration or simple anonymous public insert is used for MVP 
-- depending on your Clerk-Supabase integration level. 
CREATE POLICY "Allow public insert for MVP"
ON public.donations
FOR INSERT
TO public
WITH CHECK (true);

-- MVP Update capability
CREATE POLICY "Allow public update for MVP"
ON public.donations
FOR UPDATE
TO public
USING (true);
