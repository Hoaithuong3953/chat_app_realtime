import { AppShell, ScrollArea } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <AppShell
      navbar={{
        width: 260,
        breakpoint: 'sm',
      }}
      header={{
        height: 64,
      }}
    >
      <AppShell.Navbar>
        <ScrollArea h="100%">
          {/* Admin sidebar */}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Header>
        {/* Admin header */}
      </AppShell.Header>

      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  )
}