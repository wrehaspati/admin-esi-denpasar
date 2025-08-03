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
import useSWR from "swr"
import axiosInstance from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  views: {
    label: "Transaction",
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

interface ChartTransactionProps {
  transaction_count: number
  transaction_total: number
  transaction_trend: [
    {
      date: string
      transaction: number
      cash: number
    }
  ]
}

export function ChartTransaction() {
  const [data, setData] = React.useState<ChartTransactionProps>()
  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)
  const { data: transaction } = useSWR("/admin/statistic/transaction-trend?status=success", fetcher)
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("transaction")
  const total = React.useMemo(
    () => ({
      transaction: data?.transaction_trend?.reduce((acc, curr) => acc + curr.transaction, 0),
      cash: data?.transaction_trend?.reduce((acc, curr) => acc + curr.cash, 0),
    }),
    [data?.transaction_trend]
  )
  React.useEffect(() => {
    if (transaction?.data) {
      setData(transaction.data as ChartTransactionProps)
    }
  }, [transaction])

  if (!transaction?.data) {
    return <Skeleton className="h-full w-full" />
  }

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
                  {(total[key as keyof typeof total] ?? 0).toLocaleString()}
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
            data={data?.transaction_trend}
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
