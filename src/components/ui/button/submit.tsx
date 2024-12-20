"use client";

import { Button, ButtonProps } from ".";
import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";

export const SubmitButton = ({ children, ...rest }: ButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button disabled={isSubmitting} {...rest}>
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin transition-all" /> Carregando...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
