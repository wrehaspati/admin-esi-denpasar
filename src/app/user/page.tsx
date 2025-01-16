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
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { UserDialog } from "@/components/user-dialog"
import { DialogProvider } from "@/context/DialogContext"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function UserPage() {

  const { toast } = useToast()

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + '/users',
    fetcher
  )

  if (error) toast({ title: "Failed to Fetch", description: error, variant: "destructive" })

  return (
    <SidebarProvider>
      <DialogProvider>
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
                    <BreadcrumbPage className="flex gap-2 items-center">User{isLoading ? <LoadingSpinner className="size-4" /> : ""}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min overflow-x-auto px-2 md:w-full w-[90vw]">
              <DataTable columns={columns} data={data ? data.data : []} />
              <UserDialog />
            </div>
          </div>
        </SidebarInset>
      </DialogProvider>
    </SidebarProvider>
  )
}
