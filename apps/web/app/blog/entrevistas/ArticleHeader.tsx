import Image from 'next/image'
import React from 'react'

export const getImageUrl = (author: string) =>
  `/blog/entrevistas/${author.toLowerCase().replaceAll(' ', '-')}.jpeg`

export function ArticleHeader({
  author,
  title,
  role,
  description,
  dateText,
  timeToRead,
}: {
  author: string
  title: string
  role: string
  description: string
  dateText: string
  timeToRead: number
}) {
  const imageSubtitle = `Image of ${author}`
  return (
    <header className="border-b-solid relative pt-10">
      <small className="text-muted-foreground absolute top-0 text-sm">
        {dateText} • <span>{timeToRead} minutos de leitura</span>
      </small>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
        {title}
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
      <blockquote className="border-b-solid mb-2 border-b border-l-2 border-b-slate-200 pb-6 pl-6 italic">
        {description}
      </blockquote>
    </header>
  )
}
