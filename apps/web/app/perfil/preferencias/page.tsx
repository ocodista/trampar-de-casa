"use client";
import { useFormContext } from "react-hook-form";
import { FormField } from "../../../global/components/ui/form";
import { FormPage } from "../components/FormPage";
import { CustomFormField } from "../../../global/components/CustomFormField";
import { AutoComplete } from "../../../global/components/AutoComplete";
import { skills } from "./skillsData";

const SkillsField = () => {
  const { control, register } = useFormContext();

  return (
    <CustomFormField
      name="skills"
      label="Habilidades"
      placeholder="Você gostaria de receber vagas de quais tecnologias?"
      Input={() => (
        <AutoComplete placeholder="Selecione as tecnologias que já trabalhou" options={skills} />
      )}
    />
  )
}

export default function Skills() {
  return (
    <FormPage
      title="Preferências"
      subtitle="Escolha suas tecnologias preferidas para ofertas de emprego personalizadas."
      form={() => (
        <>
          <h3>Habilidades</h3>
          <SkillsField />
        </>
      )}
    />
  );
}
