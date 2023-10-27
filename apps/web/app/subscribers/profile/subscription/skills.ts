'use client'
import { skillArray } from 'shared/src/infos/skills'

export const skills = skillArray.map(({ id, name }) => ({
  label: name,
  value: id.toString(),
}))
