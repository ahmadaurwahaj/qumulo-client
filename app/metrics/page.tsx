"use client";

import { DateRangePicker, useTimeRange } from "@/components/DateRangePicker";
import { LayoutHeader, LayoutWrapper } from "@/components/Layout";

import { useIopsMetrics, useThroughputMetrics } from "@/hooks/useMetrics.hook";

import { MetricsChart } from "./components/MetricsChart";

export default function Home() {
  const { timeRange, date, setTimeRange, handleSetDate, startDate, endDate } =
    useTimeRange();

  const { data: iopsData, isLoading: iopsLoading } = useIopsMetrics({
    start: startDate,
    end: endDate,
  });
  const { data: throughputData, isLoading: throughPutLoading } =
    useThroughputMetrics({
      start: startDate,
      end: endDate,
    });

  if (throughPutLoading || iopsLoading) return null;
  return (
    <LayoutWrapper className="gap-6">
      <LayoutHeader title="Performance Metrics">
        <DateRangePicker
          timeRange={timeRange}
          date={date}
          setTimeRange={setTimeRange}
          setDate={handleSetDate}
          disabled={iopsLoading || throughPutLoading}
        />
      </LayoutHeader>
      <div className="flex flex-col items-start justify-start gap-5">
        <MetricsChart data={iopsData} type="IOPS" />
        <MetricsChart data={throughputData} type="Throughput" />
      </div>
    </LayoutWrapper>
  );
}
