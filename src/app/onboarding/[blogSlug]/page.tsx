import { Button } from "@/components/ui/button";
import { getBlog } from "@/db/blog/queries";
import { Book, LucideProps, PlusCircle, Settings2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type BlogSlugLink = {
  path: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  name: string;
  variant?:
    | "secondary"
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
};

type BlogSlugPageProps = {
  params: { blogSlug: string };
};

const BlogSlugPage = async ({ params }: BlogSlugPageProps) => {
  const { blogSlug } = params;

  const blog = await getBlog(blogSlug);
  if (!blog) return notFound();

  const BLOG_SLUG_LINKS: BlogSlugLink[] = [
    {
      path: `/${blogSlug}`,
      icon: Book,
      name: "Ver Blog",
      variant: "secondary",
    },
    {
      path: `/onboarding/${blogSlug}/settings`,
      icon: Settings2,
      name: "Configurações",
      variant: "secondary",
    },
    {
      path: `/onboarding/${blogSlug}/create`,
      name: "Criar Artigo",
      icon: PlusCircle,
      variant: "default",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="ml-auto flex items-center gap-4">
        {BLOG_SLUG_LINKS.map((link) => (
          <Button asChild key={link.name} variant={link.variant}>
            <Link href={link.path} className="space-x-2">
              <link.icon /> {link.name}
            </Link>
          </Button>
        ))}
      </div>
      BlogSlugPage
    </div>
  );
};

export default BlogSlugPage;
