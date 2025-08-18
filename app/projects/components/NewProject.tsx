"use client";

import { use, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CheckIcon, User } from "lucide-react";

import { Project, projectSchema } from "../lib/definitions";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getMembersByEmail } from "../data/user";
import { Badge } from "@/components/ui/badge";
import { createProject } from "../data/project";
import useSWR from "swr";
import { useProjects } from "../hooks/useProjects";
import { useMembers } from "../hooks/useMembers";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface NewProjectProps {
  userId: string;
}

const NewProject = ({ userId }: NewProjectProps) => {
  const defaultValues = {
    name: "",
    description: "",
    members: "",
  };

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const [members, setMembers] = useState<any>([]);

  const [selectedMembers, setSelectedMembers] = useState<any>([]);

  const [open, setOpen] = useState(false);

  const { mutateProjects } = useProjects(userId);

  const { mutateMembers } = useMembers();

  const onSubmit: SubmitHandler<Project> = async (data: Project) => {
    console.log("Submitted Project Data:", data);
    const projectMembers: string[] = [];
    if (selectedMembers.length) {
      selectedMembers.forEach((member: any) => {
        projectMembers.push(member.id);
      });
    }
    data.members = projectMembers.join(",") || "";
    const project = await createProject(data);
    if (project) {
      console.log("Created Project:", project);
      console.log(form.getValues());
      setOpen(false);
      form.reset(defaultValues);
      setSelectedMembers([]);
      setMembers([]);
    }
  };

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const getMembers = async (value: string) => {
    if (!value) {
      setMembers([]);
      return;
    }

    // const members = await getMembersByEmail(value);
    const members = await fetch("/api/users/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: value, userId: userId }),
      })
      console.log("Members:", members);
       

      mutateMembers(
        async (currentData: any) => {
          if (!currentData) return currentData
          return {
            ...currentData,
            data: members,
          }
        },
        { revalidate: false }
      )



    // Update the members state with the filtered members
    setMembers(members);
  };

  const handleMemberSelect = (member: any) => {
    const isSelected = isMemberSelected(member);

    if (isSelected) {
      return;
    }
    setSelectedMembers([...selectedMembers, member]);
    setMembers([]);
  };

  const handleMemberDeselect = (member: any) => {
    setSelectedMembers(selectedMembers.filter((m: any) => m.id !== member.id));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMembers = useCallback(
    debounce((value: string) => {
      getMembers(value);
    }, 500),
    []
  );

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedGetMembers(value);
  };

  const isMemberSelected = (member: any) => {
    return selectedMembers.some(
      (selectedMember: any) => selectedMember.id === member.id
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-full cursor-pointer" variant="outline">
          <PlusIcon className="w-4 h-4 text-black mr-2" />
          New Project
        </Button>
      </DialogTrigger>
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
              <FormField
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
              />
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
                        {members.length > 0 && (
                          <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
                            {members.map((member: any) => (
                              <div
                                className="p-1 cursor-pointer hover:bg-gray-100"
                                key={member.id}
                                onClick={() => handleMemberSelect(member)}
                              >
                                {isMemberSelected(member) ? (
                                  <CheckIcon className="inline-block mr-2 text-green-500" />
                                ) : (
                                  <User className="inline-block mr-2" />
                                )}
                                <span className="text-xs font-medium">
                                  {member.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {selectedMembers.length > 0 && (
                          <div className="w-full flex gap-2 flex-wrap mt-2">
                            <span className="text-xs font-medium">
                              Members:
                            </span>
                            {selectedMembers.map((member: any) => (
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
