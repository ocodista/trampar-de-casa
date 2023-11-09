import { useToast } from 'app/hooks/use-toast'
import { ProfileSchemaEnum } from 'app/subscribers/profile/profileSchema'
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useId,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const SkillSuggestionField = ({
  closeDialog,
}: {
  closeDialog: () => void
}) => {
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
  const saveHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    toast({
      title: 'Obrigado por suas sugestões! 🚀',
      description: 'Estamos trabalhando para aprimorar nossa plataforma. 😊',
      variant: 'default',
    })
    setValue(ProfileSchemaEnum.SkillsSuggestions, skillsSuggested)
    closeDialog()
  }
  return (
    <section className="space-y-4">
      <section className="space-y-4">
        <Label htmlFor={id}>Sugestão de habilidades</Label>
        <Input
          value={suggestionInput}
          onChange={saveSuggestOnChangeHandler}
          onKeyDown={saveSuggestOnKeyDownHandler}
          name="skills"
          id={id}
          placeholder="Tecle ENTER para adicionar, cutuque para remover."
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
        <Button onClick={saveHandler} type="button">
          Salvar
        </Button>
      </section>
    </section>
  )
}
