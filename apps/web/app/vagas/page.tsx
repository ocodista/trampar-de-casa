'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from 'app/components/ui/input'
import { Button } from 'app/components/ui/button'
import JobArticle, { JobArticleProps } from 'app/components/ui/JobArticle'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from 'app/components/ui/dialog'
import { openings20230809 as Openings } from '../../../manual-email-sender/src/openings-email/2023-08-09/openings'
import { SectionTogglesGroup } from '../components/SectionTogglesGroup'

export default function Page() {
  const [searchText, setSearchText] = useState<string>('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const { localOpenings, globalOpenings } = Openings

  const jobList = localOpenings.concat(globalOpenings) as JobArticleProps[]

  const available = {
    locations: new Set<string>(),
    languages: new Set<string>(),
    skills: new Set<string>(),
  }

  jobList.forEach((job) => {
    available.languages.add(job.language)
    available.locations.add(job.location)
    job.skills.map((skill) => available.skills.add(skill))
  })

  const filterCondition =
    selectedLocations.length ||
    selectedLanguages.length ||
    selectedSkills.length ||
    searchText

  const filteredList = filterCondition
    ? jobList.filter((job) => {
        const location = selectedLocations.length
          ? selectedLocations.includes(job.location)
          : true

        const language = selectedLanguages.length
          ? selectedLanguages.includes(job.language)
          : true

        const skills = selectedSkills.length
          ? job.skills
              .map((skill) => selectedSkills.includes(skill))
              .find((skill) => skill === true)
          : true

        const searchByTitle = searchText
          ? job.title.toLowerCase().includes(searchText.toLowerCase())
          : true

        return searchByTitle && location && language && skills
      })
    : jobList

  function resetFilter() {
    setSelectedLocations([])
    setSelectedLanguages([])
    setSelectedSkills([])
  }

  return (
    <div className="container flex flex-col gap-2 py-10">
      <h2 className="font-heading max-xs:text-4xl mb-3 text-6xl font-bold leading-tight tracking-tight md:text-7xl">
        Vagas remotas
      </h2>

      <p className="mb-8 text-xl leading-relaxed text-gray-600">
        Nós listamos oportunidades para{' '}
        <span className="font-medium">trampar de casa</span> que oferecem uma
        melhor qualidade de vida.
      </p>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border sm:pl-2">
          <label htmlFor="search" className="max-sm:hidden">
            <Search />
          </label>
          <Input
            type="text"
            placeholder="Pesquisar por título"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 border-none"
            id="search"
          />
        </div>
        <Dialog>
          <DialogTrigger
            data-filtered={
              !!selectedLocations.length || !!selectedLanguages.length
            }
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
                onClick={resetFilter}
                className="w-fit self-end"
              >
                Redefinir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ul className="space-y-2">
        {filteredList.map((job, i) => (
          <li className="w-full" key={`${job.company}-${i}`}>
            <JobArticle {...job} />
          </li>
        ))}
        {!filteredList.length && <h1>Nenhuma vaga encontrada!</h1>}
      </ul>
    </div>
  )
}
