import { PropsWithChildren } from "react";
import { OnboardingLayout } from "./_sessions/onboarding-layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session?.user) return redirect("/auth");

  return <OnboardingLayout>{children}</OnboardingLayout>;
};

export default Layout;
