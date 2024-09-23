import type React from 'react'
import { useMemo } from 'react'

interface Skill {
  id: number
  name: string
}

interface Job {
  id: string
  company: string
  title: string
  salary?: string
  skillsId: string[]
  url: string
  country?: string
  language: string
  views: number
}

interface JobCardProps {
  job: Job
  skillsFromProps: Skill[]
}

const JobCard: React.FC<JobCardProps> = ({ job, skillsFromProps }) => {
  const normalize = (id: string): string | null => {
    const skill = skillsFromProps.find(
      (skill) => skill.id === Number.parseInt(id)
    )
    return skill ? skill.name : null
  }

  const salaryText = useMemo(() => {
    if (job.salary) {
      return job.salary
    }
    return ''
  }, [job.salary])

  return (
    <a
      href={job.url}
      target="_blank"
      className="shadow-brand-shadow border-box w-full cursor-pointer rounded-lg border-[1px] bg-[#FCFCFD] p-[30px] hover:border-[1px] hover:border-[#4f46e5]"
      rel="noreferrer"
    >
      <div className="mb-[10px] flex flex-wrap items-center justify-between">
        <h2 className="text-[11px] sm:text-[12px] md:text-[12px] lg:text-[12px]">
          {job.company}
        </h2>
        <span className="text-[13px] sm:text-[16px] md:text-[16px] lg:text-[16px]">
          {salaryText}
        </span>
      </div>
      <h1 className="mb-[10px] text-[15px] font-bold sm:text-[17px] md:text-[17px] lg:text-[17px]">
        {job.title}
      </h1>
      <div className="mb-[25px] flex flex-wrap gap-[15px] sm:mb-[35px] md:mb-[35px] lg:mb-[35px]">
        {job.skillsId.map((skillId) => {
          const skillName = normalize(skillId)
          if (skillName === null) return null
          return (
            <span
              key={skillId}
              className="mt-[5px] rounded-[20px] border-[1px] border-black bg-[#F4F4F5] px-[15px] py-[2px] text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px]"
            >
              {skillName}
            </span>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-[25px] text-[13px] sm:text-[15px] md:text-[15px] lg:text-[15px]">
        <div className="flex items-center">
          <span>📍 {job.country || 'Internacional'}</span>
        </div>
        <div className="flex items-center">
          <span>
            💬 {job.language === 'Portuguese' ? 'Português' : job.language}
          </span>
        </div>
      </div>
    </a>
  )
}

export default JobCard
