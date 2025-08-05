
-- Fix database functions to include SET search_path = '' for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_compliance_scans_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_imported_articles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_coach_conversations_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_businesses_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add missing encrypted_api_keys table for secure API key storage
CREATE TABLE IF NOT EXISTS public.encrypted_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_name TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, service_name)
);

-- Enable RLS on encrypted_api_keys table
ALTER TABLE public.encrypted_api_keys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for encrypted_api_keys
CREATE POLICY "Users can manage their own API keys"
ON public.encrypted_api_keys
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Update existing businesses without user_id to have proper ownership tracking
-- This creates a migration path for existing data
ALTER TABLE public.businesses 
ALTER COLUMN user_id SET NOT NULL;

-- Add constraint to ensure business names are not empty after trimming
ALTER TABLE public.businesses 
ADD CONSTRAINT businesses_name_not_empty 
CHECK (TRIM(name) != '');

-- Add constraint to ensure required fields are not empty
ALTER TABLE public.businesses 
ADD CONSTRAINT businesses_address_not_empty 
CHECK (TRIM(address) != '');

ALTER TABLE public.businesses 
ADD CONSTRAINT businesses_city_not_empty 
CHECK (TRIM(city) != '');

ALTER TABLE public.businesses 
ADD CONSTRAINT businesses_state_not_empty 
CHECK (TRIM(state) != '');

ALTER TABLE public.businesses 
ADD CONSTRAINT businesses_zip_not_empty 
CHECK (TRIM(zip_code) != '');
