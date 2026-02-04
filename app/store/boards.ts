import { create } from "zustand";
import { BoardDtoType } from "../boards/types/boards";

interface BoardsState {
    boards: BoardDtoType[];
    favoriteBoards: BoardDtoType[];
    error: string | null;
    setBoards: (boards: BoardDtoType[]) => void;
    setFavoriteBoards: (boards: BoardDtoType[]) => void;
    addBoard: (board: BoardDtoType) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    clearBoards: () => void;
}

export const useBoardsStore = create<BoardsState>((set, get) => ({
    boards: [],
    favoriteBoards: [],
    error: null,
    setBoards: (boards: BoardDtoType[]) => set({ boards }),
    setFavoriteBoards: (favoriteBoards: BoardDtoType[]) => {
        const filteredBoards = favoriteBoards.filter((board) => board.favorite);
        set({ favoriteBoards: filteredBoards });
    },
    addBoard: (board: BoardDtoType) => set((state) => ({ boards: [...state.boards, board] })),
    setError: (error: string | null) => set({ error }),
    clearError: () => set({ error: null }),
    clearBoards: () => set({ boards: [] }),
}));