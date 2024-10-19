import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  fetchIops,
  fetchMetricsParams,
  fetchThroughput,
  MetricsResponse,
} from "@/services/metrics.service";

import { UseQueryConfig } from "@/types/common.types";

export const useIopsMetrics = (
  queryParams: fetchMetricsParams,
  config: UseQueryConfig = {},
) =>
  useQuery({
    queryKey: ["IopsMetrics", queryParams],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchIops(queryParams, { signal }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
    ...config,
  }) as UseQueryResult<MetricsResponse, Error>;

export const useThroughputMetrics = (
  queryParams: fetchMetricsParams,
  config: UseQueryConfig = {},
) =>
  useQuery({
    queryKey: ["ThroughputMetrics", queryParams],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchThroughput(queryParams, { signal }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
    ...config,
  }) as UseQueryResult<MetricsResponse, Error>;
