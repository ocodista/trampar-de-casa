import { skillArray } from './skills'

// TODO: Add normalized column on skills table/list
const normalizer = (input: string): string => {
  let output = input
  output = output.replace(' ', '')
  output = output.toUpperCase()

  if (output.includes('JS')) {
    output = output.replace('.JS', '').replace('JS', '')
  }
  return output.trim()
}

describe('Skill normalizer', () => {
  it('converts input to ALL CAPS', () => {
    expect(normalizer('react')).toBe('REACT')
  })

  it('removes spaces', () => {
    expect(normalizer('Digital Ocean')).toBe('DIGITALOCEAN')
    expect(normalizer('React Native')).toBe('REACTNATIVE')
  })

  it('removes js', () => {
    expect(normalizer('React jS')).toBe('REACT')
    expect(normalizer('Vue JS')).toBe('VUE')
    expect(normalizer('Angular Js')).toBe('ANGULAR')
  })

  it('removes .js', () => {
    expect(normalizer('React.js')).toBe('REACT')
    expect(normalizer('Vue.JS')).toBe('VUE')
    expect(normalizer('Angular.JS')).toBe('ANGULAR')
  })
})

// REACT: 56
// SKILL: id
const skillsByNormalized = (): Record<string, number> => {
  const record: Record<string, number> = {}
  skillArray.forEach((skill) => {
    record[skill.normalized || 'NOTFOUND'] = skill.id
  })
  return record
}

const NormalizedSkills = skillsByNormalized()

const parser = (input: string): number => {
  const normalizedInput = normalizer(input)
  return NormalizedSkills[normalizedInput] || -1
}

describe('Skill parser', () => {
  it('returns 66 for Java', () => {
    expect(parser('java')).toBe(66)
    expect(parser('Java')).toBe(66)
    expect(parser('JaVa')).toBe(66)
  })

  it('returns 146 for React', () => {
    expect(parser('react js')).toBe(146)
    expect(parser('react.js')).toBe(146)
    expect(parser('React')).toBe(146)
    expect(parser('React Native')).not.toBe(146)
  })

  it('returns 292 for React Native', () => {
    expect(parser('react native js')).toBe(292)
    expect(parser('react native ')).toBe(292)
    expect(parser('reactNative ')).toBe(292)
    expect(parser('React Native.js')).toBe(292)
  })
})
