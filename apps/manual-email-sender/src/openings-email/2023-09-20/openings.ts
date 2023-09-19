import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'

const localOpenings: Opening[] = []

const globalOpenings: Opening[] = [
  {
    company: 'Big Time Studios',
    title: 'DevOps Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Docker', 'AWS', 'Azure', 'Redis', 'DevOps'],
    headerInfo: 'Pleno',
    url: 'https://jobs.lever.co/bigtime/e7e281bc-d23b-4658-91c9-f12a28fafe06',
  },
  {
    company: 'Cultured Code',
    title: 'Cloud Platform Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Databases', 'Security'],
    headerInfo: 'Pleno',
    url: 'https://cultured-code.breezy.hr/p/8fad23a257eb01-cloud-platform-engineer',
  },
  {
    company: 'Strider',
    title: 'Mid-level Back-end Engineer - Node.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Node.js', 'JavaScript', 'PostgreSQL', 'Heroku', 'TypeScript'],
    headerInfo: 'Mínimo de 2 anos de XP($10,000 até $15,000)',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bWlkLWxldmVsLWJhY2stZW5kLWVuZ2luZWVyLW5vZGUuanMtc3RyaWRlci04NzY5ODAyOD9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  },
  {
    company: 'FullStack Labs',
    title: 'AI Machine Learning Engineer',
    location: 'Costa Rica',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Python', 'R', 'Java', 'TensorFlow', 'PyTorch'],
    headerInfo: 'Mínimo de 3 anos de XP',
    url: 'https://jobs.lever.co/fullstacklabs/7c7999e2-3125-4292-ad34-360f66b23b8c',
  },
  {
    company: 'PopSQL',
    title: 'Developer Relations',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'SQL',
      'Data Ecosystem',
      'Content Creation',
      'Technical Presentations',
    ],
    headerInfo: 'Mínimo de 3 anos de XP($10,000 até $15,000)',
    url: 'https://jobs.ashbyhq.com/popsql/e3d66b05-866a-4a34-83e2-7b0e937d963c',
  },
  {
    company: 'Just Appraised',
    title: 'Backend Developer',
    location: 'Brasil',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Java', 'AWS', 'Postgres', 'SQL', 'Git'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://ats.rippling.com/just-appraised-jobs/jobs/13e2fed4-6e7c-4ec5-912e-3b990ac5b17c',
  },
  {
    company: 'PopSQL',
    title: 'Senior Software Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['JavaScript', 'React', 'Ruby', 'Rails', 'Fullstack'],
    headerInfo: 'Sênior ($10,833 até $16,666)',
    url: 'https://jobs.ashbyhq.com/popsql/9b30c9ba-183d-462d-aab5-e2fbe26764b4',
  },
  {
    company: 'SecurityScorecard',
    title: 'Senior Full Stack Software Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['NodeJS', 'Typescript', 'React', 'Docker', 'Jenkins'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'https://securityscorecard.com/company/careers-list/?gh_jid=5354640',
  },
  {
    company: 'Strider',
    title: 'Senior Embedded Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['IoT', 'Robotics', 'RTOS', 'C/C++', 'Comunicação'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWVtYmVkZGVkLWVuZ2luZWVyLTFmNTY5Nzc3P3JlZmVycmFsPXRyYW1wYXJfZGVfY2FzYQ==',
  },
  {
    company: 'Strider',
    title: 'Senior Back-end Engineer - Node.js',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Node.js',
      'Desenvolvimento de Software',
      'Revisão de Código',
      'Comunicação',
    ],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWJhY2stZW5kLWVuZ2luZWVyLW5vZGUuanMtMGQ3NjQzODI/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  },
  {
    company: 'Strider',
    title: 'Senior Data Engineer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Data Engineering', 'Python', 'PySpark', 'Azure', 'Databricks'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWRhdGEtZW5naW5lZXItNWM0YzQ2YjQ/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  },
  {
    company: 'Strider',
    title: 'Senior iOS Developer',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Swift', 'iOS', 'RESTful APIs', 'Comunicação'],
    headerInfo: 'Mínimo de 5 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=c2VuaW9yLWlvcy1kZXZlbG9wZXItc3dpZnQtYWIyNGVmOTc/cmVmZXJyYWw9dHJhbXBhcl9kZV9jYXNh',
  },
  {
    company: 'Strider',
    title: 'Lead Data Scientist',
    location: 'Estados Unidos',
    language: 'Inglês',
    currency: 'U$',
    skills: [
      'Data Science',
      'Generative AI',
      'Liderança Técnica',
      'Comunicação',
    ],
    headerInfo: 'Mínimo de 6 anos de XP',
    url: 'app.onstrider.com/r/trampar_de_casa?job=bGVhZC1kYXRhLXNjaWVudGlzdC1kOGViNmJjYT9yZWZlcnJhbD10cmFtcGFyX2RlX2Nhc2E=',
  },
  {
    company: 'Outliant',
    title: 'Lead React-Node Full Stack Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['JavaScript', 'React.js', 'Node.js', 'AWS', 'Communication'],
    headerInfo: 'Mínimo de 6 anos de XP',
    url: 'https://jobs.ashbyhq.com/outliant/a60ebdca-562f-4126-99e2-03ea07043aff',
  },
  {
    company: 'Deepset',
    title: 'Senior DevSecOps Engineer',
    location: 'Global',
    language: 'Inglês',
    currency: 'U$',
    skills: ['Performance', 'Scalability', 'AWS', 'GitOps', 'Azure'],
    headerInfo: 'Mínimo de 7 anos de XP',
    url: 'https://deepset.jobs.personio.de/job/1182225?display=en',
  },
]

export const openings20230920: Openings = {
  localOpenings,
  globalOpenings,
}
