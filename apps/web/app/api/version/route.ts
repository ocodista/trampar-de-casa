import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8')
    )

    const version = packageJson.version

    return NextResponse.json({ version })
  } catch (error) {
    console.error('Erro ao ler a versão:', error)
    return NextResponse.json(
      { error: 'Erro ao obter a versão' },
      { status: 500 }
    )
  }
}
