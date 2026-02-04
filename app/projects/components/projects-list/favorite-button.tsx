import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useProjects } from "../../hooks/useProjects";

interface FavoriteButtonProps {
  projectId: string;
  isFavorite: boolean;
  userId: string;
}
const FavoriteButton = ({
  projectId,
  isFavorite,
  userId,
}: FavoriteButtonProps) => {
  const { updateFavoritedProjects } = useProjects(userId);
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    updateFavoritedProjects(projectId, !isFavorite);
  };

  return (
    <>
      {isFavorite ? (
        <Button
          variant="ghost"
          className="cursor-pointer z-10 favorite-button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleFavoriteClick(e);
          }}
        >
          <StarIcon className="text-yellow-500 fill-current transition duration-200" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="cursor-pointer z-10 favorite-button is-not-favorite"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleFavoriteClick(e);
          }}
        >
          <StarIcon className="text-gray-400 transition duration-200" />
        </Button>
      )}
    </>
  );
};

export default FavoriteButton;
