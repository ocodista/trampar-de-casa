import { Separator } from "../../global/components/ui/separator";
import { AboutYouForm } from "./components/AboutYouForm";

export default function SettingsProfilePage() {
  // TODO: Get email
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sobre você</h3>
        <p className="text-sm text-muted-foreground">
          Nenhuma informação será compartilhada sem a sua permissão.
        </p>
      </div>
      <Separator />
      <AboutYouForm />
    </div>
  );
}
