"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import useSWR from "swr"
import axiosInstance from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  Tickets: {
    label: "Tickets",
  },
  lomba: {
    label: "On Lomba",
    color: "hsl(var(--chart-1))",
  },
  seminar: {
    label: "On Seminar",
    color: "hsl(var(--chart-4))",
  },
  workshop: {
    label: "On Workshop",
    color: "hsl(var(--chart-2))",
  },
  webinar: {
    label: "On Webinar",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig

interface ChartTicketInfoProps {
  type: string
  count: number
}

const justAColor = ["var(--color-seminar)",  "var(--color-lomba)", "var(--color-workshop)", "var(--color-webinar)"]

export function ChartTicketInfo() {
  const [data, setData] = React.useState<ChartTicketInfoProps[]>([])
  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)
  const { data: ticketInfo } = useSWR("/admin/statistic/ticket-sales", fetcher)
  const refinedData = data?.map((item) => ({ ...item, fill: justAColor[data.indexOf(item)] }))
  const totalTickets = React.useMemo(() => {
    return refinedData?.reduce((acc, curr) => acc + curr.count, 0)
  }, [refinedData])
  React.useEffect(() => {
     if (ticketInfo?.data) {
       setData(ticketInfo.data as ChartTicketInfoProps[])
     }
   }, [ticketInfo])
 
   if (!ticketInfo?.data) {
     return <Skeleton className="h-full w-full" />
   }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-start pb-0">
        <CardTitle>Sales Information</CardTitle>
        <CardDescription>Purchased Item Statistics</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto lg:h-full h-fit"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={refinedData}
              dataKey="count"
              nameKey="type"
              innerRadius={45}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalTickets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Items
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="mx-auto flex items-center gap-2 font-medium text-sm leading-none h-5">
          <TrendingUp className="size-4"/> Realtime Sales Counting
        </div>
      </CardFooter>
    </Card>
  )
}
