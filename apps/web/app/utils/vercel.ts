// utils/vercel-utils.tsx
export const IS_SERVER = typeof window === 'undefined'
export function getProtocol() {
  const isProd = process.env.VERCEL_ENV === 'production'
  if (isProd) return 'https://'
  return 'http://'
}
export function getAbsoluteUrl() {
  //get absolute url in client/browser
  if (!IS_SERVER) {
    return location.origin
  }
  //get absolute url in server.
  const protocol = getProtocol()
  if (process.env.VERCEL_URL) {
    return `${protocol}${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}
