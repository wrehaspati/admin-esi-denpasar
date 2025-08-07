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
  SidebarTrigger
} from "@/components/ui/sidebar"
import { ChartUserTrend } from "@/app/(authenticated)/dashboard/partials/chart-user-trend"
import { ChartEventInfo } from "@/app/(authenticated)/dashboard/partials/chart-event-info"
import { ChartTicketInfo } from "@/app/(authenticated)/dashboard/partials/chart-ticket-info"
import { ChartTransaction } from "@/app/(authenticated)/dashboard/partials/chart-transaction"
import React, { useEffect } from "react"
import { useUser } from "@/hooks/use-user"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"
import FormatToRupiah from "@/lib/format-to-rupiah"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { userData, activeEvent, userEvents, setActiveEvent } = useUser()
  const isEO = userData?.role?.name?.includes("event_organizer")

  useEffect(() => {
    if (userEvents && userEvents.length > 0 && !activeEvent) {
      setActiveEvent(userEvents[0])
    }
  }, [userEvents, activeEvent, setActiveEvent])

  if (isEO) {
    if (!activeEvent) {
      if (!userEvents) {
        return (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold mb-4">No Active Event</h1>
              </div>
            </SidebarInset>
          </SidebarProvider>
        )
      }
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
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 h-fit">
              <div className="rounded-xl h-full">
                <Card className="flex flex-col h-full">
                  <CardHeader className="items-start pb-0">
                    <CardTitle>Event Information</CardTitle>
                    <CardDescription>Informasi event yang dimanajemen</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 h-full pt-4 space-y-1">
                    <div className="h-40 w-full bg-white rounded-lg shadow-lg grid items-center justify-center relative bg-cover bg-center" style={{ backgroundImage: `url(${activeEvent?.event_banner})` }}>
                      <div className="w-full h-full absolute inset-0 bg-black z-0 bg-opacity-20"></div>
                      {activeEvent?.event_logo && (
                        <div className="z-10 w-[150px] h-auto rounded-full flex items-center justify-center">
                          <Image
                            src={activeEvent?.event_logo?.toString()}
                            alt="Event illustration"
                            width={150}
                            height={150}
                            className="z-10 w-auto h-full"
                          />
                        </div>
                      )}
                    </div>
                    <h1 className="text-2xl font-semibold">
                      {activeEvent?.name + " "}
                      <span className={cn("text-sm", activeEvent?.is_active ? "text-green-500" : "text-red-500")}>
                        {activeEvent?.is_active ? "Active" : "Not Active"}
                      </span>
                    </h1>
                    <p>Event Date: {activeEvent?.application?.event_date ? new Date(activeEvent.application.event_date).toLocaleDateString('id-ID') : "N/A"}</p>
                    <p>Prizepool: {FormatToRupiah(parseInt(activeEvent?.prizepool + ""))}</p>
                    <p>Organizer Email: {activeEvent?.organizer.email}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="mt-2">
                      <a href="/organizer/activity">Kelola Aktivitas</a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="rounded-xl h-full flex-1 md:col-span-2">
                <Card className="flex flex-col h-full">
                  <CardHeader className="items-start pb-0">
                    <CardTitle>Panduan Penyelenggaraan</CardTitle>
                    <CardDescription>Prosedur penyelenggaraan event</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 h-full pt-4">
                    <ol className="list-inside list-disc text-justify">
                      <li>
                        <b>Organizer</b> dari event perlu membuat aktivitas event melalui menu Aktivitas / <i>Activities</i>.
                        Aktivitas Event adalah daftar atau list rangkaian acara seperti lomba, seminar, webinar hingga workshop.
                      </li>
                      <li>
                        <b>Organizer</b> kemudian dapat melakukan pengajuan penjualan tiket terhadap aktivitas yang telah dibuat.
                        Dalam hal ini, <b>Organizer</b> perlu menghubungi pihak <b>ESI Kota Denpasar</b> untuk aktivasi penjualan tiket dan tujuan administrasi.
                      </li>
                      <li>
                        Terkait perubahan informasi pada event, visibilitas event di beranda utama, dan perubahan informasi lainnya,
                        silahkan hubungi pihak <b>ESI Kota Denpasar</b>.
                      </li>
                      <li>
                        Contact Person: <a className="underline text-blue-500" target="blank" href="https://wa.me/6281339600701/">+62 813-3960-0701</a> (Geni)
                      </li>
                    </ol>
                  </CardContent>
                  <CardFooter>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div className="flex-1 rounded-xl min-h-min">
              <></>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
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
          <div className="flex-1 rounded-xl min-h-min">
            <ChartTransaction />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
