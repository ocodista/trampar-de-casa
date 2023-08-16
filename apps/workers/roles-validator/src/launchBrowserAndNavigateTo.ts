import puppeteer from 'puppeteer'

export const launchBrowserAndNavigateToPage = async (url: string) => {
  const browser = await puppeteer.launch({
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    executablePath: process.env.CHROME_BIN || undefined,
    args: ['--no-sandbox', '--headless', '--disable-gpu'],
  })
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitForNavigation()

  return { page, browser }
}
