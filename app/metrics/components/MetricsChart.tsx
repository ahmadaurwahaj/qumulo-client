"use client";

import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";
import { MetricsResponse } from "@/services/metrics.service";

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

export function MetricsChart({ data, type }: LineChartProps) {
  const sortedDataArray = data?.data || [];

  if (!sortedDataArray.length) return null;

  const lastData = sortedDataArray[sortedDataArray.length - 1];

  return (
    <div className="relative size-full border-0">
      <div className="flex flex-col-reverse items-start gap-4 md:flex-row">
        <div className="w-full flex-col">
          <div className="flex justify-between pr-4">
            <p className="hidden pb-1 pl-1 pt-6 text-lg md:block">{type}</p>
            <div className="pt-11 text-xs">
              {format(new Date(lastData.date), "MMM dd, HH:mm")}
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="size-full max-h-[180px] min-h-[100px] min-w-[200px]"
          >
            <LineChart
              data={sortedDataArray}
              margin={{ top: 6, bottom: 8, left: -12, right: 20 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="hsl(var(--secondary-border))"
              />
              <XAxis
                dataKey="date"
                tickLine
                axisLine
                interval={0}
                tickFormatter={(value: string, index: number) =>
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
              <ChartTooltip
                content={<ChartTooltipContent nameKey="timestamp" />}
              />
              {["read", "write"].map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="linear"
                  stroke={`var(--color-${key})`}
                  strokeWidth={2}
                  dot={(props) => (
                    <CustomDot {...props} dataLength={sortedDataArray.length} />
                  )}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
        <div className="flex size-full h-full flex-col text-nowrap pb-4 pr-3 text-xl md:size-fit md:p-2 md:pb-0 md:pr-0 md:pt-[35px]">
          <p className="pl-1 text-lg md:text-muted-foreground">{type}</p>
          <div className="flex flex-row md:flex-col">
            <ChartCard text="Read" type={type} avg={data?.readAvg} />
            <ChartCard
              text="Write"
              type={type}
              avg={data?.writeAvg}
              className="border-l-0 border-t md:border-l md:border-t-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
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
  className?: string;
}) => (
  <div className="w-full border border-secondary-border bg-secondary-background px-3 py-2 md:w-[200px]">
    <p className="text-base text-secondary-muted">{text}</p>
    <p
      className={cn(
        `text-lg`,
        text === "Read" ? "text-chart-1" : "text-chart-2",
      )}
    >
      {formatNumberWithSuffix(avg || 0)}{" "}
      <span className="text-sm">{type === "IOPS" ? "IOPS" : "KB/s"}</span>
    </p>
  </div>
);

interface CustomDotProps {
  cx?: number;
  cy?: number;
  index: number;
  dataLength: number;
  stroke: string;
}

const CustomDot = ({ cx, cy, index, dataLength, stroke }: CustomDotProps) =>
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
