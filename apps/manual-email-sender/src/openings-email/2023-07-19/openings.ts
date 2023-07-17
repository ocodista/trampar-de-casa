import { Opening } from 'shared/src/email/openings-email/Opening'
import { Openings } from '../Openings'

const localOpenings: Opening[] = [
  {
    title: 'Desenvolvedor Fullstack (node.js e react.js)',
    company: 'Grupo Matera',
    location: 'Brasil',
    language: 'Português',
    url: 'https://matera.inhire.app/vagas/f6788d5e-d362-45c3-ba54-aec524dc467a/desenvolvedor-fullstack-(node.js-e-react.js)',
    headerInfo: 'Fullstack',
    skills: ['Node.JS', 'Microsserviços', 'AWS', 'NoSQL', 'Testes unitários'],
    currency: 'R$',
  },
]

const globalOpenings: Opening[] = [
  {
    title: 'Product Designer',
    company: 'Strider',
    location: 'Estados Unidos',
    language: 'Inglês',
    url: 'https://www.onstrider.com/jobs/product-designer-d7ed2ba9',
    headerInfo: 'Mínimo de 3 anos de XP',
    skills: [
      'UI',
      'UX',
      'Designing web applications',
      'Data visualization',
      'Communication',
    ],
    currency: 'U$',
  },
  {
    title: 'Senior Software Engineer',
    company: 'CloudWalk',
    location: 'Brasil',
    language: 'Inglês',
    url: 'https://dynamitejobs.com/company/cloudwalk/remote-job/senior-software-engineer',
    headerInfo: 'Mínimo de 5 anos de XP',
    skills: [
      'Next.js',
      'Problem solving',
      'React.js',
      'Software Engineer',
      'Collaboration',
    ],
    currency: 'R$',
  },
  {
    title: 'Lead Front-end Engineer - React.js',
    company: 'Strider',
    location: 'United States',
    currency: 'U$',
    language: 'English',
    url: 'https://www.onstrider.com/jobs/lead-front-end-engineer-react.js-23302e4c',
    headerInfo: 'Mínimo de 6 anos de XP',
    skills: [
      'React.js',
      'Software development',
      'Technical lead',
      'Communication',
      'English',
    ],
  },
]

export const openings20230719: Openings = {
  localOpenings,
  globalOpenings,
}
