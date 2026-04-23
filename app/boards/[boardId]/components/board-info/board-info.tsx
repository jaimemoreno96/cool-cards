"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import { useBoard } from "../../../hooks/use-board";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormName from "./form-name";
import Member from "./member";

import {
  BoardInfoType,
  Board,
  boardSchema,
  boardMembersSchema,
  BoardMembersType,
} from "../../../lib/definitions";
import { updateBoard } from "../../../data/board";
import { BoardDtoType } from "../../../types/boards";
import { UserDtoType } from "../../../types/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BoardMembersDialog from "./board-members-dialog";

interface BoardInfoProps {
  userId?: string;
  boardId?: string;
}
const BoardInfo = ({ userId, boardId }: BoardInfoProps) => {
  console.log("Board ID:", boardId);

  const { board, boardError, boardIsLoading, updateSelectedBoard } = useBoard(
    boardId || ""
  );

  const [isNameEditable, setIsNameEditable] = useState<boolean>(false);

  const defaultValuesInfo = {
    name: board?.board?.name || "",
    description: board?.board?.description || "",
    projectId: board?.board?.projectId || "",
    members: board?.board?.members?.toString() || "",
  };

  const defaultValuesMembers = {
    members: "",
  };

  const formInfo = useForm<BoardInfoType>({
    resolver: zodResolver(boardSchema),
    defaultValues: defaultValuesInfo,
  });

  const formMembers = useForm<BoardMembersType>({
    resolver: zodResolver(boardMembersSchema),
    defaultValues: defaultValuesMembers,
  });

  const onSubmit: SubmitHandler<BoardInfoType> = async ({
    name,
    description,
  }: BoardInfoType) => {
    console.log("Form submitted:", name, description);
    setIsNameEditable(false);
    const response = await updateSelectedBoard(
      board?.board?.userId || "",
      boardId || "",
      {
        name,
        description,
        members: board?.board?.members?.toString() || "",
      }
    );
    if (response) {
      setIsNameEditable(false);
    }
  };

  console.log(board);

  return (
    <div className="w-full p-4 flex items-center justify-between gap-4 bg-black/50">
      <Form {...formInfo}>
        <form className="w-fit" onSubmit={formInfo.handleSubmit(onSubmit)}>
          <div className="grid items-center h-full">
            {isNameEditable ? (
              <div className="w-fit p-1.5">
                <FormName
                  formInfo={formInfo}
                  setIsNameEditable={setIsNameEditable}
                  defaultValue={defaultValuesInfo.name}
                  onSubmit={onSubmit}
                />
              </div>
            ) : (
              <h1
                className="text-2xl p-2 font-bold hover:cursor-pointer text-white hover:bg-white/30 w-fit rounded-sm"
                onClick={() => {
                  formInfo.setValue("name", board?.board?.name || "");
                  setIsNameEditable(true);
                }}
              >
                {board?.board?.name}
              </h1>
            )}
          </div>
        </form>
      </Form>
      <BoardMembersDialog
        boardId={boardId || ""}
        userId={userId || ""}
        members={board?.members || []}
        formMembers={formMembers}
      >
        {board?.members?.length ? (
          <div className="relative overflow-hidden *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale transition-all duration-200 hover:cursor-pointer hover:bg-gray-100/50 hover:rounded-full active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 p-2 w-fit rounded-lg">
            {board?.members?.slice(0, 3).map((member: UserDtoType) => (
              <Member key={member.id} member={member} />
            ))}
            {board?.members?.length > 3 && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>+{board?.members?.length - 3}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ) : (
          <Button className="w-fit cursor-pointer" variant="outline">
            <PlusIcon />
            Add Members
          </Button>
        )}
      </BoardMembersDialog>
    </div>
  );
};

export default BoardInfo;
