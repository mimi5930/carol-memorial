import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .regex(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
    ),
  message: z.string().min(1)
})
