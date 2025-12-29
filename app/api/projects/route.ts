import { projectDto } from "@/app/projects/dto/project";
import { userDto } from "@/app/projects/dto/user";
import { ProjectType } from "@/app/projects/types/projects";
import { UserDtoType } from "@/app/projects/types/users";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        { error: "Failed to create project" },
        { status: 500 }
      );
    }
    const mappedProject = projectDto(project);

    let membersArray: UserDtoType[] = [];

    // Get members details if members exist
    if (
      mappedProject.members &&
      (mappedProject.members as string[]).length > 0
    ) {
      const members = await prisma.user.findMany({
        where: {
          id: {
            in: mappedProject.members as string[],
          },
        },
      });
      membersArray = members.map(userDto);
    }
    return NextResponse.json({ project: mappedProject, members: membersArray }, { status: 200 });
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
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }
    const mappedProject = projectDto(project);
    let membersArray: UserDtoType[] = [];

    // Get members details if members exist
    if (
      mappedProject.members &&
      (mappedProject.members as string[]).length > 0
    ) {
      const members = await prisma.user.findMany({
        where: {
          id: {
            in: mappedProject.members as string[],
          },
        },
      });
      membersArray = members.map(userDto);
    }
    return NextResponse.json({ project: mappedProject, members: membersArray }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
