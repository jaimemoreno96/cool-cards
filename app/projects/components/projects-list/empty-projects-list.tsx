import { FolderArchiveIcon, FolderXIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

import NewProject from "./new-project";

interface EmptyProjectsListProps {
  userId: string;
}

const EmptyProjectsList = ({ userId }: EmptyProjectsListProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderXIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <NewProject userId={userId || ""}>
            <Button className="w-full h-auto shadow hover:shadow-lg transition cursor-pointer">
              Create Project
            </Button>
          </NewProject>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyProjectsList;
