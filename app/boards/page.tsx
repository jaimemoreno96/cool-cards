import { redirect } from "next/navigation";
import { cachedAuth } from "../lib/session";
import { StarIcon } from "lucide-react";
import { BoardsList } from "./components/boards-list";
import FavoriteBoardsList from "./components/favorite-boards-list/favorite-boards-list";

const MetaData = {
  title: "Boards",
  description: "Boards",
};

const BoardsPage = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?callbackUrl=/boards");
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <h1 className="text-2xl font-bold">Boards</h1>
      <p>
        Welcome to your boards. Here you can find all the boards you have
        created or are currently member of.
      </p>
      <h3 className="text-md font-normal text-black flex items-center">
        <span className="font-semibold">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-current mr-2" />
        </span>{" "}
        Your favorite boards
      </h3>
      <FavoriteBoardsList userId={user?.id || ""} />
      <h3 className="text-md font-normal text-black flex items-center">
        All your boards
      </h3>
      <BoardsList userId={user?.id || ""} />
    </div>
  );
};
export default BoardsPage;
