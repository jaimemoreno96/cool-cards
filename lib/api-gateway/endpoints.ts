export const ENDPOINTS = {
  PROJECTS: {
    BASE: '/projects',
    BY_USER: (userId: string) => `/projects/${userId}`,
    DETAIL: (projectId: string) => `/projects/project/${projectId}`,
    FAVORITE: '/projects/favorite',
    CREATE: '/projects',
  },
  BOARDS: {
    BASE: '/boards',
    DETAIL: (id: string) => `/boards/${id}`,
    CREATE: '/boards',
  },
  USERS: {
    MEMBERS: '/users/members',
    MEMBER_DETAIL: (userId: string) => `/users/members/${userId}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;