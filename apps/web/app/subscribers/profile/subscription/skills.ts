'use client'
import { skillArray } from 'shared/src/infos/skills'
import { ListOption } from '../../../components/ListOption'

export const skills: ListOption[] = skillArray.map(({ id, name }) => ({
  label: name,
  value: id.toString(),
}))
