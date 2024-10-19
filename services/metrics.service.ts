import { AxiosError, AxiosRequestConfig } from "axios";
import { z } from "zod";

import { toast } from "@/hooks/useToast.hook";
import { schemaParse } from "@/utils/common.utils";
import { portalApi } from "@/utils/http.utils";

import { MessageErrorResponse } from "@/types/common.types";

const dataSchema = z.object({
  date: z.string(),
  read: z.number(),
  write: z.number(),
});

const MetricsResponseSchema = z.object({
  from: z.string(),
  to: z.string(),
  readAvg: z.number(),
  writeAvg: z.number(),
  data: z.array(dataSchema),
});

export type MetricsResponse = z.infer<typeof MetricsResponseSchema>;

export interface fetchMetricsParams {
  start?: string;
  end?: string;
}

export const fetchIops = async (
  params: fetchMetricsParams,
  config: AxiosRequestConfig,
): Promise<MetricsResponse> => {
  try {
    const response = await portalApi.get("/metrics/iops", {
      params,
      ...config,
    });
    return schemaParse(MetricsResponseSchema)(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error?.code === "ERR_CANCELED")
      throw error;
    toast({
      title: "Error Fetching IOPS Data",
      description: (error as AxiosError<MessageErrorResponse>).response?.data
        ?.message,
      variant: "destructive",
    });
    throw error;
  }
};

export const fetchThroughput = async (
  params: fetchMetricsParams,
  config: AxiosRequestConfig,
): Promise<MetricsResponse> => {
  try {
    const response = await portalApi.get("/metrics/through-puts", {
      params,
      ...config,
    });

    return schemaParse(MetricsResponseSchema)(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error?.code === "ERR_CANCELED")
      throw error;
    toast({
      title: "Error Fetching Throughput Data",
      description: (error as AxiosError<MessageErrorResponse>).response?.data
        ?.message,
      variant: "destructive",
    });
    throw error;
  }
};
