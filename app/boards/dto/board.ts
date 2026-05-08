import {
  BoardColumnDtoType,
  BoardColumnType,
  BoardDtoType,
  BoardType,
  CardDtoType,
  CardType,
} from "../types/boards";

export const boardDto = (board: BoardType): BoardDtoType => {
  return {
    id: board.id,
    name: board.name,
    description: board.description || "",
    projectId: board.projectId || "",
    userId: board.userId || "",
    favorite: board.favorite,
    imageName: board.imageName,
    imageUrl: board.imageUrl,
    members: board.members,
  };
};

export const boardColumnDto = (column: BoardColumnType): BoardColumnDtoType => {
  return {
    id: column.id,
    boardId: column.boardId,
    name: column.name,
    position: column.position,
  };
};

export const cardDto = (card: CardType): CardDtoType => {
  return {
    id: card.id,
    userId: card.userId,
    boardId: card.boardId,
    boardColumnId: card.boardColumnId,
    name: card.name,
    description: card.description,
    position: card.position,
    tags: card.tags,
    image: card.image,
    members: card.members,
  };
};
