import React from "react";
import Link from "next/link";

import { OverviewCard } from "@/components/shared/overview-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getBlogs } from "@/db/blog/queries";

const BlogsPage = async () => {
  const blogs = await getBlogs();
  return (
    <div className="flex flex-col items-center gap-6">
      <Button asChild className="ml-auto">
        <Link href={"/onboarding/blogs/create"} className="space-x-2">
          <PlusCircle /> Criar Blog
        </Link>
      </Button>

      <section className="grid w-full grid-cols-4 gap-6">
        {blogs.map(({ id, cover, description, name, slug }) => (
          <OverviewCard
            key={id}
            data={{
              cover,
              description,
              name,
              path: `/onboading/${slug}`,
            }}
          />
        ))}
      </section>
    </div>
  );
};

export default BlogsPage;
