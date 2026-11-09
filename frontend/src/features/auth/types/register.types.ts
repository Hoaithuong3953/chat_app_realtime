export interface RegisterFormValues {
    fullName: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface RegisterRequestDto {
    full_name: string
    username: string
    email: string
    password: string
}

export interface RegisterResponseDto {
    account_id: string
    
}