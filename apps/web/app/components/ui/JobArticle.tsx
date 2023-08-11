import { MapPin, Languages } from 'lucide-react'
import Chip from 'app/components/ui/Chip'

export interface JobArticleProps {
  title: string
  company: string
  headerInfo: string
  language: string
  location: string
  skills: string[]
  url: string
}

export default function JobArticle({
  title,
  company,
  headerInfo,
  language,
  location,
  skills,
  url,
}: JobArticleProps) {
  return (
    <a href={url} target="_blank">
      <article className="flex cursor-pointer gap-3 rounded-lg border-2 border-zinc-300 p-4 hover:border-indigo-300 max-lg:flex-col lg:items-center lg:justify-between">
        <div className="flex-1">
          <header className="mb-3 flex flex-col-reverse font-medium">
            <h3 className="text-xl leading-none">{title}</h3>
            <h4 className="text-lg text-zinc-600">{company}</h4>
          </header>

          <p className="text-zinc-600">{headerInfo}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {skills.map((skill, i) => (
              <Chip key={`${skill}${i}`} title={skill} />
            ))}
          </div>

          <div className="flex gap-4 lg:self-end">
            <div className="flex items-center gap-2">
              <Languages size={17} />
              <span className="text-sm font-medium">{language}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={17} />
              <span className="text-sm font-medium">{location}</span>
            </div>
          </div>
        </div>
      </article>
    </a>
  )
}
