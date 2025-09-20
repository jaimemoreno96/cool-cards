import Image from "next/image";
import { redirect } from "next/navigation";

import { cachedAuth } from "../lib/session";
import ProvidersButtons from "./components/providers-buttons";

import logo from "../../public/cool-cards-logo.png";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (user) {
    redirect("/projects");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-magnolia">
      <div className="max-w-md min-w-96 mobile:w-full flex flex-col p-4 rounded-md bg-white">
        <Image
          src={logo}
          className="m-auto"
          width={0}
          height={200}
          alt="logo"
        />
        {children}
        <p className="text-sm text-center mt-6">Or sign in with</p>
        <ProvidersButtons />
      </div>
    </div>
  );
};
export default AuthLayout;
