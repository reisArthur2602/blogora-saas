export type CreateArticleProps = {
  slug: string;
  blogSlug: string;
  title: string;
  description: string;
  cover: string;
  content: string;
};

export type EditArticleProps = CreateArticleProps & {
  id: string;
};
