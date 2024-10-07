import SanitizedHTML from 'app/components/SanitizedHTML'

export const formatDate = (dateString: string, language: string) => {
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

export const formatDescription = (description: string) => {
  if (!description) return null

  const processText = (text: string) => {
    text = text.trim()
    text = text.replace(/\\n\s*\\n/g, '\\n')
    text = text.replace(/\\n/g, '<br>')
    return text
  }

  const splitIntoParagraphs = (text: string) => {
    return text.split('<br>').filter((paragraph) => paragraph.trim() !== '')
  }

  const processedText = processText(description)
  const paragraphs = splitIntoParagraphs(processedText)

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <SanitizedHTML key={index} html={`<p class="mb-4">${paragraph}</p>`} />
      ))}
    </div>
  )
}

export const isHtml = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text)
