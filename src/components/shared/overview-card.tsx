import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

type OverviewCardProps = {
  cover: string;
  name: string;
  description: string;
  path: string;
};

export const OverviewCard = ({
  cover,
  description,
  name,
  path,
}: OverviewCardProps) => {
  return (
    <Card className="grid h-[400px] w-full grid-rows-2 overflow-hidden">
      <div className="relative">
        <Image src={cover} alt="cover banner" fill className="object-cover" />
      </div>

      <CardContent className="flex flex-col justify-between">
        <div className="my-6">
          <h2 className="line-clamp-1 text-xl font-bold">{name}</h2>
          <p className="line-clamp-2 leading-5 text-muted-foreground/60">
            {description}
          </p>
        </div>
        <Button asChild className="w-full" size={"lg"}>
          <Link href={path}>Ver Artigo</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
