import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ProjectInfoType } from "../../lib/definitions";
import { register } from "module";
import { Input } from "@/components/ui/input";

interface FormDescriptionProps {
  formInfo: UseFormReturn<
    { name: string; description?: string | undefined },
    any,
    undefined
  >;
  setIsDescriptionEditable: Dispatch<SetStateAction<boolean>>;
  defaultValue?: string;
  onSubmit: SubmitHandler<ProjectInfoType>;
}

const FormDescription = ({
  formInfo,
  setIsDescriptionEditable,
  defaultValue,
  onSubmit,
}: FormDescriptionProps) => {
  const handleBlur = () => {
    formInfo.handleSubmit(onSubmit)();
    console.log("defaultValue on blur:", defaultValue);
    setIsDescriptionEditable(false);
  };

  console.log("Rendering FormDescription with defaultValue:", defaultValue);

  return (
    <FormField
      control={formInfo.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              id="description"
              placeholder="Type your project description..."
              {...field}
              onBlur={formInfo.handleSubmit(onSubmit)}
              className="w-fit"
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

export default FormDescription;
