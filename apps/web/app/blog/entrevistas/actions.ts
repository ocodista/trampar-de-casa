'use server'

import { kv } from '@vercel/kv'

export async function updateViews(title: string) {
  const count: number = (await kv.get(title)) || 0
  await kv.set(title, count + 1)
  return count
}
