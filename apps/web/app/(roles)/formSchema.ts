import { Topics } from 'shared/src/enums/topics'
import { z } from 'zod'

const formatSalary = (
  minSalary: number,
  maxSalary: number,
  currency: string,
  frequency: 'monthly' | 'annual',
  isSingleValue: boolean,
  topicId: number
): string => {
  const isInternational = topicId === Topics.INTERNATIONAL_VACANCIES
  const currencySymbol = currency === 'USD' ? '$' : 'R$'
  const formatter = new Intl.NumberFormat(
    currency === 'USD' ? 'en-US' : 'pt-BR',
    {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )

  const formattedMinSalary = formatter
    .format(minSalary)
    .replace(currencySymbol, '')
    .trim()
  const formattedMaxSalary = formatter
    .format(maxSalary)
    .replace(currencySymbol, '')
    .trim()

  const frequencyText = isInternational
    ? frequency === 'monthly'
      ? 'monthly'
      : 'annual'
    : frequency === 'monthly'
    ? 'mensal'
    : 'anual'

  if (isSingleValue) {
    return isInternational
      ? `${currencySymbol} ${formattedMinSalary} /${frequencyText}`
      : `${currencySymbol} ${formattedMinSalary} /${frequencyText}`
  } else {
    return isInternational
      ? `From ${currencySymbol} ${formattedMinSalary} to ${currencySymbol} ${formattedMaxSalary} /${frequencyText}`
      : `De ${currencySymbol} ${formattedMinSalary} até ${currencySymbol} ${formattedMaxSalary} /${frequencyText}`
  }
}

export const formSchema = z
  .object({
    url: z
      .string({ required_error: 'Campo obrigatório.' })
      .url({ message: 'URL inválida.' }),
    title: z.string({ required_error: 'O título da vaga é obrigatório.' }),
    company: z.string({ required_error: 'Sem empresa -> Sem vaga 😶‍🌫️' }),
    currency: z.enum(['USD', 'BRL'], { required_error: 'Moeda inválida.' }),
    description: z.string({ required_error: 'Campo obrigatório.' }).nullable(),
    language: z.string({ required_error: 'Idioma inválido.' }),
    skillsId: z.array(z.string(), {
      required_error: 'Adicione ao menos uma habilidade.',
    }),
    country: z.string({ required_error: 'País de origem inválido.' }),
    minimumYears: z.number({ coerce: true }).default(0).nullable(),
    topicsId: z
      .string({ invalid_type_error: 'Selecione algum tópico.' })
      .default(Topics.NATIONAL_VACANCIES.toString())
      .transform((val) => parseInt(val, 10)),
    minSalary: z.number().default(10),
    maxSalary: z.number().default(10000),
    salaryFrequency: z.enum(['monthly', 'annual'], {
      required_error: 'Por favor, selecione a frequência salarial',
    }),
    isSingleValue: z.boolean().default(false),
    companyLogo: z
      .any()
      .optional()
      .refine(
        (file) => {
          if (file instanceof File) {
            return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
          }
          return true
        },
        {
          message: 'O arquivo deve ser uma imagem (JPEG, PNG ou GIF).',
        }
      )
      .refine(
        (file) => {
          if (file instanceof File) {
            return file.size <= 5 * 1024 * 1024 // 5MB
          }
          return true
        },
        {
          message: 'O tamanho máximo do arquivo é 5MB.',
        }
      ),
  })
  .refine((data) => data.maxSalary >= data.minSalary, {
    message: 'O salário máximo deve ser maior ou igual ao salário mínimo',
    path: ['maxSalary'],
  })
  .transform((data) => ({
    ...data,
    salary: formatSalary(
      data.minSalary,
      data.isSingleValue ? data.minSalary : data.maxSalary,
      data.currency,
      data.salaryFrequency,
      data.isSingleValue,
      data.topicsId
    ),
    topicId: data.topicsId,
  }))

export type FormSchema = z.infer<typeof formSchema>
