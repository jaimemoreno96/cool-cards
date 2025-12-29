"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import { useProject } from "../../hooks/useProject";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormName from "./form-name";
import Member from "./member";
import MembersDialog from "../members-dialog";

import {
  ProjectInfoType,
  ProjectMembersType,
  projectInfoSchema,
  projectMembersSchema,
} from "../../lib/definitions";
import { UpdateProject } from "../../data/project";
import { ProjectDtoType } from "@/app/projects/types/projects";
import { UserDtoType } from "@/app/projects/types/users";
import { getMemberById } from "../../data/user";

interface ProjectInfoProps {
  projectId?: string;
}
const ProjectInfo = ({ projectId }: ProjectInfoProps) => {
  console.log("Project ID:", projectId);

  const { project, projectError, projectIsLoading, mutateProject } = useProject(
    projectId || ""
  );

  const [isNameEditable, setIsNameEditable] = useState<boolean>(false);
  const [membersData, setMembersData] = useState<UserDtoType[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<UserDtoType[]>([]);

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
        },
        false
      );
      return;
    }
    mutateProject();
  };

  console.log(project);

  useEffect(() => {
    const members: string[] = Array.isArray(project?.project?.members)
      ? (project.project.members as string[])
      : [];
    const fetchMembers = async () => {
      if (!members.length) return;

      try {
        const memberPromises = members.map(async (memberId) => {
          const response = await getMemberById(memberId);
          if (!response.status || response.status !== 200)
            throw new Error("Failed to fetch member");
          const data = await response.data;
          return data.member;
        });

        const membersResult = await Promise.all(memberPromises);
        setMembersData(membersResult.filter(Boolean));
        setSelectedMembers(membersResult.filter(Boolean));
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [project?.project?.members]);

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
            {project?.members?.map((member: UserDtoType) => (
              <Member key={member.id} member={member} />
            ))}
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
