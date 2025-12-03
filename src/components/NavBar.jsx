import { useState } from "react";
import { FaHeart, FaHome, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Top bar for mobile */}
            <nav className="bg-gray-900 text-white w-full md:hidden border-b border-gray-800">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="text-lg font-bold tracking-wide">Rythm Music</div>
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="p-2 rounded-md border border-gray-700 hover:bg-gray-800"
                        aria-label="Toggle navigation"
                    >
                        <span className="block w-5 h-0.5 bg-white mb-1"></span>
                        <span className="block w-5 h-0.5 bg-white mb-1"></span>
                        <span className="block w-5 h-0.5 bg-white"></span>
                    </button>
                </div>
            </nav>

            {/* Sidebar (slide from right on mobile, static on right on desktop) */}
            <nav
                className={`bg-gray-900 text-white md:w-64 md:min-h-screen border-l md:border-l border-gray-800
                fixed inset-y-0 right-0 z-40 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "translate-x-full"} 
                md:relative md:translate-x-0`}
            >
                <div className="px-4 py-4 md:py-6 h-full flex flex-col">
                    {/* Header with close button on mobile */}
                    <div className="flex items-center justify-between mb-6 md:hidden">
                        <div className="text-lg font-bold tracking-wide">Rythm Music</div>
                        <button
                            onClick={closeMenu}
                            className="p-2 rounded-md border border-gray-700 hover:bg-gray-800"
                            aria-label="Close navigation"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Desktop title */}
                    <div className="hidden md:block text-xl font-bold tracking-wide mb-6">
                        Rythm Music
                    </div>

                    <ul className="flex flex-col gap-4 text-sm sm:text-base mt-2">
                        <li className="flex items-center gap-3 hover:text-pink-400 transition">
                            <FaHome />
                            <Link to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li className="flex items-center gap-3 hover:text-pink-400 transition">
                            <FaList />
                            <Link to="/playlist" onClick={closeMenu}>Playlists</Link>
                        </li>
                        <li className="flex items-center gap-3 hover:text-pink-400 transition">
                            <FaHeart />
                            <Link to="/favorite" onClick={closeMenu}>Favorites</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Backdrop for mobile when menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={closeMenu}
                ></div>
            )}
        </>
    );
}