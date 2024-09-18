'use client'

import { FocusBanner } from 'app/landing-page/FocusBanner'
import {
  ExternalLink,
  ChevronDown,
  MapPin,
  AlarmClock,
  Laptop,
  Link,
  Check,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const RolePage = ({ vaga }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [shareButtonText, setShareButtonText] = useState(
    vaga.language === 'English' ? 'Copy link' : 'Copiar link'
  )
  const [isCopied, setIsCopied] = useState(false)
  const shareMenuRef = React.useRef(null)

  const formatDescription = (description) => {
    if (!description) return ''

    const insertLineBreaks = (text, maxLength) => {
      let result = ''
      let startIndex = 0

      while (startIndex < text.length) {
        let endIndex = Math.min(startIndex + maxLength, text.length)

        if (endIndex < text.length && text[endIndex] !== '.') {
          while (endIndex > startIndex && text[endIndex] !== '.') {
            endIndex--
          }
          if (endIndex === startIndex) {
            endIndex = Math.min(startIndex + maxLength, text.length)
          }
        }

        result += text.slice(startIndex, endIndex).trim()

        if (text[endIndex] === '.') {
          result += '.'
          startIndex = endIndex + 1
        } else {
          startIndex = endIndex
        }

        result += '\n'
      }

      return result.trim()
    }

    const formattedDescription = insertLineBreaks(description, 300)

    return formattedDescription.split('\n').map((line, index) => (
      <p key={index} className="mb-4 whitespace-pre-line">
        {line}
      </p>
    ))
  }

  const isHtml = (text) => /<\/?[a-z][\s\S]*>/i.test(text)

  const formatDate = (dateString, language) => {
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
  }

  const handleApply = () => {
    window.open(
      `https://router.trampardecasa.com.br/api/role-access?roleId=${vaga.id}`,
      '_blank'
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setIsCopied(true)
    setShareButtonText(vaga.language === 'English' ? 'Copied' : 'Copiado')

    setTimeout(() => {
      setIsCopied(false)
      setShareButtonText(
        vaga.language === 'English' ? 'Copy link' : 'Copiar link'
      )
    }, 2000)
  }

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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    console.log(showShareMenu)
  }, [showShareMenu])

  return (
    <>
      <FocusBanner />
      <div className="container mx-auto mb-10">
        <div className="mt-2 flex flex-col rounded-md bg-[#f3f4f8] p-2.5">
          <div className="relative flex h-20 rounded-2xl bg-white">
            <div className="absolute top-10 flex w-full items-center justify-between pl-3 pr-3">
              {vaga.company_logo ? (
                <img
                  src={vaga.company_logo}
                  alt={`${vaga.company} logo`}
                  className="h-16 max-h-full w-16 max-w-full rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-black"></div>
              )}
              <div ref={shareMenuRef} className="relative flex gap-3">
                <button
                  onClick={() => setShowShareMenu((prev) => !prev)}
                  className="xs:px-2 xs:text-sm sm:text-md md:text-md lg:text-md flex h-10 items-center gap-1 rounded-2xl border-2 bg-white pb-1.5 pt-1.5"
                >
                  {vaga.language === 'English' ? 'Share job' : 'Compartilhar'}
                  <ChevronDown size={20} />
                </button>
                {showShareMenu && (
                  <div className="absolute right-1/3 top-10 z-10 w-48 rounded-md bg-white p-1 shadow-lg">
                    <button
                      onClick={handleCopyLink}
                      className="block flex w-full items-center gap-2 rounded-md px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {isCopied ? <Check size={20} /> : <Link size={20} />}
                      {shareButtonText}
                    </button>
                  </div>
                )}
                <button
                  onClick={handleApply}
                  className="xs:px-2 xs:text-sm sm:text-md md:text-md lg:text-md flex h-10 items-center  gap-1 rounded-2xl border-2 bg-indigo-600 px-4 pb-1 pt-1 text-lg text-white hover:bg-[#433aed] sm:px-4 md:px-4 lg:px-4"
                >
                  {vaga.language === 'English' ? 'Apply' : 'Aplicar'}
                  <ExternalLink size={17} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-12 pb-7 pl-7 pr-7 pt-12">
            <div className="justify-between md:flex lg:flex">
              <div className="xs:mb-3 mb-0 sm:mb-3">
                <h1 className="text-2xl font-bold">{vaga.title}</h1>
                <p>{vaga.company}</p>
              </div>
              <div className="flex flex-col md:items-end lg:items-end">
                <p className="text-xl font-semibold md:text-end lg:text-end">
                  {vaga.salary
                    ? vaga.salary
                    : vaga.language === 'English'
                    ? 'Salary negotiable'
                    : 'A combinar'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <p className="flex gap-1">
                    <Laptop />
                    {vaga.language === 'English' ? 'Remote' : 'Remoto'}
                  </p>
                  <p className="flex gap-1">
                    <MapPin />
                    {vaga.language === 'English'
                      ? 'Anywhere'
                      : 'Qualquer lugar'}
                  </p>
                  <p className="flex gap-1">
                    <AlarmClock />
                    Full-time
                  </p>
                </div>
              </div>
            </div>
            <div className="gap-6 lg:flex">
              <div className="w-full flex-grow pb-4 pt-3 lg:w-4/6">
                {isHtml(vaga.description) ? (
                  <div dangerouslySetInnerHTML={{ __html: vaga.description }} />
                ) : (
                  formatDescription(vaga.description)
                )}
              </div>
              <div className="h-[600px] w-full rounded-3xl border-2 border-[#eef2f6] bg-white p-4 lg:w-2/6">
                <div className="rounded-2xl bg-[#f3f4f8] p-4 text-center">
                  <h1 className="font-semibold">{vaga.title}</h1>
                </div>
                <div className="flex flex-col gap-6 p-6">
                  <div>
                    <p className="inline-block rounded-3xl bg-[#ecfdf3] p-2 text-sm text-[#027a2a]">
                      Fully Remote
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">
                      {vaga.language === 'English'
                        ? 'WorkPlace'
                        : 'Local de trabalho'}
                    </p>
                    <p className="flex gap-2">
                      <Laptop />
                      {vaga.language === 'English' ? 'Remote' : 'Remoto'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">
                      {vaga.language === 'English' ? 'Location' : 'Localização'}
                    </p>
                    <p className="flex gap-2">
                      <MapPin />
                      {vaga.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">
                      {vaga.language === 'English'
                        ? 'Job type'
                        : 'Tipo de contrato'}
                    </p>
                    <p className="flex gap-2">
                      <AlarmClock />
                      Full-time
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">
                      {vaga.language === 'English' ? 'Pay' : 'Salario'}
                    </p>
                    <p>
                      {vaga.salary
                        ? vaga.salary
                        : vaga.language === 'English'
                        ? 'Negotiable'
                        : 'A combinar'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">
                      {vaga.language === 'English'
                        ? 'Published on'
                        : 'Publicado em'}
                    </p>
                    <p>{formatDate(vaga.updatedAt, vaga.language)}</p>
                  </div>
                  <button
                    onClick={handleApply}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border-2 bg-indigo-600 text-white hover:bg-[#433aed]"
                  >
                    {vaga.language === 'English' ? 'Apply' : 'Aplicar'}{' '}
                    <ExternalLink />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
