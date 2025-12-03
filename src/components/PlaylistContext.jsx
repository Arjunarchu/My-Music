import { createContext, useContext, useState } from "react";
import {toast} from 'react-toastify';

const PlaylistContext = createContext();
export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([
    { name: "My Playlist", songs: [] },
  ]);

  const addSongToPlaylist = (playlistName, song) => {
    console.log(playlistName);
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.name === playlistName) {
          if (p.songs.some((s) => s.id === song.id)) {
            toast.warn(`${song.title} song already in Playlist`)
            return p;
          }
          toast.success(`${song.title} song added to playlist`);
          return { ...p, songs: [...p.songs, song] }
        }
      })
    );
  };

  const removeSongFromPlaylist = (playlistName, songId,songName) => {
    setPlaylists((prev) =>
      prev.map((p) =>{
        if(p.name === playlistName){
          toast.error(`Removed ${songName} song from playlist`);
          return{...p, songs : p.songs.filter((s) => s.id !== songId)}
        }
        return p;
      })
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
