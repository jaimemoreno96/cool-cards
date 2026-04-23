"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

import { getMembersByEmail } from "../../data/user";

import { useBoards } from "../../hooks/use-boards";

import { Board, boardSchema } from "../../lib/definitions";

import { UserDtoType } from "../../types/users";
import { debounce } from "@/app/utils/debounce";
import MemberList from "@/components/member-list/member-list";
import { fetchImages } from "../../data/board";
import { BoardImage } from "../../types/boards";
import Image from "next/image";
import { CheckCircle, CheckCircleIcon, CheckIcon } from "lucide-react";

interface NewBoardProps {
  userId: string;
  projectId?: string;
  children: React.ReactNode;
}

const NewBoard = ({ userId, projectId, children }: NewBoardProps) => {
  const defaultValues = useMemo(() => {
    return {
      name: "",
      description: "",
      projectId: projectId || "",
      members: "",
    };
  }, [projectId]);

  const form = useForm<Board>({
    resolver: zodResolver(boardSchema),
    defaultValues,
  });

  const [members, setMembers] = useState<UserDtoType[]>([]);

  const [selectedMembers, setSelectedMembers] = useState<UserDtoType[]>([]);

  const [images, setImages] = useState<BoardImage[]>([]);

  const [selectedImage, setSelectedImage] = useState<BoardImage | null>(null);

  const [open, setOpen] = useState(false);

  // refactor to use useBoards hook for adding new board and fetching images

  // refactor to use reducer instead of multiple useState for members and images state management
  
  
  const { addNewBoard } = useBoards(userId, projectId);

  const onSubmit: SubmitHandler<Board> = useCallback(
    async (data: Board) => {
      const boardMembers: string[] = [];
      if (selectedMembers.length) {
        selectedMembers.forEach((member: any) => {
          boardMembers.push(member.id);
        });
      }
      data.members = boardMembers.join(",") || "";
      data.projectId = projectId || "";
      const response = await addNewBoard(userId, data, selectedImage);
      if (response) {
        setOpen(false);
        form.reset(defaultValues);
        setSelectedMembers([]);
        setMembers([]);
      }
    },
    [
      addNewBoard,
      form,
      defaultValues,
      selectedMembers,
      userId,
      projectId,
      selectedImage,
    ]
  );

  const getMembers = useCallback(
    async (value: string) => {
      if (!value) {
        setMembers([]);
        return;
      }

      const response = await getMembersByEmail(value, userId);

      console.log("Response: ", response.data.members);

      if (response.status === 200) {
        setMembers(response.data.members);
        return;
      }

      setMembers([]);
    },
    [userId]
  );

  const handleMemberDeselect = useCallback(
    (member: UserDtoType) => {
      setSelectedMembers(
        selectedMembers.filter((m: any) => m.id !== member.id)
      );
    },
    [selectedMembers]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMembers = useCallback(
    debounce((value: string) => {
      getMembers(value);
    }, 500),
    []
  );

  const handleMemberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      debouncedGetMembers(value);
    },
    [debouncedGetMembers]
  );

  const selectedMembersSet = useMemo(
    () => new Set(selectedMembers.map((m) => m.id)),
    [selectedMembers]
  );

  const isMemberSelected = useCallback(
    (member: UserDtoType) => {
      return selectedMembersSet.has(member.id);
    },
    [selectedMembersSet]
  );

  const handleMemberSelect = useCallback(
    (member: UserDtoType) => {
      const isSelected = isMemberSelected(member);

      if (isSelected) {
        return;
      }
      setSelectedMembers([...selectedMembers, member]);
      setMembers([]);
    },
    [isMemberSelected, selectedMembers]
  );

  console.log(userId);

  return (
    <Dialog
      open={open}
      onOpenChange={async () => {
        if (!open) {
          const images = await fetchImages();
          setImages(images);
        } else {
          setSelectedImage(null);
          setImages([]);
        }
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Create a new board by filling out the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Board Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Board name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Select Board Background Image</FormLabel>
              <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-4 p-2 w-full h-auto max-h-[400px] overflow-y-auto">
                {images?.length > 0 &&
                  images.map((image: BoardImage) => (
                    <div
                      key={image.name}
                      className="flex flex-col items-center justify-center"
                    >
                      <Image
                        src={image.url}
                        alt={image.name}
                        className={`w-full h-full object-cover rounded-md cursor-pointer hover:scale-105 transition-transform border-2 ${
                          selectedImage?.name === image.name
                            ? "border-primary-main opacity-50 pointer-events-none scale-105"
                            : ""
                        }`}
                        width={100}
                        height={100}
                        onClick={() => {
                          if (selectedImage?.name !== image.name) {
                            setSelectedImage(image);
                          }
                        }}
                        unoptimized
                      />
                      {selectedImage?.name === image.name && (
                        <span className="absolute text-primary-main text-xs font-medium mt-2 w-fill flex justify-center items-center">
                          <CheckIcon className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  ))}
              </div>

              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="members">Members</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="members"
                          placeholder="Type to search members by email or name."
                          autoComplete="off"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleMemberChange(e);
                          }}
                        />
                        {members?.length > 0 && (
                          <MemberList
                            members={members}
                            handleMemberSelect={handleMemberSelect}
                            isMemberSelected={isMemberSelected}
                          />
                        )}
                        {selectedMembers.length > 0 && (
                          <div className="w-full flex gap-2 flex-wrap mt-2">
                            <span className="text-xs font-medium">
                              Members:
                            </span>
                            {selectedMembers.map((member: UserDtoType) => (
                              <Badge
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                onClick={() => handleMemberDeselect(member)}
                                key={member.id}
                              >
                                {member.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoard;
