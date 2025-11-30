/**
 * Database type definitions for Supabase
 * These types ensure type-safe database operations
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ReceiptType = 'product' | 'service';
export type ReceiptDimension = 'a4' | 'a5' | 'thermal-80mm' | 'thermal-58mm' | 'letter';
export type ReceiptStatus = 'draft' | 'completed' | 'void';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          is_premium: boolean;
          premium_expires_at: string | null;
          business_name: string | null;
          business_address: string | null;
          business_phone: string | null;
          business_email: string | null;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean;
          premium_expires_at?: string | null;
          business_name?: string | null;
          business_address?: string | null;
          business_phone?: string | null;
          business_email?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean;
          premium_expires_at?: string | null;
          business_name?: string | null;
          business_address?: string | null;
          business_phone?: string | null;
          business_email?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      products_services: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: ReceiptType;
          default_price: number | null;
          description: string | null;
          unit: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: ReceiptType;
          default_price?: number | null;
          description?: string | null;
          unit?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: ReceiptType;
          default_price?: number | null;
          description?: string | null;
          unit?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_services_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      invoices: {
        Row: {
          id: string;
          user_id: string;
          receipt_number: string;
          receipt_type: ReceiptType;
          customer_name: string;
          customer_email: string | null;
          customer_phone: string | null;
          items: Json;
          total_amount: number;
          currency: string;
          notes: string | null;
          dimension: ReceiptDimension;
          template_id: string;
          status: ReceiptStatus;
          downloaded_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          receipt_number: string;
          receipt_type?: ReceiptType;
          customer_name: string;
          customer_email?: string | null;
          customer_phone?: string | null;
          items: Json;
          total_amount: number;
          currency?: string;
          notes?: string | null;
          dimension?: ReceiptDimension;
          template_id?: string;
          status?: ReceiptStatus;
          downloaded_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          receipt_number?: string;
          receipt_type?: ReceiptType;
          customer_name?: string;
          customer_email?: string | null;
          customer_phone?: string | null;
          items?: Json;
          total_amount?: number;
          currency?: string;
          notes?: string | null;
          dimension?: ReceiptDimension;
          template_id?: string;
          status?: ReceiptStatus;
          downloaded_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      receipt_templates: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          preview_url: string | null;
          is_premium: boolean;
          price: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          preview_url?: string | null;
          is_premium?: boolean;
          price?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          preview_url?: string | null;
          is_premium?: boolean;
          price?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      user_templates: {
        Row: {
          id: string;
          user_id: string;
          template_id: string;
          purchased_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          template_id: string;
          purchased_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          template_id?: string;
          purchased_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_templates_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_templates_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "receipt_templates";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Helper types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Invoice = Database['public']['Tables']['invoices']['Row'];
export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert'];
export type ProductService = Database['public']['Tables']['products_services']['Row'];
export type ProductServiceInsert = Database['public']['Tables']['products_services']['Insert'];
export type ReceiptTemplate = Database['public']['Tables']['receipt_templates']['Row'];
export type UserTemplate = Database['public']['Tables']['user_templates']['Row'];
