import { boardColumnDto } from "@/app/boards/dto/board";
import { BoardColumnResponse } from "@/app/boards/types/boards";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const { userId, boardId, columnName, position } = data;

    console.log("Request Data:", data);

    const newColumn = await prisma.boardColumn.create({
      data: {
        boardId,
        name: columnName,
        position,
      },
    });

    if (!newColumn) {
      return NextResponse.json(
        { error: "Failed to create column" },
        { status: 500 }
      );
    }

    const mappedColumn = boardColumnDto(newColumn);

    const response: BoardColumnResponse = {
      boardColumn: mappedColumn,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create column" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (request: Request) => {
  try {
    const data = await request.json();
    const { boardColumnId, boardId, columnName, position } = data;

    console.log("Request Data:", data);

    const updatedColumn = await prisma.boardColumn.update({
      where: {
        id: boardColumnId,
      },
      data: {
        boardId,
        name: columnName,
        position,
      },
    });

    if (!updatedColumn) {
      return NextResponse.json(
        { error: "Failed to update column" },
        { status: 500 }
      );
    }

    const mappedColumn = boardColumnDto(updatedColumn);

    const response: BoardColumnResponse = {
      boardColumn: mappedColumn,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update column" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
