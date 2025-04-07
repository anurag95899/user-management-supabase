import { createClient } from '@supabase/supabase-js';

// Supabase project URL and public anon key from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);