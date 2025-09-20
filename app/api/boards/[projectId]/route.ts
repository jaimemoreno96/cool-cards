import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { boardDto } from "@/app/boards/dto/board";

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params;
  console.log("User ID:", projectId);

  try {
    const boards = await prisma.board.findMany({
      where: {
        projectId: projectId as string,
      },
    });

    if (!boards || boards.length === 0) {
      return NextResponse.json({ error: "No boards found for the project" }, { status: 404 });
    }

    // Map the projects to a simpler object structure
    const mappedBoards = boards.map(boardDto);

    return NextResponse.json(mappedBoards, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}
