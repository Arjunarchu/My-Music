import { useEffect, useState } from "react";
import '../App.css';
import NavBar from "./NavBar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useFavorites } from "./FavoriteContext";
import { usePlaylists } from "./PlaylistContext";
import HeartButton from "./HeartButton";

export default function Home() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const { favorites, addToFavorites } = useFavorites()
    useEffect(() => {
        async function fecthSongs() {
            try {
                const res = await fetch('/db.json')
                if (!res.ok) {
                    console.log("Error", res.status)
                }
                const data = await res.json();
                console.log("fetched data", data);
                setSongs(data.items);
            }
            catch (error) {
                console.log("Catch Error", error)
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fecthSongs()
    }, []);

    const { addSongToPlaylist } = usePlaylists();

    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase()))

    if (loading) return <p className="text-center mt-10 text-white">Loading songs...</p>;
    if (error) return <p className="text-center mt-10 text-red-400">Error: {error.message}</p>;

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
            <NavBar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
                <h1 className="font-bold text-2xl sm:text-3xl mb-6">🎶 Song Lists</h1>

                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        className="border border-gray-300 bg-slate-900/50 text-white w-full sm:w-3/4 lg:w-1/2 input rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Search your favorite songs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song) => {
                            
                            return (
                                <div
                                    key={song.id}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center p-4"
                                >
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 mb-3">
                                        <img
                                            src={song.imgUrl}
                                            alt={song.title}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="flex items-start w-full justify-between gap-2">
                                        <h3 className="text-sm sm:text-base font-semibold flex-1">
                                            {song.title}
                                        </h3>
                                        <HeartButton song={song}/>
                                    </div>

                                    <div className="flex flex-col items-start w-full mt-2">
                                        <p className="text-sm text-gray-300">Singer: {song.singer}</p>
                                        <span className="inline-block mt-2 text-xs bg-pink-600/80 px-2 py-1 rounded-full">
                                            {song.genre}
                                        </span>
                                    </div>

                                    <audio
                                        controls
                                        src={song.songUrl}
                                        className="mt-3 rounded-lg w-full mb-3 h-8"
                                        onPlay={(e) => {
                                            const audios = document.querySelectorAll("audio");
                                            audios.forEach((audio) => {
                                                if (audio !== e.target) {
                                                     audio.pause();
                                                    }
                                                });
                                        }}
                                    ></audio>
                                    <button
                                        className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl cursor-pointer text-sm font-medium hover:bg-gray-300 transition"
                                        onClick={() => addSongToPlaylist("My Playlist", song)}
                                    >
                                        Add to Playlist
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-gray-300">No songs found</p>
                    )}
                </div>
            </main>
        </div>
    );
}
