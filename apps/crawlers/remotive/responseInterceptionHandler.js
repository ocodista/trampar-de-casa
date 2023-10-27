import { RoleBuilder } from "../shared/role.model.js"

export const responseInterceptionHandler = async(response, roles) => {
    try {
        const request = response.request()

        if(!request.url().includes('oqubrx6zeq')) return 

        const responseData = await response.text()
        const responseDataJson = JSON.parse(responseData)
        getRolesFromData(responseDataJson.results[0].hits, roles)
    } catch(err) {
        console.error(err)
    }
}

const getRolesFromData = (data, roles) => {
    for(let role of data) {
        const { title, url, company_name, salary, job_type, tags } = role

        const roleFormatted = new RoleBuilder()
        .withCompany(company_name)
        .withTitle(title)
        .withUrl(url)
        .withSalary(salary)
        .withSkills(tags)
        .withDescription(`Job type: ${job_type}`)
        .withCurrency('USD')
        .withHeaderInfo(`Job type: ${job_type}`)
        .withLanguage('English')
        .build()

        roles.push(roleFormatted)
    }
}