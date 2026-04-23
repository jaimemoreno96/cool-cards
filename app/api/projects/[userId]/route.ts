import { projectDto } from "@/app/projects/dto/project";
import { ProjectDtoType, ProjectType } from "@/app/projects/types/projects";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  console.log("User ID:", userId);

  try {
    const projects: ProjectType[] = await prisma.project.findMany({
      where: {
        userId: userId as string,
      },
      orderBy: {
        name: "desc",
      },
    });

    if (!projects || projects.length === 0) {
      return NextResponse.json(
        {
          projects: [],
          total: 0,
          error: "No projects found",
        },
        {
          status: 404,
        }
      );
    }

    // Map the projects to a simpler object structure
    const mappedProjects = await Promise.all(
      projects.map(async (project) => {
        const isFavorite = await prisma.userProjectFavorites.findFirst({
          where: {
            AND: [{ projectId: project.id }, { userId: userId }],
          },
        });

        const mappedProject = projectDto(project);
        mappedProject.favorite = isFavorite ? true : false;

        return mappedProject;
      })
    );

    return NextResponse.json(
      {
        projects: mappedProjects,
        total: mappedProjects.length,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
