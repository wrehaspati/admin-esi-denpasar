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
import { DialogProvider } from "@/context/dialog-context"
import { IApplication } from "@/types/application"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChampionForm } from "./champion-form"

export default function ApplicationPage() {

  return (
    <SidebarProvider>
      <DialogProvider<IApplication>>
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
                    <BreadcrumbPage className="flex gap-2 items-center">Champion Form</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:w-full w-screen">
            <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <Card>
                <CardHeader>
                  <CardTitle>Formulir Pendataan Pemenang</CardTitle>
                  <CardDescription>Formulir data pemenang dari tiap kompetisi yang diadakan</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChampionForm/>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </DialogProvider>
    </SidebarProvider>
  )
}
