"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { cache } from "react";

export const getBlogs = cache(async () => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const blogs = await db.blog.findMany({ where: { userId } });
  return blogs;
});
