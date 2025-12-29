import { projectDto } from "@/app/projects/dto/project";
import { userDto } from "@/app/projects/dto/user";
import { ProjectType } from "@/app/projects/types/projects";
import { UserDtoType } from "@/app/projects/types/users";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params;
  console.log("User ID:", projectId);

  try {
    const project: ProjectType | null = await prisma.project.findUnique({
      where: {
        id: projectId as string,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "No project found" }, { status: 404 });
    }

    // Map the projects to a simpler object structure
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

    return NextResponse.json(
      { project: mappedProject, members: membersArray },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
