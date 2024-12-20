import React from "react";
import { Metadata } from "next";

import { FormCreateBlog } from "./_sessions/form-create-blog";

export const metadata: Metadata = {
  title: "Crie o seu blog - blogora.",
};

const CreateBlogPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <FormCreateBlog />
    </div>
  );
};

export default CreateBlogPage;
