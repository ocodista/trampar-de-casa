'use client'
import Navbar from 'app/components/ui/Navbar'
import { useState } from 'react'

export function Header() {
  const [isMobileNavVisible, setMobileNavVisibility] = useState(false)
  const navigation = [
    { name: 'Nossos Valores', href: '#valores', current: true },
    { name: 'Como Funciona', href: '#como-funciona', current: false },
    {
      name: 'Perguntas Frequentes',
      href: '#perguntas-frequentes',
      current: false,
    },
  ]
  return (
    <>
      <header className=" fixed top-0 left-0  w-full  overflow-hidden z-10">
        <Navbar navigation={navigation} />
      </header>
      <div className="mt-16" />
    </>
  )
}
