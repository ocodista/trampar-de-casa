import { Heading, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { Topics } from 'shared'
import { RolesRendererCollection } from './getHtmlRoles'

export type RenderRolesSectionProps = { roles: RolesRendererCollection[] }

export function RenderRolesSection({ roles }: RenderRolesSectionProps): string {
  const obj = {
    international: {
      count: 0,
      html: '',
    },
    national: {
      count: 0,
      html: '',
    },
  }
  roles.forEach((role) => {
    if (role.topic === Topics.INTERNATIONAL_VACANCIES) {
      obj.international.html += role.content
      obj.international.count++
    } else {
      obj.national.html += role.content
      obj.national.count++
    }
  })

  return render(
    <Tailwind>
      <Heading className="text-[24px]">
        🌎 {obj.international.count} Vagas internacionais
      </Heading>
      <div
        dangerouslySetInnerHTML={{
          __html: obj.international.html,
        }}
      ></div>
      <Heading className="text-[24px]">
        🇧🇷 {obj.national.count} Vagas nacionais
      </Heading>
      <div
        dangerouslySetInnerHTML={{
          __html: obj.national.html,
        }}
      ></div>
    </Tailwind>
  )
}
