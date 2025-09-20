import { userDto } from "@/app/projects/dto/user";
import { UserType } from "@/app/projects/types/users";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Request Data:", data);
    

    const members = await prisma.user.findMany({
      where: {
        email: {
          contains: data.value,    
        },
        name: {
          contains: data.value,
        },
        NOT: {
            id: data.userId, // Exclude the current user
        }
      },
    });

    if (!members || members.length === 0) {
      return NextResponse.json({ error: "No members found" }, { status: 404 });
    }

    // Map the members to a simpler object structure
    const mappedMembers = members.map(userDto);

    return NextResponse.json({ members: mappedMembers , total: members.length}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
