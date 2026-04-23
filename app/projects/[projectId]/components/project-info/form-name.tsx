import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectInfoType } from "@/app/projects/lib/definitions";

interface FormNameProps {
  formInfo: UseFormReturn<
    { name: string; description?: string | undefined },
    any,
    undefined
  >;
  setIsNameEditable: Dispatch<SetStateAction<boolean>>;
  defaultValue?: string;
  onSubmit: SubmitHandler<ProjectInfoType>;
}

const FormName = ({
  formInfo,
  setIsNameEditable,
  defaultValue,
  onSubmit,
}: FormNameProps) => {
  return (
    <FormField
      control={formInfo.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              id="name"
              placeholder="Project name"
              {...field}
              onBlur={formInfo.handleSubmit(onSubmit)}
              className="w-fit mb-3"
              autoFocus
              value={field.value === "" ? defaultValue : field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormName;
