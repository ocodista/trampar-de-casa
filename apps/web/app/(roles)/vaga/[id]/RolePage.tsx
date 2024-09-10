'use client'
import { FocusBanner } from 'app/landing-page/FocusBanner'

export const RolePage = ({ vaga }) => {
  return (
    <>
      <FocusBanner />
      <div className="container mx-auto">
        <h1>{vaga.title}</h1>
        <p>{vaga.description}</p>
        <p>Empresa: {vaga.company}</p>
      </div>
    </>
  )
}
