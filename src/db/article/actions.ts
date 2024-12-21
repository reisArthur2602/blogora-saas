"use server";

import { db } from "@/lib/prisma";
import { CreateArticleProps } from "./types";
import { revalidatePath } from "next/cache";

export const createArticle = async (data: CreateArticleProps) => {
  const slug = await db.article.findUnique({
    where: { slug: data.slug, blogSlug: data.blogSlug },
  });
  if (slug) return { error: "Este slug já está em uso" };

  await db.article.create({ data });

  revalidatePath(`/onboarding/${data.blogSlug}`);
};
