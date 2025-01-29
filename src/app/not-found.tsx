import { AppIcon } from "@/components/app-icon";

export default function custom404() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-muted gap-2">
      <div className="flex items-center justify-center border-b-2 pb-2 border-muted-foreground">
        <AppIcon type="borderless" className="size-16"/>
        <h1 className="font-bold text-7xl text-red-600">404</h1>
      </div>
      <p className="font-semibold">404 | page not found</p>
    </div>
  )
}