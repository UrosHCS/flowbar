import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_SUPABASE_FUNCTIONS_BASE_URL: z.string().url(),
});

// Parse and validate environment variables
const env = envSchema.parse({
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_FUNCTIONS_BASE_URL: import.meta.env
    .VITE_SUPABASE_FUNCTIONS_BASE_URL,
});

// Export the validated config
export const config = {
  supabase: {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
  },
  api: {
    baseUrl: env.VITE_SUPABASE_FUNCTIONS_BASE_URL,
  },
};
