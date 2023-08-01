// import puppeteer from "puppeteer";

import { isValidRoleOnSite } from './isValidRoleOnSite'
import { launchBrowserAndNavigateToPage } from './launchBrowserAndNavigateTo'
import { setViewport } from './setViewport'

export const isValidRole = async (url: string, role: string) => {
  const { page, browser } = await launchBrowserAndNavigateToPage(url)
  await setViewport(page)

  const isValidRole = await isValidRoleOnSite(page, role)

  console.log('closing browser...')
  await browser.close()
  return isValidRole
}
