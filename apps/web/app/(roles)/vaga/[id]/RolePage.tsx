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

const COPY_TIMEOUT = 2000

const getShareButtonText = (isCopied, isEnglish) => {
  if (isCopied) {
    return isEnglish ? 'Copied' : 'Copiado'
  }
  return isEnglish ? 'Copy link' : 'Copiar link'
}

export const RolePage = ({ vaga }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const shareMenuRef = React.useRef(null)

  const isEnglish = useMemo(() => vaga.language === 'English', [vaga.language])

  const shareButtonText = useMemo(
    () => getShareButtonText(isCopied, isEnglish),
    [isCopied, isEnglish]
  )

  const formatDescription = useCallback((description) => {
    if (!description) return []

    const insertLineBreaks = (text, maxLength) => {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || []
      const result = []
      let currentLine = ''

      sentences.forEach((sentence) => {
        if ((currentLine + sentence).length > maxLength && currentLine) {
          result.push(currentLine.trim())
          currentLine = ''
        }
        currentLine += sentence
      })

      if (currentLine) {
        result.push(currentLine.trim())
      }

      return result
    }

    const formattedDescription = insertLineBreaks(description, 300)

    return formattedDescription.map((line, index) => (
      <p key={index} className="mb-4 whitespace-pre-line">
        {line}
      </p>
    ))
  }, [])

  const isHtml = useCallback((text) => /<\/?[a-z][\s\S]*>/i.test(text), [])

  const formatDate = useCallback((dateString, language) => {
    const months = {
      en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      pt: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
    }

    const date = new Date(dateString)
    const month = months[language === 'English' ? 'en' : 'pt'][date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `${day} ${month}, ${year}`
  }, [])

  const handleApply = useCallback(() => {
    window.open(trackedRoleURL(vaga.id), '_blank')
  }, [vaga.id])

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
    const commonIcons = {
      workType: <Laptop className="text-indigo-600" />,
      location: <MapPin className="text-indigo-600" />,
      jobType: <AlarmClock className="text-indigo-600" />,
      salary: <DollarSign className="text-indigo-600" />,
      postedOn: <Calendar className="text-indigo-600" />,
    }

    if (isEnglish) {
      return [
        { icon: commonIcons.workType, label: 'Work Type', value: 'Remote' },
        { icon: commonIcons.location, label: 'Location', value: vaga.country },
        { icon: commonIcons.jobType, label: 'Job Type', value: 'Full-time' },
        {
          icon: commonIcons.salary,
          label: 'Salary',
          value: vaga.salary || 'Not informed',
        },
        {
          icon: commonIcons.postedOn,
          label: 'Posted On',
          value: formatDate(vaga.updatedAt, vaga.language),
        },
      ]
    } else {
      return [
        {
          icon: commonIcons.workType,
          label: 'Tipo de Trabalho',
          value: 'Remoto',
        },
        {
          icon: commonIcons.location,
          label: 'Localização',
          value: vaga.country,
        },
        {
          icon: commonIcons.jobType,
          label: 'Tipo de Contrato',
          value: 'Full-time',
        },
        {
          icon: commonIcons.salary,
          label: 'Salário',
          value: vaga.salary || 'Não informado',
        },
        {
          icon: commonIcons.postedOn,
          label: 'Publicado em',
          value: formatDate(vaga.updatedAt, vaga.language),
        },
      ]
    }
  }, [
    isEnglish,
    vaga.country,
    vaga.salary,
    vaga.updatedAt,
    vaga.language,
    formatDate,
  ])

  return (
    <>
      <FocusBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white p-2">
                  {vaga.company_logo ? (
                    <img
                      src={vaga.company_logo}
                      alt={`${vaga.company} logo`}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-800 text-2xl font-bold text-white">
                      {vaga.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{vaga.title}</h1>
                  <p className="text-lg text-indigo-200">{vaga.company}</p>
                </div>
              </div>
              <div className="relative flex space-x-2">
                <button
                  onClick={() => setShowShareMenu((prev) => !prev)}
                  title={isEnglish ? 'Share' : 'Compartilhar'}
                  className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-100"
                  aria-label={isEnglish ? 'Share job' : 'Compartilhar vaga'}
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={handleApply}
                  className="flex items-center gap-2 space-x-2 rounded-full bg-green-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-600"
                >
                  {isEnglish ? 'Apply Now' : 'Aplicar Agora'}
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
                {isEnglish ? 'Job Description' : 'Descrição da Vaga'}
              </h2>
              <div className="space-y-4 text-gray-600">
                {isHtml(vaga.description) ? (
                  <SanitizedHTML html={vaga.description} />
                ) : (
                  formatDescription(vaga.description)
                )}
              </div>
            </section>

            <aside className="border-t bg-gray-50 p-6 lg:w-1/3 lg:border-l lg:border-t-0">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                {isEnglish ? 'Job Details' : 'Detalhes da Vaga'}
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

export default RolePage
