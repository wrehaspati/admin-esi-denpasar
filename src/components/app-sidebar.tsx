"use client"

import * as React from "react"
import {
  Mail,
  QrCode,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AppIcon } from "./app-icon"

const data = {
  user: {
    name: "admin esi",
    email: "m@example.com",
    avatar: "https://avatars.githubusercontent.com/u/98689945?v=4",
  },
  teams: [
    {
      name: "ESI Kota Denpasar",
      logo: AppIcon,
      plan: "Administrator",
    }
  ],
  navMain: [
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
          title: "Events",
          url: "",
        },
        {
          title: "Applications",
          url: "/application",
        },
        {
          title: "Payments",
          url: "",
        },
        {
          title: "Leaderboards",
          url: "",
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
          url: "",
        },
        {
          title: "Champions Request",
          url: "",
        }
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "General",
          url: "setting",
        }
      ],
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
