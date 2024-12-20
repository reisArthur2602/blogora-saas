"use client";

import { cn } from "@/lib/utils";
import { DollarSign, Globe, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { path: "/onboarding", label: "Início", icon: Home },
  { path: "/onboarding/blogs", label: "Blogs", icon: Globe },
  { path: "/onboarding/pricing", label: "Planos", icon: DollarSign },
];

export const NavItens = () => {
  const pathname = usePathname();

  const isCurrentPath = (path: string) => path === pathname;

  return (
    <nav className="flex flex-col items-center gap-2">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={cn(
            "flex w-full items-center gap-2 rounded-sm p-2 text-sm font-medium text-muted-foreground/40 transition-all hover:bg-accent/40",
            isCurrentPath(item.path) && "text-foreground",
          )}
        >
          <item.icon size={16} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
