import React from "react";
import Link from "next/link";

import { OverviewCard } from "@/components/shared/overview-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const blogs = [
  {
    cover: "/mock/blog-1.png",
    name: "Tech Trends",
    description: "Descubra as últimas tendências em tecnologia e inovação.",
    path: "#",
  },
  {
    cover: "/mock/blog-2.png",
    name: "Healthy Life",
    description: "Dicas e receitas para uma vida mais saudável e equilibrada.",
    path: "#",
  },
  {
    cover: "/mock/blog-3.png",
    name: "Travel Diaries",
    description: "Explorando o mundo, um destino incrível de cada vez.",
    path: "#",
  },
  {
    cover: "/mock/blog-4.png",
    name: "Code Mastery",
    description:
      "Tutoriais, dicas e truques para desenvolvedores de todos os níveis.",
    path: "#",
  },
  {
    cover: "/mock/blog-5.png",
    name: "Finance Insights",
    description: "Tudo sobre economia, investimentos e gestão financeira.",
    path: "#",
  },
];

const BlogsPage = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Button asChild className="ml-auto">
        <Link href={"/onboarding/blogs/create"} className="space-x-2">
          <PlusCircle /> Criar Blog
        </Link>
      </Button>

      <section className="grid w-full grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <OverviewCard key={blog.name} {...blog} />
        ))}
      </section>
    </div>
  );
};

export default BlogsPage;
