import { userDto } from "@/app/projects/dto/user";
import { UserType } from "@/app/projects/types/users";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;

    const member = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: "No member was found" },
        { status: 404 }
      );
    }

    // Map the member to a simpler object structure
    const mappedMember = userDto(member);

    return NextResponse.json({ member: mappedMember }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}
