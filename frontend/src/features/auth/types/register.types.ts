export type AccountRole = 'user' | 'admin'

export interface RegisterRequestDto{
  full_name: string
  username: string
  email: string
  password: string
}

export interface RegisterResponseDto{
  id: string
  email: string
  username: string
  full_name: string
  role: AccountRole
  is_active: boolean
  created_at: string
}