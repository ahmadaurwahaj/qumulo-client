"use client";

import { DateRangePicker, useTimeRange } from "@/components/DateRangePicker";
import { LayoutHeader, LayoutWrapper } from "@/components/Layout";

import { useIopsMetrics, useThroughputMetrics } from "@/hooks/useMetrics.hook";

import { MetricsChart } from "./components/MetricsChart";
import { MetricsChartSkeleton } from "./components/MetricSkeleton";

export default function Home() {
  const { timeRange, date, setTimeRange, handleSetDate, startDate, endDate } =
    useTimeRange();

  const {
    data: iopsData,
    isLoading: iopsLoading,
    isError: iopsError,
  } = useIopsMetrics({
    start: startDate,
    end: endDate,
  });
  const {
    data: throughputData,
    isLoading: throughPutLoading,
    isError: throughPutError,
  } = useThroughputMetrics({
    start: startDate,
    end: endDate,
  });

  const showSkeleton =
    iopsLoading || throughPutLoading || iopsError || throughPutError;
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
      {showSkeleton ? (
        <>
          <MetricsChartSkeleton />
          <MetricsChartSkeleton />
        </>
      ) : (
        <div className="flex flex-col items-start justify-start gap-5">
          <MetricsChart data={iopsData} type="IOPS" />
          <MetricsChart data={throughputData} type="Throughput" />
        </div>
      )}
    </LayoutWrapper>
  );
}
