import path from 'path'
import { Parser } from '@json2csv/plainjs'
import fs from 'fs'
import { getSupabaseClient } from 'db'

const generateCsv = async (data: any, filePath: string) => {
  const parser = new Parser()
  const csv = parser.parse(data.data)
  const absolutePath = path.resolve(__dirname, '../match_roles/data', filePath)
  fs.writeFileSync(absolutePath, csv)
}

export const setupMatchRoles = async () => {
  const supabaseClient = getSupabaseClient()

  const roles = await supabaseClient.from('Roles').select('*').eq('ready', true)
  await generateCsv(roles, 'roles.csv')

  const skills = await supabaseClient.from('Skills').select('*')
  await generateCsv(skills, 'skills.csv')
}
