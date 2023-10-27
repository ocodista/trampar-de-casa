export class Role {
    constructor(url, company, title, description, currency, salary, headerInfo, language, skills) {

        this.url = url;
        this.company = company;
        this.title = title;
        this.description = description;
        this.currency = currency;
        this.salary = salary;
        this.headerInfo = headerInfo;
        this.language = language;
        this.skills = skills;
    }
}

export class RoleBuilder {
    constructor() {

    }

    withUrl(url) {
        this.url = url;
        return this;
    }
    withCompany(company) {
        this.company = company;
        return this;
    }
    withTitle(title) {
        this.title = title;
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
    withCurrency(currency) {
        this.currency = currency;
        return this;
    }
    withSalary(salary) {
        this.salary = salary;
        return this;
    }
    withHeaderInfo(headerInfo) {
        this.headerInfo = headerInfo;
        return this;
    }
    withLanguage(language) {
        this.language = language;
        return this;
    }
    withSkills(skills) {
        this.skills = skills;
        return this;
    }
    build() {
        return new Role(this.url, this.company, this.title, this.description, this.currency, this.salary, this.headerInfo, this.language, this.skills);
    }
}