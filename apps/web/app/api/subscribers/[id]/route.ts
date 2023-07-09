import { getById } from '../db'

export async function GET(request: Request) {
  const { url } = request
  const id = url.split('/').reverse()[0]
  return await getById(id)
}
