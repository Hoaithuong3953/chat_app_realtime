import {z} from 'zod'
import type {TFunction} from 'i18next'

import {REGISTER_LIMITS} from '@/features/auth/auth.constants'

export const createRegisterSchema = (
  tAuth: TFunction,
  tCommon: TFunction,
) =>
  z.object({
    fullName: z
      .string()
      .trim()
      .min(
        1,
        tCommon('validation.required', {
          field: tAuth('fields.fullName'),
        }),
      )
      .max(
        REGISTER_LIMITS.FULL_NAME_MAX_LENGTH,
        tCommon('validation.max', {
          field: tAuth('fields.fullName'),
          count: REGISTER_LIMITS.FULL_NAME_MAX_LENGTH,
        }),
      ),

    username: z
      .string()
      .trim()
      .min(
        1,
        tCommon('validation.required', {
          field: tAuth('fields.username'),
        }),
      )
      .min(
        REGISTER_LIMITS.USERNAME_MIN_LENGTH,
        tCommon('validation.min', {
          field: tAuth('fields.username'),
          count: REGISTER_LIMITS.USERNAME_MIN_LENGTH,
        }),
      )
      .max(
        REGISTER_LIMITS.USERNAME_MAX_LENGTH,
        tCommon('validation.max', {
          field: tAuth('fields.username'),
          count: REGISTER_LIMITS.USERNAME_MAX_LENGTH,
        }),
      )
      .regex(
        /^[A-Za-z][A-Za-z0-9._-]*$/,
        tAuth('validation.usernameFormat'),
      ),

    email: z
      .string()
      .trim()
      .min(
        1,
        tCommon('validation.required', {
          field: tAuth('fields.email'),
        }),
      )
      .pipe(
        z.email(tAuth('validation.email')),
      ),

    password: z
      .string()
      .min(
        1,
        tCommon('validation.required', {
          field: tAuth('fields.password'),
        }),
      )
      .min(
        REGISTER_LIMITS.PASSWORD_MIN_LENGTH,
        tCommon('validation.min', {
          field: tAuth('fields.password'),
          count: REGISTER_LIMITS.PASSWORD_MIN_LENGTH,
        }),
      )
      .regex(
        /[A-Z]/,
        tAuth('validation.passwordUppercase'),
      )
      .regex(
        /[a-z]/,
        tAuth('validation.passwordLowercase'),
      )
      .regex(
        /[0-9]/,
        tAuth('validation.passwordNumber'),
      )
      .regex(
        /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/,
        tAuth('validation.passwordSpecial'),
      ),

    confirmPassword: z
      .string()
      .min(
        1,
        tCommon('validation.required', {
          field: tAuth('fields.confirmPassword'),
        }),
      ),
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    {
      message: tAuth('validation.passwordMismatch'),
      path: ['confirmPassword'],
    },
  )

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>