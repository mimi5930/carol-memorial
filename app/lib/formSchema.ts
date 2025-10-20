import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .min(1, 'Please enter your email.')
    .regex(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      'Something appears to be wrong with the email'
    ),
  message: z.string().min(1, 'Please write a message to send.'),
  // fake input
  firstName: z.string().optional()
})

export const memoryFormSchema = z.object({
  message: z.string().min(1, { message: 'Must contain at least 1 character' })
})

export const memoryFormUpdateSchema = z.object({
  message: z.string().min(1, { message: 'Must contain at least 1 character' }),
  postId: z.string()
})
