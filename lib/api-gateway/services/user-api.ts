import { ApiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface MembersResponse {
  members: User[];
}

class UserApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getMembers(): Promise<User[]> {
    const response = await this.client.get<User[]>(ENDPOINTS.USERS.MEMBERS);
    return response.data;
  }

  async getMember(userId: string): Promise<User> {
    const response = await this.client.get<User>(ENDPOINTS.USERS.MEMBER_DETAIL(userId));
    return response.data;
  }

  async searchMembers(query: string): Promise<User[]> {
    const response = await this.client.get<User[]>(ENDPOINTS.USERS.MEMBERS, {
      params: { search: query },
    });
    return response.data;
  }
}

export { UserApi };