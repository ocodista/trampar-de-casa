import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'

const SanitizedHTML = ({ html }) => {
  const [sanitizedHTML, setSanitizedHTML] = useState('')

  useEffect(() => {
    const clean = DOMPurify.sanitize(html)
    setSanitizedHTML(clean)
  }, [html])

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
}

export default SanitizedHTML
