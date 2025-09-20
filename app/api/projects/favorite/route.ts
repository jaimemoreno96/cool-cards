import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { projectId, favorite } = data;
    
    console.log("Request Data:", data);

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        favorite: favorite,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
