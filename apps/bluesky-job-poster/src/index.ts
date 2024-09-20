import dotenv from 'dotenv'
import { trackedRoleURL } from 'shared/src/services/trackedRoleURL'
import { AtpAgent, RichText } from '@atproto/api'
import { getSupabaseClient } from 'db'

dotenv.config()

interface Role {
  id: string
  title: string
  description: string
  currency: string
  salary: string | null
  company: string
  country: string
  language: string
  url: string
}

interface Salary {
  min: number
  max: number
  currency: string
  period: string
}

interface Post {
  id: string
  title: string
  salary: Salary
  company: string
  country: string
  language: string
  url: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function createPost() {
  const supabaseClient = getSupabaseClient()
  const agent = new AtpAgent({ service: 'https://bsky.social' })

  try {
    await loginToBluesky(agent)
    const roles = await fetchRoles(supabaseClient)
    const posts = processRoles(roles)
    await createPostsWithDelay(agent, posts)
  } catch (error) {
    console.error('Error in createPost:', error)
  }
}

async function createPostsWithDelay(agent: AtpAgent, posts: Post[]) {
  const totalPosts = posts.length
  const totalDurationMs = 10 * 60 * 1000
  const intervalMs = totalPosts > 1 ? totalDurationMs / (totalPosts - 1) : 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const startTime = new Date()

    try {
      await createSinglePost(agent, post)
      const endTime = new Date()
      console.log(
        `[${endTime.toISOString()}] Post created successfully for job: ${truncateString(
          post.title,
          30
        )} (${i + 1}/${totalPosts})`
      )
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] Error creating post for job ${truncateString(
          post.title,
          30
        )} (${i + 1}/${totalPosts}):`,
        error
      )
    }

    if (i < posts.length - 1) {
      const elapsedMs = new Date().getTime() - startTime.getTime()
      const remainingDelay = Math.max(0, intervalMs - elapsedMs)
      await delay(remainingDelay)
    }
  }
}

async function loginToBluesky(agent: AtpAgent, maxRetries = 3, delay = 5000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await agent.login({
        identifier: process.env.BSKY_EMAIL as string,
        password: process.env.BSKY_PASSWORD as string,
      })
      console.log('Successfully logged in to Bluesky')
      return
    } catch (error) {
      console.error(`Login attempt ${attempt} failed:`, error)
      if (attempt === maxRetries) {
        throw new Error(`Failed to login after ${maxRetries} attempts`)
      }
      console.log(`Retrying in ${delay / 1000} seconds...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

async function fetchRoles(supabaseClient: any): Promise<Role[]> {
  const { data, error } = await supabaseClient
    .from('Roles')
    .select(
      'id, title, description, currency, salary, company, country, language, url'
    )
    .eq('ready', true)

  if (error) {
    throw new Error(`Error fetching records: ${error.message}`)
  }

  return data
}

function processRoles(roles: Role[]): Post[] {
  const processedPosts = roles.map((role) => {
    const salary = parseSalary(role.salary, role.currency)
    return {
      id: role.id,
      title: role.title,
      salary: salary,
      company: role.company,
      country: role.country,
      language: role.language,
      url: role.url,
    }
  })

  const validSalaryPosts = processedPosts.filter(
    (post) => post.salary.min > 0 || post.salary.max > 0
  )

  const sortedPosts = validSalaryPosts.sort(
    (a, b) => (b.salary.max || b.salary.min) - (a.salary.max || a.salary.min)
  )

  const selectedPosts = sortedPosts.slice(0, 10)

  console.log(`Selected posts for publishing: ${selectedPosts.length}`)

  return selectedPosts
}

function parseSalary(salaryString: string | null, currency: string): Salary {
  if (!salaryString) {
    return { min: 0, max: 0, currency, period: '' }
  }

  const regexes = [
    /From\s*(\$?[\d,.]+)\s*to\s*(\$?[\d,.]+)\s*(USD|EUR|GBP|BRL)?\/?(yearly|monthly|hourly|annual)?/i,
    /(\$?[\d,.]+)\s*-\s*(\$?[\d,.]+)\s*(USD|EUR|GBP|BRL)?\/?(yearly|monthly|hourly|annual)?/i,
    /(\$?[\d,.]+)\s*(USD|EUR|GBP|BRL)?\/?(yearly|monthly|hourly|annual)?/i,
    /Up to (\$?[\d,.]+)\s*(USD|EUR|GBP|BRL)?\/?(yearly|monthly|hourly|annual)?/i,
  ]

  for (const regex of regexes) {
    const match = salaryString.match(regex)
    if (match) {
      const min = parseFloat(match[1].replace(/[$,]/g, ''))
      const max = match[2]
        ? parseFloat(match[2].replace(/[$,]/g, ''))
        : match[0].toLowerCase().startsWith('up to')
        ? min
        : min
      const detectedCurrency = match[3] || currency
      const period = match[4] ? `/${match[4].toLowerCase()}` : ''

      return { min, max, currency: detectedCurrency, period }
    }
  }

  return { min: 0, max: 0, currency, period: '' }
}

function formatSalary(salary: Salary): string {
  if (salary.min === 0 && salary.max === 0) return 'Não informado'

  const formatNumber = (num: number) =>
    num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  if (salary.min === salary.max) {
    return `${formatNumber(salary.min)} ${salary.currency}${salary.period}`
  }

  return `${formatNumber(salary.min)} - ${formatNumber(salary.max)} ${
    salary.currency
  }${salary.period}`
}

function createRichText(post: Post): RichText {
  const countryText =
    post.country !== 'International' && post.country !== 'Global'
      ? `País: ${post.country}\n`
      : ''
  const languageText =
    post.language === 'Portuguese'
      ? 'Português'
      : post.language === 'English'
      ? 'Inglês'
      : post.language
  const redirectUrl = trackedRoleURL(post.id)

  const maxTitleLength = 50
  const truncatedTitle =
    post.title.length > maxTitleLength
      ? post.title.slice(0, maxTitleLength - 3) + '...'
      : post.title

  let text =
    `Cargo: ${truncatedTitle}\n` +
    `Empresa: ${post.company}\n` +
    countryText +
    `Idioma: ${languageText}\n` +
    `Remoto: 100%\n` +
    `Salário: ${formatSalary(post.salary)}\n\n` +
    `Se encaixou no perfil? (${redirectUrl})\n\n` +
    `@louisfp0.bsky.social`

  if (text.length > 300) {
    const ellipsis = '...'
    const availableSpace = 297 - redirectUrl.length - ellipsis.length
    const truncatedContent = text.slice(0, availableSpace)

    const lastNewlineIndex = truncatedContent.lastIndexOf('\n')
    text =
      truncatedContent.slice(0, lastNewlineIndex) +
      ellipsis +
      '\n' +
      redirectUrl
  }

  return new RichText({ text })
}

async function createSinglePost(agent: AtpAgent, post: Post) {
  const richText = createRichText(post)
  await richText.detectFacets(agent)

  const postRecord = {
    $type: 'app.bsky.feed.post',
    text: richText.text,
    facets: richText.facets,
    createdAt: new Date().toISOString(),
  }

  await agent.post(postRecord)
}

function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

createPost()
