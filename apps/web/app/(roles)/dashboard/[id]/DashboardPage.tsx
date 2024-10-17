'use client'

import { useState, useCallback } from 'react'
import JobCard from 'app/components/ui/JobCard'
import { BarChart, Users, Eye } from 'lucide-react'
import { toggleRoleActive } from './action'

export const DashboardPage = ({ skillsFromServer, jobsFromServer }) => {
  const [jobs, setJobs] = useState(jobsFromServer)

  const getMostUsedSkills = useCallback(() => {
    const skillCount: { [key: string]: number } = {}
    jobs.forEach((job) => {
      job.skillsId?.forEach((skillId) => {
        skillCount[skillId] = (skillCount[skillId] || 0) + 1
      })
    })
    return Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([skillId]) => {
        const skill = skillsFromServer.find(
          (skill) => skill.id === parseInt(skillId)
        )
        return skill ? skill.name : ''
      })
      .filter(Boolean)
      .join(', ')
  }, [jobs, skillsFromServer])

  const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0)

  const handleToggleActive = useCallback(
    async (jobId: string | number, active: boolean) => {
      try {
        await toggleRoleActive(jobId, active)
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId ? { ...job, ready: active } : job
          )
        )
      } catch (error) {
        console.error('Erro ao alterar o status da vaga:', error)
      }
    },
    []
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        data-testid="dashboard-title"
        className="mb-2 text-3xl font-bold text-gray-800"
      >
        Dashboard de Vagas
      </h1>
      <p className="mb-8 text-gray-600">Gerencie suas vagas publicadas</p>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center rounded-lg bg-white p-6 shadow-sm">
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <BarChart className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-600">
              Total de Vagas
            </h2>
            <p className="text-2xl font-bold text-gray-800">{jobs.length}</p>
          </div>
        </div>
        <div className="flex items-center rounded-lg bg-white p-6 shadow-sm">
          <div className="mr-4 rounded-full bg-purple-100 p-3">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-600">
              Skills Mais Usadas
            </h2>
            <p className="text-md font-medium text-gray-800">
              {getMostUsedSkills()}
            </p>
          </div>
        </div>
        <div className="flex items-center rounded-lg bg-white p-6 shadow-sm">
          <div className="mr-4 rounded-full bg-green-100 p-3">
            <Eye className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-600">
              Total de Visualizações
            </h2>
            <p className="text-2xl font-bold text-gray-800">{totalViews}</p>
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Suas Vagas Publicadas
      </h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            job={job}
            key={job.id}
            skillsFromProps={skillsFromServer}
            showToggle={true}
            onToggleActive={handleToggleActive}
          />
        ))}
      </div>
    </div>
  )
}
