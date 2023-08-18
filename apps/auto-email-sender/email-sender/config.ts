import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envVarsSchema = z.object({
  RABBITMQ_USER: z.string().min(1),
  RABBITMQ_PASS: z.string().min(1),
  RESEND_KEY: z.string().min(1),
})

export const CONFIG = envVarsSchema.parse({
  RABBITMQ_USER: process.env['RABBITMQ_DEFAULT_USER'],
  RABBITMQ_PASS: process.env['RABBITMQ_DEFAULT_PASS'],
  RESEND_KEY: process.env['RESEND_KEY'],
})
