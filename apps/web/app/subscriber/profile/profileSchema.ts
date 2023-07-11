import * as z from 'zod'
import { EnglishLevel } from '../../../global/EnglishLevel'

export enum ProfileSchemaEnum {
  Name = 'name',
  StartedWorkingAt = 'startedWorkingAt',
  LinkedInUrl = 'linkedInUrl',
  GitHub = 'gitHub',
  Skills = 'skills',
  EnglishLevel = 'englishLevel',
  NationalRoles = 'nationalRoles',
  InternationalRoles = 'internationalRoles',
  EnglishTipes = 'englishTips',
  ReceiveEmailConfig = 'receiveEmailConfig',
}

export const profileFormSchema = z.object({
  [ProfileSchemaEnum.Name]: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, {
      message: 'Seu nome deve conter no mínimo 3 letras',
    }),
  [ProfileSchemaEnum.LinkedInUrl]: z
    .string({ required_error: 'LinkedIn é obrigatório' })
    .url({ message: 'Formato de URL inválido' })
    .min(28, {
      message: 'Seu LinkedIn é obrigatório',
    })
    .startsWith(
      'https://linkedin.com/in/',
      'URL do perfil deve começar com https://linkedin.com/in/'
    ),
  [ProfileSchemaEnum.GitHub]: z
    .string()
    .url({ message: 'Formato de URL inválido.' })
    .nullable()
    .optional(),
  [ProfileSchemaEnum.StartedWorkingAt]: z.date({ coerce: true }),
  [ProfileSchemaEnum.EnglishLevel]: z.nativeEnum(EnglishLevel),
  [ProfileSchemaEnum.Skills]: z
    .array(z.string())
    .min(1, { message: 'Escolha ao menos uma habilidade' }),
  [ProfileSchemaEnum.ReceiveEmailConfig]: z.array(z.string()),
})

export type ProfileSchema = z.infer<typeof profileFormSchema>
