import {Button, PasswordInput, Stack, TextInput} from '@mantine/core'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

import {
  createLoginSchema,
  type LoginFormValues,
} from '@/features/auth/schemas'

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  isPending: boolean
}

export function LoginForm({
  onSubmit,
  isPending,
}: LoginFormProps) {
  const {t: tAuth} = useTranslation('auth/login')
  const {t: tCommon} = useTranslation('common')

  const schema = useMemo(
    () => createLoginSchema(tAuth, tCommon),
    [tAuth, tCommon],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label={tAuth('fields.identifier')}
          placeholder={tAuth('placeholders.identifier')}
          withAsterisk
          {...register('identifier')}
          error={errors.identifier?.message}
          disabled={isPending}
        />

        <PasswordInput
          label={tAuth('fields.password')}
          placeholder={tAuth('placeholders.password')}
          withAsterisk
          {...register('password')}
          error={errors.password?.message}
          disabled={isPending}
        />

        <Button
          type="submit"
          loading={isPending}
          fullWidth
        >
          {tAuth('submit')}
        </Button>
      </Stack>
    </form>
  )
}