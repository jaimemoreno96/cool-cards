import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  try {
    const data = await request.json();
    const { boardId, userId, favorite } = data;

    console.log("Request Data:", data);

    const favoriteExists = await prisma.userBoardFavorites.findFirst({
      where: {
        AND: [{ boardId }, { userId }],
      },
    });
    if (favoriteExists) {
      await prisma.userBoardFavorites.delete({
        where: {
          id: favoriteExists.id,
        },
      });
    } else {
      await prisma.userBoardFavorites.create({
        data: {
          boardId,
          userId,
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update favorite board" },
      { status: 500 }
    );
  }
};
