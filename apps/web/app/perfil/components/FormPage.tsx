import { Separator } from '../../components/ui/separator'

export const FormPage = ({ title, subtitle, form }) => (
  <section className="space-y-6">
    <header>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </header>
    <Separator />
    {form()}
  </section>
)
