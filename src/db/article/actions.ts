"use server";

import { db } from "@/lib/prisma";
import { CreateArticleProps, EditArticleProps } from "./types";
import { revalidatePath } from "next/cache";

const verifyArticleSlug = async (slug: string, blogSlug: string) => {
  const article = await db.article.findUnique({
    where: { slug, blogSlug },
  });
  return article;
};

const revalidatePathArticles = (blogSlug: string) =>
  revalidatePath(`/onboarding/${blogSlug}`);

export const createArticle = async (data: CreateArticleProps) => {
  const existingArticleSlug = await verifyArticleSlug(data.slug, data.blogSlug);
  if (existingArticleSlug) return { error: "Este slug já está em uso" };

  await db.article.create({ data });

  revalidatePathArticles(data.blogSlug);
};

export const editArticle = async ({ id, ...data }: EditArticleProps) => {
  const existingArticleSlug = await verifyArticleSlug(data.slug, data.blogSlug);

  if (existingArticleSlug) {
    const isCurrentArticle =
      existingArticleSlug && existingArticleSlug.id === id;

    if (!isCurrentArticle) return { error: "Este slug já está em uso" };
  }

  await db.article.update({ where: { id }, data });

  revalidatePathArticles(data.blogSlug);
};
