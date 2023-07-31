import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envVarsSchema = z.object({
  RABBITMQ_USER: z.string().min(1),
  RABBITMQ_PASS: z.string().min(1),
  URL_PREFIX: z.string().min(1),
})

export const CONFIG = envVarsSchema.parse({
  RABBITMQ_USER: process.env['RABBITMQ_DEFAULT_USER'],
  RABBITMQ_PASS: process.env['RABBITMQ_DEFAULT_PASS'],
  URL_PREFIX: process.env['URL_PREFIX'],
})
