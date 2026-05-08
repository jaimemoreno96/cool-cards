import { redirect } from "next/navigation";

import { cachedAuth } from "@/app/lib/session";

import Board from "./components/board/board";
import BoardInfo from "./components/board-info/board-info";

const ProjectBoardsPage = async ({
  params,
}: {
  params: { boardId: string };
}) => {
  const session = await cachedAuth();
  const { boardId } = await params;
  console.log("Session:", session);
  console.log("Board ID:", boardId);

  const user = session?.user;

  if (!user) {
    redirect(`/api/auth/signin?callbackUrl=/boards/${boardId}`);
  }

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-56.5px)] w-full bg-linear-to-r bg-scroll from-cyan-500 to-blue-500">
      <BoardInfo userId={user.id} boardId={boardId} />
      <div className="flex-1 h-full">
        <Board userId={user.id} boardId={boardId} />
      </div>
    </div>
  );
};

export default ProjectBoardsPage;
