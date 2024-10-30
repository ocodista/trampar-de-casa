'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'app/components/ui/form'
import { Button } from 'app/components/ui/button'
import { useToast } from 'app/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { applicationSchema, ApplicationFormData } from './applicationFormSchema'
import { createRoleApplication } from './action'
import {
  ConsentSection,
  DocumentsSection,
  PersonalInfoSection,
  PreferencesSection,
  ProfessionalInfoSection,
} from 'app/components/FormSections'
import { uploadResume } from 'app/utils/uploadResume'
import { LoadingOverlay } from 'app/components/ui/loadingOverlay'
import { Database } from 'db'

type RoleApplication =
  Database['public']['Tables']['RoleApplications']['Insert']

interface JobApplicationPageProps {
  applicationData: Partial<ApplicationFormData>
  roleData: {
    id: string
    title: string
    company: string
  }
  roleId: string
  subscriberId: string
}

export default function JobApplicationPage({
  applicationData,
  roleData,
  roleId,
  subscriberId,
}: JobApplicationPageProps) {
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      ...applicationData,
      dataConsent: undefined,
      startedWorkingAt: null,
    },
    mode: 'onBlur',
    criteriaMode: 'firstError',
  })

  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  console.log({ applicationData })

  const onSubmit = async (formData: ApplicationFormData) => {
    setIsSubmitting(true)
    try {
      let resumeUrl = null
      if (formData.resume) {
        resumeUrl = await uploadResume(formData.resume)
      }

      const serializableDetails = {
        fullName: formData.fullName,
        email: formData.email,
        location: formData.location,
        currentRole: formData.currentRole,
        englishLevel: formData.englishLevel,
        portfolioUrl: formData.portfolioUrl,
        linkedInUrl: formData.linkedInUrl,
        githubUrl: formData.githubUrl,
        salaryExpectation: formData.salaryExpectation,
        availability: formData.availability,
        coverLetter: formData.coverLetter,
        startedWorkingAt: formData.startedWorkingAt.toISOString(),
        resumeUrl,
        dataConsent: formData.dataConsent,
      }

      const applicationDetails: RoleApplication = {
        roleId,
        subscriberId,
        meetsRequirements: true,
        status: 'pending',
        details: serializableDetails,
      }

      await createRoleApplication(applicationDetails)

      toast({
        title: 'Aplicação enviada com sucesso!',
        description: 'Você receberá um email com a confirmação.',
      })

      router.back()
    } catch (error) {
      console.error('Erro ao enviar aplicação:', error)

      const errorMessage =
        error instanceof Error ? error.message : 'Por favor, tente novamente.'

      toast({
        title: 'Erro ao enviar aplicação',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">Aplicar para vaga</h1>
          <p className="text-muted-foreground">
            {roleData.title} em {roleData.company}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {form.formState.isSubmitting && <LoadingOverlay className="flex" />}

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
