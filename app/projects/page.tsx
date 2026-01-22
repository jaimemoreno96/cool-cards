import { redirect } from "next/navigation";

import { cachedAuth } from "../lib/session";

import { ProjectsList } from "./components/projects-list";

const ProjectsPage = async () => {
  const session = await cachedAuth();
  console.log("Session:", session);
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin?callbackUrl=/projects");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Projects</h1>
      <p>
        Welcome to your projects. Here you can find all the projects you have
        created or are currently member of.
      </p>
      <ProjectsList userId={user?.id || ""} />
    </>
  );
};

export default ProjectsPage;
