export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export interface LogContext {
  [key: string]: unknown
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  environment: string
  location: string
  message: string
  context?: LogContext
  error?: unknown
}

export interface LoggerOptions {
  minLevel?: LogLevel
  enableConsole?: boolean
}
