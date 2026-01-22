import { FolderArchiveIcon } from "lucide-react";

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

interface EmptyProjectsProps {
    userId: string;
}

const EmptyProjects = ({ userId }: EmptyProjectsProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderArchiveIcon />
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
            <Button className="w-full h-auto shadow hover:shadow-lg transition cursor-pointer">Create Project</Button>
          </NewProject>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyProjects;
