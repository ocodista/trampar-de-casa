import axios from 'axios'
import { delay } from './delay'

export const checkMatchRolesUp = async (
  url: string,
  maxAttempts = 10,
  interval = 5000
) => {
  let attempt = 0
  console.log(`Checking if match_roles is up at: ${url}`)

  while (attempt < maxAttempts) {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        console.log('match_roles is up and ready to accept requests.')
        return
      }
      console.log(
        `Received response status ${response.status} but expected 200. Retrying...`
      )
    } catch (error: any) {
      const errorMessage = error.response
        ? `status: ${error.response.status}, message: ${error.message}`
        : error.code === 'ECONNREFUSED'
        ? 'Connection refused - service might not be running yet'
        : error.message

      console.error(
        `Attempt ${attempt + 1}/${maxAttempts} failed: ${errorMessage}`
      )
    }

    attempt++
    if (attempt < maxAttempts) {
      console.log(`Retrying in ${interval / 1000} seconds...`)
      await delay(interval)
    }
  }

  throw new Error(
    `match_roles service did not start after ${maxAttempts} attempts (${
      (maxAttempts * interval) / 1000
    } seconds). Please check if the service is running and accessible.`
  )
}
