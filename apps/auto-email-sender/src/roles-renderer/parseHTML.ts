import { trackedRoleURL } from 'shared/src/services/trackedRoleURL'
import { Database } from 'db'
import { RoleHTML } from 'shared/ui/email/RoleHTML'

type RolesSkillsView = Database['public']['Views']['RolesSkillsView']['Row']
export const htmlStartingDoctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`

export const parseHTML = (role: RolesSkillsView): string => {
  return RoleHTML({
    company: role.company,
    language: role.language,
    headerInfo: role.salary ?? '',
    location: role.country,
    url: trackedRoleURL(role.id as string),
    title: role.title,
    skills: role.skillNames,
    salary: role.salary,
  })
}
