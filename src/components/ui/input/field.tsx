import React, { ComponentProps, JSX } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "./primitive";

type InputFieldProps = ComponentProps<"input"> & {
  name: string;
  label?: string;
  description?: string;
  extraContent?: JSX.Element;
};

export const InputField = ({
  name,
  label,
  description,
  extraContent,
  ...rest
}: InputFieldProps) => {
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
            <Input {...rest} {...field} disabled={isSubmitting} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {extraContent}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
