import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { boardDto, cardDto } from "@/app/boards/dto/board";
import {
  BoardColumnDtoType,
  BoardType,
  CardType,
} from "@/app/boards/types/boards";
import { userDto } from "@/app/projects/dto/user";
import { UserDtoType } from "@/app/projects/types/users";

export async function GET(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = await params;
  console.log("board ID:", boardId);

  try {
    const board: BoardType | null = await prisma.board.findUnique({
      where: {
        id: boardId as string,
      },
    });

    if (!board) {
      return NextResponse.json({ error: "No board found" }, { status: 404 });
    }

    // Map the boards to a simpler object structure
    const mappedBoard = boardDto(board);

    let membersArray: UserDtoType[] = [];

    // Get members details if members exist
    if (mappedBoard.members && (mappedBoard.members as string[]).length > 0) {
      const members = await prisma.user.findMany({
        where: {
          id: {
            in: mappedBoard.members as string[],
          },
        },
      });
      membersArray = members.map(userDto);
    }

    const boardColumns = await prisma.boardColumn.findMany({
      where: {
        boardId: boardId as string,
      },
      orderBy: {
        position: "asc",
      },
    });

    const mappedBoardColumns: BoardColumnDtoType[] = await Promise.all(
      boardColumns.map(async (column) => {
        const cards: CardType[] = await prisma.card.findMany({
          where: {
            boardColumnId: column.id,
          },
        });

        return {
          id: column.id,
          boardId: column.boardId,
          name: column.name,
          position: column.position,
          createdAt: column.createdAt,
          updatedAt: column.updatedAt,
          cards: cards.map(cardDto),
        };
      })
    );

    return NextResponse.json(
      {
        board: mappedBoard,
        members: membersArray,
        boardColumns: mappedBoardColumns,
      },
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch board" },
      { status: 500 }
    );
  }
}
