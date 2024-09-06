import dotenv from 'dotenv'
import { AtpAgent, RichText } from '@atproto/api'
import { getSupabaseClient } from 'db'

dotenv.config()

async function createPost() {
  const supabaseClient = getSupabaseClient()
  const agent = new AtpAgent({
    service: 'https://bsky.social',
  })

  await agent.login({
    identifier: process.env.IDENTIFIER as string,
    password: process.env.PASSWORD as string,
  })

  try {
    const records = await supabaseClient
      .from('Roles')
      .select('title, description, currency, company, country, language, url')
      .eq('ready', true)

    if (records.error) {
      console.error('Erro ao buscar registros:', records.error)
      return
    }

    const posts = records.data
      .map((record: any) => {
        const extractSalaries = (
          description: string
        ): { salary: number; period: string }[] => {
          const regex =
            /(\d{1,3}(?:\.\d{3})*(?:,\d{2})?|\d+)\s*(?:mil|milhão|milhões|bi|bilhão|bilhões|k|kilo|t|trilhão|trilhões)?\s*(?:US\$|R\$|USD|EUR)?(?:\s*\/(ano|mês))?/g
          const matches = [...description.matchAll(regex)]

          if (matches.length === 0) return []

          return matches.map((match) => {
            const value = match[1]
              .replace(/[^\d,]/g, '')
              .replace(/\.(?=.*\d)/g, '')
              .replace(',', '.')
            const salary = parseFloat(value)
            const period = match[2] ? `/${match[2]}` : ''
            return { salary, period }
          })
        }

        const salaries = extractSalaries(record.description)
        const maxSalary =
          salaries.length > 0
            ? salaries.reduce((prev, curr) =>
                prev.salary > curr.salary ? prev : curr
              )
            : { salary: 0, period: '' }

        return {
          title: record.title,
          salary: maxSalary.salary,
          currency: record.currency,
          period: maxSalary.period,
          company: record.company,
          country: record.country,
          language: record.language,
          url: record.url,
        }
      })
      .sort((a, b) => b.salary - a.salary) // Ordena do maior para o menor salário
      .slice(0, 10) // Seleciona os 10 maiores salários

    for (const post of posts) {
      const rt = new RichText({
        text:
          `Cargo: ${post.title}\n` +
          `Empresa: ${post.company}\n` +
          `País: ${post.country}\n` +
          `Idioma: ${post.language}\n` +
          `Remoto: 100%\n` +
          `Salário: ${post.salary.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${post.currency}${post.period}\n\n` +
          `Se encaixou no perfil? (${post.url})\n\n` +
          `@louisfp0.bsky.social`,
      })

      await rt.detectFacets(agent)

      const postRecord = {
        $type: 'app.bsky.feed.post',
        text: rt.text,
        facets: rt.facets,
        createdAt: new Date().toISOString(),
      }

      await createPostOnBluesky(postRecord)
    }
  } catch (error) {
    console.error('Erro ao criar post:', error)
  }
}

async function createPostOnBluesky(postRecord: any) {
  const agent = new AtpAgent({
    service: 'https://bsky.social',
  })

  await agent.login({
    identifier: process.env.IDENTIFIER as string,
    password: process.env.PASSWORD as string,
  })

  try {
    await agent.post(postRecord)
    console.log('Post criado com sucesso')
  } catch (error) {
    console.error('Erro ao criar post:', error)
  }
}

createPost()
