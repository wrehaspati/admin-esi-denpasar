"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { CirclePlus, MoreHorizontal } from "lucide-react"

export default function GamePage() {

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
                  <BreadcrumbPage className="flex gap-2 items-center">Guide</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:w-full w-screen">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <Card>
              <CardHeader>
                <CardTitle>Guidebook</CardTitle>
                <CardDescription>Panduan penggunaan panel admin</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Cara menambahkan tiket yang dijual / membuka registrasi lomba ?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal list-outside pl-4">
                        <li>
                          Menuju ke halaman <a href="/event" className="font-bold">Events</a>, lalu pilih <i>event</i> yang akan diatur. 
                          Pada bagian pojok paling kanan baris data <i>event</i> tersebut klik 
                          <span className="inline"> <b>3-dots-lines button</b> atau <MoreHorizontal className="inline border rounded-md p-1"/> </span>
                          kemudian pilih opsi <b>View Details</b>
                        </li>
                        <li>
                          Selanjutnya pilih baris aktivitas atau <i>activity</i> yang akan ditambahkan atau dibukakan tiket ataupun registrasi <i>event</i> nya.
                          Pada bagian pojok paling kanan baris data <i>activity</i> tersebut klik kembali <b>3-dots-lines button</b> yang ada. Kemudian pilih kembali opsi <b>View Details</b> .
                        </li>
                        <li>
                          Pada halaman ini akan tampil detail list tiket yang dibuka atau registrasi lomba yang dibuka.
                          Untuk menambahkan tiket baru, klik tombol <span className="inline"><b>Add</b> atau <CirclePlus className="inline border rounded-md p-1"/></span> yang ada di pojok kiri atas tabel data.
                        </li>
                        <li>
                          Dialog form penambahan akan muncul, isikan data tiket yang akan dibuka, lalu klik tombol <b>Submit</b> untuk menyimpan data tersebut. 
                          <b> Ticket</b> atau <b>Registrasi</b> akan dibuka secara otomatis sesuai waktu yang ditentukan.
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
