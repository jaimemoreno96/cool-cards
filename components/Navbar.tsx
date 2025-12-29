import Link from "next/link";
import Image from "next/image";

import { signOut } from "@/auth";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 text-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image src="/cool-cards-logo.png" width={120} height={40} alt="logo" className="m-auto" />
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button className="rounded-sm text-sm font-normal" type="submit">Sign Out</Button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
