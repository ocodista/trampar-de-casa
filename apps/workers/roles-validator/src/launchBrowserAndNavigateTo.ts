import puppeteer from 'puppeteer'

export const launchBrowserAndNavigateToPage = async (url: string) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--headless', '--disable-gpu'],
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitForNavigation()

  return { page, browser }
}
