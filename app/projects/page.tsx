import { NewProject, ProjectsList } from "./components";

import { cachedAuth } from "../lib/session";
import { redirect } from "next/navigation";

const ProjectsPage = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?callbackUrl=/projects");
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8 w-full">
      <NewProject userId={user?.id || ""} />
      <ProjectsList userId={user?.id || ""} />
    </div>
  );
};

export default ProjectsPage;
