"use client";
import React from "react";

import { LayoutHeader, LayoutWrapper } from "@/components/Layout";

import { useGetSnapshot } from "@/hooks";

import { EditForm } from "./components/EditPolicyForm";
import EditPolicySkeleton from "./components/EditPolicySkeleton";

export default function SnapshotPolicy() {
  const {
    data,
    isFetching,
    isPending: dataPending,
  } = useGetSnapshot({ id: "b540458e" });

  if (isFetching || dataPending) {
    return <EditPolicySkeleton />;
  }

  if (data)
    return (
      <LayoutWrapper className="gap-4.5">
        <LayoutHeader title="Edit Snapshot Policy" />
        <EditForm data={data} />
      </LayoutWrapper>
    );
}
