import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'

const localOpenings: Opening[] = [
  {
    company: 'Always Fit',
    title: 'Desenvolvedor(a) Full-Stack - Node.Js + Vue.js',
    location: 'Brazil',
    currency: 'R$',
    language: 'Português',
    skills: ['Git', 'TypeScript', 'Testes', 'Node.js', 'Vue.js'],
    headerInfo: 'Júnior (até R$2.500)',
    url: 'https://programathor.com.br/jobs/29229-desenvolvedor-a-full-stack-node-js-vue-js-junior',
  },
  {
    company: 'Cellere',
    title: 'Analista de Suporte de TI Jr.',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Excel', 'SQL'],
    headerInfo: 'Júnior',
    url: 'https://cellere.com.br/analista-de-suporte-de-ti/',
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
    headerInfo: 'Pleno (R$9,600 até R$10.400)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1927-pleno-angular',
  },
  {
    company: 'Medme',
    title: 'Desenvolvedor(a) ASP.Net/ C# / Javascript / Gamificação',
    location: 'Brasil',
    skills: ['Azure', 'C#', '.NET', 'Node.js', 'SQL Server'],
    currency: 'R$',
    language: 'Português',
    headerInfo: 'Pleno (até R$4.000)',
    url: 'https://programathor.com.br/jobs/29225-desenvolvedor-a-asp-net-c-javascript-gamificacao',
  },

  {
    company: 'Pro Educacional',
    title: 'WebDesigner - Shopify e Outros',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['JavaScript', 'Shopify', 'Frontend'],
    headerInfo: 'Pleno (Até R$2.500)',
    url: 'https://programathor.com.br/jobs/29176-webdesigner-shopify-e-outros',
  },
  {
    company: 'Koepe',
    title: 'Desenvolvedor(a) React Native Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['React Native', 'NextJS', 'Node.js', 'ReactJS'],
    headerInfo: 'Pleno',
    url: 'https://programathor.com.br/jobs/29174-desenvolvedor-a-react-native-pleno',
  },
  {
    company: 'WEX',
    title: 'Lead Java Developer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['Java', 'Cloud', 'Leadership', 'CI/CD'],
    headerInfo: 'Pleno',
    url: 'https://wexinc.wd5.myworkdayjobs.com/pt-BR/WEXInc/job/Lead-Java-Developer_R12508-1',
    // https://remotar.com.br/job/23442/wex/lead-java-developer
  },
  {
    company: 'Acerto',
    title: 'Gerente de Arquitetura de Software',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['.NET', 'DevOps', 'SQL', 'AWS', 'Azure'],
    headerInfo: 'Pleno',
    url: 'https://acerto.vagas.solides.com.br/vaga/236797',
    // https://remotar.com.br/job/23415/acerto/gerente-de-arquitetura-de-software
  },
  {
    company: 'OLX Brasil',
    title: 'Pessoa Desenvolvedora de Software Backend - Especialista',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['.Net', 'SQS', 'Kafka', 'RabbitMq', 'Microservices'],
    headerInfo: 'Pleno',
    url: 'https://jobs.smartrecruiters.com/OLXBrasil/743999924031923-pessoa-desenvolvedora-de-software-backend-especialista',
    // https://remotar.com.br/job/23362/olx-brasil/pessoa-desenvolvedora-de-software-backend-especialista
  },
  {
    company: 'OLX Brasil',
    title: 'Pessoa Desenvolvedora de Software',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Typescript', 'NextJS', 'React', 'Cloud', 'AWS'],
    headerInfo: 'Pleno',
    url: 'https://jobs.smartrecruiters.com/OLXBrasil/743999925438073-pessoa-desenvolvedora-de-software-pleno',
    // https://remotar.com.br/job/23359/olx-brasil/pessoa-desenvolvedora-de-software-pleno
  },
  {
    company: 'Auvo Tecnologia',
    title: 'Pessoa Desenvolvedora .Net Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['.Net', 'C#', 'JavaScript', 'SQL', 'SCRUM'],
    headerInfo: 'Pleno',
    url: 'https://auvo.vagas.solides.com.br/vaga/231979#vacancyDescription',
    // https://remotar.com.br/job/23357/auvo-tecnologia/pessoa-desenvolvedora-.net-pleno
  },
  {
    company: 'Log Manager',
    title: 'Desenvolvedor(a) Full Stack Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['CSS', 'Laravel', 'MySQL', 'PHP', 'JavaScript'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: 'https://programathor.com.br/jobs/29210-desenvolvedor-a-full-stack-pleno',
  },
  {
    company: 'Cellere',
    title: 'Cientista de Dados',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['MachineLearning', 'Python', 'R', 'SQL'],
    headerInfo: 'Pleno',
    url: 'https://cellere.com.br/cientista-de-dados/',
    //https://remotar.com.br/job/23482/cellere/cientista-de-dados
  },
  {
    company: 'Cellere',
    title: 'Arquiteto de Software',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Swift', 'Android', 'Flutter', 'Dart'],
    headerInfo: 'Pleno',
    url: 'https://cellere.com.br/arquiteto-de-software/',
    // https://remotar.com.br/job/23481/cellere/arquiteto-de-software
  },
  {
    company: 'Impulso',
    title: 'Fullstack - Sênior C# | .NET | Angular',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Angular', 'C#', 'JavaScript', 'Typescript', 'Cloud'],
    headerInfo: 'Sênior (R$13,760 até R$14,400)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1918',
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
    company: 'Matera',
    title: 'Pessoa Desenvolvedora Backend Java',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'SpringBoot', 'Docker', 'Swagger'],
    headerInfo: 'Sênior',
    url: 'https://matera.inhire.app/vagas/15c10886-4156-4b67-8fd7-0c1ee3aaef3f/pessoa-desenvolvedora-backend-java-senior',
    // https://remotar.com.br/job/23326/matera/pessoa-desenvolvedora-backend-java-senior
  },
  {
    company: 'Pipefy',
    title: 'Senior Software Engineer Frontend',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['UX/UI', 'Frontend', 'React', 'TypeScript', 'Kanban'],
    headerInfo: 'Sênior',
    url: 'https://app.pipefy.com/portals/engineering-pt',
    // https://remotar.com.br/job/23417/pipefy/senior-software-engineer-frontend
  },
  {
    company: 'WEX',
    title: 'Sênior DevOps Engineer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['Terraform', 'Kubernetes', 'Databases', 'Monitoring', 'AWS'],
    headerInfo: 'Sênior',
    url: 'https://wexinc.wd5.myworkdayjobs.com/pt-BR/WEXInc/job/Senior-DevOps-Engineer_R12775',
    // https://remotar.com.br/job/23438/wex/senior-devops-engineer
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
    title: 'Engenheiro Full-Stack Pleno - Angular.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Angular.js', 'POO', 'TypeScript', 'JavaScript'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: '',
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
    title: 'Senior Data Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Python', 'AWS', 'Azure', 'Airflow', 'Databricks'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRhdGEtZW5naW5lZXItNWM0YzQ2YjQ/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  },
  {
    company: 'Strider',
    title: 'Software Developer, Audio',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['C++', 'Juce'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c29mdHdhcmUtZGV2ZWxvcGVyLWF1ZGlvLTFiOGMzM2U3P3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    title: 'Product Designer',
    company: 'Strider',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    headerInfo: 'Mínimo de 7 anos de XP',
    skills: ['UI', 'UX', 'Comunicação'],
    url: 'app.onstrider.com/r/trampar_de_casa?job=cHJvZHVjdC1kZXNpZ25lci1kN2VkMmJhOT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  },
  {
    company: 'StarTree',
    title: 'Full Stack Web Developer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['CI/CD', 'FullStack', 'Next.js', 'React.js', 'TypeScript'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: 'https://boards.greenhouse.io/startree/jobs/4928144004',
    //https://dynamitejobs.com/company/startree/remote-job/full-stack-web-developer-1
  },
  {
    company: 'TrustSwap',
    title: 'Front-End Engineer for DeFi company',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['FrontEnd', 'JavaScript', 'Next.js', 'TypeScript', 'UI'],
    headerInfo: 'Mínimo de 3 anos de XP ($3,750 até $5,833)',
    url: 'https://trustswap.com/front-end-engineer-for-defi-company/',
    //https://dynamitejobs.com/company/trustswap/remote-job/front-end-engineer-for-defi-company
  },
  {
    company: 'Binance',
    title: 'Golang Developer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'Azure', 'Blockchain', 'NoSQL', 'Rust'],
    headerInfo: 'Mínimo de 4 anos de XP',
    url: 'https://jobs.lever.co/binance/47df46fd-6a1e-4304-b758-662f8b711e59',
    //https://dynamitejobs.com/company/binance/remote-job/golang-developer
  },
  {
    company: 'Deepgram',
    title: 'Backend Software Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['C/C++', 'Design', 'Python', 'Rust', 'Unix'],
    headerInfo: 'Mínimo de 5 anos de XP($10,000 até $16,666)',
    url: 'https://jobs.ashbyhq.com/Deepgram/aa0687e8-b8ac-4f9e-abaa-617989db4026',
    //https://dynamitejobs.com/company/deepgram/remote-job/backend-software-engineer-1
  },
  {
    company: 'Dforth Technlogies',
    title: 'Senior Data Engineer (GCP)',
    location: 'Global',
    language: 'Inglês',
    salary: '$30k - $40k',
    skills: ['Python', 'GoogleBigquery', 'Looker', 'GCP'],
    currency: 'U$',
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://wellfound.com/company-l/dforth-technlogies/jobs/2771573-senior-data-engineer-gcp?autoOpenApplication=true',
  },
  {
    company: 'Flylance',
    title: 'Sr. React Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['React', 'TypeScript', 'Material UI'],
    headerInfo: 'Sênior',
    url: 'https://www.flylance.com/role?id=recMaDly969lDSw7G',
  },
  {
    company: 'Odyssey Interactive',
    title: 'Engenheiro Sênior de Gameplay (C++ / Unreal)',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['C++', 'UnrealEngine', 'GameplaySystems', 'Low-level'],
    headerInfo: 'Mínimo de 6 anos de XP',
    url: 'https://jobs.smartrecruiters.com/OdysseyInteractive/743999919264080-senior-gameplay-engineer-c-unreal-remote-',
    // https://remotive.com/remote-jobs/software-dev/senior-gameplay-engineer-c-unreal-1759137
  },
  {
    company: 'Terminal49',
    title: 'Senior Back End Engineer (Ruby on Rails)',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'Backend', 'PostgreSQL', 'RubyOnRails', 'SQL'],
    headerInfo: 'Sênior ($11,666 até $16,666)',
    url: 'https://apply.workable.com/terminal49/j/466F7DD66B/',
    //https://dynamitejobs.com/company/terminal49/remote-job/senior-back-end-engineer-ruby-on-rails
  },
]

export const openings20230823: Openings = {
  localOpenings,
  globalOpenings,
}
