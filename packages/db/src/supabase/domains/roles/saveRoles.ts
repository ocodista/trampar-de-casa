import { Entities, Topics, skillArray } from 'shared'
import { Opening } from 'shared/src/email/openings-email/Opening'
import { getSupabaseClient } from '../../getSupabaseClient'
import { Database } from '../../type'
import { SupabaseTable } from '../../utilityTypes'
export type OpeningCurrency = 'U$' | 'R$' | 'EUR'
type Role = SupabaseTable<'Roles'>

type RoleLanguage = Database['public']['Enums']['RoleLanguage']

export const saveOpenings = async (openings: Opening[], topic: Topics) => {
  const supabaseClient = getSupabaseClient()
  for (let index = 0; index < openings.length; index++) {
    const {
      language,
      location,
      currency,
      title,
      url,
      headerInfo,
      company,
      skills,
    } = openings[index]

    const skillsId: Array<string> = skillArray.reduce((prev, { id, name }) => {
      if (skills.includes(name)) {
        return [...prev, String(id)]
      }
      return prev
    }, [] as Array<string>)
    const { error, status } = await supabaseClient.from(Entities.Roles).insert({
      language:
        language === 'Português' ? 'Portuguese' : ('English' as RoleLanguage),
      country: location,
      currency,
      description: headerInfo,
      title,
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
      company,
      skillsId,
      topicId: topic,
      ready: true,
    } as unknown as Role)

    console.log(error, status)
  }
}
