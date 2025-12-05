-- Create submissions table for waitlist and intake form data
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company_revenue TEXT,
  rant TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert submissions (no auth required for waitlist)
CREATE POLICY "Anyone can submit" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading own submissions or admin access later
CREATE POLICY "Public read for now" 
ON public.submissions 
FOR SELECT 
USING (true);