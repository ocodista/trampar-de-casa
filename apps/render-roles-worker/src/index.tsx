import { render } from '@react-email/render'
import { Roles } from 'db'
import { getStorage } from 'getStorage'
import React from 'react'
import { Entities, SupabaseCodes } from 'shared'
import { OpeningCard } from 'shared/src/email/openings-email/OpeningList'
import { getSupabaseClient } from './getSupabaseClient'
import { renderRoleComponents } from './renderRoleComponents'

const supabase = getSupabaseClient()

const getRolesPage = async (currentPage: number): Promise<Roles[] | null> => {
  const pageSize = 100
  const offset = currentPage * pageSize
  const { data, error } = await supabase
    .from(Entities.Roles)
    .select('*')
    .eq('ready', true)
    .range(offset, pageSize)

  if (error || !data || data.length === 0) {
    console.error(error)
    return null
  }

  return data as Roles[]
}

export const getRolesFromDB = async (currentPage: number, pageSize = 100) => {
  const offset = currentPage * pageSize
  const { data, error } = await supabase.from(Entities.Roles).select('*')
  //    .eq('ready', true)
  //    .range(offset, pageSize)
  //    .order('createdAt', { ascending: false })

  return data

  if (error && 'code' in error) {
    if (error.code === SupabaseCodes.OutOfRange) return []

    throw new Error(error.message)
  }
  console.log('Data', data)

  if (!data?.length) return []

  return data as Roles[]
}

export const pushHTMLToStorage = async (id: string, html: string) => {
  const storage = await getStorage()
  const key = `ROLE_TEMPLATE_${id}`
  await storage.set(key, html)

  await storage.disconnect()
}

async function getRolesChunks(onLoad: (roles: Roles[]) => void) {
  let hasMore = true
  let currentPage = 0
  while (hasMore) {
    const rolesChunk = await getRolesPage(currentPage)
    if (!rolesChunk) {
      hasMore = false
      return
    }
    onLoad(rolesChunk)
    currentPage += 1
  }
}

const doctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
// TODO: create test
// TODO: run profiler (with 1 role, with 100 roles, with 1000 roles)
const parseHTML = (role: Roles): string => {
  return render(
    <OpeningCard
      company={role.companyId}
      currency={role.currency || 'R$ 0,00'}
      language={role.language}
      location={role.country}
      skills={role.skills as string[]}
      title={role.title}
      url={role.url || ''}
      description={role.description}
    />
  ).replace(doctype, '')
}

function* renderRoleComponents(roles: Roles[]) {
  for (const role of roles) {
    yield {
      id: role.id,
      renderedString: parseHTML(role),
    }
  }
}

const parseRoles = async (roles: Roles[]) => {
  for (const { id, renderedString } of renderRoleComponents(roles)) {
    await pushHTMLToStorage(id, renderedString)
  }
}

//TODO: create one spec for hole worker
//TODO: write all functions in this ile
//TODO: rename index with workerFunction (roleParser.ts)

async function main() {
  // get roles from db (supabase)
  // forEach role, parseHTML then saveToStorage (Redis)

  getRolesChunks(async (rolesChunk) => await parseRoles(rolesChunk))
}
main()
