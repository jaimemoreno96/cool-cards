import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { projectDto } from "@/app/projects/dto/project";
import { userDto } from "@/app/projects/dto/user";
import { ProjectType } from "@/app/projects/types/projects";
import { UserDtoType, UserRoles } from "@/app/projects/types/users";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const members = data.members ? data.members?.split(",") : [];
    console.log("Members: ", members);

    const project: ProjectType = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        members: members,
        userId: data.userId,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "No project was created" },
        { status: 404 }
      );
    }

    await prisma.userProjectIsMember.create({
      data: {
        projectId: project.id,
        userId: data.userId,
        role: UserRoles.ADMIN,
      },
    });

    await prisma.userProjectIsMember.createMany({
      data: members.map((memberId: string) => {
        return {
          projectId: project.id,
          userId: memberId,
          role: UserRoles.USER,
        };
      }),
    });

    const mappedProject = projectDto(project);

    return NextResponse.json({ project: mappedProject }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const members = data.members ? data.members?.split(",") : [];

    const project: ProjectType = await prisma.project.update({
      where: {
        id: data.projectId,
      },
      data: {
        name: data.name,
        description: data.description,
        members: members,
      },
    });
    if (!project) {
      return NextResponse.json({ error: "No project found" }, { status: 404 });
    }
    const mappedProject = projectDto(project);
    let membersArray: UserDtoType[] = [];

    // Get members details, and add or update members if members exist
    await prisma.userProjectIsMember.deleteMany({
      where: {
        projectId: project.id,
      },
    });

    if (
      mappedProject.members &&
      (mappedProject.members as string[]).length > 0
    ) {
      const projectMembers = await prisma.user.findMany({
        where: {
          id: {
            in: mappedProject.members as string[],
          },
        },
      });

      membersArray = projectMembers.map(userDto);

      await prisma.userProjectIsMember.create({
        data: {
          projectId: project.id,
          userId: project.userId,
          role: UserRoles.ADMIN,
        },
      });

      await prisma.userProjectIsMember.createMany({
        data: members.map((memberId: string) => {
          return {
            projectId: project.id,
            userId: memberId,
            role: UserRoles.USER,
          };
        }),
      });
    }

    return NextResponse.json(
      { project: mappedProject, members: membersArray },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `Failed to update project: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
