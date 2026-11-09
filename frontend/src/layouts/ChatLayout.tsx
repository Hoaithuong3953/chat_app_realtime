import { AppShell, ScrollArea } from "@mantine/core";
import { Outlet } from "react-router-dom";

export function ChatLayout() {
  return (
    <AppShell
      navbar={{
        width: 320,
        breakpoint: 'sm',
      }}
      padding={0}
    >
      <AppShell.Navbar>
        <ScrollArea h="100%">
          {/* Chat list */}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  )
}