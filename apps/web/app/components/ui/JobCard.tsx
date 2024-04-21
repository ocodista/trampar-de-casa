import { Languages, MapPin } from 'lucide-react'
import { skillArray } from '../../../../../packages/shared/src/infos/skills'

const jobCard = ({ job }) => {
  const normalize = (id: string) => {
    const skill = skillArray.find((skill) => skill.id === parseInt(id))
    return skill ? skill.normalized : 'NOTFOUND'
  }

  return (
    <a
      href={job.url}
      target="_blank"
      className="pointer shadow-brand-shadow w-[90%] rounded-lg bg-[#FCFCFD] p-[30px]"
    >
      <div className="mb-[10px] flex justify-between">
        <h2 className="text-[12px]">{job.company}</h2>
        <span>{job.description}</span>
      </div>
      <h1 className="mb-[10px] font-bold">{job.title}</h1>
      <div className="mb-[35px] flex flex-wrap gap-[15px]">
        {job.skillsId.map((skillId) => (
          <span
            key={skillId}
            className="mt-[5px] rounded-[20px] bg-[#F4F4F5] px-[15px] py-[2px]"
          >
            {normalize(skillId)}
          </span>
        ))}
      </div>
      <div className="flex gap-[25px] text-[15px]">
        <div className="flex items-center">
          <MapPin size={15} className="mr-[5px]" />
          <span>International</span>
        </div>
        <div className="flex items-center">
          <Languages size={15} className="mr-[5px]" />
          <span>{job.language}</span>
        </div>
      </div>
    </a>
  )
}

export default jobCard
