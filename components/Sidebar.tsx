"use client";
import Logo from "@/assets/images/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  href: string;
  navText: string;
  selected: boolean;
}

const NavigationItem = ({ href, navText, selected }: NavigationItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={cn("flex items-center px-2 py-0.5 text-sm", {
          "bg-[#13181E] border-r-4 border-[#00A3CA] text-white": selected,
        })}
      >
        <span className={cn("h-1 w-1 rounded-full mr-2 bg-white")}></span>
        {navText}
      </Link>
    </li>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className=" sticky top-0 w-50 pl-3 pt-4.5 bg-[#242C35] h-screen">
      <div className="flex items-center pr-3 flex-col gap-2">
        <div className="flex">
          <Logo />
          <h2 className="font-light text-heading">[Cluster name]</h2>
        </div>
        <hr className="my-0 h-0.5 border-t-0 bg-neutral-100 dark:bg-[#2D3E4E] w-full" />
      </div>
      <ul className="space-y-1 mt-4">
        <NavigationItem
          navText="Performance Metrics"
          href="/metrics"
          selected={pathname === "/metrics"}
        />
        <NavigationItem
          navText="Edit Policy"
          href="/edit-policy"
          selected={pathname === "/edit-policy"}
        />
      </ul>
    </div>
  );
}
