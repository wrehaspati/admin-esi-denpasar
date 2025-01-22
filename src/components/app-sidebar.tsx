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
import { User } from "@/types/UserType"
import { getUserData } from "@/lib/session"
import { toast } from "@/hooks/use-toast"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = React.useState<User | null>(null)
  React.useEffect(() => {
    try {
      async function fetchData() {
        const userData: User = await getUserData()
        setUserData(userData)
      }
      fetchData()
    } catch (error) {
      toast({ title: "Profiling Error", description: error + "" })
    }
  }, [])

  const data = {
    user: {
      name: userData?.username ?? "error",
      email: userData?.email ?? "error",    
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
