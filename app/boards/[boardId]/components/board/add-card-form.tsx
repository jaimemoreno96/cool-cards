import { useBoard } from "@/app/boards/hooks/use-board";
import { CardSchemaType, newCardSchema } from "@/app/boards/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddCardFormProps {
  userId?: string;
  boardId: string;
  boardColumnId: string;
  lastpostion?: number;
  onClick?: () => void;
}
const AddCardForm = ({
  userId,
  boardId,
  boardColumnId,
  lastpostion,
  onClick,
}: AddCardFormProps) => {
  const { addCard } = useBoard(boardId);
  const defaultValues = useMemo(() => {
    return {
      name: "",
    };
  }, [boardId]);

  const form = useForm<CardSchemaType>({
    resolver: zodResolver(newCardSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CardSchemaType> = useCallback(
    async (data) => {
      console.log(data);
      try {
        const response = await addCard(
          userId || "",
          boardId,
          boardColumnId,
          data.name,
          lastpostion || 0
        );
        console.log("Add Card Response:", response);

        if (response.status === 200) {
          form.reset();
          if (onClick) onClick();
        }
      } catch (error) {
        console.error("Error adding card:", error);
      }
    },
    [addCard, boardColumnId, form, lastpostion, onClick]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full p-2 bg-gray-100 rounded-md">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input id="name" placeholder="Card name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">Add card</Button>
            <Button variant="outline" onClick={onClick}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddCardForm;
