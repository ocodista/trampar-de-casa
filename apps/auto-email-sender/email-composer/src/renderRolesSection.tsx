import { Heading, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'
import { Topics } from 'shared'
import { RolesRendererCollection } from './getHtmlRoles'

export type RenderRolesSectionProps = { roles: RolesRendererCollection[] }
enum RenderedKeys {
  internationalCount = '##INTERNATIONAL_COUNT',
  nationalCount = '##NATIONAL_COUNT',
  internationalRolesHtml = '##INTERNATIONAL_ROLE_HTML',
  nationalRolesHtml = '##NATIONAL_ROLE_HTML',
}
const renderedHtml = render(
  <Tailwind>
    <Heading className="text-[24px]">
      🌎 {RenderedKeys.internationalCount} Vagas internacionais
    </Heading>
    <div>{RenderedKeys.internationalRolesHtml}</div>
    <Heading className="text-[24px]">
      🇧🇷 {RenderedKeys.nationalCount} Vagas nacionais
    </Heading>
    <div>{RenderedKeys.nationalRolesHtml}</div>
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
    .replace(
      RenderedKeys.internationalCount,
      obj.international.count.toString()
    )
    .replace(RenderedKeys.nationalCount, obj.national.count.toString())
    .replace(RenderedKeys.nationalRolesHtml, obj.national.html)
    .replace(RenderedKeys.internationalRolesHtml, obj.international.html)
  console.timeEnd('RenderRolesSection [render]')
  return sanitizedHtml
}
