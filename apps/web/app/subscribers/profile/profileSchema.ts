import * as z from 'zod'
import { EnglishLevel } from '../../../global/EnglishLevel'

export enum ProfileSchemaEnum {
  Name = 'name',
  StartedWorkingAt = 'startedWorkingAt',
  LinkedInUrl = 'linkedInUrl',
  GitHub = 'gitHub',
  Skills = 'skillsId',
  EnglishLevel = 'englishLevel',
  ReceiveEmailConfig = 'receiveEmailConfig',
  SkillsSuggestions = 'skillsSuggestions',
  SendBestOpenings = 'sendBestOpenings',
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
    .trim()
    .refine(
      (url) =>
        url.startsWith('https://linkedin.com/in/') ||
        url.startsWith('https://www.linkedin.com/in/'),
      {
        message:
          'URL do perfil deve começar com https://linkedin.com/in/ ou https://www.linkedin.com/in/',
      }
    ),
  [ProfileSchemaEnum.GitHub]: z
    .string()
    .url({ message: 'Formato de URL inválido.' })
    .or(z.literal(''))
    .nullable()
    .transform((data) => (data ? data : null)),
  [ProfileSchemaEnum.StartedWorkingAt]: z.date({ coerce: true }),
  [ProfileSchemaEnum.EnglishLevel]: z.nativeEnum(EnglishLevel).optional(),
  [ProfileSchemaEnum.Skills]: z
    .array(z.string())
    .min(1, { message: 'Escolha ao menos uma habilidade' }),
  [ProfileSchemaEnum.ReceiveEmailConfig]: z
    .array(z.string())
    .min(1, { message: 'Escolha ao menos uma opção' }),
  [ProfileSchemaEnum.SkillsSuggestions]: z.array(z.string()).default([]),
  [ProfileSchemaEnum.SendBestOpenings]: z.boolean().default(false),
})

export type ProfileSchema = z.infer<typeof profileFormSchema>
