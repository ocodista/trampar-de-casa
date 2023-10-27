import fs from 'fs'
import { DYNAMITE_CONFIG } from '../shared/config.js'
import puppeteer from 'puppeteer'
import { responseInterceptionHandler } from './responseInterceptionHandler.js'

const roles = []

void async function() {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()

    page.on('response', responseInterceptionHandler(roles))

    await page.goto(DYNAMITE_CONFIG.rolesUrl)

    await new Promise(resolve => setTimeout(resolve, 2000))

    fs.writeFileSync(DYNAMITE_CONFIG.database, JSON.stringify(roles))
    console.log(`${roles.length} roles saved in ${DYNAMITE_CONFIG.database}`)

    await browser.close()
}()