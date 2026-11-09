import {z} from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_WS_URL: z.url(),
})

const parsedEnv = envSchema.parse(import.meta.env)

const env = {
  apiUrl: parsedEnv.VITE_API_URL,
  wsUrl: parsedEnv.VITE_WS_URL,
  
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const

export default env