"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, Edit, Ellipsis, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type ArticleActionsButtonsProps = {
  id: string;
  path: string;
};

export const ArticleActionsButtons = ({
  id,
  path,
}: ArticleActionsButtonsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Ellipsis size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href={path}>
            <DropdownMenuItem onClick={() => toast.success("Editar artigo")}>
              <Edit size={16} />
              Editar
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() => toast.success("Deletar artigo" + id)}
          >
            <Trash2 size={16} />
            Deletar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => toast.success("Despublicar artigo" + id)}
          >
            <Book size={16} />
            Despublicar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
