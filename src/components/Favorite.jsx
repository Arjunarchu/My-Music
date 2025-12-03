import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useFavorites } from "./FavoriteContext";
import NavBar from "./NavBar";
import HeartButton from "./HeartButton";

export default function Favorites() {
    const { favorites } = useFavorites();
    console.log(favorites.length);

    return (
        <div className="favorites min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
            <NavBar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">🎶 Favorite Songs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.length > 0 ? (
                        favorites.map((song) => {
                            const isFavorite = favorites.some((fav) => fav.id === song.id);
                            return (
                                <div
                                    key={song.id}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex flex-col justify-center items-center p-4"
                                >
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 mb-3">
                                        <img src={song.imgUrl} alt={song.title} className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div className="flex items-start w-full justify-between gap-2">
                                        <h3 className="text-sm sm:text-base font-semibold flex-1">{song.title}</h3>
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
                                </div>
                            );
                        })
                    ) : (
                        <div className="px-5 col-span-full">
                            <p className="text-center text-gray-300">No favorite songs!</p>
                        </div>
                    )
                    }
                </div>
            </main>
        </div>
    );
}
