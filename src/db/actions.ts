"use server";

import { signIn } from "@/lib/auth";

export const signInUser = async (
  provider: "nodemailer" | "google",
  email?: string,
) => {
  await signIn(provider, {
    email,
    redirectTo: "/onboarding",
  });
};
