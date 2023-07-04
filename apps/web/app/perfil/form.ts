import * as z from 'zod'

export enum ProfileFormKeys {
  Name = 'name',
  StartDate = 'startDate',
  LinkedInUrl = 'linkedInUrl',
  GitHub = 'github',
  Skills = 'skills',
  EnglishLevel = 'englishLevel',
  InternationalRoles = 'internationalRoles',
  NationalRoles = 'nationalRoles',
}

enum EnglishLevel {
  Beginner,
  Intermediary,
  Advanced,
  Fluent,
}

export const profileFormSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }).min(3, {
    message: 'Seu nome deve conter no mínimo 3 letras.',
  }),
  linkedInUrl: z
    .string({ required_error: 'LinkedIn é obrigatório' })
    .url({ message: 'Formato de URL inválido.' })
    .min(28, {
      message: 'Seu LinkedIn é obrigatório.',
    })
    .startsWith(
      'https://linkedin.com/in/',
      'URL do perfil deve começar com https://linkedin.com/in/'
    ),
  github: z.string().url({ message: 'Formato de URL inválido.' }).optional(),
  startDate: z.date({
    required_error: 'Selecione a data do seu primeiro emprego',
  }),
  englishLevel: z.nativeEnum(EnglishLevel),
})

export type ProfileFormState = z.infer<typeof profileFormSchema>
