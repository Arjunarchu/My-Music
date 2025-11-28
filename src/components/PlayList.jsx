import { usePlaylists } from "./PlaylistContext";
import NavBar from "./NavBar";

export default function Playlist() {
  const { playlists, removeSongFromPlaylist } = usePlaylists();

  const playlist = playlists.find((p) => p.name === "My Playlist");

  console.log(playlist?.songs?.length);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      <NavBar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">🎶 My Playlist</h2>
        {playlist && playlist.songs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlist.songs.map((song) => (
              <div key={song.id} className="p-4 bg-white/10 rounded-2xl shadow-lg">
                <img src={song.imgUrl} alt={song.title} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="mt-3 font-semibold text-sm sm:text-base">{song.title}</h3>
                <p className="text-sm text-gray-300">{song.singer}</p>
                <audio controls src={song.songUrl} className="w-full mt-3 h-8 rounded-lg"></audio>
                <button
                  onClick={() => removeSongFromPlaylist("My Playlist", song.id)}
                  className="mt-3 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No songs added yet!</p>
        )}
      </main>
    </div>
  );
}
