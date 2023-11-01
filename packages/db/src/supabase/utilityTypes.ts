import type { Database } from './type'

type PublicTable = Database['public']['Tables']
type PublicViews = Database['public']['Views']
export type SupabaseTable<T extends keyof PublicTable> = PublicTable[T]['Row']
export type SupabaseView<T extends keyof PublicViews> = PublicViews[T]['Row']