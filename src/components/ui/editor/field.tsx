import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { useFormContext } from "react-hook-form";

import { Editor } from ".";
import { JSONContent } from "novel";

type EditorFieldProps = {
  name: string;
  label?: string;
  className?: string;
};

export const EditorField = ({ label, name, className }: EditorFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Editor
              value={field.value || { type: "doc", content: [] }}
              onChange={(value: JSONContent) => field.onChange(value)}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
