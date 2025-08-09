import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchJobs, Job } from 'app/(roles)/vagas/action'
import { updateSearchParams } from 'app/utils/updateSearchParams'

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
  setJobs: Dispatch<SetStateAction<Job[]>>
}

const SelectInput = ({
  placeholder,
  options,
  filterType,
  setFilters,
  filters,
  setTotalJobs,
  setJobs,
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
      const result = await fetchJobs({
        country: temporaryFilters
          .filter((f) => f.inputType === 'country')
          .map((f) => f.option.value as string),
        skillsId: temporaryFilters
          .filter((f) => f.inputType === 'skill')
          .map((f) => Number(f.option.value)),
      })
      setTotalJobs(result.totalJobs)
      setJobs(result.jobs)
    } catch (error) {
      // Silently handle error
    }

    setShowOptions(false)
    const newQueryString = updateSearchParams(temporaryFilters)
    router.push(`?${newQueryString}`, { scroll: false })
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputText.toLowerCase())
  )

  return (
    <div className="xs:w-auto relative flex w-full items-center justify-center sm:w-auto md:w-auto md:justify-start lg:w-auto lg:justify-start">
      <div className="relative flex items-center justify-end">
        <input
          placeholder={currentPlaceholder ? currentPlaceholder : placeholder}
          className="border-box xs:w-[130px] z-[2] w-full rounded-2xl border-[1px] bg-transparent py-2 pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100 sm:w-[185px] md:w-[120px] lg:w-[150px]"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <ChevronDown className="z-1 absolute mr-3" />
      </div>
      {showOptions && (
        <div className="absolute top-[47px] z-10 max-h-[500px] w-full overflow-y-auto rounded-2xl bg-[#f4f4f5] p-[7px] sm:w-[180px] md:w-[250px] lg:w-[250px]">
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
