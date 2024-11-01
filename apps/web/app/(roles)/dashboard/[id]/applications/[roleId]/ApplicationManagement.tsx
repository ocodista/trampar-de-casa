'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, ChevronLeft, Filter, ChevronDown } from 'lucide-react'
import SkillsFilter from 'app/components/SkillsFilter'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  ignored: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  ignored: 'Ignorado',
}

const englishLevels = ['Beginner', 'Intermediary', 'Advanced', 'Fluent']

const englishLevelTranslations = {
  Beginner: 'Iniciante',
  Intermediary: 'Intermediário',
  Advanced: 'Avançado',
  Fluent: 'Fluente',
} as const

export default function ApplicationsManagement({
  roleId,
  applications: initialApplications,
  userId,
  allSkills,
}) {
  const router = useRouter()
  const [applications, setApplications] = useState(initialApplications)
  const [roleTitle, setRoleTitle] = useState(applications[0]?.Roles.title)
  const [filters, setFilters] = React.useState({
    englishLevel: '',
    yearsOfExperience: '',
  })
  const [selectedSkills, setSelectedSkills] = useState([])

  const filterApplicationsBySkills = (applications) => {
    if (selectedSkills.length === 0) return applications

    return applications.filter((application) => {
      const applicantSkills = application.Subscribers.skillsId || []
      return selectedSkills.some((skillId) => applicantSkills.includes(skillId))
    })
  }

  const calculateExperience = (startDate: string) => {
    const start = new Date(startDate)
    const now = new Date()
    return Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
    )
  }

  const applyFilters = () => {
    let filtered = [...initialApplications]

    if (filters.englishLevel) {
      filtered = filtered.filter(
        (app) => app.details.englishLevel === filters.englishLevel
      )
    }

    if (filters.yearsOfExperience) {
      const minYears = Number(filters.yearsOfExperience)
      filtered = filtered.filter((app) => {
        const experience = calculateExperience(app.details.startedWorkingAt)
        return experience >= minYears
      })
    }

    // Adicione o filtro de skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((application) => {
        const applicantSkills = application.Subscribers.skillsId || []
        return selectedSkills.some((skillId) =>
          applicantSkills.includes(skillId)
        )
      })
    }

    setApplications(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters, selectedSkills])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold">
          Candidaturas da Vaga: {roleTitle}
        </h1>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-500" />
            <h3 className="font-medium text-gray-900">Filtrar Candidatos</h3>
          </div>
        </div>

        <div className="p-4">
          {/* Grid de filtros */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Nível de Inglês
              </label>
              <div className="relative">
                <select
                  id="englishLevel"
                  value={filters.englishLevel}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      englishLevel: e.target.value,
                    }))
                  }
                  className="h-10 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Todos os níveis</option>
                  {englishLevels.map((level) => (
                    <option key={level} value={level}>
                      {englishLevelTranslations[level]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-900" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Experiência Mínima
              </label>
              <div className="relative">
                <select
                  id="experience"
                  value={filters.yearsOfExperience}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      yearsOfExperience: e.target.value,
                    }))
                  }
                  className="h-10 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Qualquer experiência</option>
                  {[1, 2, 3, 4, 5].map((year) => (
                    <option key={year} value={year}>
                      {year} {year === 1 ? 'ano' : 'anos'} ou mais
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-900" />
              </div>
            </div>

            <SkillsFilter
              allSkills={allSkills}
              applications={initialApplications}
              selectedSkills={selectedSkills}
              onFilterChange={(newSkills) => {
                setSelectedSkills(newSkills)
              }}
              onSelectedSkillRemove={(skillId) => {
                setSelectedSkills((prev) => prev.filter((id) => id !== skillId))
              }}
            />
          </div>

          {/* Tags dos filtros selecionados */}
          {(filters.englishLevel ||
            filters.yearsOfExperience ||
            selectedSkills.length > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {filters.englishLevel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                  {englishLevelTranslations[filters.englishLevel]}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        englishLevel: '',
                      }))
                    }
                    className="ml-1 rounded-full p-0.5 hover:bg-indigo-100"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.yearsOfExperience && (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                  {filters.yearsOfExperience}+ anos
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        yearsOfExperience: '',
                      }))
                    }
                    className="ml-1 rounded-full p-0.5 hover:bg-indigo-100"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSkills.map((skillId) => {
                const skill = allSkills.find((s) => s.id.toString() === skillId)
                if (!skill) return null

                return (
                  <span
                    key={skillId}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600"
                  >
                    {skill.emoji} {skill.name}
                    <button
                      onClick={() =>
                        setSelectedSkills((prev) =>
                          prev.filter((id) => id !== skillId)
                        )
                      }
                      className="ml-1 rounded-full p-0.5 hover:bg-indigo-100"
                    >
                      ×
                    </button>
                  </span>
                )
              })}
              <button
                onClick={() => {
                  setFilters({ englishLevel: '', yearsOfExperience: '' })
                  setSelectedSkills([])
                }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Limpar todos
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Candidatos</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
              {applications?.length || 0}{' '}
              {applications?.length === 1 ? 'candidato' : 'candidatos'}
            </span>
          </div>
        </div>

        <div className="p-4">
          {applications?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Nível de Inglês
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Data
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td className="w-48 px-6 py-4">
                        <div
                          className="max-w-[150px] truncate font-medium text-gray-900"
                          title={application.details.fullName}
                        >
                          {application.details.fullName}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {application.details.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {application.details.englishLevel}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            statusColors[application.status]
                          }`}
                        >
                          {statusLabels[application.status]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {new Date(application.createdAt).toLocaleDateString(
                          'pt-BR'
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/${userId}/applications/${roleId}/details/${application.id}`
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4" />
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center text-gray-500">
              Nenhuma candidatura encontrada com os filtros selecionados
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
