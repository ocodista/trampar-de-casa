export const shouldRedirectToUrl = (description: string) => {
  if (!description) return true
  const wordCount = description.trim().split(/\s+/).length
  return wordCount >= 10
}
