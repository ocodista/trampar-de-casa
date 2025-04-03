import { getPostgresClient } from './src/postgres/getPostgresClient'

const deleteSKills = [
  {
    id: 78,
    name: 'MongoDB',
    replaceFor: 432
  },
  {
    id: 289,
    name: 'Swift',
    replaceFor: 122
  }
] as const

  ; (async () => {
    const postgres = getPostgresClient()
    const promises = deleteSKills.map(async ({ id, replaceFor }) => {
      const result = await postgres.query(
        'SELECT replace_skills($1, $2)',
        [id, replaceFor]
      )
      if (result.rowCount === 0) {
        console.log('Failed to update skill')
        return
      }
      console.info("updated successfully!")
    })

    await Promise.all(promises)
  })()