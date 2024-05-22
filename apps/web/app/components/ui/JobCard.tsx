const jobCard = ({ job, skillsFromProps }) => {
  const normalize = (id: string) => {
    const skill = skillsFromProps.find((skill) => skill.id === parseInt(id))
    return skill ? skill.name : null
  }

  return (
    <a
      href={job.url}
      target="_blank"
      className="pointer shadow-brand-shadow border-box w-full rounded-lg border-[1px] bg-[#FCFCFD] p-[30px] hover:border-[1px] hover:border-[#4f46e5] "
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
            className={`${
              normalize(skillId) === null && 'hidden'
            } mt-[5px] rounded-[20px] border-[1px] border-black bg-[#F4F4F5] px-[15px] py-[2px]`}
          >
            {normalize(skillId)}
          </span>
        ))}
      </div>
      <div className="flex gap-[25px] text-[15px]">
        <div className="flex items-center">
          <span>📍 {job.country ? job.country : 'Internacional'}</span>
        </div>
        <div className="flex items-center">
          <span>💬 {job.language}</span>
        </div>
      </div>
    </a>
  )
}

export default jobCard
