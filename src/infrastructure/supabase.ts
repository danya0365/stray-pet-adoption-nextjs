import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Type-safe Database helper
 * In a real project, you would run `npx supabase gen types typescript`
 * to generate the Database interface.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pets: {
        Row: {
          id: string
          created_at: string
          name: string
          type: string
          breed: string
          image_url: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          type: string
          breed: string
          image_url: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          type?: string
          breed?: string
          image_url?: string
          status?: string
        }
      }
    }
  }
}
