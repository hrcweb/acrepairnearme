export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_api_keys: {
        Row: {
          created_at: string | null
          id: string
          key_name: string
          key_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_name: string
          key_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key_name?: string
          key_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          prompt: string | null
          response: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          prompt?: string | null
          response?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          prompt?: string | null
          response?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      businesses: {
        Row: {
          address: string
          business_hours: Json | null
          city: string
          created_at: string | null
          description: string | null
          email: string | null
          featured: boolean | null
          id: number
          insurance_verified: boolean | null
          latitude: number | null
          license_number: string | null
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          review_count: number | null
          services: string[] | null
          state: string
          updated_at: string | null
          website: string | null
          zip_code: string
        }
        Insert: {
          address: string
          business_hours?: Json | null
          city: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          id?: number
          insurance_verified?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          services?: string[] | null
          state: string
          updated_at?: string | null
          website?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          business_hours?: Json | null
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          id?: number
          insurance_verified?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          services?: string[] | null
          state?: string
          updated_at?: string | null
          website?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      conversions: {
        Row: {
          created_at: string | null
          detail: string | null
          id: string
          stage: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          detail?: string | null
          id?: string
          stage: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          detail?: string | null
          id?: string
          stage?: string
          user_id?: string
        }
        Relationships: []
      }
      custom_personas: {
        Row: {
          age: number | null
          biggest_fear: string | null
          core_belief: string
          created_at: string
          defining_moment: string | null
          greatest_desire: string | null
          id: string
          name: string
          relationship: string | null
          traits: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          biggest_fear?: string | null
          core_belief: string
          created_at?: string
          defining_moment?: string | null
          greatest_desire?: string | null
          id?: string
          name: string
          relationship?: string | null
          traits: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          biggest_fear?: string | null
          core_belief?: string
          created_at?: string
          defining_moment?: string | null
          greatest_desire?: string | null
          id?: string
          name?: string
          relationship?: string | null
          traits?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      custom_prompts: {
        Row: {
          description: string | null
          id: string
          last_modified: string | null
          prompt_body: string
          prompt_key: string
        }
        Insert: {
          description?: string | null
          id?: string
          last_modified?: string | null
          prompt_body: string
          prompt_key: string
        }
        Update: {
          description?: string | null
          id?: string
          last_modified?: string | null
          prompt_body?: string
          prompt_key?: string
        }
        Relationships: []
      }
      feature_requests: {
        Row: {
          admin_response: string | null
          created_at: string | null
          description: string
          id: string
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string | null
          description: string
          id?: string
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string | null
          description?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          admin_response: string | null
          created_at: string | null
          id: string
          message: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string | null
          id?: string
          message: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string | null
          id?: string
          message?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          id: string
          order_type: string | null
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          order_type?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          order_type?: string | null
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      personas: {
        Row: {
          category: string
          created_at: string
          description: string
          details: Json
          icon: string
          id: string
          name: string
          simulation: Json
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          details: Json
          icon: string
          id: string
          name: string
          simulation: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          details?: Json
          icon?: string
          id?: string
          name?: string
          simulation?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          business_id: number
          comment: string
          created_at: string
          customer_name: string
          id: string
          rating: number
          updated_at: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          business_id: number
          comment: string
          created_at?: string
          customer_name: string
          id?: string
          rating: number
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          business_id?: number
          comment?: string
          created_at?: string
          customer_name?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reviews_business"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tool_popularity: {
        Row: {
          category: string | null
          id: string
          last_used: string | null
          tool_name: string
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          id?: string
          last_used?: string | null
          tool_name: string
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          id?: string
          last_used?: string | null
          tool_name?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      user_entitlements: {
        Row: {
          created_at: string | null
          id: string
          journeys_limit: number
          journeys_used: number
          last_reset: string | null
          tier: string
          updated_at: string | null
          user_id: string
          visionary_purchased: boolean
        }
        Insert: {
          created_at?: string | null
          id?: string
          journeys_limit?: number
          journeys_used?: number
          last_reset?: string | null
          tier?: string
          updated_at?: string | null
          user_id: string
          visionary_purchased?: boolean
        }
        Update: {
          created_at?: string | null
          id?: string
          journeys_limit?: number
          journeys_used?: number
          last_reset?: string | null
          tier?: string
          updated_at?: string | null
          user_id?: string
          visionary_purchased?: boolean
        }
        Relationships: []
      }
      user_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_data: Json | null
          event_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_roles_profile"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          metadata: Json | null
          started_at: string
          summary: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string
          summary?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          started_at?: string
          summary?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
