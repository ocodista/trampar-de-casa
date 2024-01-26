import { useRef } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { RolePreview } from './RolePreview'

export const RolePreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const entry = useIntersectionObserver(sectionRef, {
    threshold: 0.3,
  })
  const intersectionEntryIsNull = !entry
  const isFloatSectionVisible = intersectionEntryIsNull
    ? false
    : !entry?.isIntersecting

  return (
    <>
      {isFloatSectionVisible && (
        <section className="fixed bottom-4 right-4 z-50 hidden w-[500px] rounded-md border border-solid border-gray-300 bg-white p-4 pt-6 shadow md:block">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            Pré visualização
          </h2>
          <section className="m-x-auto max-w-[425px]">
            <RolePreview />
          </section>
        </section>
      )}
      <section ref={sectionRef} className="hidden bg-white pt-6 md:block">
        <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          Pré visualização
        </h2>
        <section className="max-w-[425px]">
          <RolePreview />
        </section>
      </section>
    </>
  )
}
