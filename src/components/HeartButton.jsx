// HeartButton.jsx
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "./FavoriteContext";

export default function HeartButton({ song }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  // Check if song is already in favourites
  const isFavourite = favorites.some((s) => s.id === song.id);

  const handleClick = () => {
    if (isFavourite) {
      removeFromFavorites(song.id, song.title);
    } else {
      addToFavorites(song);
    }
  };

  return (
    <button onClick={handleClick} className="cursor-pointer">
      {isFavourite ? (
        <FaHeart className="text-red-500"/>
      ) : (
        <FaRegHeart />
      )}
    </button>
  );
}
