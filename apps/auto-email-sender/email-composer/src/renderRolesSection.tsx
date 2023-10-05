import { Heading, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { Topics } from 'shared'
import { RolesRendererCollection } from './getHtmlRoles'

type Props = { roles: RolesRendererCollection[] }

export function RenderRolesSection({ roles }: Props) {
  const internationalRoles = roles.filter(
    ({ topic }) => topic === Topics.INTERNATIONAL_VACANCIES
  )
  const nationalRoles = roles.filter(
    ({ topic }) => topic === Topics.NATIONAL_VACANCIES
  )
  return render(
    <Tailwind>
      <Heading className="text-[24px]">
        🌎 {internationalRoles.length} Vagas internacionais
      </Heading>
      <div
        dangerouslySetInnerHTML={{
          __html: internationalRoles.reduce(
            (prev, { content }) => `${prev}${content}`,
            ''
          ),
        }}
      ></div>
      <Heading className="text-[24px]">
        🇧🇷 {nationalRoles.length} Vagas nacionais
      </Heading>
      <div
        dangerouslySetInnerHTML={{
          __html: nationalRoles.reduce(
            (prev, { content }) => `${prev}${content}`,
            ''
          ),
        }}
      ></div>
    </Tailwind>
  )
}
