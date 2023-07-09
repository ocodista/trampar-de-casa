import { Checkbox } from '../../../components/ui/checkbox'

export const FormCheckBox = ({ id, title }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} />
    <label
      htmlFor={id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {title}
    </label>
  </div>
)
