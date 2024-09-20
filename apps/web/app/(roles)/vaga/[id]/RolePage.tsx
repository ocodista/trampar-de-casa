'use client'

import { PTBRRolePage } from 'app/components/PTBRRolePage'
import { USRolePage } from 'app/components/USRolePage'
import React from 'react'

export const RolePage = ({ vaga }) => {
  const isEnglish = vaga.language === 'English'

  return isEnglish ? <USRolePage vaga={vaga} /> : <PTBRRolePage vaga={vaga} />
}

export default RolePage
