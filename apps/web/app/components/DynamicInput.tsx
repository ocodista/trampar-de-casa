import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Filter {
  option: string
  inputType: string
}

const DynamicInput = ({
  placeholder,
  options,
  setFilters,
  filterType,
  filters,
  optionConfig = 'w-[400px]',
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder)
  const [showOptions, setShowOptions] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [inputText, setInputText] = useState('')
  const [orderButtonValue, setOrderButtonValue] = useState('📈 Order')
  const [previewOrderValue, setPreviewOrderValue] = useState('')

  const handleFocus = () => {
    setCurrentPlaceholder('Type...')
  }

  const handleBlur = () => {
    setCurrentPlaceholder(placeholder)
    setInputText('')
    setShowOptions(false)
  }

  const handleOptionSelect = (option: string) => {
    if (filters.some((filter: Filter) => filter.option === option)) {
      return
    }
    setFilters((prevState: Filter[]) => [
      ...prevState,
      { option: option, inputType: filterType },
    ])
    setShowOptions(false)
  }

  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(inputText.toLowerCase())
  )

  const handleOrder = (option: string) => {
    setOrderButtonValue(option)
    setShowOrder(false)
    if (previewOrderValue) {
      const newFilterArray = filters.filter(
        (value) => value.option !== previewOrderValue
      )
      setFilters([...newFilterArray, { option: option, inputType: 'order' }])
      setPreviewOrderValue(option)
      return
    }
    setFilters((prevState: Filter[]) => [
      { option: option, inputType: filterType },
      ...prevState,
    ])
    setPreviewOrderValue(option)
  }

  if (filterType === 'order') {
    return (
      <div className="relative flex items-center">
        <button
          onClick={() => setShowOrder(!showOrder)}
          className="border-box relative flex items-center rounded-[20px] 
                border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[35px] text-black text-opacity-100"
        >
          <span>{orderButtonValue}</span>
          <ChevronDown className="absolute right-[10px]" />
        </button>
        {showOrder && (
          <div
            className={`absolute top-[40px] z-10 max-h-[500px] ${optionConfig} overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
          >
            {options.map((option) => (
              <div
                key={option}
                className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                onClick={() => handleOrder(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex items-center">
      <input
        placeholder={currentPlaceholder}
        className="border-box w-[150px] rounded-[20px] border-[1px] bg-[#F4F4F5] py-[9px] pl-[14px] pr-[9px] placeholder-black placeholder-opacity-100"
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => handleBlur(), 100)
        }}
        onClick={() => setShowOptions(true)}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <ChevronDown className="absolute right-[10px]" />
      {showOptions && (
        <div
          className={`absolute top-[40px] z-10 max-h-[500px] ${optionConfig} overflow-y-auto rounded-[12px] bg-[#f4f4f5] p-[7px]`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: string) => (
              <div
                key={option}
                className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
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

export default DynamicInput
