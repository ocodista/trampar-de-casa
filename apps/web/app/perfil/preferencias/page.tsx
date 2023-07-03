'use client'
import { AutoComplete } from '../../components/AutoComplete'
import { CustomFormField, TextInput } from '../../components/CustomFormField'
import { ListOption } from '../../components/ListOption'
import { FormPage } from '../components/FormPage'
import { skills } from './skillsData'
import { useMemo, useState } from 'react'
import { EnglishLevel } from '../../../prisma/client/index'
import { RadioGroup } from '../../components/RadioGroup'
import { string } from 'zod'

const SkillsField = () => {
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => skills, [])

  return (
    <>
      <CustomFormField
        name="skills"
        label="Habilidades"
        placeholder="Você gostaria de receber vagas de quais tecnologias?"
        Input={() => (
          <AutoComplete
            selectedOptions={selectedOptions}
            onSelectChange={(options) => {
              console.log('Options', options)
              setSelectedOptions(options)
            }}
            placeholder="Selecione as tecnologias que já trabalhou"
            options={options}
          />
        )}
      />
    </>
  )
}

const { Beginner, Intermediary, Advanced, Fluent } = EnglishLevel

const LevelQuestions: Record<string, string> = {
  [Beginner]: 'Iniciante',
  [Intermediary]: 'Intermediário',
  [Advanced]: 'Avançado',
  [Fluent]: 'Fluente',
}

export default function Preferences() {
  const [englishLevel, setEnglishLevel] = useState(EnglishLevel.Intermediary)
  return (
    <FormPage
      title="Preferências"
      subtitle="Escolha suas tecnologias preferidas para ofertas de emprego personalizadas."
      form={() => (
        <>
          <SkillsField />
          <RadioGroup
            value={englishLevel}
            options={Object.keys(EnglishLevel).map((key) => ({
              label: LevelQuestions[key] as string,
              value: EnglishLevel[key] as string,
            }))}
          />
          <CustomFormField
            name="wantEnglish"
            label="Nível de Inglês"
            placeholder="Você tem interesse em vagas que exijam inglês?"
            Input={TextInput}
          />
        </>
      )}
    />
  )
}
