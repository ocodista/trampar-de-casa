'use client'

import { cn } from 'app/utils/utils'
import * as Accordion from 'app/components/accordion'
import { FAQ_OPTIONS } from 'app/constants'

export function FAQ() {
  return (
    <section
      data-section="faq-section"
      className="overflow-hidden bg-white pb-32 pt-28"
    >
      <div className="container mx-auto px-8 lg:px-4">
        <p className="tracking-px mb-5 text-sm font-semibold uppercase text-indigo-600">
          ALGUMA DÚVIDA?
        </p>

        <h2
          className={cn(
            'xl:text-10xl font-heading max-xs:hyphens-auto max-xs:text-4xl',
            'mb-16 text-6xl font-bold leading-none tracking-tight md:text-8xl'
          )}
        >
          Perguntas Frequentes
        </h2>

        <Accordion.Root
          type="single"
          defaultValue={FAQ_OPTIONS[0].label}
          aria-label="accordion"
        >
          {FAQ_OPTIONS.map(({ description, label }, i) => {
            return (
              <Accordion.Item key={i} value={label}>
                <Accordion.Trigger>{label}</Accordion.Trigger>
                <Accordion.Content>{description}</Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </div>
    </section>
  )
}
