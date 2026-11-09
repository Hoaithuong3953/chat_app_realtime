import { formatLogDateTime } from "./date";

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

const styles: Record<LogLevel, string> = {
    DEBUG: "color: #7f8c8d; font-weight: 500",
    INFO: "color: #2ecc71; font-weight: bold",
    WARN: "color: #f1c40f; font-weight: bold",
    ERROR: "color: #e74c3c; font-weight: bold",
}

const createPrefix = (level: LogLevel): string => {
    return `[${formatLogDateTime()}] [${level}]`
}

const log = (level: LogLevel, message: string, ...params: unknown[]): void => {
    const prefix = createPrefix(level)

    switch (level){
        case 'DEBUG':
            console.debug(`%c${prefix} ${message}`, styles.DEBUG, ...params)
            break

        case "INFO":
            console.info(`%c${prefix} ${message}`, styles.INFO, ...params)
            break

        case "WARN":
            console.warn(`%c${prefix} ${message}`, styles.WARN, ...params)
            break

        case "ERROR":
            console.error(`%c${prefix} ${message}`, styles.ERROR, ...params)
            break
    }
}

export const logger = {
    debug: (message: string, ...params: unknown[]) => log('DEBUG', message, ...params),
    info: (message: string, ...params: unknown[]) => log('INFO', message, ...params),
    warn: (message: string, ...params: unknown[]) => log('WARN', message, ...params),
    error: (message: string, ...params: unknown[]) => log('ERROR', message, ...params),
}