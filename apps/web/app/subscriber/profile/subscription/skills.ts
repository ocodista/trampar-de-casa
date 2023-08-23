import { skillArray } from 'shared'
import { ListOption } from '../../../components/ListOption'

export const skills: ListOption[] = skillArray.map((skill) => ({
  label: skill,
  value: skill,
}))
