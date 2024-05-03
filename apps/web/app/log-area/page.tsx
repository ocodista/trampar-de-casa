'use client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://unipwhnhlgeoklaafiam.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuaXB3aG5obGdlb2tsYWFmaWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NDg3MTUsImV4cCI6MjAzMDAyNDcxNX0._G3z3-pCCnM_X7UgSEWjg-_xofN0hK2LphtqLWc3vd0'
)

// Create a single supabase client for interacting with your database
export async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: 'paulo.tspi@gmail.com',
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: 'http://localhost:3000/log-area',
    },
  })
  console.log('🚀 ~ signInWithEmail ~ data:', data)

  console.log('🚀 ~ signInWithEmail ~ error:', error)
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}

export default async function Page() {
  return (
    <>
      <p>AREA LOGADA</p>
    </>
  )
}
