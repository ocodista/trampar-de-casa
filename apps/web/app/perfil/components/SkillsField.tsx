import React, { useState, useMemo } from 'react'
import { AutoComplete } from '../../components/AutoComplete'
import { CustomFormField } from '../../components/CustomFormField'
import { ListOption } from '../../components/ListOption'
import { skills } from '../preferencias/skillsData'

export const SkillsField = () => {
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => skills, [])

  return (
    <CustomFormField
      name="skills"
      label="Habilidades"
      placeholder="Você gostaria de receber vagas de quais tecnologias?"
      description="Selecione as tecnologias que já trabalhou"
      Input={() => (
        <AutoComplete
          selectedOptions={selectedOptions}
          onSelectChange={setSelectedOptions}
          placeholder="TypeScript, React, .NET"
          options={options}
        />
      )}
    />
  )
}
