import { create } from "zustand";
import {
  BoardColumnDtoType,
  BoardDtoType,
  BoardImage,
  CardDtoType,
} from "../boards/types/boards";

interface BoardsState {
  selectableBoardImages: BoardImage[];
  optimisticBoards: Partial<BoardDtoType>[];
  optimisticBoardColumn: Partial<BoardColumnDtoType>[];
  optimisticCards: Partial<CardDtoType>[];
  isLoading: boolean;
  error: string | null;
  setSelectableBoardImages: (images: BoardImage[]) => void;
  setOptimisticBoards: (
    boards: Partial<BoardDtoType> | Partial<BoardDtoType>[]
  ) => void;
  setOptimisticBoardColumn: (
    boardColumn: Partial<BoardColumnDtoType> | Partial<BoardColumnDtoType>[]
  ) => void;
  setOptimisticCards: (
    cards: Partial<CardDtoType> | Partial<CardDtoType>[]
  ) => void;
  clearOptimisticBoards: () => void;
  clearOptimisticBoardColumn: () => void;
  clearOptimisticCards: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useBoardsStore = create<BoardsState>((set, get) => ({
  selectableBoardImages: [],
  optimisticBoards: [],
  optimisticBoardColumn: [],
  optimisticCards: [],
  isLoading: false,
  error: null,
  setSelectableBoardImages: (images: BoardImage[]) =>
    set({ selectableBoardImages: images }),
  setOptimisticBoards: (boards) =>
    set((state) => ({
      optimisticBoards: Array.isArray(boards)
        ? [...state.optimisticBoards, ...boards]
        : [...state.optimisticBoards, boards],
    })),
  setOptimisticBoardColumn: (boardColumn) =>
    set((state) => ({
      optimisticBoardColumn: Array.isArray(boardColumn)
        ? [...state.optimisticBoardColumn, ...boardColumn]
        : [...state.optimisticBoardColumn, boardColumn],
    })),
  setOptimisticCards: (cards) =>
    set((state) => ({
      optimisticCards: Array.isArray(cards)
        ? [...state.optimisticCards, ...cards]
        : [...state.optimisticCards, cards],
    })),
  clearOptimisticBoards: () => set({ optimisticBoards: [] }),
  clearOptimisticBoardColumn: () => set({ optimisticBoardColumn: [] }),
  clearOptimisticCards: () => set({ optimisticCards: [] }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));
