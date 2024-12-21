"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { UploadDropzone } from "@/lib/uploadthing";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "react-slugify";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { InputField } from "@/components/ui/input/field";
import { TextAreaField } from "@/components/ui/textarea/field";
import { SubmitButton } from "@/components/ui/button/submit";
import { Button } from "@/components/ui/button";

import { Bot } from "lucide-react";

import { toast } from "sonner";
import { EditorField } from "@/components/ui/editor/field";
import { createArticle, editArticle } from "@/db/article/actions";
import { useRouter } from "next/navigation";
import { Article } from "@prisma/client";

const schema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
  slug: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(40)
    .transform((value) => slugify(value)),
  cover: z.string().min(1, { message: "Campo obrigatório" }),
  content: z
    .object({
      type: z.string(),
      content: z.array(z.any()).min(1, { message: "Campo obrigatório" }),
    })
    .refine((content) => content.content.length > 0, {
      message: "Campo obrigatório",
    }),
});

type FormData = z.infer<typeof schema>;

type FormManagementArticleProps = {
  blogSlug: string;
  initialData: Article | null;
};

export const FormManagementArticle = ({
  blogSlug,
  initialData,
}: FormManagementArticleProps) => {
  const { push } = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      description: initialData?.description ?? "",
      cover: initialData?.cover ?? "",
      content: initialData?.content
        ? JSON.parse(initialData.content)
        : { type: "doc", content: [] },
    },
  });

  const isEditing = !!initialData;

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.cover ?? null,
  );

  const handleGenerateSlug = () => {
    const title = form.getValues("title");
    if (!title)
      return toast.error("Você precisa de um título para gerar o slug");
    form.setValue("slug", slugify(title));
    toast.success("O slug foi criado com sucesso");
  };

  const onEdit = async (data: FormData) => {
    try {
      const response = await editArticle({
        ...data,
        id: initialData?.id as string,
        content: JSON.stringify(data.content),
        blogSlug,
      });

      if (response?.error) return toast.error(response.error);
      toast.success("O artigo foi editado com sucesso!");
      push(`/onboarding/${blogSlug}`);
    } catch {
      toast.error("Erro ao editar artigo");
    }
  };

  const onCreate = async (data: FormData) => {
    try {
      const response = await createArticle({
        ...data,
        content: JSON.stringify(data.content),
        blogSlug,
      });

      if (response?.error) return toast.error(response.error);
      toast.success("O artigo foi criado com sucesso!");
      push(`/onboarding/${blogSlug}`);
    } catch {
      toast.error("Erro ao criar artigo");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Artigo" : "Criar Artigo"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Após preencher o formulário, clique no botão abaixo para criar um artigo"
            : "Após preencher o formulário, clique no botão abaixo para editar o artigo"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(isEditing ? onEdit : onCreate)}
          >
            <InputField name="title" label="Título" />

            <InputField
              name="slug"
              label="Slug"
              placeholder="ex:. meu-artigo"
              extraContent={
                <Button
                  variant={"secondary"}
                  className="mt-2"
                  type="button"
                  onClick={handleGenerateSlug}
                >
                  <Bot size={16} /> <>Gerar Slug</>
                </Button>
              }
            />

            <TextAreaField
              name="description"
              label="Descrição"
              placeholder="Descreva brevemente o artigo"
            />

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto de capa</FormLabel>
                  <FormControl>
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview da imagem"
                        width={200}
                        height={200}
                        className="mt-4 size-[200px] rounded-md object-cover"
                      />
                    ) : (
                      <UploadDropzone
                        className="min-h-72 border-muted"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          const imageUrl = res[0]?.url;
                          if (imageUrl) {
                            field.onChange(imageUrl);
                            setImagePreview(imageUrl);
                            toast.success("Imagem carregada com sucesso!");
                          }
                        }}
                        onUploadError={() => {
                          toast.error("Erro ao fazer o upload da imagem");
                        }}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <EditorField
              name="content"
              label="Conteúdo"
              className="min-h-96 rounded-lg border px-6 py-8"
            />

            <SubmitButton>
              {isEditing ? "Editar Artigo" : "Criar Artigo"}
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
