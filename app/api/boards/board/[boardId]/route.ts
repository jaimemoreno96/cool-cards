import { boardDto } from "@/app/boards/dto/board";
import { BoardType } from "@/app/boards/types/boards";
import { projectDto } from "@/app/projects/dto/project";
import { userDto } from "@/app/projects/dto/user";
import { ProjectType } from "@/app/projects/types/projects";
import { UserDtoType } from "@/app/projects/types/users";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    return NextResponse.json(
      { board: mappedBoard, members: membersArray },
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
