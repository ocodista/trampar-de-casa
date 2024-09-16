'use client'

import { FocusBanner } from 'app/landing-page/FocusBanner'
import { useRouter } from 'next/navigation'
import {
  ExternalLink,
  ChevronDown,
  MapPin,
  AlarmClock,
  Laptop,
} from 'lucide-react'
import React from 'react'

export const RolePage = ({ vaga }) => {
  const router = useRouter()
  const formatDescription = (description) => {
    if (!description) return ''
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  const formatDate = (dateString) => {
    const months = [
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
    ]

    const date = new Date(dateString)
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
  }

  const handleApply = () => {
    window.open(
      `https://router.trampardecasa.com.br/api/role-access?roleId=${vaga.id}`,
      '_blank'
    )
  }

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
              <div className="flex gap-3">
                <button className="flex h-10 items-center gap-1 rounded-2xl border-2 bg-white pb-1.5 pl-3 pr-3 pt-1.5">
                  Share job <ChevronDown />
                </button>
                <button
                  onClick={handleApply}
                  className="flex h-10 items-center gap-1 rounded-2xl border-2 bg-indigo-600 pb-1 pl-4 pr-4 pt-1 text-white"
                >
                  Apply <ExternalLink />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-12 pb-7 pl-7 pr-7 pt-12">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{vaga.title}</h1>
                <p>{vaga.company}</p>
              </div>
              <div>
                <p className="text-end text-xl font-semibold">{vaga.salary}</p>
                <div className="flex gap-3">
                  <p className="flex gap-1">
                    <Laptop />
                    Remote
                  </p>
                  <p className="flex gap-1">
                    <MapPin />
                    Anywhere
                  </p>
                  <p className="flex gap-1">
                    <AlarmClock />
                    Full-time
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-4/6 flex-grow pt-3">
                {formatDescription(vaga.description)}
              </div>
              <div className="h-[600px] w-2/6 rounded-3xl border-2 border-[#eef2f6] bg-white p-4">
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
                    <p className="text-sm text-[#697786]">WorkPlace</p>
                    <p className="flex gap-2">
                      <Laptop />
                      Remote
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">Location</p>
                    <p className="flex gap-2">
                      <MapPin />
                      {vaga.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">Job type</p>
                    <p className="flex gap-2">
                      <AlarmClock />
                      Full-time
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">Pay</p>
                    <p>{vaga.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#697786]">Published on</p>
                    <p>{formatDate(vaga.updatedAt)}</p>
                  </div>
                  <button
                    onClick={handleApply}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border-2 bg-indigo-600 text-white"
                  >
                    Apply <ExternalLink />
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
