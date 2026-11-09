import { Center, Paper } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <Center mih="100vh" px="md" bg="var(--mantine-color-gray-0)">
      <Paper w="100%" maw={480} p="xl" radius="md" withBorder shadow="sm">
        <Outlet/>
      </Paper>
    </Center>
  )
}