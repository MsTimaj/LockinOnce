
-- Create user profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  basic_info JSONB DEFAULT '{}',
  assessment_results JSONB DEFAULT '{}',
  readiness_score JSONB,
  onboarding_completed BOOLEAN DEFAULT false,
  current_step JSONB DEFAULT '{"phase": 1, "step": 1}'
);

-- Enable RLS (but make it permissive for MVP)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create a very permissive policy for MVP - anyone can access any profile
-- This allows the app to work without authentication
CREATE POLICY "Allow all access for MVP" ON public.user_profiles
  FOR ALL USING (true) WITH CHECK (true);

-- Create an index for faster lookups
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles(created_at);
