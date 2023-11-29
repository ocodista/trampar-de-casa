import { Heading, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { Topics } from 'shared'
import { RolesRendererCollection } from './getHtmlRoles'

export type RenderRolesSectionProps = { roles: RolesRendererCollection[] }
enum RenderedKey {
  internationalCount = '##INTERNATIONAL_COUNT',
  nationalCount = '##NATIONAL_COUNT',
  internationalRoleHtml = '##INTERNATIONAL_ROLE_HTML',
  nationalRoleHtml = '##NATIONAL_ROLE_HTML',
}
const renderedHtml = render(
  <Tailwind>
    <Heading className="text-[24px]">
      🌎 {RenderedKey.internationalCount} Vagas internacionais
    </Heading>
    <div>{RenderedKey.internationalRoleHtml}</div>
    <Heading className="text-[24px]">
      🇧🇷 {RenderedKey.nationalCount} Vagas nacionais
    </Heading>
    <div>{RenderedKey.nationalRoleHtml}</div>
  </Tailwind>
)

export function RenderRolesSection({ roles }: RenderRolesSectionProps): string {
  console.time('RenderRolesSection [forEach]')
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
  console.timeEnd('RenderRolesSection [forEach]')

  console.time('RenderRolesSection [render]')
  const sanitizedHtml = renderedHtml
    .replace(RenderedKey.internationalCount, obj.international.count.toString())
    .replace(RenderedKey.nationalCount, obj.national.count.toString())
    .replace(RenderedKey.nationalRoleHtml, obj.national.html)
    .replace(RenderedKey.internationalRoleHtml, obj.international.html)
  console.timeEnd('RenderRolesSection [render]')
  return sanitizedHtml
}
