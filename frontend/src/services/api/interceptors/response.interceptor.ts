import type { AxiosError, AxiosInstance } from 'axios'

import { normalizeApiError } from '@/services/api/errors'
import { logger } from '@/utils/logger'

export const setupResponseInterceptor = (
  client: AxiosInstance,
): void => {
  client.interceptors.response.use(
    (response) => {
      logger.debug('API response received', {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
      })

      return response
    },
    (error: AxiosError) => {
      logger.error('API request failed', error, {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        status: error.response?.status,
      })

      return Promise.reject(normalizeApiError(error))
    },
  )
}