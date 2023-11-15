import puppeteer from 'puppeteer'

export const launchBrowserAndNavigateToPage = async (url: string) => {
  console.time(`launchBrowserAndNavigateToPage#${url}`)
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu', '--headless'],
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url)
  console.timeEnd(`launchBrowserAndNavigateToPage#${url}`)
  return { page, browser }
}
