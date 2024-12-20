import React from "react";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import { FormAuth } from "./sessions/form-auth";

const AuthPage = async () => {
  const session = await auth();
  if (session?.user) return redirect("/onboarding");

  return (
    <div className="flex h-screen items-center justify-center">
      <FormAuth />
    </div>
  );
};

export default AuthPage;
