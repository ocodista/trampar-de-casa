import dotenv from 'dotenv'
dotenv.config()

export const REMOTAR_CONFIG = {
  baseUrl: 'https://remotar.com.br',
  loginUrl: 'https://remotar.com.br/sign/in?redirect=https://remotar.com.br/',
  rolesUrl: 'https://remotar.com.br/search/jobs?q=&s=1',
  loginAcc: process.env['REMOTAR_LOGIN'],
  passwordAcc: process.env['REMOTAR_PASSWORD'],
  database: './roles.json',
}

export const IMPULSO_CONFIG = {
  rolesUrl: 'https://impulso.team/pt/profissionais/oportunidades',
  database: './impulso/roles.json',
}

export const STRIDER_CONFIG = {
    login: process.env['STRIDER_LOGIN'],
    password: process.env['STRIDER_PASSWORD'],
    loginURl: 'https://app.onstrider.com/login',
    baseUrl: 'https://app.onstrider.com/',
    jobBoard: 'https://app.onstrider.com/job-board',
    notionBoard: process.env['STRIDER_URL']

}

export const REMOTIVE_CONFIG = {
  rolesUrl: 'https://remotive.com/remote-jobs/software-dev?locations=Brazil',
  database: './remotive/roles.json',
}

export const DYNAMITE_CONFIG = {
  rolesUrl: 'https://dynamitejobs.com/remote-jobs/development',
  database: './dynamite/roles.json',
}
