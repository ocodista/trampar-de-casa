import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const envVarsSchema = z.object({
  RABBITMQ_ADDRESS: z.string().min(1),
  EMAIL_BATCH_SIZE: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 14)),
})

export const CONFIG = envVarsSchema.parse({
  RABBITMQ_ADDRESS: process.env['RABBITMQ_ADDRESS'],
  EMAIL_BATCH_SIZE: process.env['EMAIL_BATCH_SIZE'],
})
