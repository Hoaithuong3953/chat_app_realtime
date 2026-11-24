import { formatLogDateTime } from '@/utils/date'
import type { LogEntry } from '@/types'
import env from '@/config/env'

export const getCallerLocation = (): string => {
  const stack = new Error().stack

  if (!stack) return 'unknown'

  const lines = stack.split('\n')

  for (const line of lines.slice(1)) {
    const match = line.match(/(?:https?:\/\/[^/]+)?\/src\/(.+?):\d+:\d+/)

    if (!match) continue

    const location = match[1].split('?')[0]

    if (location.includes('utils/logger/')) continue

    return location
  }

  return 'unknown'
}

export const createLogEntry = (
  entry: Omit<LogEntry, 'timestamp' | 'environment' | 'location'>,
): LogEntry => ({
  ...entry,
  timestamp: formatLogDateTime(),
  environment: env.mode,
  location: getCallerLocation(),
})

export const formatLogEntry = (entry: LogEntry): string => {
  const parts = [
    entry.timestamp,
    entry.level,
    entry.environment,
    entry.location,
  ]

  return `${parts.map((part) => `[${part}]`).join(' ')} ${entry.message}`
}
