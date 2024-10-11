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
import { InputHTMLAttributes, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RolePreviewModal } from './RolePreview'
import { RolePreviewSection } from './RolePreviewSection'
import { RoleTopic } from './RoleTopic'
import { Database } from 'db'
import login from 'app/utils/LoginPreferencesActions'
import { createRole, createRoleOwner } from './action'
import { useRouter } from 'next/navigation'
import { FEATURES } from './config'

type FormFields = {
  name: keyof FormSchema
  label: string
  placeholder?: string
  description?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  Input?: React.FC<FormInputProps>
  required?: true
}[]

type RolesInsert = Database['public']['Tables']['Roles']['Insert']

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
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  })
  const toast = useToast()

  useEffect(() => {
    if (!FEATURES.CREATE_ROLE) {
      router.push('/')
    }
  }, [router])

  if (!FEATURES.CREATE_ROLE) {
    return null
  }

  const onSubmit = async (formData: FormSchema) => {
    const email = localStorage.getItem('loginEmail')
    if (!email) {
      toast.toast({
        title: 'Erro de autenticação',
        description: 'Você precisa estar logado para criar uma vaga.',
        variant: 'destructive',
      })
      return
    }

    const userId = await login(email)

    try {
      const roleData: RolesInsert = {
        language: formData.language === 'Português' ? 'Portuguese' : 'English',
        country: formData.country,
        currency: formData.currency,
        description: formData.description,
        salary: formData.salary?.toString(),
        title: formData.title,
        url: formData.url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: formData.company,
        skillsId: formData.skillsId || [],
        ready: true,
        topicId:
          formData.currency === 'Real' || formData.currency === 'BRL' ? 1 : 2,
        company_logo: null,
        minimumYears: formData.minimumYears,
      }

      const newRole = await createRole(roleData, 'luis.oliveirabr1@gmail.com')
      await createRoleOwner(newRole.id, userId)
      router.push(`/vaga/${newRole.id}`)

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
        title: 'Vaga criada com sucesso!',
        description: 'A vaga foi publicada e associada à sua conta.',
      })
    } catch (error) {
      console.error('Erro ao criar vaga:', error)
      toast.toast({
        title: 'Erro ao criar a vaga',
        description: 'Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
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
