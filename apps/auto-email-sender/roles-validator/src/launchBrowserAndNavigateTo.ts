import puppeteer from 'puppeteer'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
export const launchBrowserAndNavigateToPage = async (url: string) => {
  console.time(`launchBrowserAndNavigateToPage#${url}`)
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu', '--headless'],
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url)
  await sleep(6_000)

  console.timeEnd(`launchBrowserAndNavigateToPage#${url}`)
  return { page, browser }
}
