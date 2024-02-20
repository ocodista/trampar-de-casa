import Image from 'next/image'
import React from 'react'
import { kv } from '@vercel/kv'
import { getImageUrl } from './utils'

export async function ArticleHeader({
  author,
  title,
  role,
  quote,
  dateText,
  timeToRead,
}: {
  author: string
  title: string
  role: string
  quote: string
  dateText: string
  timeToRead: number
}) {
  const count: number = (await kv.get(title)) || 0
  await kv.set(title, count + 1)
  const imageSubtitle = `Image of ${author}`

  return (
    <header className="border-b-solid relative flex flex-col gap-2">
      <section className="flex flex-wrap justify-between gap-1">
        <small className="text-muted-foreground text-sm">
          {dateText} • <span>{timeToRead} minutos de leitura</span>
        </small>
        {count > 0 && (
          <small className="text-muted-foreground text-sm">
            {count.toLocaleString()} {count > 1 ? 'leitores' : 'leitor'}{' '}
            {count > 1 ? 'apoiam' : 'apoia'} o trabalho remoto
          </small>
        )}
      </section>
      <h1 className="my-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title.replace(' - Trampar de Casa', '')}
      </h1>
      <section className="flex items-center gap-4">
        <Image
          src={getImageUrl(author)}
          alt={imageSubtitle}
          title={imageSubtitle}
          height={38}
          width={38}
          className="m-0 rounded-full"
        />
        <section className="text-sm leading-4">
          <p className="m-0 font-medium">{author}</p>
          <small className="mt-1">{role}</small>
        </section>
      </section>
      <blockquote className="border-b-solid mb-0 border-b border-l-2 border-b-slate-200 pb-5 pl-6 italic">
        {quote}
      </blockquote>
    </header>
  )
}
