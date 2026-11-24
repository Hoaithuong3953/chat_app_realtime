import { Box, Paper } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Box
      mih='100dvh'
      display='flex'
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      px='clamp(16px, 4vw, 32px)'
      py='xl'
      bg='var(--mantine-color-gray-0)'
    >
      <Paper
        w='100%'
        maw='28rem'
        p='clamp(20px, 5vw, 32px)'
        radius='lg'
        withBorder
        shadow='sm'
      >
        <Outlet />
      </Paper>
    </Box>
  )
}