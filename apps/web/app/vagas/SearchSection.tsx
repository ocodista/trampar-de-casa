'use client'
import { Input } from 'app/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Filter } from './Filter'
import { useRoleContext } from './RolesContext'
import { useDebounce } from './useDebounce'

export function SearchSection({
  defaultQuery = null,
}: {
  defaultQuery?: string
}) {
  const [searchText, setSearchText] = useState<string>(defaultQuery)
  const { search } = useRoleContext()
  const debouncedValue = useDebounce(searchText, 500)

  useEffect(() => {
    if (debouncedValue !== null) search(debouncedValue)
  }, [debouncedValue])

  return (
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
      <Filter />
    </div>
  )
}
