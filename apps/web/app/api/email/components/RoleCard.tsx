import { Row, Column, Heading } from "@react-email/components"
import { GeoSVG } from "../icons/GeoSVG"

export const RoleCard = ({ company, headerInfo, url, title, location, skills, language }) => {
  return (
    <a href={url} target='_blank' className="decoration-none no-underline" style={{ textDecoration: 'none', color: 'unset' }}>
      <div className='p-4 my-4 text-sm border border-solid border-gray-300 rounded-md cursor-pointer'>
        <Row>
          <Column align='left' className="text-xs">
            {company}
          </Column>
          <Column align='right' className="italic text-xs">
            {headerInfo}
          </Column>
        </Row>
        <Row>
          <Heading className='text-sm'>
            {title}
          </Heading>
        </Row>
        <section className="flex flex-wrap gap-x-2">
          {skills.map((skill: string) => (
            <div key={skill} className="px-4 py-1.5 whitespace-nowrap mb-1 border-2 border-solid bg-zinc-200 border-black text-xs rounded-2xl">{skill}</div>
          ))}
        </section>
        <Row className="text-gray-400 mt-2">
          <Column align='left' className='flex items-center'>
            <GeoSVG /> <span className='ml-1 text-xs'>{location} - {language}</span>
          </Column>
        </Row>
      </div>
    </a>
  )
}