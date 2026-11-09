import axios from 'axios'

import type { ApiErrorResponse } from '@/types/api'

export class ApiError extends Error {
  readonly statusCode?: number
  readonly errorCode?: string
  readonly details?: Record<string, unknown>

  constructor(
    message: string,
    options?: {
      statusCode?: number
      errorCode?: string
      details?: Record<string, unknown>
    },
  ) {
    super(message)

    this.name = 'ApiError'
    this.statusCode = options?.statusCode
    this.errorCode = options?.errorCode
    this.details = options?.details
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response

    if (response?.data) {
      return new ApiError(
        response.data.message ?? 'Something went wrong.',
        {
          statusCode: response.status,
          errorCode: response.data.error_code,
          details: response.data.details,
        },
      )
    }

    if (response) {
      return new ApiError(
        `Request failed with status ${response.status}.`,
        {
          statusCode: response.status,
        },
      )
    }

    if (error.code === 'ERR_NETWORK') {
      return new ApiError('Unable to connect to the server.')
    }

    if (error.code === 'ECONNABORTED') {
      return new ApiError('The request timed out.')
    }

    return new ApiError(error.message)
  }

  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  return new ApiError('An unexpected error occurred.')
}