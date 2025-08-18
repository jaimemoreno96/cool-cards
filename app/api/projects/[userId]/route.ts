import { projectDto } from "@/app/projects/data/dto/project";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  console.log("User ID:", userId);

  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: userId as string,
      },
    });

    if (!projects || projects.length === 0) {
      return NextResponse.json({ error: "No projects found" }, { status: 404 });
    }

    // Map the projects to a simpler object structure
    const mappedProjects = projects.map(projectDto);

    return NextResponse.json(mappedProjects, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
