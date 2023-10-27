import fs from 'fs'
import puppeteer from "puppeteer"
import { REMOTIVE_CONFIG } from "../shared/config.js"
import { responseInterceptionHandler } from "./responseInterceptionHandler.js"

const roles = []

void async function() {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()

    page.on('response', (res) => responseInterceptionHandler(res, roles))

    await page.goto(REMOTIVE_CONFIG.rolesUrl)

    for(let i = 0; i < roles.length; i++) {
        const role = roles[i]
        await page.goto(role.url)
        await page.click('a[job-source="job_detail_page"]')
        
        try {
            await page.waitForSelector('div.tw-flex section div.left p:first-child')
            const description = await page.$eval('div.tw-flex section div.left p:first-child', el => el.innerText)
            roles[i].description = description
        } catch(err) {}

        // Wait for the new tab to open
        const newTarget = await browser.waitForTarget((target) => target.opener() === page.target());
        
        // Get the URL of the new tab
        const newTabUrl = newTarget.url();
        roles[i].url = newTabUrl
        
        const newPage = await newTarget.page()
        await newPage.close()
    }

    fs.writeFileSync(REMOTIVE_CONFIG.database, JSON.stringify(roles))
    console.log(`${roles.length} roles saved in ${REMOTIVE_CONFIG.database}`)

    await browser.close()
}()