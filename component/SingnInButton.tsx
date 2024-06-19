"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {

  const { data: session } = useSession();


  return (
	  <div className="flex items-center justify-center mt-10">

      {!session ? (
		  <button
          onClick={() => signIn("google")}
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <div className="mr-2">
            <Image src="/google-icon.svg" alt="Google icon" width={20} height={20} />
          </div>
          Sign in with Google
        </button>
      ) : (
        <div>

        </div>
      )}
    </div>
  );
}
