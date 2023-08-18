import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import getCurrentUser from '../../actions/getCurrentUser';

export async function POST(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions)

    const user = await getCurrentUser();
    const userId = user?.id
    const body = await req.json();

    const { name } = body;

  //   const prismaUser = await prisma.user.findUnique({
  //     where: {
  //         email: session?.user?.email || undefined 
  //     }
  // })

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      }
    });
  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};