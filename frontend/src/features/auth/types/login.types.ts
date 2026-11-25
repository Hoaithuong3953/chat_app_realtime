export type LoginRequestDto = {
  identifier: string
  password: string
}

export type LoginResponseDto = {
  access_token: string,
}