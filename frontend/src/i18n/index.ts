import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import viCommon from '@/i18n/locales/vi/common.json'
import viRegister from './locales/vi/auth/register.json'
import viLogin from './locales/vi/auth/login.json'

import enCommon from '@/i18n/locales/en/common.json'
import enRegister from './locales/en/auth/register.json'
import enLogin from './locales/en/auth/login.json'

const resources = {
  vi: {
    common: viCommon,
    'auth/register': viRegister,
    'auth/login': viLogin,
  },
  en: {
    common: enCommon,
    'auth/register': enRegister,
    'auth/login': enLogin,
  },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
})

export default i18n