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

export const getBlog = cache(async (blogSlug: string) => {
  const blog = await db.blog.findUnique({ where: { slug: blogSlug } });
  return blog;
});
