import { ApiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface CreateBoardRequest {
  name: string;
  projectId: string;
  userId: string;
  image?: BoardImage | null;
}

export interface BoardImage {
  name: string;
  url: string;
}

export interface BoardResponse {
  id: string;
  name: string;
  projectId: string;
  userId: string;
  image?: BoardImage;
}

export interface BoardsResponse {
  boards: BoardResponse[];
}

class BoardApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getBoards(projectId: string): Promise<BoardResponse[]> {
    const response = await this.client.get<BoardResponse[]>(ENDPOINTS.BOARDS.DETAIL(projectId));
    return response.data;
  }

  async getBoard(boardId: string): Promise<BoardResponse> {
    const response = await this.client.get<BoardResponse>(ENDPOINTS.BOARDS.DETAIL(boardId));
    return response.data;
  }

  async createBoard(data: CreateBoardRequest): Promise<BoardResponse> {
    const response = await this.client.post<BoardResponse>(ENDPOINTS.BOARDS.CREATE, data);
    return response.data;
  }

  async updateBoard(boardId: string, data: Partial<CreateBoardRequest>): Promise<BoardResponse> {
    const response = await this.client.put<BoardResponse>(ENDPOINTS.BOARDS.DETAIL(boardId), data);
    return response.data;
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.client.delete(ENDPOINTS.BOARDS.DETAIL(boardId));
  }

  async fetchImages(): Promise<BoardImage[]> {
    const response = await this.client.get<BoardImage[]>(ENDPOINTS.BOARDS.BASE);
    return response.data;
  }
}

export { BoardApi };