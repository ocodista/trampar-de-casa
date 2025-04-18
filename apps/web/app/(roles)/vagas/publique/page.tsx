'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema, formSchema } from 'app/(roles)/formSchema'
import {
  CurrencySelect,
  CustomFormField,
  FormInputProps,
  LanguageSelect,
  TextInput,
} from 'app/components/CustomFormField'
import { Button } from 'app/components/ui/button'
import { LoadingOverlay } from 'app/components/ui/loadingOverlay'
import { useToast } from 'app/hooks/use-toast'
import { SkillsField } from 'app/subscribers/profile/components/SkillsField'
import { InputHTMLAttributes } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RolePreviewModal } from './RolePreview'
import { RolePreviewSection } from './RolePreviewSection'
import { RoleTopic } from './RoleTopic'

type FormFields = {
  name: keyof FormSchema
  label: string
  placeholder?: string
  description?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  Input?: React.FC<FormInputProps<FormSchema>>
  required?: true
}[]

const salaryAndCurrencyField: FormFields = [
  {
    name: 'currency',
    label: 'Câmbio',
    placeholder: 'BRL, USD, EUR...',
    description: 'Insira a moeda de pagamento do salário',
    Input: CurrencySelect,
    required: true,
  },
  {
    name: 'salary',
    label: 'Sálario',
    description: 'Digite o sálario base da vaga',
    placeholder: 'Ex: 3000',
    type: 'number',
  },
]

const countryAndLanguageField: FormFields = [
  {
    name: 'country',
    label: 'País',
    description: 'Da empresa',
    required: true,
  },
  {
    name: 'language',
    label: 'Idioma da vaga',
    description: 'Selecione um idioma',
    placeholder: 'Idioma',
    Input: LanguageSelect,
    required: true,
  },
]

const fields: FormFields = [
  {
    name: 'url',
    label: 'Link da vaga',
    description: 'Insira o link da vaga',
    placeholder: 'https://linkdavaga.com.br',
    required: true,
  },
  {
    name: 'title',
    label: 'Cargo',
    description: 'Qual o profissional perfeito para a vaga?',
    placeholder: 'React Developer',
    required: true,
  },
  {
    name: 'company',
    label: 'Nome da empresa',
    description: 'Qual empresa está contratando?',
    required: true,
  },
  {
    name: 'minimumYears',
    label: 'Qual o tempo mínimo de experiência?',
    description: 'Em anos',
    placeholder: 'Ex: 2',
    type: 'number',
  },
  {
    name: 'description',
    label: 'Subtítulo',
    description: 'Use um texto chamativo',
    placeholder: 'Ex: Mínimo X anos de XP (a partir de R$ 10.000)',
    required: true,
  },
]

export default function RolesCreate() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })
  const toast = useToast()
  const onSubmit = async (data: FormSchema) => {
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')

    const response = await fetch('/api/vagas/publique', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (response.ok) {
      form.reset({
        url: '',
        company: '',
        country: '',
        currency: undefined,
        description: '',
        language: undefined,
        minimumYears: undefined,
        salary: undefined,
        skillsId: undefined,
        title: '',
        topicsId: undefined,
      })
      toast.toast({
        title: 'Vaga enviada com sucesso!',
        description: 'Muito obrigado por enviar a vaga.',
      })
      return
    }
    toast.toast({
      title: 'Já temos essa vaga cadastrada! 😁',
      description: 'Por favor, verifique o formulário novamente. 😊',
      variant: 'destructive',
    })
  }
  return (
    <FormProvider {...form}>
      {form.formState.isSubmitting && <LoadingOverlay className="flex" />}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="container pb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Publique sua vaga!
          </h1>
          <section>
            <RolePreviewSection />
            <section className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
              {fields.map((props) => (
                <CustomFormField
                  key={props.name}
                  {...props}
                  Input={props.Input || TextInput}
                />
              ))}
              <section className="grid grid-cols-2 gap-6">
                {salaryAndCurrencyField.map((props) => (
                  <CustomFormField
                    key={props.name}
                    {...props}
                    Input={props.Input || TextInput}
                  />
                ))}
              </section>
              <section className="grid grid-cols-2 gap-6">
                {countryAndLanguageField.map((props) => (
                  <CustomFormField
                    key={props.name}
                    {...props}
                    Input={props.Input || TextInput}
                  />
                ))}
              </section>
              <RoleTopic />
              <SkillsField description="Quais habilidades são necessárias para a vaga?" />
            </section>
          </section>
          <section className="flex gap-4">
            <Button disabled={form.formState.isSubmitting} type="submit">
              Enviar
            </Button>
            <section className="md:invisible">
              <RolePreviewModal />
            </section>
          </section>
        </section>
      </form>
    </FormProvider>
  )
}
