import React from "react";

import { LayoutWrapper } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";

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

        <Skeleton className="mb-5 h-6 w-1/2" />

        <div className="border-t border-slate-600 bg-slate-900 p-8 shadow-lg">
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

        <Skeleton className="mt-5 h-5 w-32" />
        <Skeleton className="mt-2 h-4 w-full" />

        <div className="mt-2 flex items-center">
          <Skeleton className="size-4 rounded-md" />
          <Skeleton className="ml-3 h-4 w-32" />
        </div>

        <div className="mt-10 flex items-center">
          <Skeleton className="size-4 rounded-md" />
          <Skeleton className="ml-3 h-4 w-40" />
        </div>

        <div className="mt-8 flex w-60 justify-between gap-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    </LayoutWrapper>
  );
}
