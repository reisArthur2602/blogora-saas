"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/ui/input/field";
import { TextAreaField } from "@/components/ui/textarea/field";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, { message: "Deve ter no mínimo 3 caracteres" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
  slug: z.string().min(1).max(40),
});

type FormData = z.infer<typeof schema>;

export const FormCreateBlog = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      name: "",
      slug: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Blog</CardTitle>
        <CardDescription>
          Após preencher o formulário, clique no botão abaixo para criar um blog
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField name="name" label="Nome" />
            <InputField
              name="slug"
              label="Sub-domínio"
              placeholder="ex:. meu-blog"
            />
            <TextAreaField
              name="description"
              label="Descrição"
              placeholder="Descreva o brevemente o site"
            />
            <Button>Criar Site</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
