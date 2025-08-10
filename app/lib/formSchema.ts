import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .regex(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
    ),
  message: z.string().min(1)
})

export const memoryFormSchema = z.object({
  message: z.string().min(1)
})
