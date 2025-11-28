// src/PlaylistContext.js
import { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();
export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([
    { name: "My Playlist", songs: [] },
  ]);

  const addSongToPlaylist = (playlistName, song) => {
    console.log(playlistName);
    setPlaylists((prev) =>
      prev.map((p) =>
        p.name === playlistName
          ? {
              ...p,
              songs: p.songs.some((s) => s.id === song.id)
                ? p.songs // avoid duplicates
                : [...p.songs, song],
            }
          : p
      )
    );
  };

  const removeSongFromPlaylist = (playlistName, songId) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.name === playlistName
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
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
