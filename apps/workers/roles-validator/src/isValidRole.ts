// import puppeteer from "puppeteer";

import { isValidRoleOnSite } from './isValidRoleOnSite'
import { launchBrowserAndNavigateToPage } from './launchBrowserAndNavigateTo'
import { setViewport } from './setViewport'

export const isValidRole = async (url: string, role: string) => {
  const { page, browser } = await launchBrowserAndNavigateToPage(url)
  // Set screen size
  setViewport(page)

  // Locate the full title with a unique string
  const isValidRole = await isValidRoleOnSite(page, role)

  // Print the full title

  await browser.close()
  return isValidRole
}
