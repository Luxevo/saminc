import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Role {
  id: number
  name: string
  description: string
  created_at: string
}

export interface User {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  role_id: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserWithRole extends User {
  roles: Role
}
