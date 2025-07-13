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
      appointment_services: {
        Row: {
          appointment_id: string
          service_id: string
        }
        Insert: {
          appointment_id: string
          service_id: string
        }
        Update: {
          appointment_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_services_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          client_id: string
          created_at: string
          end_time: string
          id: string
          notes: string | null
          professional_id: string
          start_time: string
          status: Database["public"]["Enums"]["appointment_status"]
        }
        Insert: {
          client_id: string
          created_at?: string
          end_time: string
          id?: string
          notes?: string | null
          professional_id: string
          start_time: string
          status?: Database["public"]["Enums"]["appointment_status"]
        }
        Update: {
          client_id?: string
          created_at?: string
          end_time?: string
          id?: string
          notes?: string | null
          professional_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["appointment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          email: string | null
          id: string
          last_visit_date: string | null
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          last_visit_date?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          last_visit_date?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          amount: number
          created_at: string
          id: string
          professional_id: string
          sale_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          professional_id: string
          sale_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          professional_id?: string
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          price: number
          stock_quantity: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price: number
          stock_quantity?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: number
          stock_quantity?: number
        }
        Relationships: []
      }
      professional_consumption: {
        Row: {
          amount: number
          created_at: string
          date: string
          description: string
          id: string
          professional_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          date?: string
          description: string
          id?: string
          professional_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          description?: string
          id?: string
          professional_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_consumption_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          profile_id: string | null
          specialties: string[] | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          profile_id?: string | null
          specialties?: string[] | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          profile_id?: string | null
          specialties?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: Database["public"]["Enums"]["item_type"]
          price_at_sale: number
          quantity: number
          sale_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: Database["public"]["Enums"]["item_type"]
          price_at_sale: number
          quantity?: number
          sale_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: Database["public"]["Enums"]["item_type"]
          price_at_sale?: number
          quantity?: number
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          appointment_id: string | null
          client_id: string | null
          created_at: string
          id: string
          payment_method: string | null
          professional_id: string | null
          status: Database["public"]["Enums"]["sale_status"]
          total_amount: number
        }
        Insert: {
          appointment_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string | null
          professional_id?: string | null
          status?: Database["public"]["Enums"]["sale_status"]
          total_amount: number
        }
        Update: {
          appointment_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string | null
          professional_id?: string | null
          status?: Database["public"]["Enums"]["sale_status"]
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: true
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      satisfaction_surveys: {
        Row: {
          appointment_id: string
          client_id: string | null
          created_at: string
          feedback: string | null
          id: string
          rating: number | null
        }
        Insert: {
          appointment_id: string
          client_id?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          rating?: number | null
        }
        Update: {
          appointment_id?: string
          client_id?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "satisfaction_surveys_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: true
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "satisfaction_surveys_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes: number
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appointment_status:
        | "agendado"
        | "confirmado"
        | "concluido"
        | "cancelado"
        | "nao_compareceu"
      item_type: "servico" | "produto"
      sale_status: "pago" | "pendente"
      user_role: "admin" | "professional"
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
      appointment_status: [
        "agendado",
        "confirmado",
        "concluido",
        "cancelado",
        "nao_compareceu",
      ],
      item_type: ["servico", "produto"],
      sale_status: ["pago", "pendente"],
      user_role: ["admin", "professional"],
    },
  },
} as const
