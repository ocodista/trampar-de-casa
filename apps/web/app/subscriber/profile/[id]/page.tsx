'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { PersonalInfoForm } from '../components/PersonalInfoForm'
import { SubscriptionForm } from '../subscription/SubscriptionForm'
import { ProfileSchema, profileFormSchema } from '../profileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '../../../components/ui/separator'
import { Button } from '../../../components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../../../contexts/LoadingContext'
import { NextPage } from 'next'
import { ApiRoutes } from 'shared/src/enums'
import { errorMessage } from '../../../components/ui/toaster'
import { useToast } from '../../../components/ui/use-toast'
import { useQuery } from 'react-query'
import { UiRoutes } from '../../../enums/uiRoutes'
import { EnglishLevel } from '../../../../global/EnglishLevel'

const title = 'Perfil'
const description = 'Configure seu perfil para receber vagas mais assertivas.'

const ProfilePage: NextPage = () => {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      englishLevel: EnglishLevel.None,
      linkedInUrl: 'https://linkedin.com/in/',
    },
    mode: 'all',
    criteriaMode: 'firstError',
  })
  const paths = usePathname().split('/').reverse()
  const id = paths[0]
  const { withLoading } = useContext(LoadingContext)
  const { toast } = useToast()

  const getSubscriberProfile = async (): Promise<Omit<ProfileSchema, 'id'>> => {
    const response = await fetch(`${ApiRoutes.Subscribers}/${id}`)
    if (!response?.ok) {
      throw new Error(response.statusText)
    }
    const profile = await response.json()
    return profile
  }

  const router = useRouter()

  const { data: subscriberProfile } = useQuery({
    queryKey: ['subscriberProfileQuery'],
    queryFn: getSubscriberProfile,
    onError: async (err) => {
      console.error(err)
      toast(errorMessage())
      await new Promise((r) => setTimeout(r, 2000))
      router.push(UiRoutes.Home)
    },
  })

  useEffect(() => {
    subscriberProfile &&
      form.reset({
        ...subscriberProfile,
        startedWorkingAt: new Date(
          subscriberProfile.startedWorkingAt as unknown as string
        ),
      })
  }, [subscriberProfile])

  const onSubmit = async (formState: ProfileSchema) => {
    withLoading(async () => {
      try {
        const response = await fetch(ApiRoutes.Subscribers + '/' + id, {
          method: 'PUT',
          body: JSON.stringify(formState),
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
        toast({ title: 'Atualizado com sucesso!' })
      } catch (err) {
        toast(errorMessage())
      }
    })
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container px-8 mx-auto space-y-6 pb-16 block"
      >
        <header className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </header>
        <Separator className="my-6" />
        <main className="flex flex-col sm:flex-row gap-6 md:gap-14">
          <PersonalInfoForm />
          <SubscriptionForm />
        </main>
        <footer>
          <Button type="submit">Salvar</Button>
        </footer>
      </form>
    </FormProvider>
  )
}

export default ProfilePage
