"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input/field";
import { Form } from "@/components/ui/form";
import { signInUser } from "@/db/actions";

const schema = z.object({
  email: z.string().min(2, "Campo obrigatório").email("Insira um email válido"),
});

type FormData = z.infer<typeof schema>;

export const FormAuth = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) =>
    await signInUser("nodemailer", data.email);

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">
          Dê voz aos seus pensamentos 🖖
        </CardTitle>
        <CardDescription>
          Preencha o formulário para acessar sua conta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField name="email" label="Email" />
            <Button>Acessar com email</Button>
            <span className="mx-auto w-fit text-xs font-bold text-muted-foreground">
              OU
            </span>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button
          variant="secondary"
          className="w-full"
          onClick={async () => await signInUser("google")}
        >
          <Image src="/google.svg" alt="logo google" width={30} height={30} />
          Continue com Google
        </Button>
      </CardFooter>
    </Card>
  );
};
