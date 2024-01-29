import { Topics } from 'shared/src/enums/topics'
import { z } from 'zod'

export const formSchema = z.object({
  url: z.string().url({ message: 'Formato de URL inválido.' }),
  title: z.string({ required_error: 'Título inválido' }),
  company: z.string({ required_error: 'Nome da empresa inválido' }),
  currency: z.string({ required_error: 'Câmbio inválido' }),
  description: z.string().nullable(),
  language: z.string({ required_error: 'Idioma inválido' }),
  skillsId: z.array(z.string(), {
    required_error: 'Adicione pelo menos uma habilidade.',
  }),
  country: z.string({ required_error: 'País de origem inválido' }),
  minimumYears: z.number({ coerce: true }).default(0).nullable(),
  topicsId: z
    .string({ invalid_type_error: 'Selecione algum tópico' })
    .default(Topics.NATIONAL_VACANCIES.toString()),
  salary: z
    .number({ required_error: 'Sálario Inválido', coerce: true })
    .default(0)
    .nullable(),
})

export type FormSchema = z.TypeOf<typeof formSchema>
