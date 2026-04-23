"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { KeyedMutator } from "swr";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getMembersByEmail } from "@/app/projects/data/user";

import { UserDtoType } from "../../../types/users";
import { Board } from "../../../lib/definitions";

import { debounce } from "@/app/utils/debounce";
import MemberList from "@/components/member-list/member-list";
import { useBoard } from "../../../hooks/use-board";
import DeleteMemberDialog from "./delete-member-dialog";

interface BoardMembersDialogProps {
  children: React.ReactNode;
  formMembers: UseFormReturn<{ members?: string | undefined }, any, undefined>;
  members: UserDtoType[];
  boardId: string;
  userId: string;
}

const BoardMembersDialog = ({
  children,
  formMembers,
  members,
  boardId,
  userId,
}: BoardMembersDialogProps) => {
  const [open, setOpen] = useState(false);
  const [projectMembers, setProjectMembers] = useState<UserDtoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<UserDtoType[]>(members);

  const { updateSelectedBoard } = useBoard(boardId);

  useEffect(() => {
    setSelectedMembers(members);
  }, [members]);

  const onSubmitMembers = useCallback(
    async ({ members }: { members?: string }) => {
      const projectMembersIds = selectedMembers.map(
        (member: UserDtoType) => member.id
      );
      members = projectMembersIds.join(",") || "";

      const response = await updateSelectedBoard(userId, boardId, {
        members,
      } as Board);
      if (response) {
        setOpen(false);
        return;
      }
    },
    [selectedMembers, updateSelectedBoard, userId, boardId]
  );

  const getMembers = useCallback(
    async (value: string) => {
      if (!value) {
        setProjectMembers([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await getMembersByEmail(value, userId);

        if (response.status === 200) {
          setProjectMembers(response.data.members);
        } else {
          setProjectMembers([]);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        setProjectMembers([]);
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  const handleMemberDeselect = useCallback(
    (member: UserDtoType) => {
      setSelectedMembers((prev) => prev.filter((m: any) => m.id !== member.id));
    },
    [setSelectedMembers]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMembers = useCallback(
    debounce((value: string) => {
      getMembers(value);
    }, 500),
    [userId]
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
      setSelectedMembers((prev) => [...prev, member]);
      setProjectMembers([]);
    },
    [isMemberSelected, setSelectedMembers]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
          <DialogDescription>
            Add members to your board by their email addresses.
          </DialogDescription>
        </DialogHeader>
        <Form {...formMembers}>
          <form onSubmit={formMembers.handleSubmit(onSubmitMembers)}>
            <div className="grid gap-4 mb-4">
              <FormField
                control={formMembers.control}
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
                          className="w-full text-sm"
                          onBlur={() => {
                            setTimeout(() => setProjectMembers([]), 200);
                          }}
                        />
                        {projectMembers?.length > 0 && (
                          <MemberList
                            members={projectMembers}
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
                              <DeleteMemberDialog
                                key={member.id}
                                handleMemberDeselect={handleMemberDeselect}
                                member={member}
                              >
                                <Badge className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                                  {member.name}
                                </Badge>
                              </DeleteMemberDialog>
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
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BoardMembersDialog;
