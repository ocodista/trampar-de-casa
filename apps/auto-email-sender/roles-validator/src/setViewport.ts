import { Page } from 'puppeteer'

export const setViewport = async (page: Page) => {
  await page.setViewport({ width: 1080, height: 1024 })
}
