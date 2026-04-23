import { prisma } from "@/lib/prisma";
import { rolePermissions } from "./rbca";

export const canAccessBoard = async (
  userId: string,

  boardId: string,

  action: string
) => {
  const membership = await prisma.userBoardIsMember.findUnique({
    where: {
      userId_boardId: { userId, boardId },
    },
  });

  return membership && checkPermission(membership.role, action);
};

const checkPermission = (role: string, action: string) => {
  // Handle invalid inputs
  if (!role || !action) {
    console.warn("Invalid role or action provided to checkPermission");
    return false;
  }

  // Normalize inputs (uppercase for role matching)
  const normalizedRole = role.trim().toUpperCase();
  const normalizedAction = action.trim();

  // Get permissions for the role
  const rolePermissionsMap: Record<string, string[]> = {
    ADMIN: rolePermissions.ADMIN,
    USER: rolePermissions.USER,
  };

  const permissions = rolePermissionsMap[normalizedRole];

  if (!permissions) {
    console.warn(`Unknown role: ${role}`);
    return false;
  }

  return permissions.includes(normalizedAction);
};
