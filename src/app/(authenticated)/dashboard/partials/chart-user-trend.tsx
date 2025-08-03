"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useSWR from "swr"
import axiosInstance from "@/lib/axios"
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  user: {
    label: "User",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface ChartUserTrendProps {
  month: string
  user: number
}

export function ChartUserTrend() {
  const [data, setData] = React.useState<ChartUserTrendProps[]>([])
  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)
  const { data: userTrend } = useSWR("/admin/statistic/user-trend", fetcher)
   React.useEffect(() => {
    if (userTrend?.data) {
      setData(userTrend.data as ChartUserTrendProps[])
    }
  }, [userTrend])

  if (!userTrend?.data) {
    return <Skeleton className="h-full w-full" />
  }
  const year = new Date().getFullYear();
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>App User Trends</CardTitle>
        <CardDescription>{data.at(0)?.month.toString() + " - " + data.at(-1)?.month.toString() + " " + year}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="aspect-auto h-full min-h-32">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="user"
              type="natural"
              stroke="var(--color-user)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
