
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// The SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY values already exist in the client.ts file
// We're using the same values here for consistency
const SUPABASE_URL = "https://qfkgvufaytcpmsjfsnhg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFma2d2dWZheXRjcG1zamZzbmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDI1MTQsImV4cCI6MjA2MzM3ODUxNH0.LxNbqFySs1sQNtEO5YeST_D-e_bxYju7BC6_gkWSjkc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  }
});

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { 
    user: session?.user || null, 
    session, 
    error 
  };
};
