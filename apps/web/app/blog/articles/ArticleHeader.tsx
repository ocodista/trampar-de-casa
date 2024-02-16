import Image from 'next/image'
import React from 'react'

const getImageUrl = (author: string) =>
  `/blog/${author.toLowerCase().replaceAll(' ', '-')}.jpeg`

export function ArticleHeader({
  author,
  title,
  role,
  description,
}: {
  author: string
  title: string
  role: string
  description: string
}) {
  const imageSubtitle = `Image of ${author}`
  return (
    <header className="relative pt-10">
      <small className="text-muted-foreground absolute top-0 text-sm">
        16 de Fev, 2024
      </small>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
        {title}
      </h1>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {description}
      </blockquote>
      <section className="border-t-solid flex items-center gap-4 border-t border-t-slate-200 pt-4">
        <Image
          // src={"https://picsum.photos/200"}
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
    </header>
  )
}
