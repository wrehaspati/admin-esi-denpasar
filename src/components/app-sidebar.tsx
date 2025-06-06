"use client"

import * as React from "react"
import {
  Box,
  Gamepad2,
  HelpCircle,
  LayoutDashboard,
  Mail,
  QrCode,
  Settings2,
  SquareTerminal,
  Trophy,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { EventSwitcher } from "@/components/event-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { IUser } from "@/types/user"
import { useUser } from "@/hooks/use-user"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData, userEvents } = useUser()
  const user: IUser | null = userData
  const isAdmin = user?.role?.name?.includes("admin")

  let configuration
  
  if (isAdmin){
    configuration = {
      teams: [
        {
          name: "Admin",
          organizer: user as IUser,
          prizepool: "0",
          category: {
            name: "Admin",
          },
        }
      ],
      navMain: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          url: "/dashboard",
        },
        {
          title: "Managements",
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "Users",
              url: "/user",
            },
            {
              title: "Athletes",
              url: "/athlete",
            },
            {
              title: "Memberships",
              url: "/membership",
            },
            {
              title: "Applications",
              url: "/application",
            },
            {
              title: "Events",
              url: "/event",
            },
            {
              title: "Games",
              url: "/game",
            },    
            {
              title: "Transactions",
              url: "/transaction",
            },
            {
              title: "Registrations",
              url: "/registration",
            },
            {
              title: "All Registrations",
              url: "/all-registration",
            },
            {
              title: "Bank Accounts",
              url: "/bank-account",
            },
          ],
        },
        {
          title: "Requests",
          icon: Mail,
          isActive: true,
          items: [
            {
              title: "Event Request",
              url: "/request/application",
            },
            {
              title: "Champions Request",
              url: "/request/champion",
            }
          ],
        },
        {
          title: "Settings",
          icon: Settings2,
          url: "/setting"
        },
        {
          title: "Support",
          icon: HelpCircle,
          url: "/help",
        },
      ],
      projects: [
        {
          name: "QR Scanner",
          url: "",
          icon: QrCode,
        }
      ],
    }
  }
  else {
    configuration = {
      teams: userEvents ?? [],
      navMain: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          url: "/dashboard",
        },
        {
          title: "Event Activities",
          icon: Gamepad2,
          url: "/organizer/activity",
        },
        {
          title: "Team Registrations",
          icon: Mail,
          url: "/organizer/registration",
        },
        {
          title: "Champions Form",
          icon: Trophy,
          url: "/organizer/form/champion",
        },
        {
          title: "Archives",
          icon: Box,
          url: "/organizer/application",
        },
        {
          title: "Settings",
          icon: Settings2,
          url: "/setting"
        },
      ],
      projects: [
        {
          name: "QR Scanner",
          url: "",
          icon: QrCode,
        }
      ], 
    }
  }
  if (!configuration.teams) return null
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <EventSwitcher event={configuration.teams} isAdmin={isAdmin ?? false} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={configuration.navMain} />
        <NavProjects projects={configuration.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
