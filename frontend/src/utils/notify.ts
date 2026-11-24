import i18n from '@/i18n'
import { notifications } from '@mantine/notifications'

type NotificationOptions = {
    title?: string
    message: string
}

export const notify = {
    success: ({title, message}: NotificationOptions) => {
        notifications.show({
            title: title ?? i18n.t('messages.success', {ns: 'common'}),
            message,
            color: 'green',
        })
    },

    error: ({title, message}: NotificationOptions) => {
        notifications.show({
            title: title ?? i18n.t('messages.error', {ns: 'common'}),
            message,
            color: 'red',
        })
    },

    warning: ({title, message}: NotificationOptions) => {
        notifications.show({
            title: title ?? i18n.t('messages.warning', {ns: 'common'}),
            message,
            color: 'yellow',
        })
    },

    info: ({title, message}: NotificationOptions) => {
        notifications.show({
            title: title ?? i18n.t('messages.info', {ns: 'common'}),
            message,
            color: 'blue',
        })
    },
}