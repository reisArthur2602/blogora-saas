"use server";

import { db } from "@/lib/prisma";
import { cache } from "react";

export const getArticles = cache(async (blogSlug: string) => {
  const articles = await db.article.findMany({ where: { blogSlug } });
  return articles;
});

export const getArticle = cache(async (article_id?: string) => {
  if (!article_id) return null;

  const article = await db.article.findUnique({ where: { id: article_id } });
  return article;
});
