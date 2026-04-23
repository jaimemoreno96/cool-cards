"use client";

import { use, useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, User } from "lucide-react";

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

import { useProjects } from "../../hooks/use-projects";

import { Project, projectSchema } from "../../lib/definitions";

import { UserDtoType } from "../../types/users";
import { debounce } from "@/app/utils/debounce";
import MemberList from "@/components/member-list/member-list";

interface NewProjectProps {
  userId: string;
  children: React.ReactNode;
}

const NewProject = ({ userId, children }: NewProjectProps) => {
  const defaultValues = useMemo(() => {
    return {
      name: "",
      description: "",
      members: "",
    };
  }, []);

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const [members, setMembers] = useState<UserDtoType[]>([]);

  const [selectedMembers, setSelectedMembers] = useState<UserDtoType[]>([]);

  const [open, setOpen] = useState(false);

  const { addNewProject } = useProjects(userId);

  const onSubmit: SubmitHandler<Project> = useCallback(
    async (data: Project) => {
      const projectMembers: string[] = [];
      if (selectedMembers.length) {
        selectedMembers.forEach((member: any) => {
          projectMembers.push(member.id);
        });
      }
      data.members = projectMembers.join(",") || "";
      const response = await addNewProject(userId, data);
      if (response) {
        setOpen(false);
        form.reset(defaultValues);
        setSelectedMembers([]);
        setMembers([]);
      }
    },
    [addNewProject, form, defaultValues, selectedMembers, userId]
  );

  const getMembers = useCallback(async (value: string) => {
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
  }, [userId]);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project by filling out the details below.
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
                    <FormLabel htmlFor="name">Project Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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

export default NewProject;
