import type React from 'react'
import Image from 'next/image'
import type { Filter } from 'app/components/SelectInput'
import close from '../../../../public/images/close.svg'

interface FilterTagProps {
  filter: Filter
  onDelete: (filter: Filter) => void
}

export const FilterTag: React.FC<FilterTagProps> = ({ filter, onDelete }) => {
  return (
    <div
      className="border-box relative mt-[15px] flex items-center 
                rounded-2xl border-[1px] bg-[#F4F4F5] py-[7px] pl-[7px] 
                pr-[10px] text-center placeholder-black placeholder-opacity-100"
    >
      {`${filter.option.emoji ? filter.option.emoji : ''} ${
        filter.option.label
      }`}
      <Image
        className="ml-[5px] h-[14px] w-[16px] cursor-pointer opacity-50"
        alt="Close tag"
        src={close}
        onClick={() => onDelete(filter)}
      />
    </div>
  )
}
