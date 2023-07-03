import { ListOption } from './ListOption'
import { Label } from './ui/label'
import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem,
} from './ui/radio-group'

interface RadioGroup {
  options: ListOption[]
  value: string
}

export function RadioGroup({ options, value }: RadioGroup) {
  return (
    <ShadcnRadioGroup defaultValue={options[0].value} value={value}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </ShadcnRadioGroup>
  )
}
