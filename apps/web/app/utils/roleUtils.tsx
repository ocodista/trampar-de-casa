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
  if (!description) return []

  const insertLineBreaks = (text: string, maxLength: number) => {
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
}

export const isHtml = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text)
