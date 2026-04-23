import { BoardDtoType, BoardType } from "../types/boards";

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
