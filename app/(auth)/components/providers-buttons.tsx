import Image from "next/image";

import { signIn } from "@/auth";

import googleIcon from "../assets/google.svg";
import githubIcon from "../assets/github.svg";
import { signInWithProvider } from "../actions/auth";

const ProvidersButtons = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        type="button"
        onClick={() => {
          signInWithProvider("google");
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
  );
};

export default ProvidersButtons;
