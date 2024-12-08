import { shouldRedirectToUrl } from 'app/utils/shouldRedirect'
import { useCallback, useMemo } from 'react'
import { trackedRoleURL } from 'shared/src/services/trackedRoleURL'

const JobCard = ({ job, skillsFromProps }) => {
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

  const handleRedirect = useCallback((linkUrl: string) => {
    const a = document.createElement("a"); 
    a.setAttribute('href', linkUrl); 
    a.setAttribute('target', '_blank'); 
    a.click();
  });

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()

      fetch(trackedRoleURL(job.id), { method: 'POST' })
        .then(() => {
          const linkUrl = shouldRedirectToUrl(job.description)
            ? job.url
            : `/vaga/${job.id}`
          handleRedirect(linkUrl);
        })
        .catch((error) => {
          console.error('Erro ao contabilizar clique:', error)
          const linkUrl = shouldRedirectToUrl(job.description)
            ? job.url
            : `/vaga/${job.id}`
          handleRedirect(linkUrl);
        })
    },
    [job.id, job.description, job.url]
  )

  return (
    <a
      href="#"
      onClick={handleClick}
      className="shadow-brand-shadow border-box mb-4 mt-6 block w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-8 hover:border-blue-500"
      rel="noreferrer"
    >
      <div className="flex justify-between">
        <p className="mb-2 text-sm text-gray-600">{job.company}</p>
        <span className="text-[13px] sm:text-[16px] md:text-[16px] lg:text-[16px]">
          {salaryText}
        </span>
      </div>
      <h2 className="text-lg font-semibold">{job.title}</h2>
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
        <span className="mr-4">
          📍 {job.country || 'Internacional'}
        </span>
        <span>
          💬 {job.language === 'Portuguese' ? 'Português' : job.language}
        </span>
      </div>
    </a>
  )
}

export default JobCard