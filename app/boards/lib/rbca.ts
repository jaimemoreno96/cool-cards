export const permissions = {
  BOARD_CREATE: "board:create",

  BOARD_READ: "board:read",

  BOARD_UPDATE: "board:update",

  BOARD_DELETE: "board:delete",

  PROJECT_MANAGE: "project:manage",

  USER_ADMIN: "user:admin",
};

export const rolePermissions = {
  ADMIN: Object.values(permissions),

  USER: [
    permissions.BOARD_CREATE,

    permissions.BOARD_READ,

    permissions.BOARD_UPDATE,

    permissions.BOARD_DELETE,
  ],
};

export const getPermissionsForRole = (role: "ADMIN" | "USER") => {
  const normalizedRole = role.trim().toUpperCase() as "ADMIN" | "USER";
  return rolePermissions[normalizedRole];
};
