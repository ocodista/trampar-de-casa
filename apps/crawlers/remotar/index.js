import puppeteer from "puppeteer"
import fs from 'fs'
import { REMOTAR_CONFIG } from "../shared/config.js"
import { programmingLangsAndTechnologies } from "../shared/programmingLangs.js"
import { normalizeJobLangTagName, normalizeJobLevelTagName } from "./utils/normalizeJobLevelTagName.js"

let data = fs.readFileSync(REMOTAR_CONFIG.database,{ encoding: 'utf8', flag: 'r' })
data = JSON.parse(data)
const responsesHandleded = []
const pagesToSearch = 10

void async function() {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()

    page.on('response', responseInterceptionHandler)

    await page.goto(REMOTAR_CONFIG.loginUrl)

    await page.type('input[type="text"][name="email"]', REMOTAR_CONFIG.loginAcc)
    await page.type('input[type="password"][name="password"]', REMOTAR_CONFIG.passwordAcc)

    await page.click('button.button-primary[type="submit"]')

    await page.goto(REMOTAR_CONFIG.rolesUrl)

    for(let i = 1; i <= pagesToSearch; i++) {
        await page.goto(`${REMOTAR_CONFIG.rolesUrl}&p=${i}`)
        await new Promise(resolve => setTimeout(resolve, 2000))
    
    }
    
    fs.writeFileSync(REMOTAR_CONFIG.database, JSON.stringify(data))
    console.log(`${data.length} roles saved in ${REMOTAR_CONFIG.database}`)

    await new Promise(resolve => setTimeout(resolve, 2000))
    await browser.close()

}()

const responseInterceptionHandler = async(response) => {
    try {
        const request = response.request()

        if (request.url().includes('jobs?search=') && !responsesHandleded.includes(request.url())) {
    
            responsesHandleded.push(request.url())
    
            const responseData = await response.text()
            const responseDataJson = JSON.parse(responseData)
    
            for(let i = 0; i < responseDataJson.data.length; i++) {
                const currentRole = responseDataJson.data[i]
    
                getRoleFromJobPage(currentRole)
            }
    
        } 
    } catch(err) {
        console.error(err)
    }
    
}  

const getRoleFromJobPage = (role) => {
    
    if(!role.isExternalLink || data.map(el => el.url).includes(role.externalLink) || role?.externalLink?.includes('gupy')) return 

    const { 
        title, 
        description,
        externalLink, 
        company,
        jobSalary,
        jobTags
    } = role

    if(jobSalary.currency.includes('USD') || company.name.includes('Turing')) return

    const jobLevel = jobTags.find(el => 
        ['Sênior', 'Pleno', 'Júnior', 'Estágio', 'PCD'].includes(normalizeJobLevelTagName(el.tag.name))
    )?.tag.name
    const language = jobTags.find(el => ['Inglês'].includes(normalizeJobLangTagName(el.tag.name)))?.tag.name ?? 'Português'
    const skills = []

    programmingLangsAndTechnologies.forEach(el => {
        if(description.toLowerCase().includes(el.toLowerCase())) skills.push(el)
    })

    const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: jobSalary.currency})

    const roleFormatted = {
        url: externalLink,
        company: company.name,
        title,
        description,
        currency: jobSalary.currency,
        salary: `from ${currencyFormatter.format(jobSalary.from.toString().slice(0, -2))} to ${currencyFormatter.format(jobSalary.to.toString().slice(0, -2))} ${jobSalary.currency}/${jobSalary.type}`,
        headerInfo: normalizeJobLevelTagName(jobLevel),
        language: normalizeJobLangTagName(language),
        skills
    }

    data.push(roleFormatted)
}
 