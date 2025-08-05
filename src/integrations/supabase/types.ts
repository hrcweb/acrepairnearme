export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      admin_metrics: {
        Row: {
          created_at: string | null
          id: string
          metric_name: string
          metric_value: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          metric_name: string
          metric_value: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          metric_name?: string
          metric_value?: Json
        }
        Relationships: []
      }
      ai_appraisal_logs: {
        Row: {
          confidence_score: number | null
          created_at: string
          description: string | null
          era: string | null
          estimated_value_high: number | null
          estimated_value_low: number | null
          id: string
          image_urls: string[] | null
          jewelry_type: string | null
          materials: string[] | null
          recommendations: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          era?: string | null
          estimated_value_high?: number | null
          estimated_value_low?: number | null
          id?: string
          image_urls?: string[] | null
          jewelry_type?: string | null
          materials?: string[] | null
          recommendations?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          era?: string | null
          estimated_value_high?: number | null
          estimated_value_low?: number | null
          id?: string
          image_urls?: string[] | null
          jewelry_type?: string | null
          materials?: string[] | null
          recommendations?: string[] | null
          updated_at?: string
          user_id?: string | null
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
      business_health_scores: {
        Row: {
          category_scores: Json
          created_at: string
          id: string
          overall_score: number
          recommendations: Json | null
          user_id: string
          week_start_date: string
        }
        Insert: {
          category_scores: Json
          created_at?: string
          id?: string
          overall_score: number
          recommendations?: Json | null
          user_id: string
          week_start_date: string
        }
        Update: {
          category_scores?: Json
          created_at?: string
          id?: string
          overall_score?: number
          recommendations?: Json | null
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
      business_ideas: {
        Row: {
          category: string
          competition_level: string | null
          created_at: string
          description: string
          difficulty_level: string | null
          featured: boolean | null
          id: string
          investment_required: number | null
          likes_count: number | null
          market_size: string | null
          price: number | null
          revenue_model: string | null
          status: string
          tags: string[] | null
          target_audience: string | null
          time_to_market_months: number | null
          title: string
          updated_at: string
          user_id: string
          validation_score: number | null
          views_count: number | null
        }
        Insert: {
          category: string
          competition_level?: string | null
          created_at?: string
          description: string
          difficulty_level?: string | null
          featured?: boolean | null
          id?: string
          investment_required?: number | null
          likes_count?: number | null
          market_size?: string | null
          price?: number | null
          revenue_model?: string | null
          status?: string
          tags?: string[] | null
          target_audience?: string | null
          time_to_market_months?: number | null
          title: string
          updated_at?: string
          user_id: string
          validation_score?: number | null
          views_count?: number | null
        }
        Update: {
          category?: string
          competition_level?: string | null
          created_at?: string
          description?: string
          difficulty_level?: string | null
          featured?: boolean | null
          id?: string
          investment_required?: number | null
          likes_count?: number | null
          market_size?: string | null
          price?: number | null
          revenue_model?: string | null
          status?: string
          tags?: string[] | null
          target_audience?: string | null
          time_to_market_months?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          validation_score?: number | null
          views_count?: number | null
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
          website?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          metrics: Json | null
          name: string
          start_date: string
          status: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name: string
          start_date: string
          status?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          start_date?: string
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      checkout_sessions: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          plan_name: string
          status: string | null
          stripe_session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          plan_name: string
          status?: string | null
          stripe_session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          plan_name?: string
          status?: string | null
          stripe_session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      coach_conversations: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          last_message_at: string
          messages: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          last_message_at?: string
          messages?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          last_message_at?: string
          messages?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "community_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_likes: {
        Row: {
          comment_id: string | null
          created_at: string
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "community_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string | null
          comments_count: number | null
          content: string
          created_at: string
          crop_details: Json | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          likes_count: number | null
          post_type: string
          success_metrics: Json | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          comments_count?: number | null
          content: string
          created_at?: string
          crop_details?: Json | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          likes_count?: number | null
          post_type: string
          success_metrics?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string
          crop_details?: Json | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          likes_count?: number | null
          post_type?: string
          success_metrics?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      competitor_alerts: {
        Row: {
          alert_type: string
          competitor_name: string
          created_at: string
          id: string
          is_active: boolean | null
          keyword_triggers: string[] | null
          user_id: string
        }
        Insert: {
          alert_type: string
          competitor_name: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keyword_triggers?: string[] | null
          user_id: string
        }
        Update: {
          alert_type?: string
          competitor_name?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keyword_triggers?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      competitor_notifications: {
        Row: {
          alert_id: string
          created_at: string
          description: string
          id: string
          is_read: boolean | null
          severity: string | null
          title: string
          url: string | null
          user_id: string
        }
        Insert: {
          alert_id: string
          created_at?: string
          description: string
          id?: string
          is_read?: boolean | null
          severity?: string | null
          title: string
          url?: string | null
          user_id: string
        }
        Update: {
          alert_id?: string
          created_at?: string
          description?: string
          id?: string
          is_read?: boolean | null
          severity?: string | null
          title?: string
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitor_notifications_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "competitor_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_documents: {
        Row: {
          created_at: string
          document_type: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          scan_id: string
        }
        Insert: {
          created_at?: string
          document_type?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          scan_id: string
        }
        Update: {
          created_at?: string
          document_type?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          scan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_documents_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "compliance_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_findings: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          issue_type: string
          recommendation: string | null
          regulation: string
          scan_id: string
          severity: string
          status: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          issue_type: string
          recommendation?: string | null
          regulation: string
          scan_id: string
          severity?: string
          status?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          issue_type?: string
          recommendation?: string | null
          regulation?: string
          scan_id?: string
          severity?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_findings_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "compliance_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_scans: {
        Row: {
          business_name: string
          business_type: string | null
          compliance_results: Json | null
          created_at: string
          employee_count: string | null
          id: string
          industry: string | null
          overall_score: number | null
          recommendations: Json | null
          scan_type: string
          status: string
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          business_name: string
          business_type?: string | null
          compliance_results?: Json | null
          created_at?: string
          employee_count?: string | null
          id?: string
          industry?: string | null
          overall_score?: number | null
          recommendations?: Json | null
          scan_type?: string
          status?: string
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string | null
          compliance_results?: Json | null
          created_at?: string
          employee_count?: string | null
          id?: string
          industry?: string | null
          overall_score?: number | null
          recommendations?: Json | null
          scan_type?: string
          status?: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metrics: Json | null
          status: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metrics?: Json | null
          status?: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metrics?: Json | null
          status?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
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
      coworking_sessions: {
        Row: {
          created_at: string
          current_participants: number | null
          description: string | null
          duration_minutes: number
          host_id: string
          id: string
          max_participants: number | null
          room_link: string | null
          session_date: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          duration_minutes?: number
          host_id: string
          id?: string
          max_participants?: number | null
          room_link?: string | null
          session_date: string
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          duration_minutes?: number
          host_id?: string
          id?: string
          max_participants?: number | null
          room_link?: string | null
          session_date?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      custom_personas: {
        Row: {
          age: number | null
          avatar_url: string | null
          biggest_fear: string | null
          content_focus: string | null
          content_style: string | null
          core_belief: string
          created_at: string
          defining_moment: string | null
          expertise_level: string | null
          greatest_desire: string | null
          id: string
          industry: string | null
          name: string
          posting_frequency: string | null
          relationship: string | null
          target_audience: string | null
          traits: string
          updated_at: string
          user_id: string
          voice_id: string | null
          voice_style: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          biggest_fear?: string | null
          content_focus?: string | null
          content_style?: string | null
          core_belief: string
          created_at?: string
          defining_moment?: string | null
          expertise_level?: string | null
          greatest_desire?: string | null
          id?: string
          industry?: string | null
          name: string
          posting_frequency?: string | null
          relationship?: string | null
          target_audience?: string | null
          traits: string
          updated_at?: string
          user_id: string
          voice_id?: string | null
          voice_style?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          biggest_fear?: string | null
          content_focus?: string | null
          content_style?: string | null
          core_belief?: string
          created_at?: string
          defining_moment?: string | null
          expertise_level?: string | null
          greatest_desire?: string | null
          id?: string
          industry?: string | null
          name?: string
          posting_frequency?: string | null
          relationship?: string | null
          target_audience?: string | null
          traits?: string
          updated_at?: string
          user_id?: string
          voice_id?: string | null
          voice_style?: string | null
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
      daily_challenges: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty_level: string
          id: string
          is_active: boolean
          points_reward: number
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty_level: string
          id?: string
          is_active?: boolean
          points_reward?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty_level?: string
          id?: string
          is_active?: boolean
          points_reward?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      discussion_activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          discussion_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          discussion_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          discussion_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_activity_logs_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          ai_suggestion: string | null
          author: string | null
          comments: number | null
          content: string
          created_at: string
          final_response: string | null
          id: string
          platform: string
          status: string
          subreddit: string | null
          tags: string[] | null
          timestamp: string
          title: string
          updated_at: string
          upvotes: number | null
          url: string
          user_id: string
        }
        Insert: {
          ai_suggestion?: string | null
          author?: string | null
          comments?: number | null
          content: string
          created_at?: string
          final_response?: string | null
          id?: string
          platform: string
          status?: string
          subreddit?: string | null
          tags?: string[] | null
          timestamp: string
          title: string
          updated_at?: string
          upvotes?: number | null
          url: string
          user_id: string
        }
        Update: {
          ai_suggestion?: string | null
          author?: string | null
          comments?: number | null
          content?: string
          created_at?: string
          final_response?: string | null
          id?: string
          platform?: string
          status?: string
          subreddit?: string | null
          tags?: string[] | null
          timestamp?: string
          title?: string
          updated_at?: string
          upvotes?: number | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          click_count: number | null
          content: string
          created_at: string
          created_by: string | null
          html_content: string | null
          id: string
          name: string
          open_count: number | null
          recipient_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          click_count?: number | null
          content: string
          created_at?: string
          created_by?: string | null
          html_content?: string | null
          id?: string
          name: string
          open_count?: number | null
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          click_count?: number | null
          content?: string
          created_at?: string
          created_by?: string | null
          html_content?: string | null
          id?: string
          name?: string
          open_count?: number | null
          recipient_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_sends: {
        Row: {
          bounced_at: string | null
          campaign_id: string
          clicked_at: string | null
          id: string
          opened_at: string | null
          sent_at: string
          status: string
          subscriber_id: string
          unsubscribed_at: string | null
        }
        Insert: {
          bounced_at?: string | null
          campaign_id: string
          clicked_at?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string
          status?: string
          subscriber_id: string
          unsubscribed_at?: string | null
        }
        Update: {
          bounced_at?: string | null
          campaign_id?: string
          clicked_at?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string
          status?: string
          subscriber_id?: string
          unsubscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "email_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      email_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string
          source: string | null
          subscribed_at: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name: string
          source?: string | null
          subscribed_at?: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          source?: string | null
          subscribed_at?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      encrypted_api_keys: {
        Row: {
          created_at: string
          encrypted_key: string
          id: string
          key_hash: string
          service_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          encrypted_key: string
          id?: string
          key_hash: string
          service_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          encrypted_key?: string
          id?: string
          key_hash?: string
          service_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      expert_sessions: {
        Row: {
          created_at: string
          current_participants: number | null
          description: string
          duration_minutes: number
          expert_id: string
          id: string
          max_participants: number | null
          meeting_link: string | null
          recording_link: string | null
          session_date: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          description: string
          duration_minutes?: number
          expert_id: string
          id?: string
          max_participants?: number | null
          meeting_link?: string | null
          recording_link?: string | null
          session_date: string
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          description?: string
          duration_minutes?: number
          expert_id?: string
          id?: string
          max_participants?: number | null
          meeting_link?: string | null
          recording_link?: string | null
          session_date?: string
          status?: string
          title?: string
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
      idea_validation_history: {
        Row: {
          created_at: string
          id: string
          idea_description: string
          idea_title: string
          market_analysis: Json | null
          trends_data: Json | null
          user_id: string
          validation_score: number
        }
        Insert: {
          created_at?: string
          id?: string
          idea_description: string
          idea_title: string
          market_analysis?: Json | null
          trends_data?: Json | null
          user_id: string
          validation_score: number
        }
        Update: {
          created_at?: string
          id?: string
          idea_description?: string
          idea_title?: string
          market_analysis?: Json | null
          trends_data?: Json | null
          user_id?: string
          validation_score?: number
        }
        Relationships: []
      }
      imported_articles: {
        Row: {
          author: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          html_content: string | null
          id: string
          imported_at: string
          metadata: Json | null
          published_date: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          html_content?: string | null
          id?: string
          imported_at?: string
          metadata?: Json | null
          published_date?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          html_content?: string | null
          id?: string
          imported_at?: string
          metadata?: Json | null
          published_date?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      influencer_campaigns: {
        Row: {
          budget_range: string | null
          call_to_action: string | null
          campaign_goal: string
          created_at: string
          deadline: string | null
          id: string
          influencer_id: string
          key_benefits: string | null
          metrics: Json | null
          platform: string | null
          product_description: string
          product_name: string
          status: string | null
          target_keywords: string | null
          target_tone: string
          updated_at: string
          user_id: string
          video_length: number
          video_project_id: string | null
        }
        Insert: {
          budget_range?: string | null
          call_to_action?: string | null
          campaign_goal: string
          created_at?: string
          deadline?: string | null
          id?: string
          influencer_id: string
          key_benefits?: string | null
          metrics?: Json | null
          platform?: string | null
          product_description: string
          product_name: string
          status?: string | null
          target_keywords?: string | null
          target_tone?: string
          updated_at?: string
          user_id: string
          video_length?: number
          video_project_id?: string | null
        }
        Update: {
          budget_range?: string | null
          call_to_action?: string | null
          campaign_goal?: string
          created_at?: string
          deadline?: string | null
          id?: string
          influencer_id?: string
          key_benefits?: string | null
          metrics?: Json | null
          platform?: string | null
          product_description?: string
          product_name?: string
          status?: string | null
          target_keywords?: string | null
          target_tone?: string
          updated_at?: string
          user_id?: string
          video_length?: number
          video_project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_campaigns_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "custom_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "influencer_campaigns_video_project_id_fkey"
            columns: ["video_project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string
          description: string
          difficulty_level: string
          estimated_duration: string
          id: string
          is_premium: boolean | null
          modules: Json
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty_level: string
          estimated_duration: string
          id?: string
          is_premium?: boolean | null
          modules?: Json
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty_level?: string
          estimated_duration?: string
          id?: string
          is_premium?: boolean | null
          modules?: Json
          title?: string
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
      posts: {
        Row: {
          content: string
          created_at: string
          hashtags: string
          id: string
          platform: string
          tone: string
          topic: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          hashtags: string
          id?: string
          platform: string
          tone: string
          topic: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          hashtags?: string
          id?: string
          platform?: string
          tone?: string
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          badge_count: number | null
          bio: string | null
          created_at: string
          email: string | null
          experience_level: string | null
          favorite_plants: string[] | null
          full_name: string | null
          growing_method: string[] | null
          id: string
          location: string | null
          points: number | null
          posts_count: number | null
          social_links: Json | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          badge_count?: number | null
          bio?: string | null
          created_at?: string
          email?: string | null
          experience_level?: string | null
          favorite_plants?: string[] | null
          full_name?: string | null
          growing_method?: string[] | null
          id: string
          location?: string | null
          points?: number | null
          posts_count?: number | null
          social_links?: Json | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          badge_count?: number | null
          bio?: string | null
          created_at?: string
          email?: string | null
          experience_level?: string | null
          favorite_plants?: string[] | null
          full_name?: string | null
          growing_method?: string[] | null
          id?: string
          location?: string | null
          points?: number | null
          posts_count?: number | null
          social_links?: Json | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          competitors: string[] | null
          created_at: string | null
          id: string
          keywords: string[] | null
          name: string
          niche: string
          url: string | null
          user_id: string
        }
        Insert: {
          competitors?: string[] | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          name: string
          niche: string
          url?: string | null
          user_id: string
        }
        Update: {
          competitors?: string[] | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          name?: string
          niche?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          business_id: number
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string
          service: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          business_id: number
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone: string
          service: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          business_id?: number
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          service?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      render_jobs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          output_url: string | null
          progress_percentage: number | null
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          output_url?: string | null
          progress_percentage?: number | null
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          output_url?: string | null
          progress_percentage?: number | null
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "render_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
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
      session_registrations: {
        Row: {
          attended: boolean | null
          created_at: string
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          created_at?: string
          id?: string
          session_id: string
          user_id: string
        }
        Update: {
          attended?: boolean | null
          created_at?: string
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_registrations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "expert_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customers: {
        Row: {
          created_at: string | null
          customer_id: string
          deleted_at: string | null
          id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          deleted_at?: string | null
          id?: never
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          deleted_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stripe_orders: {
        Row: {
          amount_subtotal: number
          amount_total: number
          checkout_session_id: string
          created_at: string | null
          currency: string
          customer_id: string
          deleted_at: string | null
          id: number
          payment_intent_id: string
          payment_status: string
          status: Database["public"]["Enums"]["stripe_order_status"]
          updated_at: string | null
        }
        Insert: {
          amount_subtotal: number
          amount_total: number
          checkout_session_id: string
          created_at?: string | null
          currency: string
          customer_id: string
          deleted_at?: string | null
          id?: never
          payment_intent_id: string
          payment_status: string
          status?: Database["public"]["Enums"]["stripe_order_status"]
          updated_at?: string | null
        }
        Update: {
          amount_subtotal?: number
          amount_total?: number
          checkout_session_id?: string
          created_at?: string | null
          currency?: string
          customer_id?: string
          deleted_at?: string | null
          id?: never
          payment_intent_id?: string
          payment_status?: string
          status?: Database["public"]["Enums"]["stripe_order_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      stripe_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: number | null
          current_period_start: number | null
          customer_id: string
          deleted_at: string | null
          id: number
          payment_method_brand: string | null
          payment_method_last4: string | null
          price_id: string | null
          status: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer_id: string
          deleted_at?: string | null
          id?: never
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          price_id?: string | null
          status: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: number | null
          current_period_start?: number | null
          customer_id?: string
          deleted_at?: string | null
          id?: never
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          price_id?: string | null
          status?: Database["public"]["Enums"]["stripe_subscription_status"]
          subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stripe_webhook_events: {
        Row: {
          api_version: string | null
          created: string | null
          data: Json | null
          event_type: string
          id: string
          processed: boolean | null
          processing_attempts: number | null
          processing_error: string | null
          received_at: string | null
        }
        Insert: {
          api_version?: string | null
          created?: string | null
          data?: Json | null
          event_type: string
          id: string
          processed?: boolean | null
          processing_attempts?: number | null
          processing_error?: string | null
          received_at?: string | null
        }
        Update: {
          api_version?: string | null
          created?: string | null
          data?: Json | null
          event_type?: string
          id?: string
          processed?: boolean | null
          processing_attempts?: number | null
          processing_error?: string | null
          received_at?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          plan_type: string | null
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
          plan_type?: string | null
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
          plan_type?: string | null
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
      success_stories: {
        Row: {
          achievement_type: string
          created_at: string
          description: string
          id: string
          is_featured: boolean | null
          likes_count: number | null
          metrics: Json | null
          title: string
          user_id: string
        }
        Insert: {
          achievement_type: string
          created_at?: string
          description: string
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          metrics?: Json | null
          title: string
          user_id: string
        }
        Update: {
          achievement_type?: string
          created_at?: string
          description?: string
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          metrics?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      success_story_likes: {
        Row: {
          created_at: string
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "success_story_likes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "success_stories"
            referencedColumns: ["id"]
          },
        ]
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
      user_assets: {
        Row: {
          asset_type: string
          bucket_name: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          metadata: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          asset_type: string
          bucket_name: string
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          metadata?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          asset_type?: string
          bucket_name?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          metadata?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string
          id: string
          points_earned: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          points_earned?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          points_earned?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
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
      user_goals: {
        Row: {
          created_at: string
          description: string | null
          id: string
          priority: string
          progress_percentage: number | null
          reminders: Json | null
          status: string
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          progress_percentage?: number | null
          reminders?: Json | null
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          progress_percentage?: number | null
          reminders?: Json | null
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          completed_at: string | null
          completed_modules: Json | null
          id: string
          learning_path_id: string
          progress_percentage: number | null
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_modules?: Json | null
          id?: string
          learning_path_id: string
          progress_percentage?: number | null
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_modules?: Json | null
          id?: string
          learning_path_id?: string
          progress_percentage?: number | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          badges: Json | null
          created_at: string
          id: string
          last_activity_date: string | null
          level: number
          streak_days: number | null
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          badges?: Json | null
          created_at?: string
          id?: string
          last_activity_date?: string | null
          level?: number
          streak_days?: number | null
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          badges?: Json | null
          created_at?: string
          id?: string
          last_activity_date?: string | null
          level?: number
          streak_days?: number | null
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_revenue: {
        Row: {
          business_name: string
          created_at: string
          id: string
          notes: string | null
          revenue_amount: number
          revenue_date: string
          source: string | null
          user_id: string
        }
        Insert: {
          business_name: string
          created_at?: string
          id?: string
          notes?: string | null
          revenue_amount: number
          revenue_date: string
          source?: string | null
          user_id: string
        }
        Update: {
          business_name?: string
          created_at?: string
          id?: string
          notes?: string | null
          revenue_amount?: number
          revenue_date?: string
          source?: string | null
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
      user_settings: {
        Row: {
          auto_approve: boolean
          auto_mode: boolean
          content_type: string
          created_at: string
          exclude_own_posts: boolean
          id: string
          min_upvotes: number
          notifications: boolean
          platforms: string[]
          posts_per_search: number
          response_style: string
          response_tone: string
          topics: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_approve?: boolean
          auto_mode?: boolean
          content_type?: string
          created_at?: string
          exclude_own_posts?: boolean
          id?: string
          min_upvotes?: number
          notifications?: boolean
          platforms?: string[]
          posts_per_search?: number
          response_style?: string
          response_tone?: string
          topics?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_approve?: boolean
          auto_mode?: boolean
          content_type?: string
          created_at?: string
          exclude_own_posts?: boolean
          id?: string
          min_upvotes?: number
          notifications?: boolean
          platforms?: string[]
          posts_per_search?: number
          response_style?: string
          response_tone?: string
          topics?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_projects: {
        Row: {
          concept: string
          created_at: string
          id: string
          script: string | null
          status: string
          title: string
          tone: string
          updated_at: string
          user_id: string
          video_length: number
        }
        Insert: {
          concept: string
          created_at?: string
          id?: string
          script?: string | null
          status?: string
          title: string
          tone: string
          updated_at?: string
          user_id: string
          video_length: number
        }
        Update: {
          concept?: string
          created_at?: string
          id?: string
          script?: string | null
          status?: string
          title?: string
          tone?: string
          updated_at?: string
          user_id?: string
          video_length?: number
        }
        Relationships: []
      }
      video_scenes: {
        Row: {
          background_music_url: string | null
          created_at: string
          duration_seconds: number | null
          id: string
          project_id: string
          scene_number: number
          scene_type: string
          script_content: string
          title: string
          updated_at: string
          visual_description: string
          voiceover_url: string | null
        }
        Insert: {
          background_music_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          project_id: string
          scene_number: number
          scene_type?: string
          script_content: string
          title: string
          updated_at?: string
          visual_description: string
          voiceover_url?: string | null
        }
        Update: {
          background_music_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          project_id?: string
          scene_number?: number
          scene_type?: string
          script_content?: string
          title?: string
          updated_at?: string
          visual_description?: string
          voiceover_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_scenes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      visitor_tracking: {
        Row: {
          browser_name: string | null
          created_at: string | null
          device_type: string | null
          id: string
          ip_address: unknown | null
          location_city: string | null
          location_country: string | null
          page_url: string
          referrer: string | null
          session_id: string
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          visit_duration: number | null
        }
        Insert: {
          browser_name?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          location_city?: string | null
          location_country?: string | null
          page_url: string
          referrer?: string | null
          session_id: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          visit_duration?: number | null
        }
        Update: {
          browser_name?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          location_city?: string | null
          location_country?: string | null
          page_url?: string
          referrer?: string | null
          session_id?: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          visit_duration?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      stripe_user_orders: {
        Row: {
          amount_subtotal: number | null
          amount_total: number | null
          checkout_session_id: string | null
          currency: string | null
          customer_id: string | null
          order_date: string | null
          order_id: number | null
          order_status:
            | Database["public"]["Enums"]["stripe_order_status"]
            | null
          payment_intent_id: string | null
          payment_status: string | null
        }
        Relationships: []
      }
      stripe_user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          current_period_end: number | null
          current_period_start: number | null
          customer_id: string | null
          payment_method_brand: string | null
          payment_method_last4: string | null
          price_id: string | null
          subscription_id: string | null
          subscription_status:
            | Database["public"]["Enums"]["stripe_subscription_status"]
            | null
        }
        Relationships: []
      }
    }
    Functions: {
      ensure_user_profile: {
        Args: { user_id: string }
        Returns: undefined
      }
      ensure_user_setup: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      has_role: {
        Args:
          | {
              check_user_id: string
              role_name: Database["public"]["Enums"]["app_role"]
            }
          | { user_id: string; role_name: string }
        Returns: boolean
      }
      make_user_admin: {
        Args: { user_email: string }
        Returns: undefined
      }
      track_user_event: {
        Args:
          | {
              p_user_id: string
              p_event_type: string
              p_description?: string
              p_event_data?: Json
            }
          | { p_user_id: string; p_event_type: string; p_event_data?: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      stripe_order_status: "pending" | "completed" | "canceled"
      stripe_subscription_status:
        | "not_started"
        | "incomplete"
        | "incomplete_expired"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      stripe_order_status: ["pending", "completed", "canceled"],
      stripe_subscription_status: [
        "not_started",
        "incomplete",
        "incomplete_expired",
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
        "paused",
      ],
    },
  },
} as const
