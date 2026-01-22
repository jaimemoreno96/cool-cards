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
            <Image
              src="/cool-cards-logo.png"
              alt="logo"
              className="m-auto object-contain"
              priority
              width={120}
              height={40}
            />
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li className="mr-4 flex items-center">
            <Link href="/boards" className="text-sm font-normal">
              Boards
            </Link>
          </li>
          <li className="mr-4 flex items-center">
            <Link href="/projects" className="text-sm font-normal">
              Projects
            </Link>
          </li>
          <li>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button className="rounded-sm text-sm font-normal" type="submit">
                Sign Out
              </Button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
