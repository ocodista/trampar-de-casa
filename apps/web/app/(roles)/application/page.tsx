'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'app/components/ui/form'
import { Button } from 'app/components/ui/button'
import { useToast } from 'app/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { applicationSchema, ApplicationFormData } from './applicationFormSchema'
import {
  ConsentSection,
  DocumentsSection,
  PersonalInfoSection,
  PreferencesSection,
  ProfessionalInfoSection,
} from 'app/components/FormSections'
import {
  createRoleApplication,
  getUserAndRoleData,
  sendResumeToR2,
} from './action'
import { Database } from 'db'

export default function JobApplicationPage() {
  const searchParams = useSearchParams()
  const roleId = searchParams.get('roleId')
  const subscriberId = searchParams.get('subscriberId')
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pageData, setPageData] = useState<{
    role?: any
    subscriber?: any
  }>({})

  const uploadResume = async (file: File): Promise<string | null> => {
    try {
      const sanitizedFileName = file.name.replace(/\s+/g, '_')
      const fileName = `resume_${Date.now()}_${sanitizedFileName}`
      const fileBuffer = await file.arrayBuffer()
      const base64FileBuffer = Buffer.from(fileBuffer).toString('base64')

      await sendResumeToR2({
        fileName,
        fileBuffer: base64FileBuffer,
        contentType: file.type,
      })

      const bucketUrl = 'https://pub-b4f7c986aa7b4e89baa8b33ffcc31fb7.r2.dev'
      const resumeUrl = `${bucketUrl}/${fileName}`

      return resumeUrl
    } catch (error) {
      console.error('Erro ao fazer upload do currículo:', error)
      return null
    }
  }

  useEffect(() => {
    const loadData = async () => {
      if (roleId && subscriberId) {
        try {
          const data = await getUserAndRoleData(roleId, subscriberId)
          setPageData(data)
        } catch (error) {
          console.error('Erro ao carregar dados:', error)
          toast({
            title: 'Erro ao carregar dados',
            description: 'Por favor, tente novamente.',
            variant: 'destructive',
          })
          router.push('/')
        }
      }
    }

    loadData()
  }, [roleId, subscriberId, router, toast])

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: pageData.subscriber?.name || '',
      email: pageData.subscriber?.email || '',
      englishLevel: pageData.subscriber?.englishLevel || 'Beginner',
      linkedInUrl: pageData.subscriber?.linkedInUrl || '',
      githubUrl: pageData.subscriber?.gitHub || '',
      phone: '',
      location: '',
      yearsOfExperience: 0,
      currentRole: '',
      portfolioUrl: '',
      salaryExpectation: '',
      availability: '',
      workModel: 'remote',
      contractType: 'clt',
      coverLetter: '',
    },
  })

  useEffect(() => {
    if (pageData.subscriber) {
      form.reset({
        fullName: pageData.subscriber.name || '',
        email: pageData.subscriber.email || '',
        englishLevel: pageData.subscriber.englishLevel || 'Beginner',
        linkedInUrl: pageData.subscriber.linkedInUrl || '',
        githubUrl: pageData.subscriber.gitHub || '',
        phone: '',
        location: '',
        yearsOfExperience: 0,
        currentRole: '',
        portfolioUrl: '',
        salaryExpectation: '',
        availability: '',
        workModel: 'remote',
        contractType: 'clt',
        coverLetter: '',
      })
    }
  }, [pageData.subscriber, form])

  const onSubmit = async (data: ApplicationFormData) => {
    if (!roleId || !subscriberId) return

    setIsSubmitting(true)
    try {
      let resumeUrl = null
      if (data.resume) {
        resumeUrl = await uploadResume(data.resume)
      }

      const applicationData: Database['public']['Tables']['RoleApplications']['Insert'] =
        {
          roleId,
          subscriberId,
          meetsRequirements: true,
          status: 'pending',
          details: {
            fullName: data.fullName,
            phone: data.phone,
            location: data.location,
            yearsOfExperience: data.yearsOfExperience,
            currentRole: data.currentRole,
            portfolioUrl: data.portfolioUrl,
            salaryExpectation: data.salaryExpectation,
            availability: data.availability,
            workModel: data.workModel,
            contractType: data.contractType,
            coverLetter: data.coverLetter,
            resumeUrl,
          },
        }

      await createRoleApplication(applicationData)

      toast({
        title: 'Aplicação enviada com sucesso!',
        description: 'Você receberá um email com a confirmação.',
      })

      router.push('/dashboard')
    } catch (error) {
      console.error('Erro ao enviar aplicação:', error)
      toast({
        title: 'Erro ao enviar aplicação',
        description: 'Por favor, tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!roleId || !subscriberId || !pageData.role || !pageData.subscriber) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">Aplicar para vaga</h1>
          <p className="text-muted-foreground">
            {pageData.role.title} em {pageData.role.company}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoSection form={form} />
            <ProfessionalInfoSection form={form} />
            <PreferencesSection form={form} />
            <DocumentsSection form={form} />
            <ConsentSection form={form} />

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando aplicação...
                  </>
                ) : (
                  'Enviar Aplicação'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
