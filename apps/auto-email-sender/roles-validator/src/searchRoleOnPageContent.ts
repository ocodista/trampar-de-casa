import { Page } from 'puppeteer'

export const searchRoleOnPageContent = async (page: Page, role: string) => {
  const html = await page.content()
  return Boolean(html.includes(role))
}
