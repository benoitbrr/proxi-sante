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
      profiles: {
        Row: {
          id: string
          email: string
          role: 'medecin' | 'structure' | 'admin'
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'medecin' | 'structure' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'medecin' | 'structure' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      structures: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          description: string | null
          address: string
          city: string
          postal_code: string
          latitude: number
          longitude: number
          logo_url: string | null
          siret: string | null
          is_verified: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          description?: string | null
          address: string
          city: string
          postal_code: string
          latitude: number
          longitude: number
          logo_url?: string | null
          siret?: string | null
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          description?: string | null
          address?: string
          city?: string
          postal_code?: string
          latitude?: number
          longitude?: number
          logo_url?: string | null
          siret?: string | null
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      structure_media: {
        Row: {
          id: string
          structure_id: string
          type: 'image' | 'video'
          url: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          structure_id: string
          type: 'image' | 'video'
          url: string
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          structure_id?: string
          type?: 'image' | 'video'
          url?: string
          order?: number
          created_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          structure_id: string
          title: string
          specialty: string
          contract_type: 'CDI' | 'CDD' | 'Stage' | 'Remplacement' | 'Remplacement ponctuel' | 'Libéral'
          is_full_time: boolean
          salary_min: number | null
          salary_max: number | null
          description: string | null
          requirements: string | null
          is_active: boolean
          views_count: number
          favorites_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          structure_id: string
          title: string
          specialty: string
          contract_type: 'CDI' | 'CDD' | 'Stage' | 'Remplacement' | 'Remplacement ponctuel' | 'Libéral'
          is_full_time?: boolean
          salary_min?: number | null
          salary_max?: number | null
          description?: string | null
          requirements?: string | null
          is_active?: boolean
          views_count?: number
          favorites_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          structure_id?: string
          title?: string
          specialty?: string
          contract_type?: 'CDI' | 'CDD' | 'Stage' | 'Remplacement' | 'Remplacement ponctuel' | 'Libéral'
          is_full_time?: boolean
          salary_min?: number | null
          salary_max?: number | null
          description?: string | null
          requirements?: string | null
          is_active?: boolean
          views_count?: number
          favorites_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          offer_id: string
          medecin_id: string
          structure_id: string
          last_message_at: string
          created_at: string
        }
        Insert: {
          id?: string
          offer_id: string
          medecin_id: string
          structure_id: string
          last_message_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          offer_id?: string
          medecin_id?: string
          structure_id?: string
          last_message_at?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          offer_id: string | null
          structure_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          offer_id?: string | null
          structure_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          offer_id?: string | null
          structure_id?: string | null
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          reported_type: 'offer' | 'structure' | 'user'
          reported_id: string
          reason: string
          status: 'pending' | 'reviewed' | 'resolved'
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          reported_type: 'offer' | 'structure' | 'user'
          reported_id: string
          reason: string
          status?: 'pending' | 'reviewed' | 'resolved'
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          reported_type?: 'offer' | 'structure' | 'user'
          reported_id?: string
          reason?: string
          status?: 'pending' | 'reviewed' | 'resolved'
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          structure_id: string
          stripe_customer_id: string
          stripe_subscription_id: string
          status: 'active' | 'canceled' | 'past_due'
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          structure_id: string
          stripe_customer_id: string
          stripe_subscription_id: string
          status: 'active' | 'canceled' | 'past_due'
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          structure_id?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          status?: 'active' | 'canceled' | 'past_due'
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
