import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { boardDto } from "@/app/boards/dto/board";
import {
  BoardType,
  NewBoardResponse,
  UpdateBoardResponse,
} from "@/app/boards/types/boards";
import { UserDtoType, UserRoles } from "@/app/projects/types/users";
import { userDto } from "@/app/projects/dto/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, projectId, userId, members, image } = body;
    const membersArray = members ? members.split(",") : [];

    console.log("Request Body:", body);

    const newBoard = await prisma.board.create({
      data: {
        name,
        description: description || "",
        projectId: projectId || null,
        userId,
        members: membersArray,
        imageName: image.name || "default-image.png",
        imageUrl: image.url || "default-image.png",
      },
    });

    if (!newBoard) {
      return NextResponse.json(
        { error: "Failed to create board" },
        { status: 500 }
      );
    }

    const mappedBoard = boardDto(newBoard);

    await prisma.userBoardIsMember.create({
      data: {
        boardId: newBoard.id,
        userId: userId,
        role: UserRoles.ADMIN,
      },
    });

    if (membersArray && (membersArray as string[]).length > 0) {
      await prisma.userBoardIsMember.createMany({
        data: membersArray.map((memberId: string) => {
          return {
            boardId: newBoard.id,
            userId: memberId,
            role: UserRoles.USER,
          };
        }),
      });

      const boardMembers = await prisma.user.findMany({
        where: {
          id: {
            in: membersArray as string[],
          },
        },
      });

      mappedBoard.membersData = boardMembers.map(userDto);
    }

    const response: NewBoardResponse = {
      board: mappedBoard,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error creating board:", error);
    return NextResponse.json(
      { error: "Failed to create board" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const members = data.members ? data.members?.split(",") : [];

    console.log("Request Data:", data);
    console.log("Members Array:", members);

    const board: BoardType = await prisma.board.update({
      where: {
        id: data.boardId,
      },
      data: {
        name: data.name,
        description: data.description,
        members: members,
        imageName: data.imageName,
        imageUrl: data.imageUrl,
      },
    });
    if (!board) {
      return NextResponse.json({ error: "No board found" }, { status: 404 });
    }
    const mappedBoard = boardDto(board);
    let membersArray: UserDtoType[] = [];

    // Get members details, and add or update members if members exist
    await prisma.userBoardIsMember.deleteMany({
      where: {
        AND: [
          {
            boardId: board.id,
          },
          {
            role: {
              equals: UserRoles.USER,
            },
          },
        ],
      },
    });

    if (mappedBoard.members && (mappedBoard.members as string[]).length > 0) {
      const boardMembers = await prisma.user.findMany({
        where: {
          id: {
            in: mappedBoard.members as string[],
          },
        },
      });

      membersArray = boardMembers.map(userDto);

      await prisma.userBoardIsMember.createMany({
        data: members.map((memberId: string) => {
          return {
            boardId: board.id,
            userId: memberId,
            role: UserRoles.USER,
          };
        }),
      });
    }

    const updatedBoardResponse: UpdateBoardResponse = {
      board: mappedBoard,
      members: membersArray,
    };

    return NextResponse.json(updatedBoardResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `Failed to update board: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
