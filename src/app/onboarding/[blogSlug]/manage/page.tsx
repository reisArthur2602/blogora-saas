import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FormManagementArticle } from "./_sessions/form-management-article";
import { getArticle } from "@/db/article/queries";

type ManagerBlogPageProps = {
  params: { blogSlug: string };
  searchParams: { article_id: string };
};

const ManagerBlogPage = async ({
  params,
  searchParams,
}: ManagerBlogPageProps) => {
  const { blogSlug } = params;
  const { article_id } = searchParams;

  const article = await getArticle(article_id);

  return (
    <div className="flex flex-1 flex-col items-center gap-6">
      <Button asChild className="mr-auto" variant={"link"}>
        <Link href={`/onboarding/${blogSlug}`}>
          <ChevronLeft /> Voltar
        </Link>
      </Button>

      <FormManagementArticle blogSlug={blogSlug} initialData={article} />
    </div>
  );
};

export default ManagerBlogPage;
