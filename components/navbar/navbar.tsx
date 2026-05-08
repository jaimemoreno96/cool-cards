"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

import { Button } from "../ui/button";
import Logout from "./logout";

const Navbar = () => {
  const elementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    // Safely check if we are in the browser environment
    if (elementRef.current) {
      const height = elementRef.current.getBoundingClientRect().height;
      console.log("Component height:", height);
      // You can now use the height value (e.g., save it in a state)
    }
  }, []);
  return (
    <nav
      ref={elementRef}
      className="bg-white p-2 text-black shadow-md w-full z-0"
    >
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
           <Logout />
          </li>
        </ul>
        <Button className="md:hidden">
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
