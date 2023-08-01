import { rolesValidator } from './rolesValidator'

rolesValidator().catch((e) => console.log('Error on rolesValidator', e))
