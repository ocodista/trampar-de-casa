import { getDecryptedId } from './getDecryptedId'

export const getId = (request: Request): string => {
  const { url } = request
  const hashedId = url.split('/').reverse()[0]
  const id = getDecryptedId(hashedId)
  return id
}
