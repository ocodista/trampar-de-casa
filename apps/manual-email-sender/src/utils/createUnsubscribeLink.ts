import { UiRoutes, encrypt } from 'shared'

export const createUnsubscribeLink = (secretKey: string, id: string) =>
  `https://trampardecasa.com.br${UiRoutes.OptOut}/?id=${encrypt(secretKey, id)}`
