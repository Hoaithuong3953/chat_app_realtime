import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/notifications/styles.css'
import { queryClient } from '@/config/query-client'
import { theme } from '@/styles/theme'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
}