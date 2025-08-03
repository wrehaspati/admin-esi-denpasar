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
import { SquareArrowOutUpRight } from "lucide-react"
import useSWR from "swr"
import axiosInstance from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  Events: {
    label: "Events",
  },
  ongoing: {
    label: "On Going",
    color: "hsl(var(--chart-4))",
  },
  finished: {
    label: "Finished",
    color: "hsl(var(--chart-2))",
  },
  request: {
    label: "Request",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

interface ChartEventInfoProps {
  type: string
  events: number
}

const justAColor = ["var(--color-ongoing)",  "var(--color-finished)", "var(--color-request)"]

export function ChartEventInfo() {
  const [data, setData] = React.useState<ChartEventInfoProps[]>([])
  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)
  const { data: eventInfo } = useSWR("/admin/statistic/event-information", fetcher)
  const refinedData = data?.map((item) => ({ ...item, fill: justAColor[data.indexOf(item)] }))
  const totalEvents = React.useMemo(() => {
    return refinedData?.reduce((acc, curr) => acc + curr.events, 0)
  }, [refinedData])
  React.useEffect(() => {
    if (eventInfo?.data) {
      setData(eventInfo.data as ChartEventInfoProps[])
    }
  }, [eventInfo])

  if (!eventInfo?.data) {
    return <Skeleton className="h-full w-full" />
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-start pb-0">
        <CardTitle>Event Information</CardTitle>
        <CardDescription>
          Stastistic of Events
        </CardDescription>
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
              dataKey="events"
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
                          {totalEvents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Events
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
        <a href="/request/application" className="mx-auto flex items-center gap-1 font-medium leading-none text-sm h-5">
          Event Request<SquareArrowOutUpRight className="size-4"/>
        </a>
      </CardFooter>
    </Card>
  )
}
