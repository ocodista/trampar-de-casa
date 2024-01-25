import { FormSchema } from 'app/(roles)/formSchema'
import { Button } from 'app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from 'app/components/ui/dialog'
import { useFormContext } from 'react-hook-form'
import { skillArray } from 'shared/src/infos/skills'
import { RoleCard } from 'shared/ui/email/RoleCard'

const sanitizeSkills = (skillIds: string[] = []) => {
  return skillIds.map(
    (id) => skillArray.find((skillInfo) => skillInfo.id === Number(id)).name
  ) as unknown as string[]
}

export function RolePreview() {
  const { watch } = useFormContext<FormSchema>()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Visualização da vaga</DialogTitle>
        <DialogDescription>Como o usuário enxerga sua vaga:</DialogDescription>
        <section>
          <RoleCard
            company={watch('company')}
            currency={watch('currency')}
            language={watch('language')}
            headerInfo={watch('description')}
            location={watch('country')}
            skills={sanitizeSkills(watch('skillsId'))}
            title={watch('title')}
            url={watch('url')}
          />
        </section>
      </DialogContent>
    </Dialog>
  )
}
