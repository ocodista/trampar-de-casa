import axios from 'axios'
import { delay } from './delay'

export const checkMatchRolesUp = async (
  url: string,
  maxAttempts = 10,
  interval = 5000
) => {
  let attempt = 0
  while (attempt < maxAttempts) {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        console.log('match_roles is up.')
        return
      }
    } catch (error) {
      console.error(`Error checking match_roles: ${error}`)
    }
    attempt++
    console.log(
      `Attempt ${attempt} failed. Retrying in ${interval / 1000} seconds...`
    )
    await delay(interval)
  }
  throw new Error(`match_roles did not start after ${maxAttempts} attempts.`)
}
