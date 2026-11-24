import {z} from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.url().refine(
    (url) => ['http:', 'https:'].includes(new URL(url).protocol),
    'API URL must use HTTP or HTTPS',
  ),

  VITE_WS_URL: z.url().refine(
    (url) => ['ws:', 'wss:'].includes(new URL(url).protocol),
    'WebSocket URL must use WS or WSS',
  ),
});

const parsedEnv = envSchema.parse(import.meta.env)

const env = {
  apiUrl: parsedEnv.VITE_API_URL,
  wsUrl: parsedEnv.VITE_WS_URL,
  
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const

export default env