import path from 'path'
import { Parser } from '@json2csv/plainjs'
import fs from 'fs'
import { getPostgresClient } from 'db'

const generateCsv = async (data: any, filePath: string) => {
  if (!data.data?.length) {
    throw new Error(`No data to generate CSV for ${filePath}`)
  }

  const parser = new Parser()
  const csv = parser.parse(data.data)
  const absolutePath = path.resolve(__dirname, '../match_roles/data', filePath)
  fs.writeFileSync(absolutePath, csv)
}

export const setupDataMatchRoles = async () => {
  const postgres = getPostgresClient()

  const rolesResult = await postgres.query(
    'SELECT * FROM "Roles" WHERE ready = true'
  )
  await generateCsv({ data: rolesResult.rows }, 'roles.csv')

  const skillsResult = await postgres.query('SELECT * FROM "Skills"')
  await generateCsv({ data: skillsResult.rows }, 'skills.csv')
}
