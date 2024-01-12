import { Footer } from 'shared/ui/email/Footer'
import { Header } from 'shared/ui/email/Header'
import { RoleCard } from 'shared/ui/email/RoleCard'
import { getFakeRoles } from './getFakeRoles'

export function FakeEmail() {
  const fakeRoles = Array.from({ length: 5 }).map(getFakeRoles)
  return (
    <>
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
    </>
  )
}
