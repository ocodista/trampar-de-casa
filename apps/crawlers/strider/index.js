import puppeteer from 'puppeteer'
import { STRIDER_CONFIG } from '../shared/config.js'


const SELECTORS = {
  emailInput: '#text-field-identifier',
  form: 'form button',
  closePopupButton: 'header > button',
  notionCellLinks: 'div.notion-record-icon + a'
}

const notionUrl = []

void async function() {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  await page.goto(STRIDER_CONFIG.loginURl)
  await new Promise(resolve => setTimeout(resolve, 400))

  const emailInput = await page.$('#text-field-identifier')
  await emailInput.type(STRIDER_CONFIG.login)
  
  await page.click(SELECTORS.form)
  await page.waitForNavigation()

  await emailInput.type(STRIDER_CONFIG.password)
  
  await page.click(SELECTORS.form)
  await page.waitForNavigation()

  // after login
  await page.goto(STRIDER_CONFIG.notionBoard)
  await new Promise(resolve => setTimeout(resolve, 1000))

  const cells = await page.$$('div.notion-record-icon + a')
  for (const cell of cells) {
    const hrefContent = await cell.evaluate(e => e.href)

    notionUrl.push(hrefContent)
  }
  console.log(notionUrl)

  await page.close()
  await browser.close()
}()