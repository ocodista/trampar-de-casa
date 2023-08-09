'use client'
import Image from 'next/image'
import { useState } from 'react'
import { LandingPageRoutes } from '../landing-page/landingPageRoutes'

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuVisibility] = useState(false)

  return (
    <div className="container mx-auto overflow-hidden">
      <div className="relative flex items-center justify-between bg-transparent py-5 lg:px-4">
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="mr-14 w-auto">
              <a href="/">
                <Image
                  src="/images/logo.svg"
                  width={70}
                  height={70}
                  alt="Logotipo da Trampar De Casa"
                />
              </a>
            </div>
            <div className="hidden w-auto lg:block">
              <ul className="mr-16 flex items-center">
                {Object.keys(LandingPageRoutes).map((route) => (
                  <li
                    className="mr-9 font-medium hover:text-gray-700"
                    key={`desktop-${route}`}
                  >
                    <a
                      href={
                        LandingPageRoutes[
                          route as keyof typeof LandingPageRoutes
                        ]
                      }
                    >
                      {route.replace('-', ' ')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
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
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="navbar-menu fixed bottom-0 left-0 top-0 z-50 w-4/6 sm:max-w-xs">
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"
            onClick={() => setMobileMenuVisibility(false)}
          />
          <nav className="relative h-full overflow-y-auto bg-white px-9 pt-8">
            <div className="flex h-full flex-wrap justify-between">
              <div className="w-full">
                <div className="-m-2 flex items-center justify-between">
                  <div className="w-auto p-2">
                    <a className="inline-block" href="/">
                      <Image
                        src="/images/logo.svg"
                        width={70}
                        height={70}
                        alt="Logotipo da Trampar De Casa"
                      />
                    </a>
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
              </div>
              <div className="flex w-full flex-col justify-center py-16">
                <ul className="flex flex-col gap-10">
                  {Object.keys(LandingPageRoutes).map((route) => (
                    <li key={`mobile-${route}`}>
                      <a
                        className="text-lg font-medium hover:text-gray-700"
                        href={
                          LandingPageRoutes[
                            route as keyof typeof LandingPageRoutes
                          ]
                        }
                        onClick={() => setMobileMenuVisibility(false)}
                      >
                        {route.replace('-', ' ')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
