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
      RoleOwner: {
        Row: {
          createdAt: string | null
          id: string
          roleID: string
          subscriberID: string
        }
        Insert: {
          createdAt?: string | null
          id?: string
          roleID: string
          subscriberID: string
        }
        Update: {
          createdAt?: string | null
          id?: string
          roleID?: string
          subscriberID?: string
        }
        Relationships: [
          {
            foreignKeyName: "roleowner_roleid_fkey"
            columns: ["roleID"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roleowner_roleid_fkey"
            columns: ["roleID"]
            isOneToOne: false
            referencedRelation: "RolesSkillsView"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roleowner_subscriberid_fkey"
            columns: ["subscriberID"]
            isOneToOne: false
            referencedRelation: "Subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roleowner_subscriberid_fkey"
            columns: ["subscriberID"]
            isOneToOne: false
            referencedRelation: "SubscriberSkillsView"
            referencedColumns: ["id"]
          },
        ]
      }
      Roles: {
        Row: {
          company: string | null
          company_logo: string | null
          country: string
          createdAt: string
          currency: string | null
          description: string
          englishLevel: Database["public"]["Enums"]["EnglishLevel"] | null
          id: string
          language: Database["public"]["Enums"]["RoleLanguage"]
          minimumYears: number | null
          ready: boolean
          salary: string | null
          skillsId: string[] | null
          title: string
          topicId: number | null
          updatedAt: string
          url: string | null
        }
        Insert: {
          company?: string | null
          company_logo?: string | null
          country: string
          createdAt?: string
          currency?: string | null
          description: string
          englishLevel?: Database["public"]["Enums"]["EnglishLevel"] | null
          id?: string
          language: Database["public"]["Enums"]["RoleLanguage"]
          minimumYears?: number | null
          ready?: boolean
          salary?: string | null
          skillsId?: string[] | null
          title: string
          topicId?: number | null
          updatedAt: string
          url?: string | null
        }
        Update: {
          company?: string | null
          company_logo?: string | null
          country?: string
          createdAt?: string
          currency?: string | null
          description?: string
          englishLevel?: Database["public"]["Enums"]["EnglishLevel"] | null
          id?: string
          language?: Database["public"]["Enums"]["RoleLanguage"]
          minimumYears?: number | null
          ready?: boolean
          salary?: string | null
          skillsId?: string[] | null
          title?: string
          topicId?: number | null
          updatedAt?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Roles_topicId_fkey"
            columns: ["topicId"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
        ]
      }
      rolesRecommendation: {
        Row: {
          company: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: number
          isapproved: boolean | null
          language: Database["public"]["Enums"]["RoleLanguage"] | null
          minimum_years: number | null
          salary: number | null
          title: string | null
          topic_id: number | null
          url: string | null
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          isapproved?: boolean | null
          language?: Database["public"]["Enums"]["RoleLanguage"] | null
          minimum_years?: number | null
          salary?: number | null
          title?: string | null
          topic_id?: number | null
          url?: string | null
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          isapproved?: boolean | null
          language?: Database["public"]["Enums"]["RoleLanguage"] | null
          minimum_years?: number | null
          salary?: number | null
          title?: string | null
          topic_id?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rolesRecommendation_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
        ]
      }
      Skills: {
        Row: {
          emoji: string | null
          id: number
          name: string
          normalized: string | null
        }
        Insert: {
          emoji?: string | null
          id: number
          name: string
          normalized?: string | null
        }
        Update: {
          emoji?: string | null
          id?: number
          name?: string
          normalized?: string | null
        }
        Relationships: []
      }
      skillsSuggestions: {
        Row: {
          id: string
          isApproved: boolean
          skillName: string
          userId: string | null
        }
        Insert: {
          id?: string
          isApproved: boolean
          skillName: string
          userId?: string | null
        }
        Update: {
          id?: string
          isApproved?: boolean
          skillName?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skillsSuggestions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skillsSuggestions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "SubscriberSkillsView"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          github_id: number
          id: number
          is_recurring: boolean
          name: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          github_id: number
          id?: number
          is_recurring: boolean
          name: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          github_id?: number
          id?: number
          is_recurring?: boolean
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      Subscribers: {
        Row: {
          createdAt: string
          email: string
          englishLevel: Database["public"]["Enums"]["EnglishLevel"] | null
          gitHub: string | null
          id: string
          isConfirmed: boolean
          linkedInUrl: string | null
          name: string | null
          optOut: boolean
          sendBestOpenings: boolean | null
          skillsId: string[] | null
          startedWorkingAt: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          email: string
          englishLevel?: Database["public"]["Enums"]["EnglishLevel"] | null
          gitHub?: string | null
          id?: string
          isConfirmed?: boolean
          linkedInUrl?: string | null
          name?: string | null
          optOut?: boolean
          sendBestOpenings?: boolean | null
          skillsId?: string[] | null
          startedWorkingAt?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          email?: string
          englishLevel?: Database["public"]["Enums"]["EnglishLevel"] | null
          gitHub?: string | null
          id?: string
          isConfirmed?: boolean
          linkedInUrl?: string | null
          name?: string | null
          optOut?: boolean
          sendBestOpenings?: boolean | null
          skillsId?: string[] | null
          startedWorkingAt?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      SubscriberTopics: {
        Row: {
          id: number
          subscriberId: string
          topicId: number
        }
        Insert: {
          id?: number
          subscriberId: string
          topicId: number
        }
        Update: {
          id?: number
          subscriberId?: string
          topicId?: number
        }
        Relationships: [
          {
            foreignKeyName: "SubscriberTopics_subscriberId_fkey"
            columns: ["subscriberId"]
            isOneToOne: false
            referencedRelation: "Subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SubscriberTopics_subscriberId_fkey"
            columns: ["subscriberId"]
            isOneToOne: false
            referencedRelation: "SubscriberSkillsView"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SubscriberTopics_topicId_fkey"
            columns: ["topicId"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonial: {
        Row: {
          company: string | null
          createdat: string
          details: string | null
          email: string | null
          id: number
          role: string | null
          skills: string[] | null
        }
        Insert: {
          company?: string | null
          createdat?: string
          details?: string | null
          email?: string | null
          id?: number
          role?: string | null
          skills?: string[] | null
        }
        Update: {
          company?: string | null
          createdat?: string
          details?: string | null
          email?: string | null
          id?: number
          role?: string | null
          skills?: string[] | null
        }
        Relationships: []
      }
      Topics: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      Views: {
        Row: {
          id: string
          role_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          role_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          role_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_role"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_role"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "RolesSkillsView"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      RolesSkillsView: {
        Row: {
          company: string | null
          country: string | null
          createdAt: string | null
          currency: string | null
          description: string | null
          id: string | null
          language: Database["public"]["Enums"]["RoleLanguage"] | null
          ready: boolean | null
          salary: string | null
          skillNames: string[] | null
          title: string | null
          topicId: number | null
          url: string | null
        }
        Insert: {
          company?: string | null
          country?: string | null
          createdAt?: string | null
          currency?: string | null
          description?: string | null
          id?: string | null
          language?: Database["public"]["Enums"]["RoleLanguage"] | null
          ready?: boolean | null
          salary?: string | null
          skillNames?: never
          title?: string | null
          topicId?: number | null
          url?: string | null
        }
        Update: {
          company?: string | null
          country?: string | null
          createdAt?: string | null
          currency?: string | null
          description?: string | null
          id?: string | null
          language?: Database["public"]["Enums"]["RoleLanguage"] | null
          ready?: boolean | null
          salary?: string | null
          skillNames?: never
          title?: string | null
          topicId?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Roles_topicId_fkey"
            columns: ["topicId"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
        ]
      }
      SubscriberSkillsView: {
        Row: {
          englishLevel: Database["public"]["Enums"]["EnglishLevel"] | null
          gitHub: string | null
          id: string | null
          linkedInUrl: string | null
          name: string | null
          skillNames: string[] | null
          startedWorkingAt: string | null
        }
        Insert: {
          englishLevel?: Database["public"]["Enums"]["EnglishLevel"] | null
          gitHub?: string | null
          id?: string | null
          linkedInUrl?: string | null
          name?: string | null
          skillNames?: never
          startedWorkingAt?: string | null
        }
        Update: {
          englishLevel?: Database["public"]["Enums"]["EnglishLevel"] | null
          gitHub?: string | null
          id?: string | null
          linkedInUrl?: string | null
          name?: string | null
          skillNames?: never
          startedWorkingAt?: string | null
        }
        Relationships: []
      }
      vw_countries_in_roles: {
        Row: {
          country: string | null
        }
        Relationships: []
      }
      vw_skills_in_roles: {
        Row: {
          emoji: string | null
          id: number | null
          name: string | null
          normalized: string | null
        }
        Insert: {
          emoji?: string | null
          id?: number | null
          name?: string | null
          normalized?: string | null
        }
        Update: {
          emoji?: string | null
          id?: number | null
          name?: string | null
          normalized?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_distinct_skills: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          normalized: string
          emoji: string
        }[]
      }
      get_view_count: {
        Args: {
          role_uuid: string
        }
        Returns: number
      }
      replace_skills: {
        Args: {
          skill_to_delete_id: number
          replace_with_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      EnglishLevel: "Beginner" | "Intermediary" | "Advanced" | "Fluent"
      RoleLanguage: "English" | "Portuguese"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

