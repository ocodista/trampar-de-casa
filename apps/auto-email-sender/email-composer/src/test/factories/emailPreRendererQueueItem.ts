import { faker } from '@faker-js/faker'

export const emailPreRendererItem = () => ({
  [faker.internet.email()]: {
    roles: [faker.string.sample()],
    footerHTML: faker.string.sample(),
    headerHTML: faker.string.sample(),
  },
})
