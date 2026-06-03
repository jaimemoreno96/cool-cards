import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { CardResponse } from "@/app/boards/types/boards";
import { cardDto } from "@/app/boards/dto/board";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { userId, boardId,  boardColumnId, cardName, position } = data;

    console.log("Request Data:", data);

    const newCard = await prisma.card.create({
      data: {
        userId,
        boardId,
        boardColumnId,
        name: cardName,
        position,
      },
    });

    if (!newCard) {
      return NextResponse.json(
        { error: "Failed to create card" },
        { status: 500 }
      );
    }

    const mappedCard = cardDto(newCard);

    const response: CardResponse = {
      card: mappedCard,
    };

    await prisma.boardColumn.update({
      where: {
        id: boardColumnId,
      },
      data: {
        cards: {
          connect: {
            id: newCard.id,
          },
        },
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 }
    );
  }
};
