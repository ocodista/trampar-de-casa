import { Heading, Tailwind } from '@react-email/components'
import { render } from '@react-email/render'
import React from 'react'

type RenderInfos = {
  value: string
  count: number
}
type Props = Record<'national' | 'international', RenderInfos>

export function RenderRolesSection({ international, national }: Props) {
  return render(
    <Tailwind>
      <Heading className="text-[24px]">
        🌎 {international.count} Vagas internacionais
      </Heading>
      <div
        dangerouslySetInnerHTML={{
          __html: international.value,
        }}
      ></div>
      <Heading className="text-[24px]">
        🇧🇷 {national.count} Vagas nacionais
      </Heading>
      <div
        dangerouslySetInnerHTML={{
          __html: national.value,
        }}
      ></div>
    </Tailwind>
  )
}
