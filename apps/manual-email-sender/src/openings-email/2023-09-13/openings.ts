import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'

const localOpenings: Opening[] = [
  {
    company: 'AN Tecnologia',
    title: 'Desenvolvedor(a) Full-Stack Estágio',
    location: 'Brail',
    language: 'Português',
    currency: 'R$',
    skills: ['Flutter', 'HTML', 'JavaScript', 'Laravel', 'PHP'],
    headerInfo: 'Estágio',
    url: 'https://programathor.com.br/jobs/29351-desenvolvedor-a-full-stack-estagio',
  },
  {
    company: 'Eteg',
    title: 'Desenvolvedor(a) Fullstack Junior (Java e Angular)',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'Spring Boot', 'Spring MVC', 'Hibernate', 'PostgreSQL'],
    headerInfo: 'Júnior',
    url: 'https://eteg.vagas.solides.com.br/vaga/286516',
  },
  {
    company: 'Nexus Media',
    title: 'Gestor de Tráfego',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: [
      'Facebook Ads',
      'Google Ads',
      'Geração de Leads',
      'Venda Direta',
      'Otimização de Campanhas',
    ],
    headerInfo: 'Júnior',
    url: 'https://nexusmedia.vagas.solides.com.br/vaga/203967',
  },
  {
    company: 'Sensedia',
    title: 'Developer Open Finance',
    location: 'Brasil',
    skills: ['JavaScript', 'API', 'Rest APIs', 'Metodologias Ágeis'],
    language: 'Português',
    currency: 'R$',
    headerInfo: 'Júnior',
    url: 'https://sensedia.hire.trakstar.com/jobs/fk0x5d5/',
  },
  {
    company: 'Impulso',
    title: 'Engenheiro de Software Pleno (Java | Kotlin)',
    location: 'Localização da Empresa',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'AWS', 'Kotlin', 'Microsserviços', 'CI/CD'],
    headerInfo: 'Pleno (R$12,000 até R$12,800)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1938',
  },
  {
    company: 'Impulso',
    title: 'Desenvolvedor(a) Mobile Pleno React Native',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['React Native', 'Android', 'iOS', 'JavaScript'],
    headerInfo: 'Pleno (R$ 12,000 até R$12,800)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1939',
  },
  {
    company: 'Impulso',
    title: 'Pleno Elixir',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Elixir', 'Docker', 'Golang', 'Kubernetes'],
    headerInfo: 'Pleno (R$11,200 até R$12,000)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1935',
  },
  {
    company: 'GP Combustiveis',
    title: 'Programador(a) Web Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['SQL', '.NET', 'Java', 'CSS', 'JavaScript'],
    headerInfo: 'Pleno (Até R$5,000)',
    url: 'https://programathor.com.br/jobs/29297-programador-a-web-pleno',
  },
  {
    company: 'Eteg',
    title: 'Desenvolvedor(a) Fullstack Pleno (Node.js e React.js)',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['ReactJS', 'TypeScript', 'Node', 'NestJS', 'Docker'],
    headerInfo: 'Pleno',
    url: 'https://eteg.vagas.solides.com.br/vaga/288821?utm_source=remotar',
  },
  {
    company: 'Going2',
    title: 'Dev. Front-end Mobile Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['React', 'React Native', 'Next.js', 'Swift', 'Kotlin'],
    headerInfo: 'Pleno',
    url: 'https://going2.vagas.solides.com.br/vaga/294269',
  },
  {
    company: 'Nexus Media',
    title: 'Web Designer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Design', 'WordPress', 'Elementor', 'Marketing', 'Comunicação'],
    headerInfo: 'Pleno',
    url: 'https://nexusmedia.vagas.solides.com.br/vaga/204106',
  },
  {
    company: 'SMGBit Soluções',
    title: 'Desenvolvedor(a) Full Stack (React e C#) Pleno',
    location: 'Brsil',
    language: 'Português',
    currency: 'R$',
    skills: ['C#', '.NET Core', 'React', 'MongoDB', 'SQL Server'],
    headerInfo: 'Pleno',
    url: 'https://programathor.com.br/jobs/28388-desenvolvedor-a-full-stack-react-e-c-pleno',
  },
  {
    company: 'BrasilMercado Financeiro - Escola de Assessoria de Investimentos',
    title: 'Pessoa Desenvolvedora Full Stack',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Flask', 'Python', 'React JS', 'SQL'],
    headerInfo: 'Pleno',
    url: 'https://apply.workable.com/xp-educacao/j/1D02568A32/',
  },
  {
    company: 'Oowlish',
    title: 'Data Engineer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['MongoDB', 'GraphDB'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://jobs.lever.co/oowlish/11519bb1-1ea1-4ff3-9a78-791a8b0419f8',
  },
  {
    company: 'Oowlish',
    title: 'DevOps Engineer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['AWS', 'EC2', 'Databases (RDS)', 'S3', 'EFS'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://jobs.lever.co/oowlish/37e9ece5-ab93-435f-bf10-4c33700cfe8c',
  },
  {
    company: 'Belvo',
    title: 'Gerente de Sucesso do Cliente',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: [
      'Gestão de Clientes',
      'Conhecimento Técnico',
      'Resolução de Problemas',
      'Comunicação',
      'Empatia',
    ],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://jobs.ashbyhq.com/belvo/dd323a05-b649-47ed-9d2d-5b4e36ede434',
  },
  {
    company: 'Heineken',
    title: 'Engenheiro de Dados Sênior',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Azure', 'DataBricks', 'Synapse', 'SQL Server'],
    headerInfo: 'Vaga Exclusiva Para Mulheres Negras',
    url: 'https://careers.theheinekencompany.com/Brazil/job/S%C3%A3o-Paulo-Analista-Dados-Digital-SR-Vaga-Afirmativa-exclusiva-para-pessoas-negras/976408901/',
  },
  {
    company: 'Boavista Tecnologia',
    title: 'Pessoa Desenvolvedora Java Sênior - Tech Lead',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'JavaEE', 'JavaScript', 'POO', 'PostgreSQL'],
    headerInfo: 'Sênior (R$15,000)',
    url: 'https://programathor.com.br/jobs/29294-pessoa-desenvolvedora-java-senior-tech-lead',
  },
  {
    company: 'Going2',
    title: 'Desenvolvedor Front-end Mobile Sênior',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['TypeScript', 'React Native'],
    headerInfo: 'Sênior',
    url: 'https://going2.vagas.solides.com.br/vaga/288732',
  },
  {
    company: 'Pride Recruiter - HR',
    title: 'Sênior C++ Engineer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['C++', 'OpenGL', 'Vulkan', 'Metal', 'DirectX'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://priderecruiter.vagas.solides.com.br/vaga/235188',
  },
]

const globalOpenings: Opening[] = [
  {
    company: 'Variant Perception',
    title: 'UX Engineer',
    location: 'London',
    language: 'Inglês',
    currency: 'U$',
    skills: ['UI/UX Design', 'Firebase', 'React.js', 'GCP', 'Next.js'],
    headerInfo: 'Pleno ($9,166 até $12,500)',
    url: 'https://wellfound.com/l/2zgwyU',
  },
  {
    company: 'Fly.io',
    title: 'Infrastructure Ops Engineering',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Infrastructure',
      'Linux',
      'Problem Solving',
      'Software engineering',
    ],
    headerInfo: 'Pleno ($7,500 até $16,666)',
    url: 'https://fly.io/jobs/infrastructure-ops-engineering/',
  },
  {
    company: 'Subspace Labs',
    title: 'Protocol Engineer (Core)',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Rust', 'Python', 'Collaboration skills', 'TypeScript'],
    headerInfo: 'Pleno',
    url: 'https://jobs.lever.co/subspacelabs/7f6a654b-60a8-4740-aa19-36b9f7a9e624',
  },
  {
    company: 'Gnosis',
    title: 'Algorithm Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Data Analysis',
      'Documentation',
      'Mathematics',
      'Rust',
      'Software engineering',
    ],
    headerInfo: 'Pleno',
    url: 'https://gnosis.jobs.personio.com/job/1245798?language=en&display=en',
  },
  {
    company: 'Huddle01',
    title: 'DevOps Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'CI/CD', 'DevOps', 'Grafana', 'Kubernetes'],
    headerInfo: 'Mínimo de 2 anos de XP',
    url: 'https://boards.greenhouse.io/huddle01/jobs/4015008007',
  },
  {
    company: 'Subspace Labs',
    title: 'Solidity Developer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Defi', 'GraphQL', 'Solidity', 'TypeScript'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: 'https://jobs.lever.co/subspacelabs/a943717b-0112-4158-9267-e5d86f68898d',
  },
  {
    company: 'Strider',
    title: 'Mid-Senior Full-stack Engineer - Spring Boot, React.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Java', 'Spring Boot', 'React.js'],
    headerInfo: 'Mínimo de 4 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bWlkLXNlbmlvci1mdWxsLXN0YWNrLWVuZ2luZWVyLXNwcmluZy1ib290LXJlYWN0LmpzLWIxYWJmMTM3P3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    company: 'Ofri Internet GmbH',
    title: 'Full Stack RoR Developer (Mid-Level)',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Ruby on Rails', 'MySQL', 'Docker', 'Kanban'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://join.com/companies/ofri/9066317-remote-full-stack-ror-developer-mid-level?pid=369b2d9eb02b4d98c0ad&oid=384acd85-ef63-4bd3-9bf1-0c79dd7a4745',
  },
  {
    company: 'Nimble',
    title: 'Senior Software Engineer (Full-Stack)',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['React', 'Django', 'Desenvolvimento de software', 'DevOps'],
    headerInfo: 'Sênior ($12,083 até $14,166)',
    url: 'https://wellfound.com/jobs/2787116-senior-software-engineer-full-stack',
  },
  {
    company: 'Fingerprint',
    title: 'Senior Full Stack Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'React.js', 'TypeScript', 'Web Browsers', 'Cryptography'],
    headerInfo: 'Sênior ($8,333 até $13,333)',
    url: 'https://fingerprint.com/careers/jobs/apply/?gh_jid=4872204004',
  },
  {
    company: 'Fingerprint',
    title: 'Senior Frontend Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Front-End',
      'React.js',
      'TypeScript',
      'Wireframing',
      'Collaboration Skills',
    ],
    headerInfo: 'Sênior ($8,333 até $13,333)',
    url: 'https://fingerprint.com/careers/jobs/apply/?gh_jid=4927035004',
  },
  {
    company: 'Hypixel Studios',
    title: 'Senior Systems Administrator',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Cyber Security', 'Python', 'Terraform', 'Troubleshooting'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://boards.greenhouse.io/hypixelstudios/jobs/5187436003',
  },
  {
    company: 'BizSpeed',
    title: 'Senior Software Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['SQL', 'Svelte', 'Tailwind', 'TypeScript', 'UI'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://dynamitejobs.com/company/bizspeed/remote-job/senior-software-engineer',
  },
  {
    company: 'Glide',
    title: 'Senior Software Engineer - Fullstack',
    location: 'New York City, NY',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Javascript', 'Typescript', 'React', 'NextJS', 'Docker'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://careers.withglide.com/28074',
  },
  {
    company: 'Gnosis',
    title: 'Senior Security Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'AWS',
      'Cloud Security',
      'Google Cloud',
      'Security Compliance Standards (ISO 27001, GDPR)',
      'CISSP, CISM, or CEH Certification',
    ],
    headerInfo: 'Sênior',
    url: 'https://gnosis.jobs.personio.com/job/1164861?language=en&display=en',
  },
]

export const openings20230913: Openings = {
  localOpenings,
  globalOpenings,
}