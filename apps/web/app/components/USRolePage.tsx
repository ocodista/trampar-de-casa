'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { FocusBanner } from 'app/landing-page/FocusBanner'
import SanitizedHTML from 'app/components/SanitizedHTML'
import {
  ExternalLink,
  MapPin,
  AlarmClock,
  Laptop,
  Link,
  Check,
  DollarSign,
  Calendar,
  Share2,
} from 'lucide-react'
import { trackedRoleURL } from 'shared/src/services/trackedRoleURL'
import { formatDate, formatDescription } from 'app/utils/roleUtils'

const COPY_TIMEOUT = 2000

export const USRolePage = ({ role }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const shareMenuRef = React.useRef(null)

  const isHtml = useCallback((text) => /<\/?[a-z][\s\S]*>/i.test(text), [])

  const shareButtonText = useMemo(
    () => (isCopied ? 'Copied' : 'Copy link'),
    [isCopied]
  )

  const handleApply = useCallback(() => {
    window.open(trackedRoleURL(role.id), '_blank')
  }, [role.id])

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, COPY_TIMEOUT)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target)
      ) {
        setShowShareMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const jobDetails = useMemo(() => {
    return [
      {
        icon: <Laptop className="text-indigo-600" />,
        label: 'Work Type',
        value: 'Remote',
      },
      {
        icon: <MapPin className="text-indigo-600" />,
        label: 'Location',
        value: role.country,
      },
      {
        icon: <AlarmClock className="text-indigo-600" />,
        label: 'Job Type',
        value: 'Full-time',
      },
      {
        icon: <DollarSign className="text-indigo-600" />,
        label: 'Salary',
        value: role.salary || 'Not informed',
      },
      {
        icon: <Calendar className="text-indigo-600" />,
        label: 'Posted On',
        value: formatDate(role.updatedAt, 'English'),
      },
    ]
  }, [role.country, role.salary, role.updatedAt])

  return (
    <>
      <FocusBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white p-2">
                  {role.company_logo ? (
                    <img
                      src={role.company_logo}
                      alt={`${role.company} logo`}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-800 text-2xl font-bold text-white">
                      {role.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{role.title}</h1>
                  <p className="text-lg text-indigo-200">{role.company}</p>
                </div>
              </div>
              <div className="relative flex space-x-2">
                <button
                  onClick={() => setShowShareMenu((prev) => !prev)}
                  title="Share"
                  className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-100"
                  aria-label="Share job"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={handleApply}
                  className="flex items-center gap-2 space-x-2 rounded-full bg-green-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-600"
                >
                  Apply Now
                  <ExternalLink size={20} />
                </button>
                {showShareMenu && (
                  <div
                    ref={shareMenuRef}
                    className="absolute right-[45%] top-11 z-10 w-48 rounded-md bg-white text-black shadow-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="share-menu-button"
                  >
                    <button
                      onClick={handleCopyLink}
                      className="flex w-full items-center space-x-2 rounded-md px-4 py-2 text-left hover:bg-gray-100"
                      role="menuitem"
                    >
                      {isCopied ? <Check size={16} /> : <Link size={16} />}
                      <span>{shareButtonText}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row">
            <section className="p-6 lg:w-2/3">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Job Description
              </h2>
              <div className="space-y-4 text-gray-600">
                {isHtml(role.description) ? (
                  <SanitizedHTML html={role.description} />
                ) : (
                  formatDescription(role.description)
                )}
              </div>
            </section>

            <aside className="border-t bg-gray-50 p-6 lg:w-1/3 lg:border-l lg:border-t-0">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Job Details
              </h2>
              <div className="space-y-4">
                {jobDetails.map((detail, index) => (
                  <DetailItem key={index} {...detail} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-700">{value}</p>
    </div>
  </div>
)
