'use client'

import { shouldRedirectToUrl } from 'app/utils/shouldRedirect'
import { Database } from 'db'
import { useCallback, useMemo } from 'react'
import { trackedRoleURL } from 'shared/src/services/trackedRoleURL'
import { isInternalRole } from '../isInternalRole'

type Job = Database['public']['Tables']['Roles']['Row']
type Skill = Database['public']['Views']['vw_skills_in_roles']['Row']

interface JobCardProps {
  job: Job
  skillsFromProps: Skill[]
  showToggle?: boolean
  onToggleActive?: (jobId: string | number, active: boolean) => void
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  skillsFromProps,
  showToggle = false,
  onToggleActive,
}) => {
  const normalize = (id: string) => {
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

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()

      const redirectToInternalPage = () => {
        window.open(`/vaga/${job.id}`, '_blank')
      }

      const redirectToExternalUrl = () => {
        window.open(job.url, '_blank')
      }

      fetch(trackedRoleURL(job.id), { method: 'POST' })
        .then(async () => {
          try {
            const isInternal = await isInternalRole(job.id)

            if (isInternal) {
              redirectToInternalPage()
            } else if (shouldRedirectToUrl(job.description)) {
              redirectToInternalPage()
            } else {
              redirectToExternalUrl()
            }
          } catch (error) {
            console.error('Erro ao verificar tipo de vaga:', error)
            if (shouldRedirectToUrl(job.description)) {
              redirectToInternalPage()
            } else {
              redirectToExternalUrl()
            }
          }
        })
        .catch((error) => {
          console.error('Erro ao contabilizar clique:', error)
          if (shouldRedirectToUrl(job.description)) {
            redirectToInternalPage()
          } else {
            redirectToExternalUrl()
          }
        })
    },
    [job.id, job.description, job.url]
  )

  const handleToggle = (event) => {
    event.stopPropagation()
    if (onToggleActive) {
      onToggleActive(job.id, !job.ready)
    }
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className={`shadow-brand-shadow border-box mb-4 mt-6 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-8 hover:border-blue-500 ${
        job.ready ? '' : 'opacity-50'
      }`}
      rel="noreferrer"
    >
      <div className="flex justify-between">
        <p
          data-testid="job-card-company"
          className="mb-2 text-sm text-gray-600"
        >
          {job.company}
        </p>
        <span className="text-[13px] sm:text-[16px] md:text-[16px] lg:text-[16px]">
          {salaryText}
        </span>
      </div>
      <h2 data-testid="job-card-title" className="text-lg font-semibold">
        {job.title}
      </h2>
      <div className="my-4">
        {job.skillsId?.length > 0 ? (
          job.skillsId.slice(0, 1).map((skillId) => {
            const skillName = normalize(skillId)
            return skillName ? (
              <span
                key={skillId}
                className="mt-[5px] rounded-[20px] border-[1px] border-black bg-[#F4F4F5] px-[15px] py-[4px] text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px]"
              >
                {skillName}
              </span>
            ) : null
          })
        ) : (
          <span className="mt-[5px] rounded-[20px] border-[1px] border-transparent px-[15px] py-[4px] text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px]">
            &nbsp;
          </span>
        )}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <span className="mr-4">📍 {job.country || 'Internacional'}</span>
        <span>
          💬 {job.language === 'Portuguese' ? 'Português' : job.language}
        </span>
      </div>
      {showToggle && (
        <button
          onClick={handleToggle}
          className={`mt-4 rounded-full px-3 py-1 text-sm font-medium ${
            job.ready
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          {job.ready ? 'Ativa' : 'Inativa'}
        </button>
      )}
    </a>
  )
}

export default JobCard
