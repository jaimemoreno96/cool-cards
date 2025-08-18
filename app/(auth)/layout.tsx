import Image from "next/image";

import { signIn } from "next-auth/react";

import logo from "../../public/cool-cards-logo.png";
import googleIcon from "./assets/google.svg";
import githubIcon from "./assets/github.svg";
import { cachedAuth } from "../lib/session";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (user) {
    window.history.replaceState({}, "", "/projects");
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
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => {
              signIn("google");
            }}
          >
            <Image src={googleIcon} alt="google" width={40} height={40} />
          </button>
          <button
            type="button"
            onClick={() => {
              signIn("github");
            }}
          >
            <Image src={githubIcon} alt="github" width={40} height={40} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
