import { Stack, Title, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useLogin } from '@/features/auth/hooks'
import { LoginForm } from '@/features/auth/components'

export function LoginPage() {
  const { t } = useTranslation('auth/login')
  const { mutate, isPending } = useLogin()

  return (
    <Stack gap='lg'>
      <Stack gap={4}>
        <Title order={2} ta='center'>
          {t('title')}
        </Title>

        <Text c='dimmed' size='sm' ta='center'>
          {t('description')}
        </Text>
      </Stack>

      <LoginForm
        onSubmit={mutate}
        isPending={isPending}
      />
    </Stack>
  )
}