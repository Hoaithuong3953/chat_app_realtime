import { useMutation } from '@tanstack/react-query'
import { loginService } from '@/features/auth/auth.service'
import { ApiError } from '@/services/api'
import type {LoginFormValues} from '@/features/auth/schemas'
import type {LoginResponseDto} from '@/features/auth/types'
import { notify } from '@/utils/notify'
import { useTranslation } from 'react-i18next'

export function useLogin() {
  const {t}= useTranslation('auth/login')
  const {t: tCommon} = useTranslation('common')

  return useMutation<
    LoginResponseDto,
    ApiError,
    LoginFormValues
  >({
    mutationFn: loginService,
    onSuccess() {
      notify.success({message: t('success')})
    },
    onError(error) {
      notify.error({
        message: t(`errors.${error.errorCode}`, {
          defaultValue: tCommon('errors.UNKNOWN_ERROR')
        })
      })
    }
  })
}