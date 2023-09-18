import axios from 'axios';
import { GenreList } from './components/content/Genre';
import Header from './components/layout/Header';

import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/content/Search';

function App() {

  const [genres, setGenres] = useState([])

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=3cc0c46b7fd6181b12a5d89d2a40c0a8&language=ko")
         .then((response) => {
            setGenres(response.data.genres)
         })
  }, [])
  

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={ <GenreList genres={genres} /> } />
          <Route path="/search" element={ <Search /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
