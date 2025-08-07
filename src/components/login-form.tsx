"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppIcon } from "./app-icon"
import React from "react"
import { LoadingSpinner } from "./loading-spinner"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import axios from "axios"
import { saveToken } from "@/lib/session"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  remember_token: z.boolean()
})

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const mainUrl = process.env.NEXT_PUBLIC_FE_URL
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_token: true
    },
  })
  if (typeof window !== "undefined") {
    localStorage.removeItem("activeEvent");
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    axios.post(process.env.NEXT_PUBLIC_API_URL + "/login", {...data, role_id: 1})
      .then(function (response) {
        try {
          if (response.data?.data?.role.id == 1 || response.data?.data?.role.id == 3) {
            saveToken(response.data?.meta?.token)
            toast({ title: response.data?.message })
            router.replace("/dashboard")
          } else {
            toast({
              title: "Login Failed",
              description: "You are not authorized to access this page",
            })
            setIsLoading(false)
          }
        }
        catch (error) {
          toast({
            title: "Authentication System Failed",
            description: <pre><code>{JSON.stringify(error)}</code></pre>,
          })
          setIsLoading(false)
        }
      })
      .catch(function (error) {
        toast({
          title: "Login Failed",
          description: error?.response?.data?.message,
        })
        setIsLoading(false)
      })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="font-semibold text-muted-foreground/50 text-sm pb-2">PBESI KOTA DENPASAR</div>
          <AppIcon className="size-24" type="bordered" />
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input autoComplete="email webauthn" type="email" placeholder="esi@example.com" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center">
                              <Label htmlFor="password">Password</Label>
                              {/* <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                              >
                                Forgot your password?
                              </a> */}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input autoComplete="current-password webauthn" type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login {isLoading ? <LoadingSpinner className="size-4" /> : ""}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Back to {" "}
                  <a href={mainUrl} className="underline underline-offset-4">
                    ESI Kota Denpasar
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Developed by <a href="mailto:teamgardevelopment@gmail.com">GARDEV TEAM</a> @ 2025
      </div>
    </div>
  )
}
