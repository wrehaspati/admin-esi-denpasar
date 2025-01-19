import React, { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AppIconProps extends HTMLAttributes<HTMLImageElement> {
  type?: "default" | "bordered" | "borderless";
}

export function AppIcon({
  className,
  ...props
}: AppIconProps) {
  const { type } = props;
  return (
    <Image
      className={cn("mx-auto w-auto h-auto", className)}
      src={cn(type == "bordered" ? "/assets/images/bordered_logo.png" : type == "borderless" ? "/assets/images/borderless_logo.png" : "/assets/images/logo.png")}
      width={500}
      height={500}
      priority={true}
      alt="App Icon"
      {...props}
    />
  );
}