import { Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import { Database } from 'db'
import React from 'react'
import { OpeningCurrency, RoleCard } from 'shared/ui/email/RoleCard'

type RolesSkillsView = Database['public']['Views']['RolesSkillsView']['Row']
export const htmlStartingDoctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`

export const parseHTML = (role: RolesSkillsView): string => {
  return render(
    <Tailwind>
      <RoleCard
        company={role.company as string}
        currency={(role.currency as OpeningCurrency) || 'R$'}
        language={role.language as string}
        headerInfo={role.description as string}
        location={role.country as string}
        skills={role.skillNames as string[]}
        title={role.title as string}
        url={role.url || ''}
      />
    </Tailwind>
  ).replace(htmlStartingDoctype, '')
}
