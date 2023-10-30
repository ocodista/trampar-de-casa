import fs from 'node:fs'
import puppeteer from 'puppeteer'
import { STRIDER_CONFIG } from '../shared/config.js'
import { notionJobPage } from './notionJobPage.js'

export const SELECTORS = {
  emailInput: '#text-field-identifier',
  form: 'form button',
  closePopupButton: 'header > button',
  notionCellLinks: 'div.notion-record-icon + a',
  salary:
    'div.whenContentEditable > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > div > div > div > span',
  applicationUrl: 'div[role="row"] a',
  jobTitle: 'h1',
  seniority: '.key-information__group:first-child span',
  skillItem: '.required-skills__tag',
}

const makeLogin = async (page) => {
  await page.goto(STRIDER_CONFIG.loginURl)
  await new Promise((resolve) => setTimeout(resolve, 400))

  const emailInput = await page.$('#text-field-identifier')
  await emailInput.type(STRIDER_CONFIG.login)

  await page.click(SELECTORS.form)
  await page.waitForNavigation()

  await emailInput.type(STRIDER_CONFIG.password)

  await page.click(SELECTORS.form)
  await page.waitForNavigation()
}
const getNotionUrls = async (page) => {
  const notionUrl = []
  await page.goto(STRIDER_CONFIG.notionBoard)
  await new Promise((resolve) => setTimeout(resolve, 1000))


  const cells = await page.$$(SELECTORS.notionCellLinks)
  for (const cell of cells) {
    const hrefContent = await cell.evaluate((e) => e.href)

    notionUrl.push(hrefContent)
  }

  return notionUrl
}
const openings = []
void (async function () {
  console.time('entrypoint')
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  
  await makeLogin(page)

  const notionUrls = await getNotionUrls(page)

  for (const url of notionUrls) {
    try {
      const role = await notionJobPage(page, url)
      openings.push(role)
    } catch (erro) {
      console.log(erro, url)
    }
  }

  await page.close()
  await browser.close()
  
  fs.writeFileSync(STRIDER_CONFIG.database, JSON.stringify(openings, null, 2))
  console.timeEnd('entrypoint')
})()
