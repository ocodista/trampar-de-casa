import {
  ProfileSchemaEnum,
  profileFormSchema,
} from 'app/subscribers/profile/profileSchema'
import { EnglishLevel } from 'global/EnglishLevel'
import { describe, it, expect } from 'vitest'
import { SafeParseError } from 'zod'

describe('ProfileFormSchema Validation', () => {
  it('validates a fully valid profile successfully', () => {
    const profileData = {
      [ProfileSchemaEnum.Name]: 'John Doe',
      [ProfileSchemaEnum.LinkedInUrl]: 'https://linkedin.com/in/johndoe',
      [ProfileSchemaEnum.GitHub]: 'https://github.com/johndoe',
      [ProfileSchemaEnum.StartedWorkingAt]: new Date('2020-01-01').toString(),
      [ProfileSchemaEnum.EnglishLevel]: EnglishLevel.Advanced,
      [ProfileSchemaEnum.Skills]: ['JavaScript', 'React'],
      [ProfileSchemaEnum.ReceiveEmailConfig]: ['Newsletter', 'Updates'],
      [ProfileSchemaEnum.SkillsSuggestions]: [],
      [ProfileSchemaEnum.SendBestOpenings]: true,
    }

    const result = profileFormSchema.safeParse(profileData)
    expect(result.success).toBe(true)
  })

  it('allows profiles with an LinkedIn URL that starts with https://www.linkedin.com/in/', () => {
    const invalidLinkedInURL = {
      ...validProfileData,
      [ProfileSchemaEnum.LinkedInUrl]: 'https://www.linkedin.com/in/johndoe',
    }

    const result = profileFormSchema.safeParse(invalidLinkedInURL)
    expect(result.success).toBe(true)
  })

  it('rejects profiles with an invalid LinkedIn URL', () => {
    const invalidLinkedInURL = {
      ...validProfileData,
      [ProfileSchemaEnum.LinkedInUrl]: 'https://example.com/in/johndoe',
    }

    const result = profileFormSchema.safeParse(invalidLinkedInURL)
    expect(result.success).toBe(false)
    if (!result.success) {
      const errorResult = result as SafeParseError<ProfileSchemaEnum>
      const linkedinUrlIssue = errorResult.error.issues.find(
        (issue) => issue.path[0] === ProfileSchemaEnum.LinkedInUrl
      )

      expect(linkedinUrlIssue).toBeDefined()
      expect(linkedinUrlIssue?.message).toContain(
        'URL do perfil deve começar com https://linkedin.com/in/ ou https://www.linkedin.com/in/'
      )
    }
  })

  it('rejects profiles with an invalid GitHub URL', () => {
    const invalidGitHubURL = {
      ...validProfileData,
      [ProfileSchemaEnum.GitHub]: 'justastring',
    }

    const result = profileFormSchema.safeParse(invalidGitHubURL)
    expect(result.success).toBe(false)
    if (!result.success) {
      const errorResult = result as SafeParseError<ProfileSchemaEnum>
      const gitHubIssue = errorResult.error.issues.find(
        (issue) => issue.path[0] === ProfileSchemaEnum.GitHub
      )

      expect(gitHubIssue).toBeDefined()
      expect(gitHubIssue?.message).toContain('Formato de URL inválido.')
    }
  })

  it('accepts null or empty string for GitHub field', () => {
    const profileWithNullGitHub = {
      ...validProfileData,
      [ProfileSchemaEnum.GitHub]: null,
    }

    const profileWithEmptyGitHub = {
      ...validProfileData,
      [ProfileSchemaEnum.GitHub]: '',
    }

    const resultNull = profileFormSchema.safeParse(profileWithNullGitHub)
    const resultEmpty = profileFormSchema.safeParse(profileWithEmptyGitHub)

    expect(resultNull.success).toBe(true)
    expect(resultEmpty.success).toBe(true)
  })

  const validProfileData = {
    [ProfileSchemaEnum.Name]: 'John Doe',
    [ProfileSchemaEnum.LinkedInUrl]: 'https://linkedin.com/in/johndoe',
    [ProfileSchemaEnum.GitHub]: 'https://github.com/johndoe',
    [ProfileSchemaEnum.StartedWorkingAt]: new Date('2020-01-01').toString(),
    [ProfileSchemaEnum.EnglishLevel]: EnglishLevel.Advanced,
    [ProfileSchemaEnum.Skills]: ['JavaScript', 'React'],
    [ProfileSchemaEnum.ReceiveEmailConfig]: ['Newsletter', 'Updates'],
    [ProfileSchemaEnum.SkillsSuggestions]: [],
    [ProfileSchemaEnum.SendBestOpenings]: true,
  }
})
