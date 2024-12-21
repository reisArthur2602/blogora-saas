import { Article } from "@prisma/client";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArticleActionsButtons } from "./articles-actions-buttons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PublishedProps = { label: string; styles: string };
type PublishedStatus = "PUBLISHED" | "ARQUIVED";

const publisedResult: Record<PublishedStatus, PublishedProps> = {
  PUBLISHED: {
    label: "Publicado",
    styles: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  ARQUIVED: {
    label: "Arquivado",
    styles: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  },
};

type DataArticlesTableProps = {
  articles: Article[];
};

export const DataArticlesTable = ({ articles }: DataArticlesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagem</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Publicado em</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id} className="[&>td]:py-6">
            <TableCell>
              <Image
                src={article.cover}
                alt={article.title}
                width={90}
                height={90}
                className="size-[90px] rounded-sm object-cover"
              />
            </TableCell>
            <TableCell>{article.title}</TableCell>
            <TableCell>
              <Badge
                className={cn(
                  "cursor-pointer",
                  publisedResult["PUBLISHED"].styles,
                )}
              >
                {publisedResult["PUBLISHED"].label}
              </Badge>
            </TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "medium",
              }).format(article.createdAt)}
            </TableCell>
            <TableCell>
              <ArticleActionsButtons />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
