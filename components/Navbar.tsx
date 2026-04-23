import Link from "next/link";
import Image from "next/image";

import { signOut } from "@/auth";

import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";


const Navbar = () => {
  return (
    <nav className="bg-white p-2 text-black shadow-md w-full z-0">
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              src="./cool-cards-logo.svg"
              alt="logo"
              width={150}
              height={50}
            />
          </Link>
        </div>
        {/* Hide on mobile */}
        <ul className="space-x-4 hidden md:flex">
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
        <Button className="md:hidden"><MenuIcon /></Button>
      </div>
    </nav>
  );
};

export default Navbar;
