import { LoginForm } from "@/components/login-form"
import { AppIcon } from "@/components/app-icon"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 font-sans">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <a href="" className="flex flex-col items-center self-center text-lg font-black text-red-600">
          <div className="flex h-24 w-24 items-center justify-center rounded-md bg-transparent text-primary-foreground">
            <AppIcon className="size-24" />
          </div>
          <div>
            ESI <small className="text-sm font-medium">Kota Denpasar</small>
          </div>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
