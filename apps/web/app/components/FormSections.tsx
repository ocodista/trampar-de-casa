import { ProfileSchemaEnum } from 'app/subscribers/profile/profileSchema'
import { CustomFormField, StartWorkAtInput } from './CustomFormField'
import { Checkbox } from './ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'

export function PersonalInfoSection({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dados Pessoais</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome Completo <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Localização <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Cidade, Estado" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export function ProfessionalInfoSection({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Experiência Profissional</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CustomFormField
          className="!static !block !justify-start space-y-2"
          name="startedWorkingAt"
          label="Primeiro emprego com tecnologia"
          Input={StartWorkAtInput}
        />

        <FormField
          control={form.control}
          name="currentRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo Atual</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="englishLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível de Inglês</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Beginner">Iniciante</SelectItem>
                  <SelectItem value="Intermediary">Intermediário</SelectItem>
                  <SelectItem value="Advanced">Avançado</SelectItem>
                  <SelectItem value="Fluent">Fluente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="linkedInUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL (opcional)</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio URL (opcional)</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export function DocumentsSection({ form }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Documentos e Informações Adicionais
      </h2>

      <FormField
        control={form.control}
        name="coverLetter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Carta de Apresentação</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Conte um pouco sobre você e por que seria ideal para esta vaga..."
                className="h-32"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="resume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currículo (PDF, DOC ou DOCX)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 h-full file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export function ConsentSection({ form }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="dataConsent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Autorizo o compartilhamento dos meus dados com a empresa
              </FormLabel>
              <p className="text-muted-foreground text-sm">
                Ao marcar esta caixa, você concorda em compartilhar seus dados
                com a empresa para fins de processo seletivo. Seus dados serão
                tratados de acordo com a nossa política de privacidade.
              </p>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
