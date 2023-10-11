import { Column, Heading, Row, Tailwind } from '@react-email/components'
import React from 'react'
import { Opening } from './Opening'

interface Skill {
  name: string
}

const Skill = ({ name }: Skill) => (
  <div className="mb-1 whitespace-nowrap rounded-2xl border-2 border-solid border-black bg-zinc-200 px-4 py-1.5 text-xs">
    {name}
  </div>
)

export const OpeningCard = ({
  company,
  headerInfo,
  url,
  title,
  location,
  skills,
  language,
}: Omit<Opening, 'skills'> & { skills: string[] }) => {
  const firstSkills = skills.slice(0, 4)

  return (
    <Tailwind>
      <a
        href={url}
        target="_blank"
        className="decoration-none no-underline"
        style={{
          textDecoration: 'none',
          color: 'unset',
        }}
        rel="noreferrer"
      >
        <div
          className={`my-4 cursor-pointer rounded-md border border-solid border-gray-300 p-4 text-sm`}
        >
          <Row>
            <Column align="left" className="text-xs italic">
              {company}
            </Column>
            <Column align="right" className="text-xs italic">
              {headerInfo}
            </Column>
          </Row>
          <Row>
            <Heading className="text-sm">{title}</Heading>
          </Row>
          <section className="flex flex-wrap gap-x-2">
            {firstSkills.map((skill: string | undefined) => {
              if (!skill) return null
              return <Skill key={skill} name={skill} />
            })}
          </section>
          <Row className="mt-2 text-gray-400">
            <Column align="left" className="flex items-center text-xs">
              {location ? (
                <>
                  📍 <span className="ml-1 mr-6">{location}</span>
                  💬 <span className="mx-1">{language}</span>
                </>
              ) : (
                <>
                  💬 <span className="mx-1">{language}</span>
                </>
              )}
            </Column>
          </Row>
        </div>
      </a>
    </Tailwind>
  )
}

const OpeningList = ({
  openings: openings,
}: {
  openings: (Opening & { skills: string[] })[]
}) => {
  return openings.map((opening) => (
    <OpeningCard key={`${opening.title}-${opening.company}`} {...opening} />
  ))
}

export default OpeningList
