import { PrismaClient, MessageType, RoomStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.$transaction([
    prisma.solutionContent.deleteMany(),
    prisma.solution.deleteMany(),
    prisma.testCase.deleteMany(),
    prisma.challenge.deleteMany(),
    prisma.participantState.deleteMany(),
    prisma.participant.deleteMany(),
    prisma.roomConfig.deleteMany(),
    prisma.roomMessage.deleteMany(),
    prisma.roomChat.deleteMany(),
    prisma.room.deleteMany(),
    prisma.directMessage.deleteMany(),
    prisma.globalMessage.deleteMany(),
    prisma.globalChat.deleteMany(),
    prisma.proMessage.deleteMany(),
    prisma.proChat.deleteMany(),
    prisma.preference.deleteMany(),
    prisma.transaction.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create basic test user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      username: "testuser",
      name: "Test User",
      password: "password123",
      tokens: 100,
    },
  });

  // First create the room
  const room = await prisma.room.create({
    data: {
      userId: user.id,
      tokenPool: 1000,
      status: RoomStatus.WAITING,
    },
  });

  // Then create the room chat with the room ID
  const roomChat = await prisma.roomChat.create({
    data: {
      roomId: room.id,
      messages: {
        create: [
          {
            content: "Welcome to the room",
            userId: user.id,
            type: MessageType.TEXT,
          },
        ],
      },
    },
  });

  // Update the room with the chat ID
  await prisma.room.update({
    where: { id: room.id },
    data: { roomChatId: roomChat.id },
  });

  // Create a basic challenge
  await prisma.challenge.create({
    data: {
      roomId: room.id,
      title: "Test Challenge",
      description: "Simple test challenge",
      difficulty: "Easy",
      testCases: {
        create: [
          {
            input: "test input",
            output: "test output",
          },
        ],
      },
    },
  });

  console.log("Basic seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
