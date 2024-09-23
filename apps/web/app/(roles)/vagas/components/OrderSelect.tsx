import type React from 'react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SelectOption } from 'app/components/SelectInput'

interface OrderSelectProps {
  options: SelectOption[]
  onOrderChange: (option: SelectOption) => void
}

export const OrderSelect: React.FC<OrderSelectProps> = ({
  options,
  onOrderChange,
}) => {
  const [showOrder, setShowOrder] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const handleSelectOption = (option: SelectOption) => {
    setSelectedOption(option)
    setShowOrder(false)
    onOrderChange(option)
  }

  return (
    <div className="xs:justify-start relative flex items-center justify-center sm:justify-start md:justify-start lg:justify-start">
      <div className="xs:w-auto relative flex w-auto items-center justify-end sm:w-auto md:w-auto lg:w-auto">
        <input
          readOnly
          value={selectedOption.label}
          className="text-baseline border-box xs:w-[220px] z-[2] w-full rounded-2xl border-[1px] bg-transparent py-[9px] pl-[14px] 
          pr-[9px] placeholder-black placeholder-opacity-100 sm:w-[220px] md:w-[220px] lg:w-[220px]"
          onFocus={() => setShowOrder(true)}
          onBlur={() => {
            setTimeout(() => setShowOrder(false), 100)
          }}
        />
        <ChevronDown className="z-1 absolute mr-3" />
      </div>
      {showOrder && (
        <div className="xs:w-[250px] absolute top-[47px] z-10 max-h-[500px] w-full overflow-y-auto rounded-2xl bg-[#f4f4f5] p-[7px] sm:w-[250px] md:w-[250px] lg:w-[250px]">
          {options
            .filter((option) => option.value !== null)
            .map((option) => (
              <div
                key={option.value}
                className="w-full cursor-pointer p-[7px] hover:bg-gray-200"
                onClick={() => handleSelectOption(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectOption(option)
                  }
                }}
                tabIndex={0}
                role="button"
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
