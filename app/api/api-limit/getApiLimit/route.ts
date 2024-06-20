// app/api/api-limit/route.ts

import { getServerSession } from 'next-auth';
import prismadb from '../../../../db/index';
import authOptions from '@/app/lib/auth';

export async function GET() {

	const session = await getServerSession(authOptions);



	console.log("inside get api limit ")
  const email = session?.user?.email || '';
  const user = await prismadb.user.findUnique({
    where: {
      email
    }
  });
  const credit = {
    CodeCredit: user?.CodeCredit || 0,
    chatCredit: user?.chatCredit || 0,
    imageCredit: user?.imageCredit || 0,
    musicCredit: user?.musicCredit || 0
  };

  return new Response(JSON.stringify({ credit }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
