import type { ApiSuccessResponse } from './api'

export interface RefreshTokenData {
  access_token: string
}

export type RefreshTokenResponse =
  ApiSuccessResponse<RefreshTokenData>