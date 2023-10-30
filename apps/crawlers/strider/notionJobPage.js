import { RoleBuilder } from '../shared/role.model.js'
import { SELECTORS } from './index.js'
import { striderJobPage } from './striderJobPage.js'

const formatSalaryToHeaderInfo = (input) => {
  const [, value, interval] = input.replace(' / ', ' ').split(' ')
  if (interval === 'month') {
    return `(até $${value[0]},000)`
  }
  return `($${value},00/hora)`
}

const accessNotionJobPage = async (page, url) => {
  await page.goto(url)
  await new Promise((resolve) => setTimeout(resolve, 400))
}
const getInfosOnNotionJobPage = async (page) => {
  const applicationElement = await page.$(SELECTORS.applicationUrl)
  const applicationUrl = await applicationElement.evaluate((e) => e.href)
  const salaryElement = await page.$(SELECTORS.salary)
  const salary = await salaryElement.evaluate((e) => e.textContent)
  return { salary, applicationUrl }
}

const formatHeaderInfo = (headerInfo, salary) => {
  return `${headerInfo} ${formatSalaryToHeaderInfo(salary)}`
}

export const notionJobPage = async (page, url) => {
  console.time('notionJobPage')
  await accessNotionJobPage(page, url)
  const { applicationUrl, salary } = await getInfosOnNotionJobPage(page)
  const pageInfo = await striderJobPage(page, applicationUrl)
  if(!pageInfo) return
  const { headerInfo, jobLink, sanitizedTitle, skills } = pageInfo
  const formattedHeaderInfo = formatHeaderInfo(headerInfo, salary)

  const role = new RoleBuilder()
    .withCompany('Strider')
    .withCurrency('USD')
    .withLanguage('English')
    .withUrl(jobLink)
    .withTitle(sanitizedTitle)
    .withHeaderInfo(formattedHeaderInfo)
    .withSalary(salary)
    .withSkills(skills)
    .build()

  console.timeEnd('notionJobPage')
  return role
}
