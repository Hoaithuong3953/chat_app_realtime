import type {
  RegisterRequestDto,
  RegisterResponseDto,
  LoginRequestDto,
  LoginResponseDto,
} from '@/features/auth/types'
import type {RegisterFormValues, LoginFormValues} from '@/features/auth/schemas'
import { authApi } from '@/features/auth/auth.api'

export const registerService = async (values: RegisterFormValues): Promise<RegisterResponseDto> => {
  const payload: RegisterRequestDto = {
    full_name: values.fullName,
    username: values.username,
    email: values.email,
    password: values.password,
  }

  const {data} = await authApi.register(payload)

  return data.data
}

export const loginService = async (values: LoginFormValues): Promise<LoginResponseDto> => {
  const payload: LoginRequestDto = {
    identifier: values.identifier,
    password: values.password,
  }
  const {data} = await authApi.login(payload)
  return data.data
}