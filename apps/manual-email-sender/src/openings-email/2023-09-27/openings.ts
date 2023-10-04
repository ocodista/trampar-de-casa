import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'

const localOpenings: Opening[] = [
  {
    title: 'Junior Data Analyst',
    company: 'Incognia',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Análise de Dados', 'SQL', 'Comunicação', 'Geração de Relatórios'],
    headerInfo: 'Júnior ($6,200 até R$7,700)',
    url: 'https://incognia.recruitee.com/o/junior-data-analyst-sao-paulo',
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
    title: 'Desenvolvedor(a) .Net (C#) Pleno',
    company: 'Codecycle',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['C#', '.NET', 'SQL Server', 'Angular', 'Bootstrap'],
    headerInfo: 'Pleno (até R$8,000)',
    url: 'https://programathor.com.br/jobs/29345-desenvolvedor-a-net-c-pleno',
  },
  {
    title: 'Desenvolvedor(a) Full Stack Pleno - 100% Remoto',
    company: 'Weef',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['DevOps', 'Python', 'Node.js', 'PHP', 'ReactJS'],
    headerInfo: 'Pleno (até R$8,000)',
    url: 'https://programathor.com.br/jobs/29345-desenvolvedor-a-net-c-pleno',
  },
  {
    title: 'Desenvolvedor(a) Flutter Pleno',
    company: 'Yandeh',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['API', 'Dart', 'Flutter'],
    headerInfo: 'Pleno (até R$8,000)',
    url: 'https://programathor.com.br/jobs/29421-desenvolvedor-a-full-stack-pleno-100-remoto',
  },
  {
    company: 'Matera',
    title: 'Analista de Testes Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Teste', 'Análise', 'Rastreamento', 'Colaboração', 'Conformidade'],
    headerInfo: 'Pleno',
    url: 'https://matera.inhire.app/vagas/8ad93035-d0a4-4129-947f-de2bd880d089/pessoa-analista-de-testes-pleno',
  },
  {
    company: 'EstrelaBet',
    title: 'Especialista DevSecOps',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Programação', 'DevSecOps', 'Kali Linux'],
    headerInfo: 'Pleno',
    url: 'https://estrelabet.inhire.app/vagas/eb49b782-dc82-415e-9f22-b38a7ca4aa48/especialista-devsecops',
  },
  {
    company: 'Matera',
    title: 'Desenvolvedor Backend Java Pleno',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'Spring', 'APIs', 'Microsserviços', 'Kubernetes'],
    headerInfo: 'Pleno',
    url: 'https://matera.inhire.app/vagas/77998b64-f12c-439c-a12d-d8e576a48115/pessoa-desenvolvedora-backend-java-pleno',
  },
  {
    title: 'Desenvolvedor(a) Backend Pleno (Voz) - Java e/ou Node.js',
    company: 'Zenvia',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Java', 'Node.js', 'NoSQL', 'Docker', 'Kubernetes'],
    headerInfo: 'Pleno',
    url: 'https://boards.greenhouse.io/zenvia/jobs/4981296004?t=9ff484204us',
  },
  {
    company: 'EstrelaBet',
    title: 'Desenvolvedor Back-End',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Go', 'DevOps', 'Python', 'Java', 'C++'],
    headerInfo: 'Pleno',
    url: 'https://estrelabet.inhire.app/vagas/12f5c4d6-9b12-4781-84f4-e7ec7630bf5d/desenvolvedor-back-end',
  },
  {
    title: 'Senior Software Engineer',
    company: 'Incognia',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Ruby on Rails', 'GraphQL', 'Java', 'Python'],
    headerInfo: 'Sênior (R$13,000 até R$16,000)',
    url: 'https://incognia.recruitee.com/o/senior-software-engineer',
  },
  {
    company: 'Impulso',
    title: 'Sênior QA (Quality Analyst)',
    location: 'Localização da Vaga',
    language: 'Português',
    currency: 'R$',
    skills: ['Automation', 'JavaScript', 'Python', 'Robot'],
    headerInfo: 'Sênior (R$9,600 até R$12,000)',
    url: 'https://impulso.team/pt/profissionais/oportunidade/1945-senior-qa-quality-analyst-',
  },
  {
    company: 'XP Inc.',
    title: 'Senior Data Science',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Python', 'Machine Learning', 'Modelos Estatísticos', 'PySpark'],
    headerInfo: 'Sênior',
    url: 'https://boards.greenhouse.io/xpinc/jobs/6770510002',
  },
  {
    company: 'EstrelaBet',
    title: 'Machine Learning Engineer - Sênior',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['GoLang', 'NodeJS', 'Serverless'],
    headerInfo: 'Sênior',
    url: 'https://estrelabet.inhire.app/vagas/1a585907-ded4-4741-a4e0-447921d7e46c/machine-learning-engineer-senior',
  },
  {
    title: 'Desenvolvedor(a) Mobile Sênior',
    company: 'Proidea Ltda',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['Android', 'iOS', 'Xamarin'],
    headerInfo: 'Sênior',
    url: 'https://programathor.com.br/jobs/29440-desenvolvedor-a-mobile-senior',
  },
]

const globalOpenings: Opening[] = [
  {
    company: 'Strider',
    title: 'Mid-Senior Back-end Engineer - Django',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Django', 'Django Rest Framework', 'Python'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bWlkLXNlbmlvci1iYWNrLWVuZC1lbmdpbmVlci00NWU5N2IxZD9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  },
  {
    company: 'Strider',
    title: 'Senior Back-end Engineer - Python',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Python', 'MySQL'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWJhY2stZW5kLWVuZ2luZWVyLXB5dGhvbi1zdHJpZGVyLTJiNjI0MzYzP3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    company: 'Strider',
    title: 'Senior Full-stack Engineer - React.js, Python',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['React.js', 'TypeScript', 'Python', 'SQL', 'AWS'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWZ1bGwtc3RhY2stZW5naW5lZXItcmVhY3QuanMtcHl0aG9uLXN0cmlkZXItZWIwMGY5ZjE/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  },
  {
    title: 'Lead Data Scientist',
    company: 'Strider',
    location: 'Estados Unidos',
    language: 'Inglês',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bGVhZC1kYXRhLXNjaWVudGlzdC1kOGViNmJjYT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
    headerInfo: 'Mínimo de 6 anos de XP ($6,000 até $8,000)',
    skills: ['Generative AI'],
    currency: 'U$',
  },
  {
    title: 'Senior Machine Learning Engineer',
    company: 'Strider',
    location: 'Estados Unidos',
    language: 'Inglês',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLW1hY2hpbmUtbGVhcm5pbmctZW5naW5lZXItZTUzMDIyZDc/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
    headerInfo: 'Mínimo de 6 anos de XP ($6,000 até $9,000)',
    skills: ['Machine Learning', 'Python', 'Computer Vision', 'Deep Learning'],
    currency: 'U$',
  },
  {
    company: 'Zapier',
    title: 'Engineer, DBRE',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'MySQL', 'Postgres', 'Redis'],
    headerInfo: 'Pleno ($11,525 até $17,291)',
    url: 'https://zapier.com/jobs/6924346002/engineer-dbre/',
  },
  {
    company: 'Deel',
    title: 'Full-Stack Engineer',
    location: 'LATAM',
    language: 'Inglês',
    currency: 'U$',
    skills: ['React', 'NestJS', 'Vite', 'Next.js', 'Postgres'],
    headerInfo: 'Pleno',
    url: 'https://jobs.ashbyhq.com/Deel/cb91e943-8223-4147-b160-1e169293f5e2',
  },
  {
    company: 'Shape',
    title: 'Frontend Developer',
    location: 'Brasil',
    language: 'Português',
    currency: 'R$',
    skills: ['JavaScript', 'HTML', 'CSS', 'React', 'AngularJS'],
    headerInfo: 'Pleno',
    url: 'https://apply.workable.com/shapedigital/j/3291760100/',
  },
  {
    company: 'Keebo',
    title: 'Algorithms Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Backend Development',
      'Algorithm Design',
      'Data Science',
      'Database',
      'SQL',
    ],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://wellfound.com/jobs/2789867-algorithms-engineer?utm_campaign=startup_share&utm_content=startup_share_module&utm_medium=social&utm_term=keebo-1',
  },
  {
    company: 'Haul',
    title: 'Senior Software Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['NestJS', 'NodeJS', 'TypeScript', 'ReactJS', 'MongoDB'],
    headerInfo: 'Sênior ($6,666 até $13,333)',
    url: 'https://wellfound.com/jobs/2363575-senior-software-engineer',
  },
  {
    company: 'Codenotary',
    title: 'Senior Go Developer',
    location: 'Global',
    language: 'Inglês',
    currency: 'EUR',
    skills: [
      'Linux',
      'Go (Golang)',
      'Cloud Computing',
      'Databases',
      'Cryptography',
    ],
    headerInfo: 'Mínimo de 7 anos de XP',
    url: 'https://wellfound.com/jobs/1306140-senior-go-developer?utm_campaign=startup_share&utm_content=startup_share_module&utm_medium=social&utm_term=codenotary1',
  },
  {
    company: 'BuySellAds',
    title: 'Senior Ruby on Rails Developer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'Docker', 'Ruby on Rails', 'Software engineering'],
    headerInfo: 'Sênior',
    url: 'https://careers.jobscore.com/careers/buysellads/jobs/senior-ruby-on-rails-developer-remote-bu0-GOMjSr66VyaKi2Iu__',
  },
  {
    company: 'mParticle',
    title: 'Senior Cloud DevOps Engineer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'R$',
    skills: ['Kubernetes', 'Terraform', 'DevOps', 'Aerospike', 'ScyllaDB'],
    headerInfo: 'Sênior',
    url: 'https://www.mparticle.com/careers/?gh_jid=5380668',
  },
  {
    company: 'LevaData',
    title: 'Director of Engineering',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Full-stack',
      'IaC',
      'AWS Cloud',
      'AWS Quicksight',
      'Apache Airflow',
    ],
    headerInfo: 'Sênior',
    url: 'https://jobs.lever.co/levadata/a6fa1ac9-8bf1-42fd-b405-047f08e32e63',
  },
  {
    company: 'Litify',
    title: 'Senior Salesforce Developer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Salesforce', 'Apex', 'HTML', 'CSS', 'JavaScript'],
    headerInfo: 'Sênior',
    url: 'https://boards.greenhouse.io/litify/jobs/5145349',
  },
  {
    company: 'Scopic Software',
    title: 'Senior DevOps Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'Azure', 'CI/CD', 'DevOps', 'Terraform'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://careers.scopicsoftware.com/#op-577113-remote-senior-devops-engineer',
  },
  {
    company: 'Scopic Software',
    title: 'Remote Technical Lead',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Desenvolvimento', 'Liderança', 'AWS', 'Inglês', 'Resolução'],
    headerInfo: 'Mínimo de 7 anos de XP',
    url: 'https://careers.scopicsoftware.com/#op-536837-remote-technical-lead',
  },
]

export const openings20230927: Openings = {
  localOpenings,
  globalOpenings,
}