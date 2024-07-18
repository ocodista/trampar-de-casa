'use client'
import Image from 'next/image'
import { useState } from 'react'
import { LandingPageRoutes } from '../landing-page/landingPageRoutes'
import { LoginPreferences } from 'app/landing-page/LoginPreferences'
import login, { encryptId } from 'app/utils/LoginPreferencesActions'
import { useRouter } from 'next/navigation'

// Logo Component
const Logo = () => (
  <a href="/">
    <Image
      src="/images/logo.svg"
      width={70}
      height={70}
      alt="Logotipo da Trampar De Casa"
    />
  </a>
)

// Menu Items
const menuItems = [
  { href: LandingPageRoutes.Blog, label: 'Blog' },
  { href: LandingPageRoutes.Vacancies, label: 'Vagas Remotas' },
  { href: LandingPageRoutes.SupportingCompanies, label: 'Empresas Apoiadoras' },
  { href: LandingPageRoutes.PublishYourRole, label: 'Indique uma vaga' },
]

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuVisibility] = useState(false)
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false)
  const router = useRouter()

  const handleOpenPreferences = async () => {
    if (localStorage.getItem('loginEmail')) {
      const email = localStorage.getItem('loginEmail')
      const userId = await login(email)
      const encryptedUserId = await encryptId(userId)
      router.push(`/subscribers/profile/${encryptedUserId}`)
      return
    }
    setIsContributeDialogOpen(true)
  }

  return (
    <div className="container mx-auto overflow-hidden">
      <LoginPreferences
        open={isContributeDialogOpen}
        onClose={() => setIsContributeDialogOpen(false)}
      />
      <div className="relative flex items-center justify-between bg-transparent py-5">
        <div className="w-full">
          <div className="flex w-full flex-wrap items-center">
            <div className="hidden w-full lg:flex">
              <div className="mr-14 w-auto">
                <Logo />
              </div>
              <ul className="flex w-full items-center justify-between">
                <div className="flex gap-9">
                  {menuItems.map((item, index) => (
                    <li key={index} className="font-medium hover:text-gray-700">
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </div>
                <button
                  className="font-medium hover:text-gray-700"
                  onClick={handleOpenPreferences}
                >
                  ⚙️ Definir Preferências
                </button>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-auto lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuVisibility(!isMobileMenuOpen)}
          >
            <svg
              className="navbar-burger text-indigo-600"
              width={51}
              height={51}
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={56} height={56} rx={28} fill="currentColor" />
              <path
                d="M37 32H19M37 24H19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`navbar-menu fixed bottom-0 left-0 top-0 z-50 w-4/6 transition-transform duration-300 ease-in-out sm:max-w-xs lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"
          onClick={() => setMobileMenuVisibility(false)}
        />
        <nav className="relative h-full overflow-y-auto bg-white px-9 pt-8">
          <div className="-m-2 flex items-center justify-between">
            <div className="w-auto p-2">
              <Logo />
            </div>
            <div className="w-auto p-2">
              <button
                type="button"
                className="navbar-burger"
                onClick={() => setMobileMenuVisibility(false)}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="#111827"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <ul className="flex w-full flex-col justify-center gap-12 py-16">
            {menuItems.slice(0, -1).map(
              (
                item,
                index // Exclude 'PublishYourRole' for mobile
              ) => (
                <li key={index}>
                  <a
                    className="font-medium hover:text-gray-700"
                    href={item.href}
                    onClick={() => setMobileMenuVisibility(false)}
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}
