import { getSupabaseClient } from 'db'
import { NextRequest, NextResponse } from 'next/server'
import { Entities } from 'shared'

const supabaseClient = getSupabaseClient()

async function insertRoleClicked({
  userId,
  roleId,
}: {
  userId: string
  roleId: string
}) {
  const { data, error } = await supabaseClient
    .from(Entities.UserRoles)
    .insert({ roleId, userId })
    .select()
  return { data, error }
}
export async function GET(request: NextRequest) {
  const roleId = request.nextUrl.searchParams.get('roleId')
  const userId = request.nextUrl.searchParams.get('userId')
  const url = request.nextUrl.searchParams.get('url')
  if (roleId && userId) {
    await insertRoleClicked({ roleId, userId })
  }
  return NextResponse.redirect(url)
}
