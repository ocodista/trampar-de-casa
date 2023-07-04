'use client'
import { EnglishLevel } from '../../../global/EnglishLevel'
import { ListOption } from '../../components/ListOption'
import { FormPage } from '../components/FormPage'
import { useMemo, useState } from 'react'
import { skills } from './skillsData'
import { CustomFormField } from '../../components/CustomFormField'
import { AutoComplete } from '../../components/AutoComplete'
import { FormRadioGroup } from '../../components/FormRadioGroup'
import { ProfileFormKeys } from '../form'
import { Checkbox } from '../../components/ui/checkbox'

const SkillsField = () => {
  const [selectedOptions, setSelectedOptions] = useState<ListOption[]>([])
  const options = useMemo(() => skills, [])

  return (
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
  )
}

const { Beginner, Intermediary, Advanced, Fluent } = EnglishLevel

const LevelQuestions: Record<string, string> = {
  [Beginner]: 'Iniciante',
  [Intermediary]: 'Intermediário',
  [Advanced]: 'Avançado',
  [Fluent]: 'Fluente',
}

const EnglishLevelGroup = () => {
  const [englishLevel, setEnglishLevel] = useState(EnglishLevel.Beginner)
  return (
    <CustomFormField
      className="flex flex-col gap-2"
      name={ProfileFormKeys.EnglishLevel}
      label="Nível de Inglês"
      Input={() => (
        <FormRadioGroup
          formKey={ProfileFormKeys.EnglishLevel}
          selectedOption={englishLevel}
          setSelectedOption={(option: EnglishLevel) => setEnglishLevel(option)}
          options={Object.keys(EnglishLevel).map((key) => ({
            label: LevelQuestions[key] as string,
            value: EnglishLevel[key] as string,
          }))}
        />
      )}
    />
  )
}

const FormCheckBox = ({ id, title }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} />
    <label
      htmlFor={id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {title}
    </label>
  </div>
)

const ReceiveEmailConfig = () => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
      Quero receber
    </label>
    <FormCheckBox
      id={ProfileFormKeys.InternationalRoles}
      title="Vagas internacionais"
    />
    <FormCheckBox id={ProfileFormKeys.NationalRoles} title="Vagas nacionais" />
    <FormCheckBox id={ProfileFormKeys.NationalRoles} title="Dicas de inglês" />
  </div>
)

export default function Preferences() {
  return (
    <FormPage
      title="Preferências"
      subtitle="Escolha suas tecnologias preferidas para ofertas de emprego personalizadas."
      form={() => (
        <main className="flex flex-col gap-6">
          <SkillsField />
          <EnglishLevelGroup />
          <ReceiveEmailConfig />
          <div className=""></div>
        </main>
      )}
    />
  )
}
