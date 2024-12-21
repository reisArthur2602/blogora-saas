"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

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
import { UploadDropzone } from "@/lib/uploadthing";

export const FormManagementArticle = () => {
  const form = useForm();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((data) => {
              console.log("Form Data:", data);
            })}
          >
            <InputField name="title" label="Título" />
            <InputField
              name="slug"
              label="Sub-domínio"
              placeholder="ex:. meu-blog"
              extraContent={
                <Button variant={"secondary"} className="mt-2">
                  <Bot size={16} /> <>Gerar Slug</>
                </Button>
              }
            />
            <TextAreaField
              name="description"
              label="Descrição"
              placeholder="Descreva brevemente o site"
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

            <SubmitButton>Criar Artigo</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
