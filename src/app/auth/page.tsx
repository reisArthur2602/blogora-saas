"use client";

import React from "react";
import { useForm } from "react-hook-form";

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

type FormData = {
  email: string;
};

const AuthPage = () => {
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
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
            <form className="grid gap-4">
              <InputField name="email" label="Email" />
              <Button>Acessar com email</Button>
              <span className="mx-auto w-fit text-xs font-bold text-muted-foreground">
                OU
              </span>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <Button variant="secondary" className="w-full">
            <Image src="/google.svg" alt="logo google" width={30} height={30} />
            Continue com Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
