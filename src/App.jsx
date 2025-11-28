import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PlayList from './components/PlayList';
import Favorite from './components/Favorite';
import { FavoritesProvider } from './components/FavoriteContext';
import { PlaylistProvider } from './components/PlaylistContext';


function App() {
  return (
    <FavoritesProvider>
      <PlaylistProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path='/My-Music/' element={<Home />} />
              <Route path='/playlist' element={<PlayList />} />
              <Route path='/favorite' element={<Favorite />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PlaylistProvider>
    </FavoritesProvider>
  );
}

export default App
