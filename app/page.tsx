import { redirect } from "next/navigation";

import { cachedAuth } from "./lib/session";

import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";

import { ProjectsList } from "./projects/components/projects-list";
import { StarIcon } from "lucide-react";
import FavoriteProjectsList from "./projects/components/favorite-projects-list/favorite-projects-list";
import BoardsList from "./boards/components/boards-list/boards-list";

const Home = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <>
      <Navbar />
      <div>Welcome, {user.name || "User"}!</div>
      <h1 className="text-2xl font-bold">Boards</h1>
    <h3 className="text-md font-normal text-black flex items-center">All your boards</h3>
    <BoardsList userId={user?.id || ""} />
      <Separator />
      <h1 className="text-2xl font-bold">Projects</h1>
      <h3 className="text-md font-normal text-black flex items-center">
        <span className="font-semibold">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-current mr-2" />
        </span>{" "}
        Your favorite projects
      </h3>
      <FavoriteProjectsList userId={user?.id || ""} />
      <h3 className="text-md font-normal text-black flex items-center">
        All your projects
      </h3>
      <ProjectsList userId={user?.id || ""} />
    </>
  );
};
export default Home;
