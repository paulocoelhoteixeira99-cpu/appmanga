-- 007: Make first_name nullable (signup no longer collects name — collected in onboarding identification step)

-- Drop the NOT NULL constraint on first_name (if it exists)
ALTER TABLE public.profiles
  ALTER COLUMN first_name DROP NOT NULL;
