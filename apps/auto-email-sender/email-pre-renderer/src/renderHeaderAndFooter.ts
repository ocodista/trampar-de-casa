import { renderFooter } from './renderFooter'
import { renderHeader } from './renderHeader'

export const renderHeaderAndFooter = async (id: string, rolesId: string[]) => {
  const promiseFooterHTML = new Promise<string>((resolve) =>
    resolve(renderFooter(id, process.env['URL_PREFIX'] as string))
  )
  const promiseHeaderHTML = new Promise<string>((resolve) =>
    resolve(renderHeader(rolesId, id))
  )
  const [footerHTML, headerHTML] = await Promise.all([
    promiseFooterHTML,
    promiseHeaderHTML,
  ])

  return { footerHTML, headerHTML }
}
