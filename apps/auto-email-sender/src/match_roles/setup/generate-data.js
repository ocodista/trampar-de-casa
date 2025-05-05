// Data generation script for match_roles
const { Client } = require('pg')
const fs = require('fs')
const path = require('path')
const { Parser } = require('json2csv')

// Get database configuration from environment variables
const postgresUrl =
  process.env.POSTGRES_URL ||
  'postgresql://postgres:postgres@postgres:5432/trampar-de-casa'

// Function to generate CSV from data
const generateCsv = async (data, filePath) => {
  if (!data || !data.length) {
    console.error(`No data to generate CSV for ${filePath}`)
    return false
  }

  try {
    const parser = new Parser()
    const csv = parser.parse(data)
    const absolutePath = path.resolve('/app/data', filePath)

    // Ensure directory exists
    const dir = path.dirname(absolutePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(absolutePath, csv)
    console.log(`Generated ${filePath} successfully`)
    return true
  } catch (error) {
    console.error(`Error generating ${filePath}:`, error)
    return false
  }
}

// Main function to generate all required data
const setupData = async () => {
  console.log('Starting data generation...')
  console.log(
    `Using database connection: ${postgresUrl.replace(/:[^:]*@/, ':****@')}`
  )

  const client = new Client({ connectionString: postgresUrl })

  try {
    // Connect to database
    await client.connect()
    console.log('Connected to PostgreSQL database')

    // Get roles data
    console.log('Fetching roles from database...')
    const rolesResult = await client.query(
      'SELECT * FROM "Roles" WHERE ready = true'
    )
    console.log(`Found ${rolesResult.rows.length} roles`)

    if (rolesResult.rows.length === 0) {
      throw new Error('No roles found in database')
    }
    await generateCsv(rolesResult.rows, 'roles.csv')

    // Get skills data
    console.log('Fetching skills from database...')
    const skillsResult = await client.query('SELECT * FROM "Skills"')
    console.log(`Found ${skillsResult.rows.length} skills`)

    if (skillsResult.rows.length === 0) {
      throw new Error('No skills found in database')
    }
    await generateCsv(skillsResult.rows, 'skills.csv')

    console.log('Data generation completed successfully')
  } catch (error) {
    console.error('Error during data generation:', error)
    process.exit(1)
  } finally {
    // Close the database connection
    await client.end()
  }
}

// Execute the setup
setupData()
