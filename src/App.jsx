import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import PlayList from './components/PlayList';
import Favorite from './components/Favorite';
import { FavoritesProvider } from './components/FavoriteContext';
import { PlaylistProvider } from './components/PlaylistContext';
import {ToastContainer} from 'react-toastify';


function App() {
  return (
    <FavoritesProvider>
      <PlaylistProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/playlist' element={<PlayList />} />
              <Route path='/favorite' element={<Favorite />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </PlaylistProvider>
    </FavoritesProvider>
  );
}

export default App
