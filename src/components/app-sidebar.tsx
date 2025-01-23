"use client"

import * as React from "react"
import {
  LayoutDashboard,
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
import { User } from "@/types/UserType"
import { useUser } from "@/hooks/use-user"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData } = useUser();
  console.log(userData);
  const user: User | null = userData;

  const temp = {
    teams: [
      {
        name: "ESI Kota Denpasar",
        logo: AppIcon,
        plan: "Administrator",
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={temp.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={temp.navMain} />
        <NavProjects projects={temp.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
