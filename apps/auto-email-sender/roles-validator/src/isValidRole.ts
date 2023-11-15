import { launchBrowserAndNavigateToPage } from './launchBrowserAndNavigateTo'
import { searchRoleOnPageContent } from './searchRoleOnPageContent'
import { setViewport } from './setViewport'

export const isValidRole = async (url: string, role: string) => {
  const sanitizedRole = url.startsWith('https://') ? url : `https://${url}`
  const { page, browser } = await launchBrowserAndNavigateToPage(sanitizedRole)
  await setViewport(page)

  const isValidRole = await searchRoleOnPageContent(page, role)

  await browser.close()
  return isValidRole
}
