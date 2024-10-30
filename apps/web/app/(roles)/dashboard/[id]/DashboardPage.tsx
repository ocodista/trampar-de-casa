'use client'

import { useState, useCallback } from 'react'
import { BarChart, Users, Eye, LucideIcon, Search, Plus } from 'lucide-react'
import JobCard from 'app/components/ui/JobCard'

import { toggleRoleActive } from './action'
import { Input } from 'app/components/ui/input'
import { Button } from 'app/components/ui/button'
import { Database } from 'db'

type BaseJob = Database['public']['Tables']['Roles']['Row']

type Job = BaseJob & {
  views?: number
}

type Skill = Database['public']['Views']['vw_skills_in_roles']['Row']

type StatCardProps = {
  icon: LucideIcon
  title: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  color: 'blue' | 'purple' | 'green'
}

interface DashboardPageProps {
  jobsFromServer: Job[]
  skillsFromServer: Skill[]
  userId: string
  applicationsCount: number
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  trend,
  color,
}: StatCardProps) => {
  const colorStyles = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-500' },
    green: { bg: 'bg-green-100', text: 'text-green-500' },
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div
            className={`rounded-full ${colorStyles[color].bg} inline-flex p-3`}
          >
            <Icon className={`h-6 w-6 ${colorStyles[color].text}`} />
          </div>
          <h2 className="text-sm font-medium text-gray-600">{title}</h2>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p
              className={`text-sm ${
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
      </div>
      <div className="absolute right-2 top-2 opacity-10">
        <Icon className="h-24 w-24" />
      </div>
    </div>
  )
}

const DashboardHeader = ({ totalJobs, onCreateJob }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1
        data-testid="dashboard-title"
        className="text-3xl font-bold text-gray-800"
      >
        Dashboard de Vagas
      </h1>
    </div>
    <Button onClick={onCreateJob} className="inline-flex items-center gap-2">
      <Plus className="h-4 w-4" />
      Nova Vaga
    </Button>
  </div>
)

const SearchBar = ({ onSearch }) => (
  <div className="relative mb-6">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    <Input
      placeholder="Buscar vagas..."
      className="pl-10"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
)

export const DashboardPage = ({
  skillsFromServer,
  jobsFromServer,
  userId,
  applicationsCount,
}: DashboardPageProps) => {
  const [jobs, setJobs] = useState(jobsFromServer)
  const [searchTerm, setSearchTerm] = useState('')

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

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase())
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm)
  )

  const stats = [
    {
      icon: BarChart,
      title: 'Total de Vagas',
      value: jobs.length,
      color: 'blue' as const,
    },
    {
      icon: Users,
      title: 'Skills Mais Usadas',
      value: getMostUsedSkills(),
      color: 'purple' as const,
    },
    {
      icon: Eye,
      title: 'Total de Candidaturas',
      value: applicationsCount,
      color: 'green' as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <DashboardHeader
          totalJobs={jobs.length}
          onCreateJob={() => (window.location.href = '/vagas/publique')}
        />

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Suas Vagas Publicadas
            </h2>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  skillsFromProps={skillsFromServer}
                  showToggle={true}
                  onToggleActive={handleToggleActive}
                  userId={userId}
                />
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500">
                  {searchTerm
                    ? 'Nenhuma vaga encontrada'
                    : 'Nenhuma vaga publicada ainda'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
