import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prismadb from '../../../../db/index';
import authOptions from '@/app/lib/auth';

export async function POST(request: NextRequest) {



	const session = await getServerSession(authOptions);
	// return NextResponse.json({ message: session });


  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const email = session.user?.email || "";
	const body=await request.json();
	const whichAiCredit=body.page;

  const userApiLimit = await prismadb.user.findUnique({
    where: { email },
  });

  if (userApiLimit) {
    await prismadb.user.update({
      where: { email },
      data: {
        [whichAiCredit]: { decrement: 1 }
      }
    });

    return NextResponse.json({ message: 'Credits updated successfully' });
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}
