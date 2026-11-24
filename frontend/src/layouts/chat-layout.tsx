import {
  AppShell,
  Burger,
  Drawer,
  ScrollArea,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'

export function ChatLayout() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <AppShell
      navbar={{
        width: 'clamp(260px, 25vw, 320px)',
        breakpoint: 'sm',
        collapsed: {
          mobile: true,
        },
      }}
      padding={0}
      styles={{
        root: {
          height: '100dvh',
          overflow: 'hidden',
        },
        main: {
          height: '100%',
          minWidth: 0,
          overflow: 'hidden',
        },
        navbar: {
          height: '100%',
        },
      }}
    >
      {/* Desktop sidebar */}
      <AppShell.Navbar>
        <ScrollArea h='100%' type='auto'>
          {/* Chat list */}
        </ScrollArea>
      </AppShell.Navbar>

      {/* Mobile sidebar */}
      <Drawer
        opened={opened}
        onClose={close}
        size='min(320px, 85vw)'
        padding={0}
        withCloseButton={false}
        title={null}
        position='left'
      >
        <ScrollArea h='100%'>
          {/* Chat list */}
        </ScrollArea>
      </Drawer>

      <AppShell.Main>
        <Burger
          opened={opened}
          onClick={opened ? close : open}
          hiddenFrom='sm'
          size='sm'
          m='sm'
          aria-label='Toggle chat sidebar'
        />

        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}