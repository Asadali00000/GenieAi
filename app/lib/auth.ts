import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";
const prisma = new PrismaClient();
 const authOptions={

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret:process.env.GOOGLE_CLIENT_SECRET || ""
		})
	],
	pages:{
  signIn:'../login'
	},
	callbacks: {
		async signIn({ user }:{user :{email:string | null |  undefined }}):Promise<Boolean> {
		  // Ensure email is string | undefined
		  const email = user.email ?? undefined;

		  // Check if the user exists in the database
		  const existingUser = await prisma.user.findUnique({
			where: { email }
		  });

		  if (!existingUser) {
			// If user doesn't exist, create a new one
			await prisma.user.create({
			  data: {
				// name: user.name,
				email: user.email?? "",
				chatCredit:10,
				musicCredit : 10,
				imageCredit:10,
				CodeCredit :10

			  }
			});
		  }

		  return true; // Return true to continue the sign-in process
		},

	}


}
export default authOptions



