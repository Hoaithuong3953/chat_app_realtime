import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

import env from '@/config/env'
import type {ApiErrorResponse, ApiSuccessResponse} from '@/types/api'
import type {RefreshTokenData} from '@/types/auth'
import {tokenStorage} from '@/utils/storage'
import {normalizeApiError} from './errors'
import {API_ENDPOINTS} from './endpoints'

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15_000,
})

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const response = await apiClient.post<
    ApiSuccessResponse<RefreshTokenData>
  >(API_ENDPOINTS.AUTH.REFRESH)

  const accessToken = response.data.data?.access_token

  if (!accessToken) {
    throw new Error('Refresh response does not contain access_token.')
  }

  tokenStorage.setAccessToken(accessToken)

  return accessToken
}

function handleRefreshFailure(): void {
  tokenStorage.removeAccessToken()
}

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = tokenStorage.getAccessToken()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(normalizeApiError(error)),
)

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as
      | RetryableRequestConfig
      | undefined

    if (!originalRequest) {
      return Promise.reject(normalizeApiError(error))
    }

    const statusCode = error.response?.status

    const isRefreshRequest =
      originalRequest.url === API_ENDPOINTS.AUTH.REFRESH

    const shouldRefresh =
      statusCode === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest

    if (!shouldRefresh) {
      return Promise.reject(normalizeApiError(error))
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null
        })
      }

      const newAccessToken = await refreshPromise

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`

      return apiClient(originalRequest)
    } catch (refreshError) {
      handleRefreshFailure()

      return Promise.reject(
        normalizeApiError(refreshError),
      )
    }
  },
)