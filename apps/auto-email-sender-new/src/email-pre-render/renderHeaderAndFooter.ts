import { mountFooter } from './renderFooter'
import { mountHeader } from './renderHeader'

export const renderHeaderAndFooter = async (
  subscriberId: string,
  rolesId: string[],
  renderedFooter: string,
  renderedHeader: string
) => {
  const promiseFooterHTML = new Promise<string>((resolve) =>
    resolve(
      mountFooter(
        subscriberId,
        process.env['URL_PREFIX'] as string,
        renderedFooter
      )
    )
  )
  const promiseHeaderHTML = new Promise<string>((resolve) =>
    resolve(
      mountHeader(
        subscriberId,
        process.env['URL_PREFIX'] as string,
        rolesId,
        renderedHeader
      )
    )
  )
  const [footerHTML, headerHTML] = await Promise.all([
    promiseFooterHTML,
    promiseHeaderHTML,
  ])

  return { footerHTML, headerHTML }
}
