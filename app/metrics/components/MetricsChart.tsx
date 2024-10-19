"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import { MetricsResponse } from "@/services/metrics.service";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const chartConfig: ChartConfig = {
  read: {
    label: "Read",
    color: "hsl(var(--chart-1))",
  },
  write: {
    label: "Write",
    color: "hsl(var(--chart-2))",
  },
};

interface LineChartProps {
  data?: MetricsResponse;
  type?: "IOPS" | "Throughput";
}

const formatNumberWithSuffix = (num: number) => {
  return num >= 1e6
    ? `${(num / 1e6).toFixed(1)}m`
    : num >= 1e3
    ? `${(num / 1e3).toFixed(1)}k`
    : num.toFixed(1);
};

const ChartCard = ({
  text,
  type,
  avg,
}: {
  text: string;
  type?: string;
  avg?: number;
  className?: string
}) => (
  <div className="border px-3 py-2 w-full md:w-[200px] border-secondary-border bg-secondary-background">
    <p className="text-secondary-muted text-base">{text}</p>
    <p className={cn(`text-lg`, text === "Read" ? "text-chart-1" : "text-chart-2")}>
      {formatNumberWithSuffix(avg || 0)}{" "}
      <span className="text-sm">{type === "IOPS" ? "IOPS" : "KB/s"}</span>
    </p>
  </div>
);

const CustomDot = ({ cx, cy, index, dataLength, stroke }: any) =>
  index === dataLength - 1 ? (
    <circle cx={cx} cy={cy} r={5} fill={stroke} stroke="#fff" strokeWidth={1} />
  ) : null;

const uniqueDates = new Set<string>();
let doneOnce = false;

const formatXAxis = (value: string, index: number, dataLength: number) => {
  if (doneOnce) {
    uniqueDates.clear();
    doneOnce = false;
  }
  if (index === dataLength - 1) doneOnce = true;
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (index === 0 || !uniqueDates.has(formattedDate)) {
    uniqueDates.add(formattedDate);
    return formattedDate;
  }
  return "";
};

const formatTick = (value: number) => formatNumberWithSuffix(value);

export function MetricsChart({ data, type }: LineChartProps) {
  const sortedDataArray = data?.data || [];

  if (!sortedDataArray.length) return null;

  const lastData = sortedDataArray[sortedDataArray.length - 1];

  return (
    <div className="border-0 relative size-full">
      <div className="flex items-start flex-col-reverse md:flex-row gap-4">
        <div className="w-full flex-col">
          <div className="flex justify-between pr-4">
            <p className="pl-1 pb-1 pt-6 hidden md:block text-lg">{type}</p>
            <div className="pt-11 text-xs">
              {format(new Date(lastData.date), "MMM dd, HH:mm")}
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="size-full min-h-[100px] min-w-[200px] max-h-[180px]"
          >
            <LineChart
              data={sortedDataArray}
              margin={{ top: 6, bottom: 8, left: -12, right: 20 }}
            >
              <CartesianGrid vertical={false} stroke="hsl(var(--secondary-border))" />
              <XAxis
                dataKey="date"
                tickLine
                axisLine
                interval={0}
                tickFormatter={(value, index) =>
                  formatXAxis(value, index, sortedDataArray.length)
                }
              />
              <ReferenceLine
                x={lastData.date}
                stroke="rgba(255, 255, 255)"
                strokeWidth={1.5}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                tickCount={3}
                tickFormatter={formatTick}
              />
              <ChartTooltip content={<ChartTooltipContent nameKey="timestamp" />} />
              {["read", "write"].map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="linear"
                  stroke={`var(--color-${key})`}
                  strokeWidth={2}
                  dot={(props) => <CustomDot {...props} dataLength={sortedDataArray.length} />}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
        <div className="h-full flex flex-col md:p-2 pb-4 md:pb-0 pr-3 md:pr-0 md:pt-[35px] text-xl text-nowrap size-full md:size-fit">
          <p className="pl-1 text-lg md:text-muted-foreground">{type}</p>
          <div className="flex flex-row md:flex-col">
            <ChartCard text="Read" type={type} avg={data?.readAvg} />
            <ChartCard
              text="Write"
              type={type}
              avg={data?.writeAvg}
              className="border-t border-l-0 md:border-t-0 md:border-l"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
