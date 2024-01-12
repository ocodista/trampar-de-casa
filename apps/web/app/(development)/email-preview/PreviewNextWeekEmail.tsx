'use server'
import { Footer } from 'shared/ui/email/Footer'
import { Header } from 'shared/ui/email/Header'
import { RoleCard } from 'shared/ui/email/RoleCard'
import { getFakeRoles } from './getFakeRoles'

const fakeRoles = Array.from({ length: 5 }).map(getFakeRoles)
export async function PreviewNextWeekEmail() {
  return (
    <section className="max-h-[80vh] overflow-y-auto p-4">
      <Header rolesCount="10" testimonialLink="teste" />
      {fakeRoles.map((props) => (
        <RoleCard
          key={props.id}
          skills={props.skillNames}
          location={props.country}
          {...props}
        />
      ))}
      <Footer href="teste" />
    </section>
  )
}
