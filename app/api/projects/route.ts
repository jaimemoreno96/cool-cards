import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        members: data.members,
        userId: data.userId,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 }
      );
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
