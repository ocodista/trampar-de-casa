import { Companies, Prisma, PrismaClient } from "./client";

const prisma = new PrismaClient();

const getSubscribers = (): Prisma.SubscribersCreateInput[] => [
  {
    email: 'foo@gmail.com',
    englishLevel: 'Advanced',
    name: 'Foo',
    startedWorkingAt: 5,
    skills: [
      { name: 'JavaScript', years: 5  }, 
      { name: 'React', years: 3  }, 
      { name: 'NodeJS', years: 3  }, 
      { name: 'JavaScript', years: 2  }
    ],
  },
  {
    email: 'bar@gmail.com',
    englishLevel: 'Beginner',
    name: 'Bar',
    startedWorkingAt: 1,
    skills: [
      { name: 'Java', years: 1  }, 
      { name: 'Spring Boot', years: 1  }, 
    ],
  },
]

const getCompanies = (): Prisma.CompaniesCreateInput[] => [
  {
    name: 'Google',
    countryIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
    url: 'https://www.google.com/',

  }
]

const getRoles = (companies: Companies[]): Prisma.RolesCreateInput[] => [
  {
    company: { connect: { id: companies[0].id }  },
    country: 'USA',
    description: 'Some description',
    language: 'English',
    title: 'Software Engineer',
    currency: 'USD',
    skills: ['JavaScript', 'React', 'NodeJS']
  },
  {
    company: { connect: { id: companies[0].id }  },
    country: 'Brasil',
    description: 'Some description',
    language: 'English',
    title: 'Software Developer Jr',
    currency: 'BRL',
    skills: ['Java', 'Spring Boot']
  }
]

void async function () {
  try {
    const subscribers = await Promise.all(getSubscribers().map(subscriber => prisma.subscribers.create({ data: subscriber })))
    const companies = await Promise.all(getCompanies().map(company => prisma.companies.create({ data: company })))
    const roles = await Promise.all(getRoles(companies).map(role => prisma.roles.create({ data: role })))
  }
  catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }
}()