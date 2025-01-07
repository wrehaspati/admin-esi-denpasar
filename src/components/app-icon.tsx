import React, { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AppIcon({
  className,
  ...props
}: HTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      className={cn("mx-auto w-auto h-auto", className)}
      src="/assets/images/logo.png"
      width={500}
      height={500}
      priority={true}
      alt="App Icon"
      {...props}
    />
  );
}