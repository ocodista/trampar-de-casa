import { z } from 'zod'

// Schema de validação
export const applicationSchema = z.object({
  // Dados Pessoais
  fullName: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  location: z.string().min(1, 'Localização é obrigatória'),

  // Experiência Profissional
  startedWorkingAt: z
    .date({
      required_error: 'Data de início é obrigatória',
      invalid_type_error: 'Data inválida',
    })
    .transform((date) => new Date(date)),
  englishLevel: z.enum(['Beginner', 'Intermediary', 'Advanced', 'Fluent']),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  linkedInUrl: z.string().url('URL do LinkedIn inválida'),
  githubUrl: z.string().url().optional().or(z.literal('')),

  // Documentos e Extras
  coverLetter: z.string().optional(),
  resume: z.instanceof(File).optional(),

  // Consentimento
  dataConsent: z.literal(true, {
    errorMap: () => ({
      message: 'Você precisa aceitar compartilhar seus dados',
    }),
  }),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
