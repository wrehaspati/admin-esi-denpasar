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
import { ChartUserTrend } from "@/app/(authenticated)/dashboard/partials/chart-user-trend"
import { ChartEventInfo } from "@/app/(authenticated)/dashboard/partials/chart-event-info"
import { ChartTicketInfo } from "@/app/(authenticated)/dashboard/partials/chart-ticket-info"
import { ChartTransaction } from "@/app/(authenticated)/dashboard/partials/chart-transaction"
import React from "react"

export default function DashboardPage() {
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 h-fit">
            <div className="rounded-xl h-full">
              <ChartUserTrend />
            </div>
            <div className="rounded-xl h-full">
              <ChartEventInfo />
            </div>
            <div className="rounded-xl h-full">
              <ChartTicketInfo />
            </div>
          </div>
          <div className="md:min-h-[100vh] flex-1 rounded-xl min-h-min">
            <ChartTransaction />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
