import { Page } from 'puppeteer'

export const searchRoleOnPageContent = async (page: Page, role: string) => {
  console.time(`searchRoleOnPageContent#${role}`)
  const html = await page.content()
  console.timeEnd(`searchRoleOnPageContent#${role}`)
  return Boolean(html.includes(role))
}
