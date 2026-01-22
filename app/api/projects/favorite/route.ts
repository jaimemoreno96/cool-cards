import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { projectId, userId, favorite } = data;

    console.log("Request Data:", data);

    const favoriteExists = await prisma.userProjectFavorites.findFirst({
      where: {
        AND: [{ projectId: projectId }, { userId: userId }],
      },
    });
    if (favoriteExists) {
      await prisma.userProjectFavorites.delete({
        where: {
          id: favoriteExists.id,
        },
      });
    } else {
      await prisma.userProjectFavorites.create({
        data: {
          projectId: projectId,
          userId: userId,
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
