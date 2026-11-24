import {
  AppShell,
  Burger,
  ScrollArea,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      navbar={{
        width: 'clamp(240px, 20vw, 280px)',
        breakpoint: 'sm',
        collapsed: {
          mobile: !opened,
        },
      }}
      header={{
        height: 64,
      }}
      padding="md"
      styles={{
        root: {
          minHeight: '100dvh',
        },
        navbar: {
          overflow: 'hidden',
        },
        header: {
          display: 'flex',
          alignItems: 'center',
        },
        main: {
          minWidth: 0,
        },
      }}
    >
      <AppShell.Navbar>
        <ScrollArea h="100%" type="auto">
          {/* Admin sidebar */}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          ml="md"
        />

        {/* Admin header */}
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}