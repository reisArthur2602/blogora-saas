"use server";

import { revalidatePath } from "next/cache";
import { CreateBlogProps } from "./types";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const createBlog = async (data: CreateBlogProps) => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const slug = await db.blog.findUnique({ where: { slug: data.slug } });
  if (slug) return { error: "Este slug já está em uso" };

  await db.blog.create({
    data: {
      ...data,
      userId,
    },
  });
  revalidatePath("/onboarding");
};
