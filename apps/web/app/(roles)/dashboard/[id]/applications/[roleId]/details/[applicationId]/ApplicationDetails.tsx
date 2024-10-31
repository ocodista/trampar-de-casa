'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, Download, ExternalLink, ChevronDown } from 'lucide-react'
import {
  ApplicationStatus,
  getResumePresignedUrl,
  updateStatus,
} from './action'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'app/hooks/use-toast'

interface ApplicationDetailsProps {
  application: {
    id: string
    details: {
      fullName: string
      email: string
      location: string
      englishLevel: string
      linkedInUrl: string
      githubUrl: string
      salaryExpectation: string
      availability: string
      coverLetter: string
      resumeUrl?: string
      startedWorkingAt: string
      portfolioUrl: string
    }
    status: 'pending' | 'approved' | 'rejected' | 'ignored'
    createdAt: string
    meetsRequirements: boolean
    role: {
      title: string
      company: string
    }
  }
}

const statusOptions = [
  {
    id: 'pending',
    label: 'Pendente',
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  },
  {
    id: 'approved',
    label: 'Aprovado',
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
  },
  {
    id: 'rejected',
    label: 'Rejeitado',
    color: 'bg-red-100 text-red-800 hover:bg-red-200',
  },
  {
    id: 'ignored',
    label: 'Ignorado',
    color: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  },
]

export default function ApplicationDetails({
  application,
}: ApplicationDetailsProps) {
  const router = useRouter()
  const [status, setStatus] = useState(application.status)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  console.log({ application })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    try {
      if (status === newStatus) {
        return
      }
      const result = await updateStatus(application.id, newStatus)
      if (result.success) {
        setStatus(newStatus)
        toast({
          title: 'Status atualizado com sucesso!',
          variant: 'default',
          duration: 3000,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast({
        title: 'Erro ao atualizar status',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
        duration: 3000,
      })
    } finally {
      setIsOpen(false)
    }
  }

  const handleBack = () => {
    router.back()
    router.refresh()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold">Detalhes da Candidatura</h1>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{application.role.title}</h2>
            <p className="text-gray-600">{application.role.company}</p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                ${statusOptions.find((s) => s.id === status)?.color}
                transition-colors duration-200
              `}
            >
              {statusOptions.find((s) => s.id === status)?.label}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute left-0 top-12 z-10 min-w-[160px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                {statusOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleStatusChange(option.id as typeof application.status)
                    }
                    className={`
                      w-full px-4 py-2 text-left text-sm
                      ${
                        option.id === status ? option.color : 'hover:bg-gray-50'
                      }
                      transition-colors duration-200
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h3 className="mb-4 text-lg font-semibold">
              Informações do Candidato
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nome
                </label>
                <p className="mt-1">{application.details.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-1">{application.details.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Localização
                </label>
                <p className="mt-1">{application.details.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nível de Inglês
                </label>
                <p className="mt-1">{application.details.englishLevel}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Atende aos requisitos
                </label>
                <p className="mt-1">
                  {application.meetsRequirements.toString()}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Links</h3>
            <div className="space-y-2">
              {application.details.linkedInUrl && (
                <a
                  href={application.details.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {application.details.githubUrl && (
                <a
                  href={application.details.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {application.details.portfolioUrl && (
                <a
                  href={application.details.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Site Portfólio
                </a>
              )}
              {application.details.resumeUrl && (
                <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Download className="h-4 w-4" />
                  <button
                    onClick={() =>
                      getResumePresignedUrl(
                        application.details.resumeUrl.split('/').pop()
                      ).then((url) => window.open(url, '_blank'))
                    }
                    className="hover:underline"
                  >
                    Currículo
                  </button>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold">Preferências</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Expectativa Salarial
                </label>
                <p className="mt-1">{application.details.salaryExpectation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Disponibilidade
                </label>
                <p className="mt-1">{application.details.availability}</p>
              </div>
            </div>
          </section>

          {application.details.coverLetter && (
            <section>
              <h3 className="mb-4 text-lg font-semibold">
                Carta de Apresentação
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="whitespace-pre-wrap">
                  {application.details.coverLetter}
                </p>
              </div>
            </section>
          )}

          <div className="mt-4 text-sm text-gray-500">
            Candidatura realizada em{' '}
            {new Date(application.createdAt).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </div>
  )
}
