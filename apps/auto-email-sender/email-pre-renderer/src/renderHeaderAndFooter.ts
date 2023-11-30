import { mountFooter } from './renderFooter'
import { mountHeader } from './renderHeader'

export const renderHeaderAndFooter = async (
  id: string,
  rolesId: string[],
  renderedFooter: string,
  renderedHeader: string
) => {
  const promiseFooterHTML = new Promise<string>((resolve) =>
    resolve(
      mountFooter(id, process.env['URL_PREFIX'] as string, renderedFooter)
    )
  )
  const promiseHeaderHTML = new Promise<string>((resolve) =>
    resolve(mountHeader(rolesId, renderedHeader))
  )
  const [footerHTML, headerHTML] = await Promise.all([
    promiseFooterHTML,
    promiseHeaderHTML,
  ])

  return { footerHTML, headerHTML }
}
