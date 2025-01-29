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
import { DataTable } from "./data-table"
import { columns } from "./columns"
import useSWR from 'swr'
import { LoadingSpinner } from "@/components/loading-spinner"
import { DialogProvider } from "@/context/DialogContext"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axios"
import { Activity } from "@/types/ActivityType"
import { ActionDialog } from "./partials/action-dialog"
import { useUser } from "@/hooks/use-user"

export default function EventPage() {
  const [interval, setRefreshInterval] = useState<number>(600000) 
  const { toast } = useToast()
  const fetcher = (url: string) => axiosInstance.get(url).then((r) => r.data)
  const { activeEvent } = useUser()

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/eo/activity/" + activeEvent?.id,
    fetcher,
    {
      refreshInterval: interval,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  )

  useEffect(() => {
    if (error) {
      setRefreshInterval(600000)
      toast({ title: "Action Failed", description: error?.response?.data?.message })
    } else {
      setRefreshInterval(10000)
    }
  }, [error, toast])

  const confirmDelete = async (id: string) => {
    axiosInstance.delete('/eo/activity/'+id.toString())
      .then(function (response) {
        toast({title: response.data?.message})
      })
      .catch(function (error) {
        toast({
          title: "Failed to submit",
          description: "Error: " + error + ". " + error?.response?.data?.message,
        })
      });
  }

  return (
    <SidebarProvider>
      <DialogProvider<Activity>>
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
                    <BreadcrumbPage className="flex gap-2 items-center">{activeEvent?.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex gap-2 items-center">Activities{isLoading ? <LoadingSpinner className="size-4" /> : ""}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:w-full w-screen">
            <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <DataTable columns={columns} data={data?.length ? data.data : []} />
              <ActionDialog onRemoveConfirm={confirmDelete} dialogName="Activity"/>
            </div>
          </div>
        </SidebarInset>
      </DialogProvider>
    </SidebarProvider>
  )
}
