'use client'
import { skillArray } from 'shared/src/infos'
import { ListOption } from '../../../components/ListOption'

export const skills: ListOption[] = skillArray.map((skill, index) => ({
  label: skill,
  value: index.toString(),
}))
