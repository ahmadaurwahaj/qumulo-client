import { cn } from "@/lib/utils";

export const LayoutWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex-1 py-3 px-4 flex flex-col m-1 mb-0 border-2 border-b-0 border-[#283038] bg-[#1B222B] max-w-l",
        className
      )}
    >
      {children}
    </div>
  );
};

export const LayoutHeader = ({
  title,
  children,
  className = "",
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex justify-center sm:justify-between items-center flex-wrap",
        className
      )}
    >
      <h2 className="font-light text-heading text-[#F3F4F4]">{title}</h2>
      {children}
    </div>
  );
};
