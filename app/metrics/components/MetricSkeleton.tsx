import { Skeleton } from "@/components/ui/skeleton";

const ChartCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={`w-full border border-secondary-border bg-secondary-background px-3 py-2 md:w-[200px] ${className}`}
  >
    <Skeleton className="mb-2 h-4 w-32" />
    <Skeleton className="h-6 w-20" />
  </div>
);
export function MetricsChartSkeleton() {
  return (
    <div className="relative size-full border-0">
      <div className="flex flex-col-reverse items-start gap-4 md:flex-row">
        {/* Main Chart Section */}
        <div className="w-full flex-col">
          <div className="flex justify-between pr-4">
            <Skeleton className="mt-6 h-5 w-24" />
            <Skeleton className="h-4 w-20 pt-11" />
          </div>
          <Skeleton className="mt-4 size-full max-h-[180px] min-h-[100px] min-w-[200px] rounded-md bg-slate-800" />
        </div>

        {/* Card Section */}
        <div className="flex size-full h-full flex-col text-nowrap pb-4 pr-3 text-xl md:size-fit md:p-2 md:pb-0 md:pr-0 md:pt-[35px]">
          <Skeleton className="h-5 w-20 pl-1" />
          <div className="mt-3 flex flex-row md:flex-col">
            <ChartCardSkeleton />
            <ChartCardSkeleton className="mt-4 border-l-0 border-t md:border-l md:border-t-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
