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

const chartData = [
  { type: "Seminar", count: 25, fill: "var(--color-seminar)" },
  { type: "Lomba", count: 25, fill: "var(--color-online)" }]

const chartConfig = {
  Tickets: {
    label: "Tickets",
  },
  seminar: {
    label: "On Seminar",
    color: "hsl(var(--chart-4))",
  },
  online: {
    label: "On Lomba",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function ChartTicketInfo() {
  const totalTickets = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 1)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-start pb-0">
        <CardTitle>Ticket Information</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
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
              data={chartData}
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
                          Tickets
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
          <TrendingUp className="size-4"/>54 tickets was created this month
        </div>
      </CardFooter>
    </Card>
  )
}
