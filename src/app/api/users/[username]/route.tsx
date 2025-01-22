import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/users/[username]
export async function GET(
  _: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[username] 
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  try {
    //const session = await getServerSession(authOptions);

    // Check if user is authenticated and updating their own profile
    //if (!session || session.user?.username !== params.username) {
    //  return NextResponse.json(
    //    { error: 'Unauthorized' },
    //    { status: 401 }
    //  );
    //}

    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatarUrl: true,
        tokens: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
