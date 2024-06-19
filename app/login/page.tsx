import SignInButton from "@/component/SingnInButton";
import AuthRedirect from "@/component/authRedirect";

export default async function Home() {


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to AI paradise</h1>
  <SignInButton/>
    </div>
  );
}
