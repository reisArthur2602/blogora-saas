import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FormManagementArticle } from "./_sessions/form-management-article";

type ManagerBlogPageProps = {
  params: { blogSlug: string };
};

const ManagerBlogPage = ({ params }: ManagerBlogPageProps) => {
  const { blogSlug } = params;

  return (
    <div className="flex flex-1 flex-col items-center gap-6">
      <Button asChild className="mr-auto" variant={"link"}>
        <Link href={`/onboarding/${blogSlug}`}>
          <ChevronLeft /> Voltar
        </Link>
      </Button>

      <FormManagementArticle blogSlug={blogSlug} />
    </div>
  );
};

export default ManagerBlogPage;
