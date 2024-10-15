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
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RolePreviewModal } from './RolePreview'
import { RolePreviewSection } from './RolePreviewSection'
import { RoleTopic } from './RoleTopic'
import { Database } from 'db'
import login from 'app/utils/LoginPreferencesActions'
import {
  checkUserHasRoles,
  createRole,
  createRoleOwner,
  sendCompanyLogoToR2,
} from './action'
import { useRouter } from 'next/navigation'
import { FEATURES } from './config'
import { SalaryRangeField } from 'app/components/SalaryRangeField'
import { CompanyLogoUpload } from 'app/components/CompanyLogoUpload'

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
    defaultValues: {
      minSalary: 1000,
      maxSalary: 10000,
    },
  })
  const toast = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasRoles, setHasRoles] = useState(false)
  const [userID, setUserID] = useState('')

  useEffect(() => {
    const checkLoginAndRoles = async () => {
      const email = localStorage.getItem('loginEmail')
      if (email) {
        setIsLoggedIn(true)
        const userHasRoles = await checkUserHasRoles(email)
        setHasRoles(userHasRoles)
        const userID = await login(email)
        setUserID(userID)
      }
    }

    checkLoginAndRoles()
  }, [])

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
    try {
      let company_logo_url = null
      if (formData.companyLogo && formData.companyLogo instanceof File) {
        const fileName = `company_logo_${Date.now()}_${
          formData.companyLogo.name
        }`
        const fileBuffer = await formData.companyLogo.arrayBuffer()
        const base64FileBuffer = Buffer.from(fileBuffer).toString('base64')

        await sendCompanyLogoToR2({
          fileName,
          fileBuffer: base64FileBuffer,
          contentType: formData.companyLogo.type,
        })

        company_logo_url = `https://company-logo-trampar-de-casa.r2.dev/${fileName}`
      }

      const roleData: RolesInsert = {
        language: formData.language === 'Português' ? 'Portuguese' : 'English',
        country: formData.country,
        currency: formData.currency,
        description: formData.description,
        salary: formData.salary,
        title: formData.title,
        url: formData.url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: formData.company,
        skillsId: formData.skillsId || [],
        ready: true,
        topicId: formData.topicId,
        company_logo: company_logo_url,
        minimumYears: formData.minimumYears,
      }

      const newRole = await createRole(roleData, email)
      await createRoleOwner(newRole.id, userID)
      console.log('should redirect')
      router.push(`/vaga/${newRole.id}`)

      form.reset()

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
            <section className="grid grid-cols-1 justify-center gap-6 py-6 md:grid-cols-2">
              <CompanyLogoUpload />
              {fields.map((props) => (
                <CustomFormField
                  key={props.name}
                  {...props}
                  Input={props.Input || TextInput}
                />
              ))}
              <CustomFormField
                name="currency"
                label="Câmbio"
                placeholder="BRL, USD, EUR..."
                description="Insira a moeda de pagamento do salário"
                Input={CurrencySelect}
                required
              />
              <SalaryRangeField currency={form.watch('currency')} />
              {countryAndLanguageField.map((props) => (
                <CustomFormField
                  key={props.name}
                  {...props}
                  Input={props.Input || TextInput}
                />
              ))}
              <div className="space-y-6 md:col-span-2">
                <RoleTopic />
                <SkillsField description="Quais habilidades são necessárias para a vaga?" />
              </div>
            </section>
          </section>
          <section className="flex gap-4">
            <Button disabled={form.formState.isSubmitting} type="submit">
              Enviar
            </Button>
            {isLoggedIn && hasRoles && (
              <Button onClick={() => router.push(`/dashboard/${userID}`)}>
                Ir para o Dashboard
              </Button>
            )}
            <section className="md:invisible">
              <RolePreviewModal />
            </section>
          </section>
        </section>
      </form>
    </FormProvider>
  )
}
