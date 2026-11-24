import { LOGGER_CONFIG, LOG_LEVEL_PRIORITY, LOG_LEVEL_STYLES } from '@/config/logger.config'
import { createLogEntry, formatLogEntry } from './logger-formatter'
import type { LogContext, LogLevel } from '@/types'

const shouldLog = (level: LogLevel): boolean => {
  return (
    LOGGER_CONFIG.enableConsole &&
    LOG_LEVEL_PRIORITY[level] >=
      LOG_LEVEL_PRIORITY[LOGGER_CONFIG.minLevel]
  )
}

const writeLog = (
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: unknown,
): void => {
  if (!shouldLog(level)) return

  const entry = createLogEntry({
    level,
    message,
    context,
    error,
  })

  const method = {
    DEBUG: console.debug,
    INFO: console.info,
    WARN: console.warn,
    ERROR: console.error,
  }[level]

  method(
    `%c${formatLogEntry(entry)}`,
    LOG_LEVEL_STYLES[level],
    ...(context ? [context] : []),
    ...(error !== undefined ? [error] : []),
  )
}

export const logger = {
  debug: (message: string, context?: LogContext): void =>
    writeLog('DEBUG', message, context),

  info: (message: string, context?: LogContext): void =>
    writeLog('INFO', message, context),

  warn: (message: string, context?: LogContext): void =>
    writeLog('WARN', message, context),

  error: (
    message: string,
    error?: unknown,
    context?: LogContext,
  ): void => writeLog('ERROR', message, context, error),
}