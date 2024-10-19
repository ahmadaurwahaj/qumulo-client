import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { LayoutWrapper } from "@/components/Layout";

export default function EditPolicySkeleton() {
  return (
    <LayoutWrapper>
      <div className="mt-4">
        <Skeleton className="h-3.5 w-20" />

        <div className="my-5 flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-10 w-1/3" />
        </div>

        <div className="my-5 flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-10 w-1/3" />
        </div>

        <Skeleton className="h-6 w-1/2 mb-5" />

        <div className="shadow-lg bg-[#242C35] p-8 border-t border-slate-600">
          <div className="mb-5 flex items-center space-x-11">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-52" />
          </div>

          <div className="mb-5 flex items-center space-x-10">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-52" />
          </div>

          <div className="mb-5 flex items-center space-x-10">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-44" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-9">
            <Skeleton className="h-4 w-44" />
            <div className="flex flex-wrap gap-8">
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-8">
            <Skeleton className="h-4 w-24" />
            <div className="ml-16 flex gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        <Skeleton className="h-5 w-32 mt-5" />
        <Skeleton className="h-4 w-full mt-2" />

        <div className="flex items-center mt-2">
          <Skeleton className="size-4 rounded-md" />
          <Skeleton className="ml-3 h-4 w-32" />
        </div>

        <div className="flex items-center mt-10">
          <Skeleton className="size-4 rounded-md" />
          <Skeleton className="ml-3 h-4 w-40" />
        </div>

        <div className="flex justify-between w-60 mt-8 gap-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    </LayoutWrapper>
  );
}
