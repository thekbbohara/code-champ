import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { roomId, status } = await request.json();

    if (!roomId || !status) {
      return NextResponse.json(
        { error: "Room ID and status are required" },
        { status: 400 },
      );
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: { status },
    });

    return NextResponse.json({ success: true, room: updatedRoom });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const createdBy = searchParams.get("createdby");
    if (createdBy) {
      try {
        const rooms = await prisma.room.findMany({
          where: {
            userId: createdBy,
          },
          include: {
            config: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
        });

        return NextResponse.json(rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.json(
          { success: false, error: "Failed to fetch rooms" },
          { status: 500 },
        );
      }
    } else if (roomId) {
      // Get specific room if roomId provided
      const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: {
          config: true,
        },
      });

      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, room });
    }

    // Get all rooms if no roomId provided
    const rooms = await prisma.room.findMany({
      include: {
        config: true,
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching room(s):", error);
    return NextResponse.json(
      { error: "Failed to fetch room(s)" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, entryToken, title, config } = await request.json();

    // Validate required fields
    if (!userId || !entryToken || !title || !config) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    console.log({ userId, entryToken, title, config });

    // Check if user has enough tokens
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { tokens: true },
    });
    console.log({ user });

    if (!user || user.tokens < entryToken) {
      return NextResponse.json(
        { error: "Insufficient tokens" },
        { status: 400 },
      );
    }

    // Deduct tokens from user
    await prisma.user.update({
      where: { id: userId },
      data: { tokens: user.tokens - entryToken },
    });

    // Create room
    const room = await prisma.room.create({
      data: {
        userId,
        title,
        entryToken,
        status: "WAITING",
      },
    });
    console.log({ room });

    // Create room config entries
    await prisma.roomConfig.createMany({
      data: [
        {
          roomId: room.id,
          key: "playerMode",
          value: config.playerMode,
        },
        {
          roomId: room.id,
          key: "language",
          value: config.language,
        },
      ],
    });

    // Create challenge
    //await prisma.challenge.create({
    //  data: {
    //    roomId: room.id,
    //    title,
    //    description: "",
    //    difficulty: "MEDIUM",
    //  },
    //});

    //// Create initial participant
    //await prisma.participant.create({
    //  data: {
    //    userId,
    //    roomId: room.id,
    //  },
    //});

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 },
    );
  }
}
