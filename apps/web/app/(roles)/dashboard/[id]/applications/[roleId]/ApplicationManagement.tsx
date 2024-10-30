'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Eye, ChevronLeft } from 'lucide-react'

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

export default function ApplicationsManagement({
  roleId,
  applications,
  userId,
}) {
  const router = useRouter()

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
        <h1 className="text-2xl font-bold">Candidaturas da Vaga</h1>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Candidatos</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
              {applications?.length || 0} candidatos
            </span>
          </div>
        </div>

        <div className="p-4">
          {applications?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
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
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-gray-900">
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
                          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
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
              Nenhuma candidatura recebida ainda
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
