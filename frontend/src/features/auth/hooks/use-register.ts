import { useMutation } from '@tanstack/react-query'
import { registerService } from '@/features/auth/auth.service'
import type { ApiError } from '@/services/api'
import type { RegisterFormValues } from '@/features/auth/schemas'
import type { RegisterResponseDto } from '@/features/auth/types'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'

export function useRegister() {
  const {t} = useTranslation('auth/register')
  const {t: tCommon} = useTranslation('common')

  return useMutation<RegisterResponseDto, ApiError, RegisterFormValues>({
    mutationFn: registerService,
    onSuccess: () => {
      notify.success({
        message: t('success')
      })
    },
    onError(error) {
      notify.error({
        message: t(`errors.${error.errorCode}`, {
          defaultValue: tCommon('errors.UNKNOWN_ERROR')
        })
      })
    },
  })
}