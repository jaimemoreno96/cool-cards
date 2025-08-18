"use server";

import { prisma } from "@/lib/prisma";
import { userDto } from "./dto/user";
import { cachedAuth } from "@/app/lib/session";

export const getMembersByEmail = async (value: string) => {
  try {
    const session = await cachedAuth();
    console.log("Session:", session);
    const user = session?.user;

    const members = await prisma.user.findMany({
      where: {
        email: {
          contains: value,
          not: user?.email,
        },
      },
    });

    // Map the members to a simpler object structure
    const mappedMembers = members.map(userDto);

    return mappedMembers;
  } catch (error) {
    console.log(error);
    return [];
  }
};
