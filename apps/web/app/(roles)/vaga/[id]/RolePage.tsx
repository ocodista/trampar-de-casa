'use client'

import { PTBRRolePage } from 'app/components/PTBRRolePage'
import { USRolePage } from 'app/components/USRolePage'
import React from 'react'

export const RolePage = ({ role }) => {
  const isEnglish = role.language === 'English'

  return isEnglish ? <USRolePage role={role} /> : <PTBRRolePage role={role} />
}

export default RolePage
