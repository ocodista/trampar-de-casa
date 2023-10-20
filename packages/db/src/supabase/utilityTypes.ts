import type { Database } from './type'

type PublicTable = Database['public']['Tables']
export type SupabaseTable<T extends keyof PublicTable> = PublicTable[T]['Row']