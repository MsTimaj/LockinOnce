
-- Update RLS policies to allow anonymous access for MVP
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all access for MVP" ON public.user_profiles;

-- Create new policies that allow anonymous users to manage their own profiles
CREATE POLICY "Allow anonymous users to insert their profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous users to select their profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous users to update their profiles" ON public.user_profiles
  FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous users to delete their profiles" ON public.user_profiles
  FOR DELETE USING (true);
