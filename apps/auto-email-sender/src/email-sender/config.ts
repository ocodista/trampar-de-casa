import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envVarsSchema = z.object({
  RABBITMQ_ADDRESS: z.string().min(1),
  RESEND_KEY: z.string().min(1),
})

export const CONFIG = envVarsSchema.parse({
  RABBITMQ_ADDRESS: process.env['RABBITMQ_ADDRESS'],
  RESEND_KEY: process.env['RESEND_KEY'],
})
