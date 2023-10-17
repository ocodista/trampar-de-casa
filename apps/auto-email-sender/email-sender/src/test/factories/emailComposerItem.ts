import { faker } from '@faker-js/faker'

export const emailComposerItem = () => ({
  [faker.internet.email()]: faker.string.sample(),
})
