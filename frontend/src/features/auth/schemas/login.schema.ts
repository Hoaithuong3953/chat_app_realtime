import {z} from 'zod'
import type { TFunction } from 'i18next'

export const createLoginSchema = (
  tAuth: TFunction,
  tCommon: TFunction,
) =>z.object({
  identifier: z
    .string()
    .trim()
    .min(1, tCommon('validation.required', {
      field: tAuth('fields.identifier'),
    })),
  password: z
    .string()
    .min(1, tCommon('validation.required', {
      field: tAuth('fields.password'),
    })),
})

export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginSchema>
>