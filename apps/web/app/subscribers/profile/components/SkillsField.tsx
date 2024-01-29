'use client'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { skillArray } from 'shared/src/infos/skills'
import { AutoComplete } from '../../../components/AutoComplete'
import { CustomFormField } from '../../../components/CustomFormField'
import { ListOption } from '../../../components/ListOption'
import { ProfileSchemaEnum } from '../profileSchema'
import { skills } from '../subscription/skills'

const sortedSkills = skills.sort((a, b) => {
  const aFirstLetter = a.label[0].toUpperCase()
  const bFirstLetter = b.label[0].toUpperCase()
  if (aFirstLetter > bFirstLetter) {
    return 1
  }
  return -1
})

export const SkillsField = ({ description }: { description?: string }) => {
  const {
    setValue,
    watch,
    formState: { isSubmitting },
  } = useFormContext()
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => sortedSkills, [])
  const formSkills = watch(ProfileSchemaEnum.Skills)
  useEffect(() => {
    const getSKill = (skillId: string) =>
      skillArray.find(({ id }) => id === Number(skillId))
    if (!selectedOptions.length && formSkills?.length)
      setSelectedOptions(
        formSkills.map((skillId: string): ListOption => {
          if (!isNaN(Number(skillId))) {
            const skill = getSKill(skillId)
            return {
              label: skill?.name,
              value: skill?.id.toString(),
            }
          }
          return { label: skillId, value: skillId }
        })
      )
  }, [formSkills])

  const setSkills = (skills: ListOption[]) => {
    setSelectedOptions(skills)
    setValue(
      ProfileSchemaEnum.Skills,
      skills.map((option) => option.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    )
  }

  const onSelectChange = (receivedSelectedOptions: ListOption[]) => {
    const lastItem = receivedSelectedOptions[receivedSelectedOptions.length - 1]
    if (
      receivedSelectedOptions.filter(({ value }) => value === lastItem.value)
        .length > 1
    ) {
      const filteredOptions = receivedSelectedOptions.filter(
        ({ value }) => lastItem.value != value
      )
      setSkills(filteredOptions)
      return
    }
    setSkills(receivedSelectedOptions)
  }

  return (
    <>
      <CustomFormField
        name={ProfileSchemaEnum.Skills}
        required
        label="Habilidades"
        placeholder="Você gostaria de receber vagas de quais tecnologias?"
        description={description || 'Selecione as tecnologias que já trabalhou'}
        Input={({ register }) => (
          <AutoComplete
            disabled={isSubmitting}
            selectedOptions={selectedOptions}
            onSelectChange={onSelectChange}
            placeholder="TypeScript, React, .NET"
            options={options}
            {...register(ProfileSchemaEnum.Skills)}
          />
        )}
      />
    </>
  )
}
