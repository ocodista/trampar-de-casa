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
      Roles: {
        Row: {
          company: string | null
          country: string
          createdAt: string
          currency: string | null
          description: string
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
          country: string
          createdAt?: string
          currency?: string | null
          description: string
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
          country?: string
          createdAt?: string
          currency?: string | null
          description?: string
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
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          }
        ]
      }
      rolesRecommendation: {
        Row: {
          company: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: number | null
          language: string | null
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
          id?: number | null
          language?: string | null
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
          id?: number | null
          language?: string | null
          minimum_years?: number | null
          salary?: number | null
          title?: string | null
          topic_id?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_topics"
            columns: ["topic_id"]
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          }
        ]
      }
      Skills: {
        Row: {
          id: number
          name: string
          normalized: string | null
        }
        Insert: {
          id: number
          name: string
          normalized?: string | null
        }
        Update: {
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
            referencedRelation: "Subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skillsSuggestions_userId_fkey"
            columns: ["userId"]
            referencedRelation: "SubscriberSkillsView"
            referencedColumns: ["id"]
          }
        ]
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
            referencedRelation: "Subscribers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SubscriberTopics_subscriberId_fkey"
            columns: ["subscriberId"]
            referencedRelation: "SubscriberSkillsView"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SubscriberTopics_topicId_fkey"
            columns: ["topicId"]
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          }
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
    }
    Functions: {
      [_ in never]: never
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

