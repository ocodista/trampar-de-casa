import { Page } from 'puppeteer'

export const isValidRoleOnSite = async (page: Page, role: string) => {
  const textSelector = await page.waitForSelector(role)

  return Boolean(textSelector)
}
