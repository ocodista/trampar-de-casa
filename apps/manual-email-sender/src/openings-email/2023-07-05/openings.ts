import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'
import { striderOpening } from 'shared/src/email/openings-email/striderOpening'

const localJrOpenings: Opening[] = [
  {
    url: 'https://www.klutch.com.br/vagas/desenvolvedor-react-junior',
    company: 'Klutch Tecnologia',
    title: 'Desenvolvedor(a) React Front-End',
    currency: 'BRL',
    headerInfo: 'Júnior',
    language: 'Inglês',
    skills: ['HTML', 'CSS', 'React'],
    location: 'Brasil',
  },
  {
    url: 'https://www.klutch.com.br/vagas/desenvolvedor-react-full-stack-junior',
    company: 'Klutch Tecnologia',
    title: 'Desenvolvedor (a) React Full Stack',
    currency: 'BRL',
    headerInfo: 'Júnior',
    location: 'Brasil',
    language: 'Português',
    skills: ['React Native', 'React', 'JavaScript', 'CSS'],
  },
  {
    url: 'https://letrus.breezy.hr/p/e1295033cc93-pessoa-desenvolvedora-back-end-junior-i-vaga-afirmativa-para-mulheres',
    company: 'Letrus',
    title:
      'Pessoa Desenvolvedora Back End - Júnior I Vaga afirmativa para Mulheres',
    currency: 'BRL',
    headerInfo: 'Júnior',
    language: 'Português',
    skills: ['Python', 'Django', 'Flask'],
    location: 'Brasil',
  },
  {
    url: 'https://contabilizeicarreiratech.gupy.io/job/eyJzb3VyY2UiOiJndXB5X3B1YmxpY19wYWdlIiwiam9iSWQiOjQ5ODg5NzZ9',
    title: 'Desenvolvedor (a) Back-end Java Junior',
    company: 'Contabilizei',
    currency: 'BRL',
    language: 'Português',
    location: 'Brasil',
    headerInfo: 'Vaga também para PcD',
    skills: ['Kotlin', 'DevOps', 'Testes', 'Cloud'],
  },
  {
    url: 'https://www.turing.com/pt/remote-developer-jobs/j/desenvolvedor-ruby-on-rails-junior-81396',
    company: 'Turing.com',
    title: 'Desenvolvedor Ruby on Rails Junior',
    currency: 'BRL',
    headerInfo: 'Mínimo 1 ano de XP',
    language: 'Português',
    skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'Ruby', 'Ruby on Rails'],
    location: 'Brasil',
  },
]

const localXPOpenings: Opening[] = [
  {
    url: 'https://impulso.team/pt/profissionais/oportunidade/1874',
    title: 'Pleno Angular',
    company: 'Impulso',
    location: 'Brasil',
    currency: 'BRL',
    headerInfo: 'R$ 9.840 - R$ 10.560',
    language: 'Português',
    skills: ['Angular 13', 'TypeScript', 'Clean Code', 'Testes Unitários'],
  },
  {
    url: 'https://impulso.team/pt/profissionais/oportunidade/1866',
    company: 'Impulso',
    title: 'Pleno/Sênior Angular | C# .Net',
    location: 'Brasil',
    currency: 'BRL',
    headerInfo: 'R$ 11.000 - R$ 12.000',
    language: 'Português',
    skills: ['Angular', 'C#', 'Azure', 'RabbitMQ'],
  },
  {
    url: 'https://impulso.team/pt/profissionais/oportunidade/1875',
    company: 'Impulso',
    title: 'Tech Lead C# | .NET | Angular',
    location: 'Brasil',
    currency: 'BRL',
    headerInfo: 'R$ 16.160 - R$ 16.800',
    language: 'Português',
    skills: ['Angular', '.NET Core', 'TypeScript', 'RabbitMQ'],
  },
  {
    url: 'https://br.indeed.com/viewjob?cmp=Innolevels&t=Desenvolvedor+Back-end&jk=1485fd89c93a016e&vjs=3',
    title: 'Desenvolvedor Back-end .NET Core',
    company: 'Innolevels',
    location: 'Rio de Janeiro',
    currency: 'BRL',
    headerInfo: 'R$ 6.000 - R$ 9.000',
    language: 'Português',
    skills: ['.NET', 'ASP.NET', 'Entity Framework', 'HTML5'],
  },
  {
    url: 'https://www.careerjet.com.br/jobad/brca8c7757ec3f332919a461fc6fbc3bc1',
    title: 'Desenvolvedor DevOps Java/Angular Pleno',
    company: 'Capgemini',
    location: 'Bahia',
    currency: 'BRL',
    headerInfo: 'CLT',
    language: 'Português',
    skills: ['Docker', 'Kubernetes', 'Quarkus', 'CI/CD'],
  },
  {
    url: 'https://www.careerjet.com.br/jobad/br02f21d3c39df79bfa89ab0ed50884f62',
    title: 'Analista de Dados Pleno',
    company: 'DISYS',
    location: 'Paraná',
    headerInfo: 'CLT',
    language: 'Português',
    skills: ['GCP', 'Tableau', 'Planilhas Google'],
    currency: 'BRL',
  },
  {
    url: 'https://www.linkedin.com/jobs/view/dev-android-pleno-at-mtm-tecnologia-3654605465/',
    title: 'Dev Android Pleno',
    company: 'MTM',
    location: 'Brasil',
    headerInfo: 'Pleno',
    language: 'Português',
    currency: 'BRL',
    skills: ['Kotlin', 'Java', 'Retrofit', 'Firebase'],
  },
  {
    url: 'https://contabilizeicarreiratech.gupy.io/job/eyJzb3VyY2UiOiJndXB5X3B1YmxpY19wYWdlIiwiam9iSWQiOjUwNTAxMzB9',
    title: 'Tech Lead Segurança da Informação',
    company: 'Contabilizei',
    location: 'Brasil',
    currency: 'BRL',
    language: 'Português',
    skills: ['Autenticação', 'Autorização', 'Criptografia', 'Cloud'],
  },
]

const striderOpenings: Opening[] = [
  striderOpening(
    'Product Designer',
    3,
    'https://app.onstrider.com/r/trampar_de_casa?job=cHJvZHVjdC1kZXNpZ25lci1kN2VkMmJhOT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
    ['UI', 'UX']
  ),
  striderOpening(
    'Mid-level Scraping Engineer',
    3,
    'https://app.onstrider.com/r/trampar_de_casa?job=bWlkLWxldmVsLXNjcmFwaW5nLWVuZ2luZWVyLXB5dGhvbi03NjhiOTdhYz9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
    ['Python', 'Playwright', 'HTML']
  ),
  striderOpening(
    'Senior Back-end Engineer - Node.js, TypeScript',
    4,
    'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWJhY2stZW5kLWVuZ2luZWVyLW5vZGVqcy10eXBlc2NyaXB0LWZjNzc5MmRiP3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
    ['Node.js', 'TypeScript', 'Azure', 'Redis', 'Azure']
  ),
  striderOpening(
    'Senior Mobile Engineer',
    4,
    'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLXJlYWN0LW5hdGl2ZS1lbmdpbmVlci1jOWFlMzc3MT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
    ['React Native', 'Node.js', 'Firebase', 'MongoDB']
  ),
  striderOpening(
    'Database Administrator - MSSQL / Azure SQL',
    4,
    'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRiYS1tc3NxbC04NjM3MThkMz9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
    ['Microsoft SQL Server', 'ETL', 'Data Analytics']
  ),
  striderOpening(
    'Senior Full-stack Engineer - Django, React.js',
    5,
    'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWZ1bGwtc3RhY2stZW5naW5lZXItZGphbmdvLXJlYWN0LmpzLTBhOTc2MjU0MmEwMj9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
    ['Django', 'React.js']
  ),
  striderOpening(
    'Senior Full-stack Engineer - Spring, React.js',
    5,
    'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWZ1bGwtc3RhY2stZW5naW5lZXItc3ByaW5nLXJlYWN0anMtYTFiZmFjNjY/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
    ['Java', 'Spring', 'React.js']
  ),
  striderOpening(
    'Senior Machine Learning Engineer',
    5,
    'https://app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLW1hY2hpbmUtbGVhcm5pbmctZW5naW5lZXItZTUzMDIyZDc/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
    ['Python', 'Machine Learning']
  ),
]

const globalJrOpenings: Opening[] = [
  {
    url: 'https://www.turing.com/remote-developer-jobs/j/junior-ruby-on-rails-developer-81396',
    company: 'Turing.com',
    title: 'Junior Ruby on Rails Developer',
    location: 'Estados Unidos',
    currency: 'USD',
    headerInfo: 'Mínimo 1 ano de XP',
    language: 'Inglês',
    skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'Ruby', 'Ruby on Rails'],
  },
  {
    url: 'https://www.turing.com/remote-developer-jobs/j/jr-ml-engineer-22599',
    company: 'Turing.com',
    title: 'Jr. ML Engineer - 1',
    currency: 'USD',
    headerInfo: 'Mínimo 2 anos de XP',
    language: 'Inglês',
    skills: ['Python'],
    location: 'Estados Unidos',
  },
  {
    url: 'https://www.turing.com/remote-developer-jobs/j/fullstack-frontend-heavy-31185',
    company: 'Turing.com',
    title: 'FullStack (Frontend-heavy)',
    currency: 'USD',
    headerInfo: 'Mínimo 2 anos de XP',
    language: 'Inglês',
    skills: ['CSS', 'Node', 'TypeScript', 'React'],
    location: 'Estados Unidos',
  },
  {
    url: 'https://www.turing.com/pt/remote-developer-jobs/j/desenvolvedor-web-front-end-junior-108189',
    company: 'Turing.com',
    title: 'Desenvolvedor Web Front-end Júnior',
    currency: 'USD',
    headerInfo: 'Mínimo 3 anos de XP',
    language: 'Inglês',
    skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'React'],
    location: 'Estados Unidos',
  },
  {
    url: 'https://www.turing.com/remote-developer-jobs/j/junior-full-stack-engineer-35613',
    company: 'Turing.com',
    title: 'Junior Full-Stack Engineer',
    currency: 'USD',
    headerInfo: 'Mínimo 3 anos de XP',
    language: 'Português',
    skills: ['JavaScript', 'Python', 'Java', 'Angular'],
    location: 'Estados Unidos',
  },
  {
    url: 'https://www.turing.com/remote-developer-jobs/j/junior-python-developer-54540',
    company: 'Turing.com',
    title: 'Junior Python Developer',
    currency: 'BRL',
    headerInfo: 'Mínimo 3 anos de XP',
    location: 'Estados Unidos',
    language: 'Inglês',
    skills: ['Python', 'React'],
  },
]

const globalExperiencedOpenings: Opening[] = [
  {
    url: 'https://wellfound.com/l/2z4dFx',
    title: 'UI/UX Designer',
    headerInfo: 'Mínimo 3 anos de XP',
    company: 'EoT Labs',
    skills: ['UI/UX Design', 'Web Applications', 'Sketch', 'Figma'],
    currency: 'USD',
    location: 'Berlim, Alemanha',
    language: 'Inglês',
  },
  {
    url: 'https://wellfound.com/l/2yKcjs',
    title: 'Senior Machine Learning Engineer',
    company: 'WalletHub',
    headerInfo: 'Mínimo 4 anos de XP',
    currency: 'USD',
    location: 'Estados Unidos',
    language: 'Inglês',
    skills: ['Python', 'MySQL', 'Machine Learning', 'AWS'],
  },
  {
    url: 'https://onecontact.com.mk/job/detail/senior-product-desinger/',
    company: 'OneContact Tech',
    title: 'Senior Product Designer',
    currency: 'USD',
    headerInfo: 'Mínimo 5 anos de XP',
    language: 'Inglês',
    skills: ['Figma', 'UX', 'Prototypes', 'IOS'],
    location: 'Estados Unidos',
  },
  {
    url: 'https://wellfound.com/l/2z4gPq',
    company: 'Bitfinex',
    currency: 'USD',
    title: 'Senior Backend Developer - Node',
    headerInfo: 'Mínimo 5 anos de XP',
    location: 'Hong Kong',
    language: 'Inglês',
    skills: ['Node', 'JavaScript', 'Microsserviços', 'MySQL/MongoDB'],
  },
]

export const openings20230705: Openings = {
  globalOpenings: [
    ...striderOpenings,
    ...globalJrOpenings,
    ...globalExperiencedOpenings,
  ],
  localOpenings: [...localJrOpenings, ...localXPOpenings],
}
