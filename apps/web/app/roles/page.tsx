'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'app/components/ui/button'
import { SkillsField } from 'app/subscriber/profile/components/SkillsField'
// import { ProfileSchema, profileFormSchema } from "app/subscriber/profile/profileSchema"
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const roleSchema = z.object({
  skills: z
    .array(z.string())
    .min(1, { message: 'Escolha ao menos uma habilidade' }),
})
type RolesSchema = z.TypeOf<typeof roleSchema>

const ProfilePage = () => {
  const onSubmit = async (formState: RolesSchema) => {
    console.log(formState)
  }
  const form = useForm<RolesSchema>({
    resolver: zodResolver(roleSchema),
    mode: 'all',
    criteriaMode: 'firstError',
  })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="container">
          <SkillsField />
          <Button>teste</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfilePage
