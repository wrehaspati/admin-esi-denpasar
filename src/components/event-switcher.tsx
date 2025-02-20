"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import { IEvent } from "@/types/event"
import { AppIcon } from "./app-icon"

export function EventSwitcher({
  event, isAdmin
}: {
  event: IEvent[],
  isAdmin: boolean
}) {
  const { isMobile } = useSidebar()
  const { activeEvent, setActiveEvent } = useUser()

  React.useEffect(() => {
    if (!activeEvent && event.length > 0) {
      setActiveEvent(event[0])
    }
  }, [activeEvent, event, setActiveEvent])

  if (!activeEvent && event.length > 0) return null
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <AppIcon className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeEvent?.name}
                </span>
                <span className="truncate text-xs">
                  {isAdmin ? "Admin ESI" : "Event Organizer"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Event switcher
            </DropdownMenuLabel>
            {event.map((event) => (
              <DropdownMenuItem
                key={event.name}
                onClick={() => setActiveEvent(event)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <AppIcon className="size-4 shrink-0" />
                </div>
                {event.name}
              </DropdownMenuItem>
            ))}
            {/* Account Switcher Add */}
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add account</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
