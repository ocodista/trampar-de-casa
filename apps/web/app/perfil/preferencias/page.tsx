"use client";
import { FormPage } from "../components/FormPage";
import { CustomFormField, TextInput } from "../../../global/components/CustomFormField";
import { AutoComplete, AutoCompleteOption } from "../../../global/components/AutoComplete";
import { skills } from "./skillsData";
import { useMemo, useState } from "react";

const SkillsField = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const options = useMemo(() => skills, [])

  return (
    <>
      <CustomFormField
        name="skills"
        label="Habilidades"
        placeholder="Você gostaria de receber vagas de quais tecnologias?"
        Input={() => (
          <AutoComplete value={selectedOptions} onChange={(options) => {
            console.log("Options", options)
            if (!options) return
            setSelectedOptions(options.filter((option) => Boolean(option)).map((option) => option.value))
          }} placeholder="Selecione as tecnologias que já trabalhou" options={options} />
        )}
      />
      <div className="flex gap-2 text-sm">
        {selectedOptions.map((value) => <span key={value}>{value}</span>)}
      </div>
    </>
  )
}

export default function Preferences() {
  return (
    <FormPage
      title="Preferências"
      subtitle="Escolha suas tecnologias preferidas para ofertas de emprego personalizadas."
      form={() => (
        <>
          <SkillsField />
          <CustomFormField
            name="wantEnglish"
            label="Nível de Inglês"
            placeholder="Você tem interesse em vagas que exijam inglês?"
            Input={TextInput}
          />
        </>
      )}
    />
  );
}
