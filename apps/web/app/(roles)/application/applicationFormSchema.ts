import { z } from 'zod'

// Schema de validação
export const applicationSchema = z.object({
  // Dados Pessoais
  fullName: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),

  // Experiência Profissional
  yearsOfExperience: z.number().min(0, 'Anos de experiência inválidos'),
  currentRole: z.string().optional(),
  englishLevel: z.enum(['Beginner', 'Intermediary', 'Advanced', 'Fluent']),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  linkedInUrl: z.string().url('URL do LinkedIn inválida'),
  githubUrl: z.string().url().optional().or(z.literal('')),

  // Preferências
  salaryExpectation: z.string().min(1, 'Pretensão salarial é obrigatória'),
  availability: z.string().min(1, 'Disponibilidade é obrigatória'),
  workModel: z.enum(['remote', 'hybrid', 'onsite']),
  contractType: z.enum(['clt', 'pj']),

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
