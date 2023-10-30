import { STRIDER_CONFIG } from '../shared/config.js'
import { SELECTORS } from './index.js'

const getJobReferralLink = async (page, applicationUrl) => {
  await page.goto(STRIDER_CONFIG.baseUrl)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await page.click('[role="alertdialog"] button')
  await page.click('#radix-0')
  await page.click('#radix-5 > div')
  await page.type(
    '[role="dialog"] input',
    applicationUrl.replace('https://www.onstrider.com/jobs/', '')
  )

  const errorLabelElement = await page.$('[role="dialog"] input + div')
  const errorLabelContent = await errorLabelElement.evaluate(
    (e) => e.textContent
  )
  const hasErrorLabel = errorLabelContent.length > 1
  const referrerLinkElement = await page.$('form > *:nth-child(3)')
  const referrerLink = await referrerLinkElement.evaluate((e) => e.textContent)

  return hasErrorLabel ? applicationUrl : `https://${referrerLink}`
}
const getSkills = async (page) => {
  const skillsElements = await page.$$(SELECTORS.skillItem)
  const skills = []
  for (const skillElement of skillsElements) {
    skills.push(await skillElement.evaluate((e) => e.textContent))
  }

  return skills
}
const generateHeaderInfo = async (page) => {
  const seniorityElement = await page.$(SELECTORS.seniority)
  const seniority = await seniorityElement.evaluate((e) => e.textContent)
  const headerInfo = `Mínimo ${seniority[0]} anos de XP`

  return headerInfo
}
export const striderJobPage = async (page, applicationUrl) => {
  await page.goto(applicationUrl)
  await new Promise((r) => setTimeout(r, 400))
  const availabilityElement = await page.$(SELECTORS.jobAvailability)
  const availabilityContent = await availabilityElement.evaluate(
    (e) => e.textContent
  )
  if (availabilityContent.match(/Closed/) !== null) {
    console.log(`This opening is unavailable: ${applicationUrl}`)
    return
  }
  const titleElement = await page.$(SELECTORS.jobTitle)
  const title = await titleElement.evaluate((e) => e.textContent)
  const sanitizedTitle = title.split(' - ')[0]
  const headerInfo = await generateHeaderInfo(page)

  const skills = await getSkills(page)
  const jobLink = await getJobReferralLink(page, applicationUrl)

  return { sanitizedTitle, headerInfo, jobLink, skills }
}
