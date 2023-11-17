import { saveOpenings } from 'db'
import { Topics } from 'shared'
import { Opening } from 'shared/src/email/openings-email/Opening'

const localOpenings: Opening[] = []

const globalOpenings: Opening[] = [
  {
    title: 'Entry-Level Developer Advocate',
    company: 'Meteor Software',
    location: 'Global',
    skills: ['JavaScript'],
    headerInfo: 'Júnior',
    currency: 'U$',
    language: 'Inglês',
    url: 'https://public.app.shortcut.com/62/meteor-software/docs/33uMJ3eJSqP9D4bK7qF45O/entrylevel-developer-advocate',
  },
]

;(async () => {
  await Promise.all([
    await saveOpenings(globalOpenings, Topics.INTERNATIONAL_VACANCIES),
    await saveOpenings(localOpenings, Topics.NATIONAL_VACANCIES),
  ])
})()
