import { render } from '@react-email/render'
import { Roles } from 'db'
import React from 'react'
import { OpeningCard } from 'shared/src/email/openings-email/OpeningList'

export const htmlStartingDoctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`

export const parseHTML = (role: Roles): string => {
  return render(
    <OpeningCard
      company={role.companyId}
      currency={role.currency || ''}
      language={role.language}
      location={role.country}
      skills={role.skills as string[]}
      title={role.title}
      url={role.url || ''}
    />
  ).replace(htmlStartingDoctype, '')
}
