import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { boardDto } from "@/app/boards/dto/board";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("User ID:", id);

  try {
    const boards = await prisma.board.findMany({
      where: {
        userId: id as string,
      },
    });

    if (!boards || boards.length === 0) {
      return NextResponse.json(
        { boards: [], error: "No boards found" },
        { status: 404 }
      );
    }

    // Map the projects to a simpler object structure
    const mappedBoards = await Promise.all(
      boards.map(async (board) => {
        const isFavorite = await prisma.userBoardFavorites.findFirst({
          where: {
            AND: [{ boardId: board.id }, { userId: id as string }],
          },
        });
        const mappedBoard = boardDto(board);
        mappedBoard.favorite = isFavorite ? true : false;

        return mappedBoard;
      })
    );

    return NextResponse.json(
      {
        boards: mappedBoards.sort((a, b) => a.name.localeCompare(b.name)),
        total: mappedBoards.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}
