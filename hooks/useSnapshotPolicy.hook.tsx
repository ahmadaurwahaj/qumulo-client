import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  editSnapshotPolicy,
  getSnapShotById,
  SnapshotFetchParams,
  SnapshotPolicyResponse,
} from "@/services/snapshot_policy.service";

import { toast } from "./useToast.hook";

import {
  MessageErrorResponseWithError,
  UseQueryConfig,
} from "@/types/common.types";

export const useGetSnapshot = (
  queryParams: SnapshotFetchParams,
  config: UseQueryConfig = {},
) =>
  useQuery({
    queryKey: ["GetSnapshotEvent", queryParams],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      getSnapShotById(queryParams, { signal }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
    retry: 1,
    ...config,
  }) as UseQueryResult<SnapshotPolicyResponse, Error>;

export const useEditPolicyMutation = () =>
  useMutation({
    mutationFn: editSnapshotPolicy,
    onError: (err: AxiosError<MessageErrorResponseWithError>) => {
      toast({
        title: "Error",
        description:
          err?.response?.data?.error || "Error on fetching search data!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Policy updated successfully!",
      });
    },
  });
