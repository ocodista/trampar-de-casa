import { FormSchema } from 'app/(roles)/formSchema'
import { Button } from 'app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from 'app/components/ui/dialog'
import { Database } from 'db/src/supabase/type'
import { useFormContext } from 'react-hook-form'
import { skillArray } from 'shared/src/infos/skills'
import { RoleCard } from 'shared/ui/email/RoleCard'

const sanitizeSkills = (skillIds: string[] = []) => {
  return skillIds.map(
    (id) => skillArray.find((skillInfo) => skillInfo.id === Number(id)).name
  ) as unknown as string[]
}
const sanitizeLanguage = (language: string) => {
  const languageList: Record<
    Database['public']['Enums']['RoleLanguage'],
    string
  > = {
    English: 'Inglês',
    Portuguese: 'Português',
  }
  return languageList[language]
}

export const RolePreview = () => {
  const { watch } = useFormContext<FormSchema>()

  return (
    <RoleCard
      company={watch('company') || 'Vazio'}
      currency={watch('currency') || 'Vazio'}
      language={sanitizeLanguage(watch('language')) || 'Vazio'}
      headerInfo={watch('description') || 'Vazio'}
      location={watch('country') || 'Vazio'}
      skills={sanitizeSkills(watch('skillsId'))}
      title={watch('title') || 'Vazio'}
      url={watch('url')}
    />
  )
}

export function RolePreviewModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Visualização da vaga</DialogTitle>
        <DialogDescription>Como o usuário enxerga sua vaga:</DialogDescription>
        <RolePreview />
      </DialogContent>
    </Dialog>
  )
}
