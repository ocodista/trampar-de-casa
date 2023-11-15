import puppeteer from 'puppeteer'

export const launchBrowserAndNavigateToPage = async (url: string) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu', '--headless'],
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url)
  return { page, browser }
}
