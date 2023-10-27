import fs from 'fs'
import puppeteer from 'puppeteer'
import { IMPULSO_CONFIG } from '../shared/config.js'
import { RoleBuilder } from '../shared/role.model.js'

const rolesUrl = []
const openings = []
const getSkillsOnPage = async (page) => {
  const pillElements = await page.$$('[class^="pills__PillGroup"] > div')
  const skills = []
  for (const pill of pillElements) {
    skills.push(await pill?.evaluate((e) => e.textContent))
  }
  return skills
}
const getTitleOnPage = async (page) => {
  const titleElement = await page.$('h3')
  const titleContent = await titleElement.evaluate((e) => e.textContent)

  return titleContent
}
const getSalaryOnPage = async (page) => {
  const sidebarElement = await page.$("div[class^='styles__SidebarWrapper']")
  const hasTurbinadoText = await sidebarElement.evaluate((e) =>
    e.innerHTML.includes('Turbinado')
  )

  const thirdSidebarElementQuery =
    "div[class^='styles__SidebarWrapper'] > div:nth-child(1) > div > div:nth-child(3) > p"
  const fourSidebarElementQuery =
    "div[class^='styles__SidebarWrapper'] > div:nth-child(1) > div > div:nth-child(4) > p"

  const salaryElement = await page.$(
    hasTurbinadoText ? fourSidebarElementQuery : thirdSidebarElementQuery
  )
  const salary = await salaryElement.evaluate((e) => e.textContent)

  return salary
}

const sanitizeSalary = (salary) =>
  salary
    .replaceAll(' ', '')
    .replaceAll('R$ ', 'R$')
    .replaceAll('.', ',')
    .replaceAll('-', ' até ')

void (async function () {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(IMPULSO_CONFIG.rolesUrl)

  const roles = await page.$$('[data-opp]')

  for (const role of roles) {
    const urlElement = await role.$(
      'div:nth-child(1) > div:nth-child(4) > div > a'
    )

    rolesUrl.push(await urlElement.evaluate((e) => e.href))
  }

  for (const url of rolesUrl) {
    await page.goto(url)
    await new Promise((r) => setTimeout(r, 400))

    const skills = await getSkillsOnPage(page)
    const titleContent = await getTitleOnPage(page)
    const salary = await getSalaryOnPage(page)

    const opening = new RoleBuilder()
      .withCompany('Impulso')
      .withUrl(url)
      .withTitle(titleContent)
      .withCurrency('BRL')
      .withSalary(salary)
      .withHeaderInfo(sanitizeSalary(salary))
      .withLanguage('Portuguese')
      .withSkills(skills)
      .build()

    openings.push(opening)
  }
  await page.close()

  fs.writeFileSync(IMPULSO_CONFIG.database, JSON.stringify(openings, null, 2))
  console.log(`${roles.length} roles saved in ${IMPULSO_CONFIG.database}`)

  await browser.close()
})()
