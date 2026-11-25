import { apiClient } from '@/services/api'
import type { ApiSuccessResponse } from '@/types'
import {AUTH_ENDPOINTS} from '@/api/endpoints'

import type {
  RegisterRequestDto,
  RegisterResponseDto,
  LoginRequestDto,
  LoginResponseDto,
} from '@/features/auth/types'

export const authApi = {
  register: (payload: RegisterRequestDto) => 
    apiClient.post<ApiSuccessResponse<RegisterResponseDto>>(
      AUTH_ENDPOINTS.REGISTER,
      payload,
    ),
  login: (payload: LoginRequestDto) =>
    apiClient.post<ApiSuccessResponse<LoginResponseDto>>(
      AUTH_ENDPOINTS.LOGIN,
      payload,
    ),
}