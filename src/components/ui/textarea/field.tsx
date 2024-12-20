import React, { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

import { Textarea } from "./primitive";

type TextAreaFieldProps = ComponentProps<"textarea"> & {
  name: string;
  label?: string;
  description?: string;
};

export const TextAreaField = ({
  name,
  label,
  description,
  ...rest
}: TextAreaFieldProps) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...rest} {...field} disabled={isSubmitting} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
