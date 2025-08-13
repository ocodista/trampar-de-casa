'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { LandingPageRoutes } from '../landing-page/landingPageRoutes'
import { LoginPreferences } from 'app/landing-page/LoginPreferences'
import { login, encryptId } from 'app/utils/LoginPreferencesActions'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Briefcase,
  Building2,
  Share2,
  Settings,
  X,
  Monitor,
} from 'lucide-react'

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

const menuItems = [
  {
    href: LandingPageRoutes.RemoteWorkEquipment,
    label: 'Equipamentos',
    icon: Monitor,
  },
  { href: LandingPageRoutes.Blog, label: 'Blog', icon: BookOpen },
  {
    href: LandingPageRoutes.Vacancies,
    label: 'Vagas Remotas',
    icon: Briefcase,
  },
  {
    href: LandingPageRoutes.SupportingCompanies,
    label: 'Empresas Apoiadoras',
    icon: Building2,
  },
  {
    href: LandingPageRoutes.PublishYourRole,
    label: 'Publique uma vaga',
    icon: Share2,
  },
]

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuVisibility] = useState(false)
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false)
  const router = useRouter()
  const menuRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setMobileMenuVisibility(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

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
            className="text-indigo-600 focus:outline-none"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`navbar-menu fixed inset-y-0 right-0 z-50 w-64 transform overflow-y-auto bg-white p-6 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="relative h-full overflow-y-auto bg-white">
          <div className="flex justify-between">
            <Logo />
            <button
              onClick={() => setMobileMenuVisibility(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="mt-8 space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuVisibility(false)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={handleOpenPreferences}
                className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Settings size={20} />
                <span className="font-medium">Definir Preferências</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
