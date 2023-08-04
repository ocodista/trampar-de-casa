import { rolesRenderer } from './rolesRenderer'

rolesRenderer().catch((err) => {
  console.log('roles-renderer service error:', err)
})
