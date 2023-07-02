import { AboutYouForm } from "./components/AboutYouForm";
import { FormPage } from "./components/FormPage";

export default function SettingsProfilePage() {
  // TODO: Get email
  return (
    <FormPage
      title="Sobre você"
      subtitle="Nenhuma informação será compartilhada sem a sua permissão."
      form={() => <AboutYouForm />}
    />
  );
}
