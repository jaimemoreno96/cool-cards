import { redirect } from "next/navigation";

import { cachedAuth } from "../lib/session";

import { ProjectsList } from "./components/projects-list";
import { StarIcon } from "lucide-react";
import FavoriteProjectsList from "./components/favorite-projects-list/favorite-projects-list";

const ProjectsPage = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?callbackUrl=/projects");
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <h1 className="text-2xl font-bold">Projects</h1>
      <p>
        Welcome to your projects. Here you can find all the projects you have
        created or are currently member of.
      </p>
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
    </div>
  );
};

export default ProjectsPage;
