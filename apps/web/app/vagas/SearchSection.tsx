'use client'
import { Input } from 'app/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Filter } from './Filter'

export function SearchSection() {
  const [searchText, setSearchText] = useState<string>('')
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
