import { redirect } from "next/navigation";

import { cachedAuth } from "@/app/lib/session";
import { ProjectInfo } from "../components/project-info";

const ProjectBoardsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const session = await cachedAuth();
  const { projectId } = await params;
  console.log("Session:", session);
  console.log("Project ID:", projectId);
  
  const user = session?.user;

  if (!user) {
    redirect(`/api/auth/signin?callbackUrl=/boards/${projectId}`);
  }

  return (
    <>
      <ProjectInfo projectId={projectId} />
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 p-8 w-full">
        page
      </div>
    </>
  );
};

export default ProjectBoardsPage;
