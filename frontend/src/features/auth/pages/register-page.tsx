import { Stack, Title, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useRegister } from '@/features/auth/hooks'
import { RegisterForm } from '@/features/auth/components'

export function RegisterPage() {
  const { t } = useTranslation('auth/register')
  const { mutate, isPending } = useRegister()

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

      <RegisterForm
        onSubmit={mutate}
        isPending={isPending}
      />
    </Stack>
  )
}