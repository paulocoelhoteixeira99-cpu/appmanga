-- 006: Make phone nullable (signup no longer collects phone — collected in onboarding identification step)
-- Also update the trigger to handle null metadata gracefully.

-- 1. Drop the NOT NULL constraint on phone (if it exists)
ALTER TABLE public.profiles
  ALTER COLUMN phone DROP NOT NULL;

-- 2. Replace the trigger function to handle null first_name / phone
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', NEW.raw_user_meta_data ->> 'full_name'),
    NEW.raw_user_meta_data ->> 'phone'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = COALESCE(public.profiles.first_name, EXCLUDED.first_name),
    phone = COALESCE(public.profiles.phone, EXCLUDED.phone);

  RETURN NEW;
END;
$$;
