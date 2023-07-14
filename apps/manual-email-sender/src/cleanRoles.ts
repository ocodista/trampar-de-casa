import fs from 'fs'

interface Role {
  skills: string[]
  description?: string
  headerInfo: string
  salary?: string
}

// Read and parse roles.json file
const roles: Role[] = JSON.parse(fs.readFileSync('roles.json', 'utf8'))

// Process each role
const processedRoles = roles.reduce((acc: Role[], role: Role) => {
  // Ignore roles without skills or with empty skills array
  if (!role.skills || role.skills.length === 0) {
    return acc
  }

  // Remove the description property
  const { description, ...roleWithoutDescription } = role

  // Trim skills array to maximum 5 items
  roleWithoutDescription.skills = roleWithoutDescription.skills.slice(0, 5)

  // Add salary to the headerInfo if present
  if (roleWithoutDescription.salary) {
    roleWithoutDescription.headerInfo = `${roleWithoutDescription.headerInfo} (${roleWithoutDescription.salary})`
  }

  return [...acc, roleWithoutDescription]
}, [])

// Write new JSON list to cleanRoles.json
fs.writeFileSync(
  'cleanRoles.json',
  JSON.stringify(processedRoles, null, 2),
  'utf8'
)
