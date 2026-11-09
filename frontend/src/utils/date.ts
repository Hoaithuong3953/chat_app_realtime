import dayjs, { type ConfigType } from 'dayjs'

const TIME_FORMAT = 'HH:mm'
const DATE_FORMAT = 'DD/MM'
const FULL_DATE_FORMAT = 'DD/MM/YYYY'
const SHORT_FULL_DATE_FORMAT = 'DD/MM/YY'
const LOG_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss'

/**
 * Format time for conversation list
 *
 * < 1 minute  → Just now
 * < 1 hour    → 45 minutes
 * Today       → 2 hours
 * Yesterday   → Yesterday
 * 2–6 days    → 5 days
 * Same year   → 20/09
 * Other year  → 20/09/25
 */
export const formatConversationTime = (
  value: ConfigType,
): string => {
  const date = dayjs(value)
  const now = dayjs()

  if (!date.isValid()) {
    return ''
  }

  const diffInMinutes = now.diff(date, 'minute')
  const diffInHours = now.diff(date, 'hour')
  const diffInDays = now.diff(date, 'day')

  if (diffInMinutes < 1) {
    return 'Just now'
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes`
  }

  if (date.isSame(now, 'day')) {
    return `${diffInHours} hours`
  }

  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday'
  }

  if (diffInDays < 7) {
    return `${diffInDays} days`
  }

  if (date.isSame(now, 'year')) {
    return date.format(DATE_FORMAT)
  }

  return date.format(SHORT_FULL_DATE_FORMAT)
}

/**
 * Format time for messages inside a conversation
 *
 * Today     → 14:32
 * Yesterday → 14:32 yesterday
 * Older     → 14:32 25/09/2026
 */
export const formatMessageTime = (
  value: ConfigType,
): string => {
  const date = dayjs(value)
  const now = dayjs()

  if (!date.isValid()) {
    return ''
  }

  if (date.isSame(now, 'day')) {
    return date.format(TIME_FORMAT)
  }

  if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return `${date.format(TIME_FORMAT)} yesterday`
  }

  return date.format(`${TIME_FORMAT} ${FULL_DATE_FORMAT}`)
}

/**
 * Format timestamp for frontend logs
 *
 * Example:
 * 27/09/2026 14:32:15
 */
export const formatLogDateTime = (
  value: ConfigType = undefined,
): string => {
  const date = dayjs(value)

  if (!date.isValid()) {
    return ''
  }

  return date.format(LOG_DATE_TIME_FORMAT)
}