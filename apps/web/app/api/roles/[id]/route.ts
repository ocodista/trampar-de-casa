import { getPostgresClient } from 'db'
import { Entities } from 'shared'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const query = `
			SELECT *
			FROM "${Entities.Roles}"
			WHERE id = $1
		`
    const result = await getPostgresClient().query(query, [params.id])
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Get role error:', error)
    return NextResponse.json({ error: 'Failed to fetch role' }, { status: 500 })
  }
}
