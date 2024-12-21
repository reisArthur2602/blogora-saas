import React, { PropsWithChildren } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";

import { Logo } from "@/components/shared/logo";

import { NavItens } from "./nav-itens";
import { ProfileDropdown } from "./profile-dropdown";

export const OnboardingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid h-screen grid-cols-[300px_1fr] overflow-hidden">
      {/* sidebar */}
      <aside className="flex flex-col border-r bg-muted/10">
        <header className="flex h-16 items-center justify-start border-b px-6">
          <Logo />
        </header>
        <div className="space-y-4 p-6">
          <h3 className="text-xs font-bold text-muted-foreground/40">
            DASHBOARD
          </h3>
          <NavItens />
        </div>
      </aside>

      <div className="flex flex-col">
        {/* header */}
        <header className="flex h-16 items-center border-b bg-muted/10 px-6">
          <div className="ml-auto flex w-fit items-center justify-center gap-4">
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </header>
        {/* content */}
        <main className="h-full p-6">{children}</main>
      </div>
    </div>
  );
};
