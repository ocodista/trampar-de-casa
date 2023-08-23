import { render } from '@react-email/render'
import { rolesSkillsView } from 'db'
import React from 'react'
import { OpeningCurrency } from 'shared/src/email/openings-email/Opening'
import { OpeningCard } from 'shared/src/email/openings-email/OpeningList'

export const htmlStartingDoctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`

export const parseHTML = (role: rolesSkillsView): string => {
  return render(
    <OpeningCard
      company={role.companyName}
      currency={(role.currency as OpeningCurrency) || 'R$'}
      language={role.language}
      headerInfo={role.description}
      location={role.country}
      skills={role.skillNames}
      title={role.title}
      url={role.url || ''}
    />
  ).replace(htmlStartingDoctype, '')
}
