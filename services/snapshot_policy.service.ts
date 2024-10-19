import { AxiosError } from "axios";
import { z } from "zod";

import { toast } from "@/hooks/useToast.hook";
import { schemaParse } from "@/utils/common.utils";
import { portalApi } from "@/utils/http.utils";

import {
  MessageErrorResponse,
  SuccessMessageResponse,
} from "@/types/common.types";

export const SnapshotPolicySchema = z.object({
  id: z.string().optional(),
  policyName: z
    .string()
    .trim()
    .min(3, "Policy name must be at least 3 characters")
    .max(50, "Policy name must be at most 50 characters"),
  applyToDirectory: z.string().trim().min(1, "Directory is required"),
  scheduleType: z.enum(["Daily or Weekly", "Monthly"]),
  snapshotTime: z.object({
    hours: z
      .number()
      .min(0, "Must be at least 0")
      .max(23, "Must be at most 23"),
    minutes: z
      .number()
      .min(0, "Must be at least 0")
      .max(59, "Must be at most 59"),
  }),
  days: z
    .array(
      z.enum(["Every day", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
    )
    .min(1, "Select at least one day"),
  deleteEachSnapshot: z.union([
    z.literal("Never"),
    z.object({
      after: z.number().min(1, "Must be at least 1").optional(),
      unit: z.enum(["day", "week", "month"]).optional(),
    }),
  ]),
  enableLockedSnapshots: z.boolean(),
  enablePolicy: z.boolean(),
});

export type SnapshotPolicyResponse = z.infer<typeof SnapshotPolicySchema>;

export type SnapshotFetchParams = {
  id: string;
};

export const getSnapShotById = async (
  params: SnapshotFetchParams,
): Promise<SnapshotPolicyResponse> => {
  try {
    const response = await portalApi.get(`/snapshot-policies/get/${params.id}`);

    return schemaParse(SnapshotPolicySchema)(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error?.code === "ERR_CANCELED") {
      throw error;
    }
    toast({
      title: "Error Fetching Snapshot Policy Data",
      description: (error as AxiosError<MessageErrorResponse>).response?.data
        ?.message,
      variant: "destructive",
    });
    console.error("API Error:", error); // Log the error
    throw error;
  }
};

export const editSnapshotPolicy = async ({
  data,
  id,
}: {
  data: SnapshotPolicyResponse;
  id: string;
}): Promise<SuccessMessageResponse> => {
  try {
    const { message }: SuccessMessageResponse = await portalApi.post(
      `/snapshot-policies/update/${id}`,
      data,
    );
    return { message };
  } catch (error) {
    toast({
      title: "Error Updating Snapshot Policy",
      description: (error as AxiosError<MessageErrorResponse>).response?.data
        ?.message,
      variant: "destructive",
    });
    throw error;
  }
};
