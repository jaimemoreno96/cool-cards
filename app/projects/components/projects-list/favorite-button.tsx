import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
  isFavorite: boolean;
  handleFavoriteOnClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}
const FavoriteButton = ({
  isFavorite,
  handleFavoriteOnClick,
  disabled,
}: FavoriteButtonProps) => {
  return (
    <>
      {isFavorite ? (
        <Button
          variant="ghost"
          className="cursor-pointer z-10 favorite-button rounded-full"
          disabled={disabled}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleFavoriteOnClick(e);
          }}
        >
          <StarIcon className="text-yellow-500 fill-current transition duration-200" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="cursor-pointer z-10 favorite-button is-not-favorite rounded-full"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleFavoriteOnClick(e);
          }}
        >
          <StarIcon className="text-gray-400 transition duration-200" />
        </Button>
      )}
    </>
  );
};

export default FavoriteButton;
