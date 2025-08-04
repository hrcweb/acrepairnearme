
-- Fix database functions to include proper search_path for security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    NOW(),
    NOW()
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, update it
    UPDATE public.profiles 
    SET 
      full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', full_name),
      email = COALESCE(NEW.email, email),
      updated_at = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE WARNING 'Failed to create/update profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.ensure_user_profile(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
DECLARE
  user_record record;
BEGIN
  -- Get user data from auth.users
  SELECT id, email, raw_user_meta_data
  INTO user_record
  FROM auth.users
  WHERE id = user_id;
  
  IF FOUND THEN
    -- Insert or update profile
    INSERT INTO public.profiles (id, full_name, email, created_at, updated_at)
    VALUES (
      user_record.id,
      COALESCE(user_record.raw_user_meta_data->>'full_name', ''),
      COALESCE(user_record.email, ''),
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
      email = COALESCE(EXCLUDED.email, profiles.email),
      updated_at = NOW();
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.ensure_user_setup(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  -- Insert profile if it doesn't exist
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  SELECT 
    p_user_id,
    auth.users.email,
    COALESCE(auth.users.raw_user_meta_data->>'full_name', ''),
    now(),
    now()
  FROM auth.users
  WHERE auth.users.id = p_user_id
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();

  -- Insert user entitlements if they don't exist
  INSERT INTO public.user_entitlements (user_id, tier, journeys_used, journeys_limit, created_at, updated_at)
  VALUES (p_user_id, 'free', 0, 2, now(), now())
  ON CONFLICT (user_id) DO NOTHING;

  -- Insert default user role if it doesn't exist
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (p_user_id, 'user', now())
  ON CONFLICT (user_id, role) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the function
    RAISE WARNING 'Error in ensure_user_setup for user %: %', p_user_id, SQLERRM;
END;
$$;

-- Improve business table RLS policies to be more restrictive
DROP POLICY IF EXISTS "Authenticated users can insert businesses" ON public.businesses;
DROP POLICY IF EXISTS "Authenticated users can update businesses" ON public.businesses;

-- Create more restrictive policies for business operations
CREATE POLICY "Users can insert businesses with validation" 
ON public.businesses 
FOR INSERT 
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND name IS NOT NULL 
  AND trim(name) != ''
  AND address IS NOT NULL 
  AND trim(address) != ''
  AND city IS NOT NULL 
  AND trim(city) != ''
  AND state IS NOT NULL 
  AND trim(state) != ''
  AND zip_code IS NOT NULL 
  AND trim(zip_code) != ''
);

CREATE POLICY "Users can update businesses with validation" 
ON public.businesses 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (
  name IS NOT NULL 
  AND trim(name) != ''
  AND address IS NOT NULL 
  AND trim(address) != ''
  AND city IS NOT NULL 
  AND trim(city) != ''
  AND state IS NOT NULL 
  AND trim(state) != ''
  AND zip_code IS NOT NULL 
  AND trim(zip_code) != ''
);

-- Add a user_id column to businesses table to track ownership
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON public.businesses(user_id);

-- Update business policies to respect ownership
DROP POLICY IF EXISTS "Users can update businesses with validation" ON public.businesses;

CREATE POLICY "Users can update their own businesses" 
ON public.businesses 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
  AND name IS NOT NULL 
  AND trim(name) != ''
  AND address IS NOT NULL 
  AND trim(address) != ''
  AND city IS NOT NULL 
  AND trim(city) != ''
  AND state IS NOT NULL 
  AND trim(state) != ''
  AND zip_code IS NOT NULL 
  AND trim(zip_code) != ''
);

-- Add encrypted storage for API keys
CREATE TABLE IF NOT EXISTS public.encrypted_api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_name text NOT NULL,
  encrypted_key text NOT NULL,
  key_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, service_name)
);

-- Enable RLS on encrypted API keys table
ALTER TABLE public.encrypted_api_keys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for encrypted API keys
CREATE POLICY "Users can manage their own API keys" 
ON public.encrypted_api_keys 
FOR ALL 
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
