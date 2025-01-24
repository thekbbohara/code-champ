import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { cuid: string } }) {
  const { cuid } = params;

  try {
    const room = await prisma.room.findUnique({
      where: { id: cuid },
      include: {
        createdBy: true,
        config: true,
        participants: {
          include: {
            user: true,
            state: true
          }
        },
        challenge: {
          include: {
            testCases: true,
            solutions: {
              include: {
                content: true,
                user: true
              }
            }
          }
        },
        roomChat: {
          include: {
            messages: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
