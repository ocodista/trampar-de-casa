import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import useTyped from '../components/hooks/useTyped'
import { Search } from 'lucide-react'
import { Filter, Job, SelectOption } from './SelectInput'
import { fetchJobs } from 'app/(roles)/vagas/action'
import { updateSearchParams } from 'app/utils/updateSearchParams'
import { useRouter } from 'next/navigation'

interface InputWithUseTypedProps {
  placeholder?: string
  options: SelectOption[]
  setFilters: Dispatch<SetStateAction<Filter[]>>
  filterType: string
  filters: { option: SelectOption; inputType: string }[]
  setTotalJobs: Dispatch<SetStateAction<number>>
  jobs: Job[]
  setJobs: Dispatch<SetStateAction<Job[]>>
  setHasMore: Dispatch<SetStateAction<boolean>>
}

const useTypedStrings = [
  `TypeScript`,
  `React`,
  `Java`,
  `Python`,
  `Ruby`,
  `PHP`,
  `C#`,
  `Angular`,
  `Deno`,
  `Bun`,
]

const InputWithUseTyped = ({
  placeholder,
  options,
  setFilters,
  filterType,
  filters,
  setTotalJobs,
  jobs,
  setJobs,
  setHasMore,
}: InputWithUseTypedProps) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedEnabled, setTypedEnabled] = useState(true)
  const typedInstance = useTyped(
    inputRef,
    {
      strings: useTypedStrings,
      typeSpeed: 90,
      backSpeed: 90,
      loop: true,
    },
    typedEnabled
  )

  const [showOptions, setShowOptions] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleFocus = () => {
    setShowOptions(true)
    setTypedEnabled(false)
  }

  const handleBlur = () => {
    setShowOptions(false)
    setInputText('')
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
    <>
      <Search
        className="absolute left-[35px] top-[25px] md:top-[34px] lg:top-[34px]"
        size={'25px'}
      />
      <input
        ref={inputRef}
        className="color-[#0f1115] z-30 mx-[14px] mb-[14px] mt-[7px] w-[400px] rounded-[100px] border-[2px] py-[12px] pl-[60px] pr-[12px] text-left text-[20px]"
        placeholder={typedEnabled ? '' : placeholder}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputText}
      />
      {showOptions && (
        <div
          className={`absolute top-[80px] z-10 max-h-[500px] w-full overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="w-full cursor-pointer p-[7px] text-left text-[15px] hover:bg-gray-200"
                onMouseDown={() => handleOptionSelect(option)}
              >
                {`${option.emoji ? option.emoji : ''} ${option.label}`}
              </div>
            ))
          ) : (
            <div className="w-full cursor-pointer p-[7px] text-left text-[15px] hover:bg-gray-200">
              Nenhum dado encontrado
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default InputWithUseTyped
