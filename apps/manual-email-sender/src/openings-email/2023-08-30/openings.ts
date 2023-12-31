import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'

const localOpenings: Opening[] = [
  {
    company: 'Pier',
    title: 'Jr Product Manager',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: [
      'Gerenciamento',
      'Dados',
      'Comunicação',
      'Estratégia',
      'Criatividade',
    ],
    headerInfo: 'Júnior (Vaga Afirmativa para Diversidade)',
    url: 'https://jobs.lever.co/pier/0181d568-7231-4dc3-bae2-a34dbecf465a',
  },
  {
    company: 'Always Fit',
    title: 'Desenvolvedor(a) Full-Stack - Node.Js + Vue.js - Júnior',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Git', 'Node.js', 'Testes unitários', 'TypeScript', 'Vue.js'],
    headerInfo: 'Júnior (até R$2,500)',
    url: 'https://programathor.com.br/jobs/29229-desenvolvedor-a-full-stack-node-js-vue-js-junior',
  },
  {
    company: 'Adalov',
    title: 'Pessoa Desenvolvedora - PHP Júnior',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Git', 'Laravel', 'MySQL', 'PHP'],
    headerInfo: 'Júnior',
    url: 'https://programathor.com.br/jobs/29246-pessoa-desenvolvedora-php-junior',
  },
  {
    company: 'Impulso',
    title: 'Pleno QA (Quality Analyst)',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['QA', 'Testes', 'Pipelines', 'Automação'],
    headerInfo: 'Pleno (R$10,400 até R$11,200)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1928-pleno-qa-quality-analyst-',
  },
  {
    company: 'Impulso',
    title: 'Pleno Angular',
    language: 'Português',
    location: 'Brasil',
    currency: 'R$',
    skills: ['Angular', 'Typescript', 'Azure', 'CleanCode', 'Testes'],
    headerInfo: 'Pleno (R$9,600 até R$10,400)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1927-pleno-angular',
  },
  {
    company: 'Gesuas',
    title: 'Desenvolvedor(a) Front-end Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['CSS', 'Docker', 'HTML', 'JavaScript', 'Vue.js'],
    headerInfo: 'Pleno (Até R$5,000)',
    url: 'https://programathor.com.br/jobs/29263-desenvolvedor-a-front-end-pleno',
  },
  {
    company: 'Portus Digital',
    title: 'Gestor de Tráfego',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['GoogleAds', 'MetaAds', 'Funil', 'Excel'],
    headerInfo: 'Pleno (R$3,500)',
    url: 'https://zinrecbr.intervieweb.it/portusdigital/jobs/gestor-de-trafego-2528/br/',
  },
  {
    company: 'Log Manager',
    title: 'Desenvolvedor(a) Full Stack Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['CSS', 'Laravel', 'MySQL', 'PHP', 'JavaScript'],
    headerInfo: 'Pleno',
    url: 'https://programathor.com.br/jobs/29210-desenvolvedor-a-full-stack-pleno',
  },
  {
    company: 'Adalov',
    title: 'Pessoa Desenvolvedora - PHP Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Git', 'Laravel', 'MySQL', 'PHP'],
    headerInfo: 'Pleno',
    url: 'https://programathor.com.br/jobs/29247-pessoa-desenvolvedora-php-pleno',
  },
  {
    company: 'KingHost',
    title: 'UI Designer III',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Design System', 'Teste', 'A/B', 'DesignThinking'],
    headerInfo: 'Pleno',
    url: 'https://jobs.recrutei.com.br/kinghost/vacancy/46073-ui-designer-iii',
  },
  {
    company: 'Deeploy',
    title: 'UX Designer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['UX', 'Prototipação', 'Acessibilidade'],
    headerInfo: 'Pleno',
    url: 'https://www.member.deeploy.me/jobs/ux-designer-pleno-remoto-1675276588025',
  },
  {
    company: 'Pier',
    title: 'Engenheiro(a) de Software Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['RubyOnRails', 'AWS', 'Docker', 'Kubernetes'],
    headerInfo: 'Pleno',
    url: 'https://jobs.lever.co/pier/eeca37a8-6969-4cab-adcd-f8713ab88909',
  },
  {
    company: 'CI&T',
    title: 'Mid-level Java Developer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'MySQL', 'MongoDB', 'DDD', 'Solid'],
    headerInfo: 'Pleno',
    url: 'https://jobs.lever.co/ciandt/315cda1b-6dc7-42fc-8188-0fae4793cf49',
  },
  {
    company: 'Impulso',
    title: 'Pleno/Sênior Angular | C# | .NET',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Angular', 'Azure', '.NET', 'Typescript', 'CleanCode'],
    headerInfo: 'Sênior (R$12,800 até R$13,600)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1925',
  },
  {
    company: 'Inmetrics S/A',
    title: 'Pessoa Desenvolvedora Fullstack',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'JavaScript', 'Node.js', 'ReactJS', 'TDD'],
    headerInfo: 'Sênior (Até R$10,000)',
    url: 'https://programathor.com.br/jobs/29249-pessoa-desenvolvedora-fullstack-senior-react-e-node',
  },
  {
    company: 'Inmetrics S/A',
    title: 'Pessoa Desenvolvedora React Native',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Jest', 'Objective-C', 'React Native', 'Redux', 'TypeScript'],
    headerInfo: 'Sênior (Até R$10,000)',
    url: 'https://programathor.com.br/jobs/29250-pessoa-desenvolvedora-react-native-senior-home-office',
  },
  {
    company: 'Deeploy',
    title: 'Product Designer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Flexibilidade', 'Prototipagem'],
    headerInfo: 'Sênior (R$5,000 até R$7,000)',
    url: 'https://www.member.deeploy.me/jobs/product-designer-senior-remoto-1675276886874',
  },
  {
    company: 'Bukly',
    title: 'Desenvolvedor(a) PHP / Sênior',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['CakePHP', 'Git', 'MySQL', 'Laravel'],
    headerInfo: 'Sênior (até R$$7,000)',
    url: 'https://programathor.com.br/jobs/29265-desenvolvedor-a-php-senior-remoto',
  },
  {
    company: 'Deeploy',
    title: 'UX Writer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['UX'],
    headerInfo: 'Sênior (R$5,000 até R$6,200)',
    url: 'https://www.member.deeploy.me/jobs/ux-writer-senior-remoto',
  },
  {
    company: 'CI&T',
    title: 'Senior Data Engineer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Cloud', 'ETL/ELT', 'DevOps'],
    headerInfo: 'Sênior',
    url: 'https://jobs.lever.co/ciandt/bb184eee-a7d9-4040-b3d3-18384e6f1b35',
  },
]

const globalOpenings: Opening[] = [
  {
    company: 'Meteor Software',
    title: 'DevOps Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'AWS',
      'Kubernetes',
      'Terraform',
      'Observability',
      'ShellScripting',
    ],
    headerInfo: 'Pleno (até $3,500)',
    url: 'https://public.app.shortcut.com/62/meteor-software/docs/33M0mvrlVcqjX85UO74Hdl/devops-engineer',
  },
  {
    company: 'Strider',
    title: 'Mid-level Full-Stack Engineer - Angular.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Angular.js', 'OOP', 'TypeScript', 'JavaScript'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bWlkLXNlbmlvci1mdWxsLXN0YWNrLWVuZ2luZWVyLWFuZ3VsYXItcHl0aG9uLTg3NjYzOWU0P3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    company: 'Strider',
    title: 'Database Administrator - MSSQL / Azure SQL',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['SQLServer', 'ETL', 'DataAnalytics'],
    headerInfo: 'Mínimo de 4 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRiYS1tc3NxbC04NjM3MThkMz9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  },
  {
    company: 'Strider',
    title: 'Full-stack Engineer - Node.js, Vue.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Node.js', 'Vue.js'],
    headerInfo: 'Mínimo de 4 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=ZnVsbC1zdGFjay1lbmdpbmVlci1ub2RlLmpzLXZ1ZS5qcy0wOGJlYWI3MT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  },
  {
    company: 'Strider',
    title: 'Mid-Senior Full-stack Engineer - Spring Boot, React.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Java', 'SpringBoot', 'React.js'],
    headerInfo: 'Mínimo de 4 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bWlkLXNlbmlvci1mdWxsLXN0YWNrLWVuZ2luZWVyLXNwcmluZy1ib290LXJlYWN0LmpzLWIxYWJmMTM3P3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    company: 'Strider',
    title: 'Software Developer, Áudio',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['C++', 'Juce'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c29mdHdhcmUtZGV2ZWxvcGVyLWF1ZGlvLTFiOGMzM2U3P3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    company: 'Strider',
    title: 'Senior Data Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'Azure', 'GCP', 'Java', 'Scala'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRhdGEtZW5naW5lZXItNWM0YzQ2YjQ/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  },
  {
    company: 'moveBuddha.com',
    title: 'Frontend Developer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Git', 'Heroku', 'JavaScript', 'React.js', 'RubyOnRails'],
    headerInfo: 'Pleno',
    url: 'https://dynamitejobs.com/company/movebuddhacom/remote-job/frontend-developer',
  },
  {
    company: 'Moovx',
    title: 'Sr Technical BSA (Oracle)',
    location: 'Uruguai',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Oracle', 'AR', 'GL', 'AP', 'INV'],
    headerInfo: 'Sênior',
    url: 'https://boards.greenhouse.io/moovx/jobs/4006578005',
  },
  {
    company: 'Flylance',
    title: 'Sr. Full Stack Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Vue', 'React', 'Angular2', 'C#'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://www.flylance.com/role?id=rec8xi6wP4LwEW2A8',
  },
  {
    company: 'Moovx',
    title: 'Senior Python Software Engineer',
    location: 'Uruguai',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Python', 'AWS', 'Cognito', 'DynamoDB', 'Test'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://boards.greenhouse.io/moovx/jobs/4232093005',
  },
  {
    company: 'Flylance',
    title: 'Sr. Frontend Engineer (Vue.js)',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Vue.js', 'JavaScript', 'JSON', 'REST'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://www.flylance.com/role?id=rec1agBSh1RRZSzfu',
  },
  {
    company: 'Moovx',
    title: 'Senior Full Stack Engineer',
    location: 'Uruguai',
    language: 'Inglês',
    currency: 'U$',
    skills: ['JS', 'Angular', 'React', 'TypeScript', 'CSS'],
    headerInfo: 'Mínimo de 6 anos de XP',
    url: 'https://boards.greenhouse.io/moovx/jobs/4236540005',
  },
  {
    company: 'Elevate Labs',
    title: 'Senior iOS Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Ci/CD', 'iOS', 'Swift'],
    headerInfo: 'Mínimo de 7 anos de XP',
    url: 'https://jobs.lever.co/elevatelabs/46859a0e-6bb4-407a-9ede-26359e999925',
  },
  {
    company: 'Flylance',
    title: 'Sr. Product Designer',
    location: 'Remoto',
    language: '',
    currency: 'U$',
    skills: ['UsabilityTesting', 'Prototyping', 'Figma', 'Typography'],
    headerInfo: 'Mínimo de 7 anos de XP',
    url: 'https://www.flylance.com/role?id=receY44tUh9fTv0q6',
  },
]

export const openings20230830: Openings = {
  localOpenings,
  globalOpenings,
}
