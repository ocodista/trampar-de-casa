import { SectionTogglesGroup } from 'app/components/SectionTogglesGroup'
import { JobArticleProps } from 'app/components/ui/JobArticle'
import { Button } from 'app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'app/components/ui/dialog'
import { useState } from 'react'

export function Filter() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const { localOpenings, globalOpenings } = {
    globalOpenings: [],
    localOpenings: [],
  }

  const jobList = localOpenings.concat(globalOpenings) as JobArticleProps[]

  const available = {
    locations: new Set<string>(),
    languages: new Set<string>(),
    skills: new Set<string>(),
  }

  jobList.forEach((job) => {
    available.languages.add(job.language)
    available.locations.add(job.country)
    job.skillNames.map((skill) => available.skills.add(skill))
  })

  return (
    <Dialog>
      <DialogTrigger
        data-filtered={!!selectedLocations.length || !!selectedLanguages.length}
        aria-controls="radix-:R4rddpj9:"
        className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-gray-600 data-[filtered=true]:border-indigo-300 data-[filtered=true]:bg-indigo-50 data-[filtered=true]:text-indigo-600"
      >
        Filtrar vagas
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
          <DialogDescription>
            Encontre as vagas de acordo com seu interesse
          </DialogDescription>
        </DialogHeader>

        <div className="mb-2 flex max-h-[300px] flex-col gap-4 overflow-y-auto">
          <SectionTogglesGroup
            sectionLabel="Idiomas"
            availableFilters={[...available.languages]}
            selectedToggles={selectedLanguages}
            setSelectedToggles={setSelectedLanguages}
          />
          <SectionTogglesGroup
            sectionLabel="Localizações"
            availableFilters={[...available.locations]}
            selectedToggles={selectedLocations}
            setSelectedToggles={setSelectedLocations}
          />
          <SectionTogglesGroup
            sectionLabel="Habilidades"
            availableFilters={[...available.skills]}
            selectedToggles={selectedSkills}
            setSelectedToggles={setSelectedSkills}
          />
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => undefined}
            className="w-fit self-end"
          >
            Redefinir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
