import { createContext, useContext, useState } from "react";
import {toast} from 'react-toastify';

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const addToFavorites = (song) => {
    setFavorites((previousFav) => {
      if (previousFav.some((s) => s.id === song.id)) {
        alert(`${song.title} song has already in favourite`)
        return previousFav;
      }

      toast.success(`${song.title} song is added to favourite list`)
      return [...previousFav, song];

    })

  }
  const removeFromFavorites = (songId,songTitle) => {
    setFavorites((previousFav) =>{
      toast.error(`removed ${songTitle} from favourite list`)
      return previousFav.filter((s) => s.id !== songId)
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
