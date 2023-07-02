const striderRole = (
  title: string,
  minimumXP: number,
  url: string,
  skills: string[]
) => ({
  company: "Strider",
  title,
  headerInfo: `Mínimo de ${minimumXP} anos de XP`,
  language: "Inglês Avançado",
  currency: "U$",
  location: "Estados Unidos",
  url,
  skills,
});

export interface Role {
  company: string;
  title: string;
  description?: string;
  location: string;
  language: string;
  currency: string;
  salary?: string;
  skills: string[];
  headerInfo?: string;
  url: string;
}

export const globalRoles: Role[] = [
  striderRole(
    "Mid-level Scraping Engineer - Python",
    3,
    "https://www.onstrider.com/jobs/mid-level-scraping-engineer-python-768b97ac",
    ["Python", "Playwright", "HTML"]
  ),
  striderRole(
    "Mid Front-end Engineer - Vue.js",
    3,
    "https://www.onstrider.com/jobs/mid-front-end-engineer-vue.js-625390c7",
    ["JavaScript", "Vue.js", "HTML", "CSS"]
  ),
  striderRole(
    "Senior Back-end Engineer - Node.js, TypeScript",
    4,
    "https://www.onstrider.com/jobs/senior-back-end-engineer-nodejs-typescript-fc7792db",
    [
      "Node.js",
      "TypeScript",
      "Azure",
      "Redis",
      "Event Driven",
      "Cloud Functions",
      "Auth0",
      "Azure Service Bus",
      "Azure Functions",
    ]
  ),
  striderRole(
    "Senior Data Engineer - Microsoft SQL Server",
    4,
    "https://www.onstrider.com/jobs/senior-data-engineer-microsoft-sql-server-863718d3",
    ["Microsoft SQL Server"]
  ),
  striderRole(
    "Senior IOS Engineer - Swift",
    5,
    "https://www.onstrider.com/jobs/senior-ios-engineer-swift-3e707624",
    ["Swift", "iOS SDK", "AWS"]
  ),
  striderRole(
    "Senior Back-end Engineer - .NET",
    5,
    "https://www.onstrider.com/jobs/senior-back-end-engineer-.net-4d63a34a",
    ["C#", ".NET Core", "PostgreSQL"]
  ),
  striderRole(
    "Senior Full-stack Enginner - Rails, React.js",
    5,
    "https://www.onstrider.com/jobs/senior-full-stack-engineer-rails-react.js",
    ["Ruby on Rails", "React"]
  ),
  {
    company: "Revelry",
    title: "Laravel Engineer",
    headerInfo: "Mínimo 1 ano de XP (U$4,000 a U$6,250)",
    language: "Inglês Avançado",
    currency: "U$",
    location: "Nova Orleans",
    url: "https://wellfound.com/company/revelry/jobs/2705201-laravel-engineer",
    salary: "",
    skills: ["Laravel", "HTML", "CSS", "PHP", "MySQL"],
  },
  {
    company: "Scalable Path",
    title: "Senior Full-Stack TypeScript Developer",
    headerInfo: "Mínimo de 5 anos de XP",
    language: "Inglês Avançado",
    currency: "U$",
    location: "Nova York",
    url: "https://www.scalablepath.com/view-position/qQFwvGV4/senior-full-stack-typescript-developer-nodejs-react",
    skills: [
      "Node.js",
      "React",
      "TypeScript",
      "CSS",
      "SQL",
      "Automated Testing",
      "Azure",
      "Docker",
    ],
  },
  {
    company: "Simplero",
    title: "Senior Rails Developer",
    headerInfo: "Mínimo de 5 anos de XP",
    language: "Inglês Avançado",
    currency: "U$",
    location: "",
    url: "https://dynamitejobs.com/company/simplero/remote-job/senior-rails-developer-2",
    skills: ["Ruby on Rails", "JavaScript", "React"],
  },
];

export const localRoles: Role[] = [
  {
    url: "https://applicants.bairesdev.com/job/111/176816/apply",
    company: "BairesDev",
    title: "Dev Node MidLevel",
    headerInfo: "Mínimo de 2 anos de XP",
    currency: "BRL",
    language: "Inglês",
    skills: ["Node", "SQL", "NoSQL"],
    location: "",
  },
  {
    url: "https://jobs.lever.co/fullstacklabs/65b409fb-eaa1-4dce-ab2e-edcad8cd32ab",
    company: "FullStack Labs",
    title: "Full Stack React.js Developer",
    currency: "BRL",
    language: "Inglês",
    skills: ["Node", "Java", "React"],
    headerInfo: "Mínimo 3 anos de XP",
    location: "",
  },
  {
    url: "https://executiva.abler.com.br/vagas/desenvolvedor-fullstack-php-593871",
    company: "Executiva Outsourcing",
    title: "Desenvolvedor FullStack PHP",
    currency: "BRL",
    language: "Português",
    skills: ["PHP", "HTML", "CSS", "JavaScript", "SQL"],
    headerInfo: "Superior Completo",
    location: "",
  },
  {
    url: "https://vericode.breezy.hr/p/23c5af12ea60-analista-devops",
    company: "Vericode",
    title: "Analista DevOps",
    headerInfo: "DevOps",
    currency: "BRL",
    language: "Português",
    skills: ["Python", "Java", "MySQL", "Oracle", "SQL Server", "Docker"],
    location: "São Paulo, SP",
  },
  {
    url: "https://boards.greenhouse.io/zenvia/jobs/4901607004",
    company: "Zenvia",
    title: "Desenvolvedor(a) Pleno Backend C#",
    currency: "BRL",
    headerInfo: "Pleno",
    language: "Português",
    skills: ["C#", "MySQL", "SQL Server", "TDD"],
    location: "São Paulo",
  },
  {
    url: "https://jobs.lever.co/fullstacklabs/c2e76272-8047-495d-98ac-07e446cb756f",
    company: "FullStack Labs",
    title: "Senior Node/Typescript Developer",
    currency: "BRL",
    headerInfo: "Mínimo de 4 anos de XP",
    language: "Inglês Avançado",
    skills: ["Node", "TypeScript", "NestJS", "Postgres"],
    location: "São Paulo",
  },
  {
    url: "https://impulso.team/pt/profissionais/oportunidade/1874",
    company: "Impulso",
    title: "Dev Pleno Angular",
    currency: "BRL",
    headerInfo: "R$9.840 - R$10.560",
    language: "Português",
    skills: ["Angular", "TypeScript", "Azure DevOps", "CSS"],
    location: "",
  },
  {
    url: "https://impulso.team/pt/profissionais/oportunidade/1871",
    company: "Impulso",
    title: "Dev pleno(a) - Afirmativa para mulheres e pessoas LGBTQIAP+",
    currency: "BRL",
    headerInfo: "R$12.200 - R$13.120",
    language: "Português",
    skills: ["React", "PHP", "WordPress", "Java"],
    location: "",
  },
  {
    url: "https://boards.greenhouse.io/zenvia/jobs/4898699004",
    company: "Zenvia",
    title: "Tech Lead - Java / Python",
    currency: "BRL",
    headerInfo: "Sênior",
    language: "Português",
    skills: ["Python", "Java", "Spring Boot", "MongoDB"],
    location: "São Paulo",
  },
  {
    url: "https://impulso.team/pt/profissionais/oportunidade/1866",
    company: "Impulso",
    title: "Dev Pleno/Sênior Angular + C# .Net",
    currency: "BRL",
    headerInfo: "R$11.000 - R$12.000",
    language: "Português",
    skills: ["C#", "TypeScript", "SQL Server", "Angular"],
    location: "",
  },
  {
    url: "https://impulso.team/pt/profissionais/oportunidade/1875",
    company: "Impulso",
    title: "Tech Lead C# | .Net | Angular",
    currency: "BRL",
    language: "Português",
    skills: ["HTML", "CSS", "C#", "TypeScript", "Angular", "SQL Server"],
    headerInfo: "R$16.160 a R$16.800",
    location: "",
  },
  {
    url: "https://jobs.lever.co/fullstacklabs/955b3e1a-c889-48ce-a722-74e97b4b9612",
    company: "FullStack Labs",
    title: "Data Infrastructure Engineer",
    currency: "BRL",
    language: "Inglês",
    skills: ["MySQL", "MongoDB", "Docker"],
    headerInfo: "Mínimo 5 anos de XP",
    location: "",
  },
  {
    url: "https://apply.workable.com/loggi/j/5EEF6FC8B0/",
    company: "Loggi",
    title: "Software Engineering Manager I",
    headerInfo: "Exclusiva para Mulheres - Mínimo 7 anos de XP",
    currency: "BRL",
    language: "Português",
    skills: ["Java", "Kotlin", "MongoDB"],
    location: "São Paulo, SP",
  },
  {
    url: "https://jobs.quickin.io/evtit/jobs/646cf749b856a800131a8535",
    company: "EVT",
    title: "Desenvolvedor Flutter Sênior",
    currency: "BRL",
    headerInfo: "Sênior",
    language: "Português",
    skills: ["Flutter", "SQL Server"],
    location: "",
  },
  {
    url: "https://applicants.bairesdev.com/job/111/176819/apply",
    company: "BairesDev",
    title: "Node Team Lead",
    headerInfo: "Mínimo de 7 anos de XP",
    currency: "BRL",
    language: "Português",
    skills: ["Node"],
    location: "",
  },
];

