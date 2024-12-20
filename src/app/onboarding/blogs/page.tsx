import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const BlogsPage = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Button asChild className="ml-auto">
        <Link href={"/onboarding/blogs/create"} className="space-x-2">
          <PlusCircle /> Criar Blog
        </Link>
      </Button>
    </div>
  );
};

export default BlogsPage;
