"use client";
import { StarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { setFavoriteProject } from "../data/project";
import { useState } from "react";

interface FavoriteButtonProps {
  projectId: string;
  isFavorite: boolean;
}
const FavoriteButton = ({ projectId, isFavorite }: FavoriteButtonProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const response = await setFavoriteProject(projectId, !isFavorite);
    if (response.status !== 200) {
      // Handle error (e.g., show a notification)
      console.error("Failed to update favorite status");
      return;
    }
    setFavorite(!favorite);
  };

  return (
    <>
      {favorite ? (
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
