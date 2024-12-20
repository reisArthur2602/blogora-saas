import { PropsWithChildren } from "react";
import { OnboardingLayout } from "./_sessions/onboarding-layout";

const Layout = ({ children }: PropsWithChildren) => {
  return <OnboardingLayout>{children}</OnboardingLayout>;
};

export default Layout;
