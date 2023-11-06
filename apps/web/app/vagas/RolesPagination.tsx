'use client'
import { Button } from 'app/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const RolesPagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const current = new URLSearchParams(Array.from(searchParams.entries()))
  const currentPage = Number(current.get('page'))

  const items = Array(totalPages)
    .fill(null)
    .map((_, index) => {
      const page = index + 1
      return (
        <Button
          variant={currentPage === page ? 'outline' : 'default'}
          key={`page#${index}`}
          onClick={() => {
            current.set('page', page.toString())
            router.push(`${pathname}?${current.toString()}`)
          }}
        >
          {page}
        </Button>
      )
    })

  return <section className="flex justify-end gap-2">{items}</section>
}
