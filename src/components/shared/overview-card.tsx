import React from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type OverviewCardProps = {
  data: {
    cover: string | null;
    name: string;
    description: string;
    path: string;
  };
};

export const OverviewCard = ({ data }: OverviewCardProps) => {
  return (
    <Card className="grid h-[400px] w-full grid-rows-2 overflow-hidden">
      <div className="relative">
        <Image
          src={data.cover || "/gradient.jpg"}
          alt="cover banner"
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button asChild className="w-full" size={"lg"}>
          <Link href={data.path}>Ver Artigo</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
