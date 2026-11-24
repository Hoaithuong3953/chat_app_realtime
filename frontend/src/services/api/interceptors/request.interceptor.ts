import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { logger } from '@/utils/logger'

type AccessTokenGetter = () => string | null

let getAccessToken: AccessTokenGetter = () => null

export const setAccessTokenGetter = (
  getter: AccessTokenGetter,
): void => {
  getAccessToken = getter
}

export const setupRequestInterceptor = (
  client: AxiosInstance,
): void => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = getAccessToken()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      logger.debug('Sending API request', {
        method: config.method?.toUpperCase(),
        url: config.url,
      })

      return config
    },
    (error: unknown) => {
      logger.error('Failed to prepare API request', error)
      return Promise.reject(error)
    },
  )
}