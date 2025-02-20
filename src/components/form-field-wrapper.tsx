/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Controller } from "react-hook-form"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from "react"
import clsx from "clsx"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"

interface FormFieldWrapperProps {
  name: string
  control: any
  label: string
  disabled?: boolean
  description?: string
  placeholder?: string
  type?: "text" | "number" | "select" | "textarea" | "date" | "password" | "radio" | "checkbox" | "file" | "combobox"
  options?: { value: string; label: string }[]
  className?: string
}

export function FormFieldWrapper({
  name,
  control,
  label,
  disabled = false,
  description,
  placeholder,
  type = "text",
  options,
  className,
}: FormFieldWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem className={clsx("w-full", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "select" && options ? (
              <Select onValueChange={onChange} defaultValue={value} disabled={disabled}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "combobox" && options ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" disabled={disabled} role="combobox" className={cn("w-full justify-between", !value && "text-muted-foreground")}> 
                    {options.find((option) => option.value === value)?.label || "Select an option"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem key={option.value} value={option.value} onSelect={() => onChange(option.value)}>
                            {option.label}
                            <Check className={cn("ml-auto", option.value === value ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} {...field} value={value} onChange={onChange} disabled={disabled} />
            ) : type === "radio" && options ? (
              <RadioGroup value={value} onValueChange={onChange} disabled={disabled}>
                {options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                    <FormLabel htmlFor={`${name}-${option.value}`}>{option.label}</FormLabel>
                  </div>
                ))}
              </RadioGroup>
            ) : type === "checkbox" ? (
              <div className="flex items-center space-x-2">
                <Checkbox className="block" id="checkbox" checked={value} onCheckedChange={onChange} disabled={disabled} />
                {placeholder && <label htmlFor="checkbox" className="text-sm cursor-pointer select-none">{placeholder}</label>}
              </div>
            ) : type === "file" ? (
              <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} disabled={disabled} />
            ) : (
              <Input autoComplete="off" type={type} placeholder={placeholder} {...field} value={value} onChange={onChange} disabled={disabled} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
