import { ControllerRenderProps, Path, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";

interface CustomFormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

export function CustomFormField<FormState>({
  name,
  label,
  placeholder,
  description,
  type = "text",
}: CustomFormFieldProps) {
  const { control, register } = useFormContext();
  return (
    <FormField
      control={control}
      name={name as Path<FormState>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "number" ? (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              <Input
                type={type}
                placeholder={placeholder || ""}
                {...(field as ControllerRenderProps<FormState>)}
                {...register(name, { valueAsNumber: true })}
              />
            ) : (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              <Input
                type={type}
                onFocus={(e) => {
                  const goToLastCharacter = () => {
                    e.target.selectionStart = e.target.value.length;
                  };
                  goToLastCharacter();
                }}
                placeholder={placeholder || ""}
                {...(field as ControllerRenderProps<FormState>)}
              />
            )}
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
