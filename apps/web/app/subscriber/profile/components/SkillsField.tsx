import React, { useState, useMemo, useEffect } from 'react'
import { AutoComplete } from '../../../components/AutoComplete'
import { CustomFormField } from '../../../components/CustomFormField'
import { ListOption } from '../../../components/ListOption'
import { useFormContext } from 'react-hook-form'
import { skills } from '../subscription/skills'
import { ProfileSchemaEnum } from '../profileSchema'

export const SkillsField = () => {
  const { setValue, watch } = useFormContext()
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => skills, [])
  const formSkills = watch(ProfileSchemaEnum.Skills)

  useEffect(() => {
    if (!selectedOptions.length && formSkills?.length)
      setSelectedOptions(
        formSkills.map(
          (skill: string): ListOption => ({ label: skill, value: skill })
        )
      )
  }, [formSkills])

  useEffect(() => {
    setValue(
      ProfileSchemaEnum.Skills,
      selectedOptions.map((option) => option.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    )
  }, [selectedOptions])

  return (
    <CustomFormField
      name={ProfileSchemaEnum.Skills}
      label="Habilidades"
      placeholder="Você gostaria de receber vagas de quais tecnologias?"
      description="Selecione as tecnologias que já trabalhou"
      Input={({ register }) => (
        <AutoComplete
          selectedOptions={selectedOptions}
          onSelectChange={setSelectedOptions}
          placeholder="TypeScript, React, .NET"
          options={options}
          {...register(ProfileSchemaEnum.Skills)}
        />
      )}
    />
  )
}
