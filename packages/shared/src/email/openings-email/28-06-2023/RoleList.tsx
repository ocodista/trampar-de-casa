import { Row, Column, Heading } from '@react-email/components'
import React from 'react'
import { Role } from './roles'

interface Skill {
  name: string
}

const Skill = ({ name }: Skill) => (
  <div className="px-4 py-1.5 whitespace-nowrap mb-1 border-2 border-solid bg-zinc-200 border-black text-xs rounded-2xl">
    {name}
  </div>
)

export const RoleCard = ({
  company,
  headerInfo,
  url,
  title,
  location,
  skills,
  language,
}: Role) => {
  const firstSkills = skills.slice(0, 4)

  return (
    <a
      href={url}
      target="_blank"
      className="decoration-none no-underline"
      style={{
        textDecoration: 'none',
        color: 'unset',
      }}
    >
      <div
        className={`p-4 my-4 text-sm border border-solid border-gray-300 rounded-md cursor-pointer`}
      >
        <Row>
          <Column align="left" className="italic text-xs">
            {company}
          </Column>
          <Column align="right" className="italic text-xs">
            {headerInfo}
          </Column>
        </Row>
        <Row>
          <Heading className="text-sm">{title}</Heading>
        </Row>
        <section className="flex flex-wrap gap-x-2">
          {firstSkills.map((skill: string) => (
            <Skill key={skill} name={skill} />
          ))}
        </section>
        <Row className="text-gray-400 mt-2">
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
  )
}

const RoleList = ({ roles }: { roles: Role[] }) => {
  return roles.map((role) => (
    <RoleCard key={`${role.title}-${role.company}`} {...role} />
  ))
}

export default RoleList
