import { Topics } from 'shared/src/enums/topics'
import { z } from 'zod'

export const formSchema = z.object({
  url: z.string().url({ message: 'URL inválida.' }),
  title: z.string({ required_error: 'O título da vaga é obrigatório.' }),
  company: z.string({ required_error: 'Sem empresa -> Sem vaga 😶‍🌫️' }),
  currency: z.string({ required_error: 'Moeda inválida.' }),
  description: z.string().nullable(),
  language: z.string({ required_error: 'Idioma inválido.' }),
  skillsId: z.array(z.string(), {
    required_error: 'Adicione ao menos uma habilidade.',
  }),
  country: z.string({ required_error: 'País de origem inválido.' }),
  minimumYears: z.number({ coerce: true }).default(0).nullable(),
  topicsId: z
    .string({ invalid_type_error: 'Selecione algum tópico.' })
    .default(Topics.NATIONAL_VACANCIES.toString()),
  salary: z
    .number({ required_error: 'Salário inválido.', coerce: true })
    .default(0)
    .nullable(),
})

export type FormSchema = z.TypeOf<typeof formSchema>
