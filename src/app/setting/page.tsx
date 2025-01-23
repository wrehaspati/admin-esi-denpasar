"use client"

import { AppSidebar } from "@/components/app-sidebar"
import LoadingScreen from "@/components/loading.screen"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import useClientMiddleware from "@/hooks/use-client-middleware"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function SettingPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isLogin, setLoginState] = useState(true)

  useClientMiddleware(() => {setLoginState(false)})

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <LoadingScreen isLoading={isLogin} />
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
                  <BreadcrumbPage className="flex gap-2 items-center">Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:w-full w-screen">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <section className="p-4 bg-white dark:bg-muted rounded-lg shadow-md grid gap-4">
              <div className="text-2xl font-semibold leading-none tracking-tight items-center flex gap-2">Theme Customization<Badge variant="default">Beta</Badge></div>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" checked={resolvedTheme === 'dark'} onCheckedChange={() => setTheme(theme == 'dark' ? 'light' : 'dark')} />
                <Label htmlFor="airplane-mode">Dark Mode</Label>
              </div>
            </section>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
