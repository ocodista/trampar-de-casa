'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, Download, ExternalLink } from 'lucide-react'
import { getResumePresignedUrl } from './action'

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
      workModel: string
      contractType: string
      coverLetter: string
      resumeUrl?: string
      startedWorkingAt: string
    }
    status: 'pending' | 'approved' | 'rejected' | 'ignored'
    createdAt: string
    role: {
      title: string
      company: string
    }
  }
}

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

export default function ApplicationDetails({
  application,
}: ApplicationDetailsProps) {
  const router = useRouter()
  console.log({ application })

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
        <h1 className="text-2xl font-bold">Detalhes da Candidatura</h1>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{application.role.title}</h2>
            <p className="text-gray-600">{application.role.company}</p>
          </div>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              statusColors[application.status]
            }`}
          >
            {statusLabels[application.status]}
          </span>
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
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Modelo de Trabalho
                </label>
                <p className="mt-1">
                  {application.details.workModel === 'remote'
                    ? 'Remoto'
                    : 'Híbrido'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tipo de Contrato
                </label>
                <p className="mt-1">
                  {application.details.contractType === 'clt' ? 'CLT' : 'PJ'}
                </p>
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
