import { RoleBuilder } from "../shared/role.model.js"

export const responseInterceptionHandler = (roles) => async (response) => {
    try {
        const request = response.request()

        if(!request.url().includes('algolia.net')) return 

        const responseData = await response.text()
        const responseDataJson = JSON.parse(responseData)

        getRolesFromData(responseDataJson.hits, roles)
    } catch(err) {
        console.error(err)
    }
}

const getRolesFromData = (data, roles) => {
    for(let role of data) {
        const { applyLink, company, title, salary, description, type, skillSlugs } = role

        if(!applyLink) continue

        const roleFormatted = new RoleBuilder()
        .withCompany(company.name)
        .withTitle(title)
        .withUrl(applyLink.replace(/dynamitejobs/g,''))
        .withSalary(`From ${salary.from} to ${salary.to} ${salary.currency}/${salary.type} `)
        .withSkills(skillSlugs)
        .withDescription(description)
        .withCurrency(salary.currency)
        .withHeaderInfo(type.name.display)
        .withLanguage('English')
        .build()

        roles.push(roleFormatted)
    }
}