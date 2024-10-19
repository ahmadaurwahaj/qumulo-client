"use client";
import React from "react";
import { useGetSnapshot } from "@/hooks";
import EditPolicySkeleton from "./components/EditPolicySkeleton";
import { LayoutHeader, LayoutWrapper } from "@/components/Layout";
import { EditForm } from "./components/EditPolicyForm";

export default function SnapshotPolicy() {
  const { data, isFetching, isPending: dataPending } = useGetSnapshot({id:"b540458e"});

  if(isFetching || dataPending) {
    return (<EditPolicySkeleton />)
  }

  if(data)
  return (
    <LayoutWrapper className="gap-4.5">
      <LayoutHeader title="Edit Snapshot Policy" />
      <EditForm data={data} />
    </LayoutWrapper>
  );
}
