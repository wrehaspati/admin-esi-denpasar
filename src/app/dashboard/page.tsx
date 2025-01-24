"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartUserTrend } from "@/components/chart-user-trend"
import { ChartEventInfo } from "@/components/chart-event-info"
import { ChartTicketInfo } from "@/components/chart-ticket-info"
import { ChartTransaction } from "@/components/chart-transaction"
import useClientMiddleware from "@/hooks/use-client-middleware"
import LoadingScreen from "@/components/loading-screen"
import React from "react"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/hooks/use-user"

export default function DashboardPage() {
  const [isLogin, setLoginState] = React.useState(true)
  const { setUserData } = useUser()
  useClientMiddleware(() => {})
  
  React.useEffect(() => {
    async function fetchUser() {
      try {
        const user = await axiosInstance.get("/auth/user").then((res) => { return res.data?.data })
        setUserData(user)
      } catch {
        console.warn("Something went wrong. Please try again later")
      } finally {
        setLoginState(false)
      }
    }
    fetchUser()
  }, [setUserData])

  if (isLogin) {
    return <LoadingScreen />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    ESI Kota Denpasar
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
            <div className="rounded-xl h-full">
              <ChartUserTrend/>
            </div>
            <div className="rounded-xl h-full">
              <ChartEventInfo/>
            </div>
            <div className="rounded-xl h-full">
              <ChartTicketInfo/>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <ChartTransaction/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
