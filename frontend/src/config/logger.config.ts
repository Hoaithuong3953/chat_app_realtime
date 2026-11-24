import type { LogLevel, LoggerOptions } from '@/types'
import env from './env'

export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
}

export const LOG_LEVEL_STYLES: Record<LogLevel, string> = {
  DEBUG: 'color: #7f8c8d; font-weight: 500',
  INFO: 'color: #2ecc71; font-weight: bold',
  WARN: 'color: #f1c40f; font-weight: bold',
  ERROR: 'color: #e74c3c; font-weight: bold',
}

export const LOGGER_CONFIG: Required<LoggerOptions> = {
  minLevel: env.isProd ? 'INFO' : 'DEBUG',
  enableConsole: true,
}