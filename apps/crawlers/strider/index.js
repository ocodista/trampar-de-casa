import puppeteer from 'puppeteer'
import { STRIDER_CONFIG } from '../shared/config.js'
import { RoleBuilder } from '../shared/role.model.js'


const SELECTORS = {
  emailInput: '#text-field-identifier',
  form: 'form button',
  closePopupButton: 'header > button',
  notionCellLinks: 'div.notion-record-icon + a',
  salary: 'div.whenContentEditable > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > div > div > div > span',
  applicationUrl: 'div[role="row"] a',
  jobTitle: 'h1',
  seniority: '.key-information__group:first-child span',
  skillItem: '.required-skills__tag'
}

const salaryTranslate = (input) => {
  const [, value, interval] = input.replace(' / ', ' ').split(' ')
  if(interval === 'month') {
    return `(até $${value[0]},000)`
  }
  return`($${value},00/hora)`
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
  for(const url of notionUrl) {
    try {
      await page.goto(url)
      await new Promise(resolve => setTimeout(resolve, 400))
  
      const applicationElement = await page.$(SELECTORS.applicationUrl)
      const applicationUrl = await applicationElement.evaluate(e => e.href)
      const salaryElement = await page.$(SELECTORS.salary)
      const salary = await salaryElement.evaluate(e => e.textContent)
  
      await page.goto(applicationUrl)
      await new Promise(resolve => setTimeout(resolve, 400))
  
      const titleElement = await page.$(SELECTORS.jobTitle)
      const title = await titleElement
        .evaluate(e => e.textContent)
      const sanitizedTitle = title.split(' - ')[0]
  
      const seniorityElement = await page.$(SELECTORS.seniority)
      const seniority = await seniorityElement.evaluate(e => e.textContent)
      const headerInfo = `Mínimo ${seniority[0]} anos de XP`
  
      const skillsElements = await page.$$(SELECTORS.skillItem)
      const skills = []
      for(const skillElement of skillsElements){
        skills.push(await skillElement.evaluate(e => e.textContent))
      }

      await page.goto(STRIDER_CONFIG.baseUrl)
      await new Promise(resolve => setTimeout(resolve, 1000))
      await page.click('[role="alertdialog"] button')
      await page.click('#radix-0')
      await page.click('#radix-5 > div')
      await page.type('[role="dialog"] input', applicationUrl.replace('https://www.onstrider.com/jobs/', ''))

      const errorLabelElement = await page.$('[role="dialog"] input + div')
      const errorLabelContent = await errorLabelElement.evaluate(e => e.textContent)
      const hasErrorLabel = errorLabelContent.length > 1
      const referrerLinkElement = await page.$('form > *:nth-child(3)')
      const referrerLink = await referrerLinkElement.evaluate(e => e.textContent)

      const role = new RoleBuilder()
        .withCompany('Strider')
        .withCurrency('USD')
        .withLanguage('English')
        .withUrl(hasErrorLabel ? applicationUrl : referrerLink)
        .withTitle(sanitizedTitle)
        .withHeaderInfo(headerInfo + " " + salaryTranslate(salary))
        .withSalary(salary)
        .withSkills(skills)
        .build()
  
      console.log(role)
    } catch (erro) {
      console.log(erro, url)
    }
  } 
  
  await page.close()
  await browser.close()
}()