import puppeteer from 'puppeteer'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
export const launchBrowserAndNavigateToPage = async (url: string) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu'],
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url)
  await sleep(6_000)

  return { page, browser }
}
