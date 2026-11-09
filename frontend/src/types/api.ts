export interface ApiSuccessResponse<T = unknown> {
  status: 'success'
  message?: string
  data?: T
}

export interface ApiErrorResponse {
  status: 'error'
  error_code?: string
  message?: string
  details?: Record<string, unknown>
}

export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse