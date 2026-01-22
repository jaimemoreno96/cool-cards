"use client";
import { useState } from "react";
import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { setFavoriteProject } from "../../data/project";

interface FavoriteButtonProps {
  projectId: string;
  isFavorite: boolean;
  userId: string;
}
const FavoriteButton = ({ projectId, isFavorite, userId }: FavoriteButtonProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setFavorite(!favorite);
      const response = await setFavoriteProject(projectId, userId, !isFavorite);
      if (response.status !== 200) {
        console.error("Failed to update favorite status");
        // Handle error (e.g., show a notification)
        setFavorite(isFavorite);
        return;
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Handle error (e.g., show a notification)
      setFavorite(isFavorite);
      return;
    }
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
