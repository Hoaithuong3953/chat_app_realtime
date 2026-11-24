import {
  Button,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo } from 'react'

import {
  createRegisterSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas'

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
  isPending: boolean
}

export function RegisterForm({
  onSubmit,
  isPending,
}: RegisterFormProps) {
  const {t: tAuth} = useTranslation('auth/register')
  const {t: tCommon} = useTranslation('common')

  const schema = useMemo(
    () => createRegisterSchema(tAuth, tCommon),
    [tAuth, tCommon],
  )

  const {
    register,
    handleSubmit,
    trigger,
    formState: {errors, isSubmitted},
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (isSubmitted) {
      void trigger()
    }
  }, [isSubmitted, trigger])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap='md'>
        <TextInput
          label={tAuth('fields.fullName')}
          placeholder={tAuth('placeholders.fullName')}
          withAsterisk
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <TextInput
          label={tAuth('fields.username')}
          placeholder={tAuth('placeholders.username')}
          withAsterisk
          {...register('username')}
          error={errors.username?.message}
        />
        <TextInput
          label={tAuth('fields.email')}
          placeholder={tAuth('placeholders.email')}
          withAsterisk
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          label={tAuth('fields.password')}
          placeholder={tAuth('placeholders.password')}
          withAsterisk
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput
          label={tAuth('fields.confirmPassword')}
          placeholder={tAuth('placeholders.confirmPassword')}
          withAsterisk
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button
          type='submit'
          loading={isPending}
          disabled={isPending}
          fullWidth
        >
          {tAuth('submit')}
        </Button>
      </Stack>
    </form>
  )
}