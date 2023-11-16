import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envVarsSchema = z.object({
  RABBITMQ_USER: z.string().min(1),
  RABBITMQ_PASS: z.string().min(1),
})

export const CONFIG = (() => {
  const envObject = {
    RABBITMQ_USER: process.env['RABBITMQ_DEFAULT_USER'],
    RABBITMQ_PASS: process.env['RABBITMQ_DEFAULT_PASS'],
  } as z.infer<typeof envVarsSchema>
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.NODE_ENV === 'test') return envObject
  return envVarsSchema.parse(envObject)
})()
