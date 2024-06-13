import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchJobs } from 'app/(roles)/vagas/action'
import { updateSearchParams } from 'app/utils/updateSearchParams'

export interface Job {
  company: string | null
  country: string
  createdAt: string
  currency: string | null
  description: string
  id: string
  language: 'English' | 'Portuguese'
  minimumYears: number | null
  ready: boolean
  salary: string | null
  skillsId: string[] | null
  title: string
  topicId: number | null
  updatedAt: string
  url: string | null
}

export type SelectOption = {
  value: string | number
  label: string
  emoji?: string
}

export type Filter = {
  option: SelectOption
  inputType: string
}

interface DynamicInputProps {
  placeholder: string
  options: SelectOption[]
  filterType: string
  setFilters: Dispatch<SetStateAction<Filter[]>>
  filters: { option: SelectOption; inputType: string }[]
  setTotalJobs: Dispatch<SetStateAction<number>>
  jobs: Job[]
  setJobs: Dispatch<SetStateAction<Job[]>>
  setHasMore: Dispatch<SetStateAction<boolean>>
}

const SelectInput = ({
  placeholder,
  options,
  filterType,
  setFilters,
  filters,
  setTotalJobs,
  jobs,
  setJobs,
  setHasMore,
}: DynamicInputProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState('')
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>()
  const router = useRouter()

  const handleFocus = () => {
    setCurrentPlaceholder('Type...')
    setShowOptions(true)
  }

  const handleBlur = () => {
    setCurrentPlaceholder(placeholder)
    setInputText('')
    setShowOptions(false)
  }

  const handleOptionSelect = async (option: SelectOption) => {
    const newFilter = { option, inputType: filterType }
    const temporaryFilters = [...filters, newFilter]

    if (
      filters.some((filter: Filter) => filter.option.value === option.value)
    ) {
      return
    }
    setFilters((prevState: Filter[]) => [
      ...prevState,
      { option: option, inputType: filterType },
    ])

    try {
      const { data, count } = await fetchJobs(undefined, temporaryFilters, jobs)
      setTotalJobs(count)
      data.length > 10 ? setHasMore(true) : setHasMore(false)
      setJobs(data)
    } catch (error) {
      console.error('Error fetching filtered jobs:', error.message)
    }

    setShowOptions(false)
    const newQueryString = updateSearchParams(temporaryFilters)
    router.push(`?${newQueryString}`, { scroll: false })
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputText.toLowerCase())
  )

  return (
    <div className="relative flex items-center justify-center md:justify-start lg:justify-start">
      <input
        placeholder={currentPlaceholder ? currentPlaceholder : placeholder}
        className="border-box z-[2] w-[120px] rounded-[20px] border-[1px] bg-transparent py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100 md:lg:w-[150px] lg:w-[150px]"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <ChevronDown className="z-1 absolute right-[10px]" />
      {showOptions && (
        <div
          className={`absolute top-[47px] z-10 max-h-[500px] w-auto overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px] md:w-[400px] lg:w-[400px]`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                onMouseDown={() => handleOptionSelect(option)}
              >
                {`${option.emoji ? option.emoji : ''} ${option.label}`}
              </div>
            ))
          ) : (
            <div className="w-full cursor-pointer p-[7px] hover:bg-gray-200">
              Nenhum dado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectInput
