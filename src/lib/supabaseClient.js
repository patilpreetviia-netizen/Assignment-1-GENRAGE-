import { createClient } from '@supabase/supabase-js';

// ==========================================================
// 1. PASTE YOUR ACTUAL SUPABASE DETAILS INSIDE THE QUOTES 👇
// ==========================================================
const supabaseUrl = 'https://qusijmraszacderhmvmj.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1c2lqbXJhc3phY2Rlcmhtdm1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTAwMTA5NCwiZXhwIjoyMDk2NTc3MDk0fQ.0Rw-XoYLClZ7ITEAT8T1fUxVDLASboyolJIorMYKZMk';
// ==========================================================

let supabaseClientInstance = null;

// This checks if you have replaced the placeholders with real credentials
if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
  try {
    // Initializes the real live database connection
    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('[GENRAGE] Live Supabase client initialized successfully!');
  } catch (error) {
    console.error('[GENRAGE] Failed to initialize Supabase client:', error);
  }
}

// 2. FALLBACK SAFETY MOCK
// If the keys are missing or still set to the placeholders, 
// this dummy client prevents your local web server from crashing.
if (!supabaseClientInstance) {
  console.warn(
    '[GENRAGE] Using fallback mock client. Please replace the placeholder keys with your real Supabase keys.'
  );

  supabaseClientInstance = {
    from: () => ({
      insert: async (data) => {
        console.warn('[GENRAGE] Mock Insert executed (Keys not configured yet). Data:', data);
        return { data: null, error: null };
      },
      select: async () => {
        console.warn('[GENRAGE] Mock Select executed (Keys not configured yet).');
        return { data: [], error: null };
      }
    })
  };
}

export const supabase = supabaseClientInstance;