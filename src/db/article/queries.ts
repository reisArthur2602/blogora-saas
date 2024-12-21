"use server";

import { db } from "@/lib/prisma";
import { cache } from "react";

export const getArticles = cache(async (blogSlug: string) => {
  const articles = await db.article.findMany({ where: { blogSlug } });
  return articles;
});
