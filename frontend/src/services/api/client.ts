import axios from 'axios'

import env from '@/config/env'
import { setupRequestInterceptor } from './interceptors/request.interceptor'
import { setupResponseInterceptor } from './interceptors/response.interceptor'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15_000,
})

setupRequestInterceptor(apiClient)
setupResponseInterceptor(apiClient)