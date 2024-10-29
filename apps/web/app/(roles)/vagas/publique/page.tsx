'use client'

import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RolePreviewModal } from './RolePreview'
import { RolePreviewSection } from './RolePreviewSection'
import { RoleTopic } from './RoleTopic'
import { CompanyLogoUpload } from 'app/components/CompanyLogoUpload'
import { SalaryRangeField } from 'app/components/SalaryRangeField'
import { Button } from 'app/components/ui/button'
import { LoadingOverlay } from 'app/components/ui/loadingOverlay'
import {
  CurrencySelect,
  CustomFormField,
  EnglishLevelSelect,
  LanguageSelect,
  TextInput,
} from 'app/components/CustomFormField'
import { SkillsField } from 'app/subscribers/profile/components/SkillsField'

import { useToast } from 'app/hooks/use-toast'
import login from 'app/utils/LoginPreferencesActions'
import { checkUserHasRoles, createRole, sendCompanyLogoToR2 } from './action'

import { FormSchema, formSchema } from 'app/(roles)/formSchema'
import { Database } from 'db'
import { FEATURES } from './config'

import type { FormInputProps } from 'app/components/CustomFormField'

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

const uploadCompanyLogo = async (file: File) => {
  if (!file) return null

  const sanitizedFileName = file.name.replace(/\s+/g, '_')
  const fileName = `company_logo_${Date.now()}_${sanitizedFileName}`
  const fileBuffer = await file.arrayBuffer()
  const base64FileBuffer = Buffer.from(fileBuffer).toString('base64')

  await sendCompanyLogoToR2({
    fileName,
    fileBuffer: base64FileBuffer,
    contentType: file.type,
  })

  const bucketUrl = 'https://pub-b4f7c986aa7b4e89baa8b33ffcc31fb7.r2.dev'
  const company_logo_url = `${bucketUrl}/${fileName}`

  return company_logo_url
}

export default function RolesCreate() {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      minSalary: 0,
      maxSalary: 15000,
    },
  })
  const toast = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasRoles, setHasRoles] = useState(false)
  const [userID, setUserID] = useState('')

  const formValues = form.watch()

  useEffect(() => {
    console.log('Form changed:', formValues)
  }, [formValues])

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
        company_logo_url = await uploadCompanyLogo(formData.companyLogo)
      }

      const roleData: RolesInsert = {
        language: formData.language === 'Portuguese' ? 'Portuguese' : 'English',
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
        englishLevel: formData.englishLevel,
      }

      const newRole = await createRole(roleData, email, userID)

      toast.toast({
        title: 'Vaga criada com sucesso!',
        description: 'A vaga foi publicada e associada à sua conta.',
      })

      router.push(`/vaga/${newRole.id}`)
    } catch (error) {
      console.error('Erro ao criar vaga:', error)

      let errorMessage =
        'Ocorreu um erro ao criar a vaga. Por favor, tente novamente.'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      toast.toast({
        title: 'Erro ao criar a vaga',
        description: errorMessage,
        variant: 'destructive',
      })
    }
  }

  return (
    <FormProvider {...form}>
      {form.formState.isSubmitting && <LoadingOverlay className="flex" />}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="container pb-6">
          <h1 className="mb-8 text-2xl font-bold tracking-tight">
            Publique sua vaga!
          </h1>

          <div className="space-y-8">
            <CompanyLogoUpload />

            <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              {fields.map((props) => (
                <div key={props.name} className="relative min-h-[90px]">
                  <CustomFormField
                    {...props}
                    Input={props.Input || TextInput}
                  />
                </div>
              ))}

              <div className="relative min-h-[90px]">
                <CustomFormField
                  name="englishLevel"
                  label="Nível de inglês necessário"
                  placeholder="Initial, Intermediary..."
                  description="Insira o nível de inglês necessário"
                  Input={EnglishLevelSelect}
                  required
                />
              </div>

              <div className="relative min-h-[90px]">
                <CustomFormField
                  name="currency"
                  label="Câmbio"
                  placeholder="BRL, USD, EUR..."
                  description="Insira a moeda de pagamento do salário"
                  Input={CurrencySelect}
                  required
                />
              </div>

              <div className="relative min-h-[90px] md:col-span-2">
                <SalaryRangeField currency={form.watch('currency')} />
              </div>

              {countryAndLanguageField.map((props) => (
                <div key={props.name} className="relative min-h-[90px]">
                  <CustomFormField
                    {...props}
                    Input={props.Input || TextInput}
                  />
                </div>
              ))}

              <div className="space-y-8 md:col-span-2">
                <RoleTopic />
                <SkillsField description="Quais habilidades são necessárias para a vaga?" />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Enviar
              </Button>
              {isLoggedIn && hasRoles && (
                <Button onClick={() => router.push(`/dashboard/${userID}`)}>
                  Ir para o Dashboard
                </Button>
              )}
              {/* <div className="md:hidden">
                <RolePreviewModal />
              </div> */}
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  )
}
