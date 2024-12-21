"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { UploadDropzone } from "@/lib/uploadthing";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const schema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
  slug: z.string().min(1, { message: "Campo obrigatório" }).max(40),
  cover: z.string().min(1, { message: "Campo obrigatório" }),
  content: z
    .object({})
    .optional()
    .refine((content) => !!content, { message: "Campo obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export const FormManagementArticle = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      cover: "",
      content: {},
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data.content));
    toast.success("Artigo criado com sucesso!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Criar Artigo</CardTitle>
        <CardDescription>
          Após preencher o formulário, clique no botão abaixo para criar um
          artigo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Campo Título */}
            <InputField name="title" label="Título" />

            {/* Campo Slug */}
            <InputField
              name="slug"
              label="Slug"
              placeholder="ex:. meu-artigo"
              extraContent={
                <Button variant={"secondary"} className="mt-2">
                  <Bot size={16} /> <>Gerar Slug</>
                </Button>
              }
            />

            {/* Campo Descrição */}
            <TextAreaField
              name="description"
              label="Descrição"
              placeholder="Descreva brevemente o artigo"
            />

            {/* Campo Foto de Capa */}
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
                        className="border-muted"
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
              className="min-h-80 rounded-lg border p-4"
            />

            <SubmitButton>Criar Artigo</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
