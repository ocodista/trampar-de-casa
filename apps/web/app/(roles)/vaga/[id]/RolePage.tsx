'use client'

import { FocusBanner } from 'app/landing-page/FocusBanner'
import { ExternalLink, ChevronDown } from 'lucide-react'

export const RolePage = ({ vaga }) => {
  return (
    <>
      <FocusBanner />
      <div className="container mx-auto">
        <div className="mt-2 flex justify-between rounded-md bg-[#eb4034] p-2.5">
          <div>
            <h1>{vaga.title}</h1>
            <p>{vaga.description}</p>
            <p>Empresa: {vaga.company}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center rounded-2xl bg-white pb-1.5 pl-3 pr-3 pt-1.5">
              Share job <ChevronDown className="ml-2" />
            </button>
            <button className="flex items-center rounded-2xl bg-indigo-600 pb-1 pl-4 pr-4 pt-1 text-white">
              Apply <ExternalLink className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
