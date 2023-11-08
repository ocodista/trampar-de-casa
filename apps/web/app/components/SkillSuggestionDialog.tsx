import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'app/components/ui/dialog'
import { useToast } from 'app/hooks/use-toast'
import { ProfileSchemaEnum } from 'app/subscribers/profile/profileSchema'
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useId,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function SkillSuggestionDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)
  return (
    <>
      <p>
        <button
          type="button"
          className="text-blue-400 underline transition-all hover:text-blue-500"
          onClick={openDialog}
        >
          Não encontrou sua tecnologia?
        </button>
      </p>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Habilidades não cadastradas</DialogTitle>
            <DialogDescription>
              Digite as habilidades que você sentiu falta na lista, vamos
              revisá-las e incluí-las assim que possível.
            </DialogDescription>
          </DialogHeader>
          <SkillSuggestionField closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  )
}

const SkillSuggestionField = ({ closeDialog }: { closeDialog: () => void }) => {
  const { toast } = useToast()
  const { setValue, watch } = useFormContext()
  const id = useId()
  const [skillsSuggested, setSkillsSuggested] = useState<string[]>([])
  const [suggestionInput, setSuggestionInput] = useState('')

  useEffect(() => {
    const persistedSkillsSuggestions = watch(
      ProfileSchemaEnum.SkillsSuggestions
    )
    if (persistedSkillsSuggestions?.length) {
      setSkillsSuggested(persistedSkillsSuggestions as string[])
    }
  }, [])

  const addSkillOnState = (newSKill: string) => {
    if (!skillsSuggested.includes(newSKill)) {
      setSkillsSuggested([...skillsSuggested, newSKill])
    }
    setSuggestionInput('')
  }
  const saveSuggestOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputContent = e.target.value
    if (inputContent.endsWith(',')) {
      addSkillOnState(inputContent.replace(',', ''))
      return
    }
    setSuggestionInput(inputContent)
  }
  const saveSuggestOnKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    const inputContent = (e.target as HTMLInputElement).value
    if (e.code === 'Enter') {
      e.preventDefault()
      addSkillOnState(inputContent.replace(',', ''))
    }
  }
  const deleteSuggestionSkillOnState = (skill: string) => {
    setSkillsSuggested(
      skillsSuggested.filter((skillItem) => skillItem !== skill)
    )
  }
  return (
    <section className="space-y-4">
      <section className="space-y-4">
        <Label htmlFor={id}>Suggestão de habilidades</Label>
        <Input
          value={suggestionInput}
          onChange={saveSuggestOnChangeHandler}
          onKeyDown={saveSuggestOnKeyDownHandler}
          name="skills"
          id={id}
          placeholder="Digite suas sugestões aqui"
        />
      </section>
      <section className="flex flex-wrap gap-2">
        {skillsSuggested.map((skill) => (
          <button
            onClick={() => deleteSuggestionSkillOnState(skill)}
            className="cursor-pointer rounded-2xl border border-s-gray-300 px-2 py-1 text-sm font-semibold"
            key={skill}
          >
            {skill}
          </button>
        ))}
      </section>
      <section className="flex justify-end">
        <Button
          onClick={() => {
            toast({
              title: 'Suas sugestões foram salvas🎉',
              variant: 'default',
              description: 'Iremos analisar suas sugestões, muito obrigado 😁',
            })
            setValue(ProfileSchemaEnum.SkillsSuggestions, skillsSuggested)
            closeDialog()
          }}
          type="button"
        >
          Salvar
        </Button>
      </section>
    </section>
  )
}
