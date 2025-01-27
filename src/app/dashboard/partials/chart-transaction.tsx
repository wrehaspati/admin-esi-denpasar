"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
const chartData = [
  { date: "2024-03-01", transaction: 222, cash: 150 },
  { date: "2024-03-02", transaction: 97, cash: 180 },
  { date: "2024-03-03", transaction: 167, cash: 120 },
  { date: "2024-03-03", transaction: 242, cash: 260 },
  { date: "2024-03-05", transaction: 373, cash: 290 },
  { date: "2024-03-06", transaction: 301, cash: 340 },
  { date: "2024-03-07", transaction: 245, cash: 180 },
  { date: "2024-03-08", transaction: 409, cash: 320 },
  { date: "2024-03-09", transaction: 59, cash: 110 },
  { date: "2024-03-10", transaction: 261, cash: 190 },
  { date: "2024-03-11", transaction: 327, cash: 350 },
  { date: "2024-03-12", transaction: 292, cash: 210 },
  { date: "2024-03-13", transaction: 342, cash: 380 },
  { date: "2024-03-14", transaction: 137, cash: 220 },
  { date: "2024-03-15", transaction: 120, cash: 170 },
  { date: "2024-03-16", transaction: 138, cash: 190 },
  { date: "2024-03-17", transaction: 446, cash: 360 },
  { date: "2024-03-18", transaction: 364, cash: 410 },
  { date: "2024-03-19", transaction: 243, cash: 180 },
  { date: "2024-03-20", transaction: 89, cash: 150 },
  { date: "2024-03-21", transaction: 137, cash: 200 },
  { date: "2024-03-22", transaction: 224, cash: 170 },
  { date: "2024-03-23", transaction: 138, cash: 230 },
  { date: "2024-03-24", transaction: 387, cash: 290 },
  { date: "2024-03-25", transaction: 215, cash: 250 },
  { date: "2024-03-26", transaction: 75, cash: 130 },
  { date: "2024-03-27", transaction: 383, cash: 420 },
  { date: "2024-03-28", transaction: 122, cash: 180 },
  { date: "2024-03-29", transaction: 315, cash: 240 },
  { date: "2024-03-30", transaction: 454, cash: 380 },
  { date: "2024-05-01", transaction: 165, cash: 220 },
  { date: "2024-05-02", transaction: 293, cash: 310 },
  { date: "2024-05-03", transaction: 247, cash: 190 },
  { date: "2024-05-03", transaction: 385, cash: 420 },
  { date: "2024-05-05", transaction: 481, cash: 390 },
  { date: "2024-05-06", transaction: 498, cash: 520 },
  { date: "2024-05-07", transaction: 388, cash: 300 },
  { date: "2024-05-08", transaction: 149, cash: 210 },
  { date: "2024-05-09", transaction: 227, cash: 180 },
  { date: "2024-05-10", transaction: 293, cash: 330 },
  { date: "2024-05-11", transaction: 335, cash: 270 },
  { date: "2024-05-12", transaction: 197, cash: 240 },
  { date: "2024-05-13", transaction: 197, cash: 160 },
  { date: "2024-05-14", transaction: 448, cash: 490 },
  { date: "2024-05-15", transaction: 473, cash: 380 },
  { date: "2024-05-16", transaction: 338, cash: 400 },
  { date: "2024-05-17", transaction: 499, cash: 420 },
  { date: "2024-05-18", transaction: 315, cash: 350 },
  { date: "2024-05-19", transaction: 235, cash: 180 },
  { date: "2024-05-20", transaction: 177, cash: 230 },
  { date: "2024-05-21", transaction: 82, cash: 140 },
  { date: "2024-05-22", transaction: 81, cash: 120 },
  { date: "2024-05-23", transaction: 252, cash: 290 },
  { date: "2024-05-24", transaction: 294, cash: 220 },
  { date: "2024-05-25", transaction: 201, cash: 250 },
  { date: "2024-05-26", transaction: 213, cash: 170 },
  { date: "2024-05-27", transaction: 420, cash: 460 },
  { date: "2024-05-28", transaction: 233, cash: 190 },
  { date: "2024-05-29", transaction: 78, cash: 130 },
  { date: "2024-05-30", transaction: 340, cash: 280 },
  { date: "2024-05-31", transaction: 178, cash: 230 },
  { date: "2024-06-01", transaction: 178, cash: 200 },
  { date: "2024-06-02", transaction: 470, cash: 410 },
  { date: "2024-06-03", transaction: 103, cash: 160 },
  { date: "2024-06-03", transaction: 439, cash: 380 },
  { date: "2024-06-05", transaction: 88, cash: 140 },
  { date: "2024-06-06", transaction: 294, cash: 250 },
  { date: "2024-06-07", transaction: 323, cash: 370 },
  { date: "2024-06-08", transaction: 385, cash: 320 },
  { date: "2024-06-09", transaction: 438, cash: 480 },
  { date: "2024-06-10", transaction: 155, cash: 200 },
  { date: "2024-06-11", transaction: 92, cash: 150 },
  { date: "2024-06-12", transaction: 492, cash: 420 },
  { date: "2024-06-13", transaction: 81, cash: 130 },
  { date: "2024-06-14", transaction: 426, cash: 380 },
  { date: "2024-06-15", transaction: 307, cash: 350 },
  { date: "2024-06-16", transaction: 371, cash: 310 },
  { date: "2024-06-17", transaction: 475, cash: 520 },
  { date: "2024-06-18", transaction: 107, cash: 170 },
  { date: "2024-06-19", transaction: 341, cash: 290 },
  { date: "2024-06-20", transaction: 408, cash: 450 },
  { date: "2024-06-21", transaction: 169, cash: 210 },
  { date: "2024-06-22", transaction: 317, cash: 270 },
  { date: "2024-06-23", transaction: 480, cash: 530 },
  { date: "2024-06-24", transaction: 132, cash: 180 },
  { date: "2024-06-25", transaction: 141, cash: 190 },
  { date: "2024-06-26", transaction: 434, cash: 380 },
  { date: "2024-06-27", transaction: 448, cash: 490 },
  { date: "2024-06-28", transaction: 149, cash: 200 },
  { date: "2024-06-29", transaction: 103, cash: 160 },
  { date: "2024-06-30", transaction: 446, cash: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  transaction: {
    label: "Transaction",
    color: "hsl(var(--chart-2))",
  },
  cash: {
    label: "Cash",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartTransaction() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("transaction")

  const total = React.useMemo(
    () => ({
      transaction: chartData.reduce((acc, curr) => acc + curr.transaction, 0),
      cash: chartData.reduce((acc, curr) => acc + curr.cash, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>App Transaction Trends</CardTitle>
          <CardDescription>
            Showing total transaction for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["transaction", "cash"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
