"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import { useProject } from "../../../boards/hooks/useProject";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormName from "./form-name";
import Member from "./member";

import {
  ProjectInfoType,
  ProjectMembersType,
  projectInfoSchema,
  projectMembersSchema,
} from "../../../boards/lib/definitions";
import { UpdateProject } from "../../../boards/data/project";
import { ProjectDtoType } from "@/app/projects/types/projects";
import { UserDtoType } from "@/app/projects/types/users";
import { MembersDialog } from "../members-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectInfoProps {
  projectId?: string;
}
const ProjectInfo = ({ projectId }: ProjectInfoProps) => {
  console.log("Project ID:", projectId);

  const { project, projectError, projectIsLoading, mutateProject } = useProject(
    projectId || ""
  );

  const [isNameEditable, setIsNameEditable] = useState<boolean>(false);

  const defaultValuesInfo = {
    name: project?.project?.name || "",
    description: project?.project?.description || "",
  };

  const defaultValuesMembers = {
    members: "",
  };

  const formInfo = useForm<ProjectInfoType>({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: defaultValuesInfo,
  });

  const formMembers = useForm<ProjectMembersType>({
    resolver: zodResolver(projectMembersSchema),
    defaultValues: defaultValuesMembers,
  });

  const onSubmit: SubmitHandler<ProjectInfoType> = async ({
    name,
    description,
  }: ProjectInfoType) => {
    console.log("Form submitted:", name, description);
    setIsNameEditable(false);
    const response = await UpdateProject(projectId || "", {
      name,
      description,
      members: project?.project?.members?.toString() || "",
    });
    if (response.status === 200) {
      console.log("Project updated successfully:", response.data);
      mutateProject(
        {
          project: {
            ...response?.data?.project,
            name: name,
            description: description,
          } as ProjectDtoType,
          members: response?.data?.members as UserDtoType[],
        },
        false
      );
      return;
    }
    mutateProject();
  };

  console.log(project);

  return (
    <>
      {projectIsLoading ? <p>Loading...</p> : <p>Loaded</p>}
      <Form {...formInfo}>
        <form onSubmit={formInfo.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {isNameEditable ? (
              <FormName
                formInfo={formInfo}
                setIsNameEditable={setIsNameEditable}
                defaultValue={defaultValuesInfo.name}
                onSubmit={onSubmit}
              />
            ) : (
              <h1
                className="text-2xl font-bold hover:cursor-pointer hover:bg-gray-100 w-fit rounded-lg"
                onClick={() => {
                  formInfo.setValue("name", project?.project?.name || "");
                  setIsNameEditable(true);
                }}
              >
                {project?.project?.name} - Boards
              </h1>
            )}
          </div>
        </form>
      </Form>
      <MembersDialog
        formMembers={formMembers}
        mutateProject={mutateProject}
        projectId={projectId || ""}
        userId={project?.project?.userId || ""}
        members={project?.members || []}
      >
        {project?.members?.length ? (
          <div className="relative overflow-hidden *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale transition-all duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 p-2 w-fit rounded-lg">
            {project?.members?.slice(0, 3).map((member: UserDtoType) => (
              <Member key={member.id} member={member} />
            ))}
            {project?.members?.length > 3 && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>+{project?.members?.length - 3}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ) : (
          <Button className="w-fit cursor-pointer" variant="outline">
            <PlusIcon />
            Add Members
          </Button>
        )}
      </MembersDialog>
    </>
  );
};

export default ProjectInfo;
