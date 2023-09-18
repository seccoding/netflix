import axios from "axios";
import { useEffect, useState } from "react";

import "./MovieList.css"
import Popup from "./Popup";

export default function MovieList( {genreId, searchKeyword} ) {

    const [scrollable, setScrollable] = useState(true)
    const [movies, setMovies] = useState([])
    const [searchKeywordState, setSearchKeywordState] = useState()

    useEffect(() => {
        if (searchKeyword) {
            setSearchKeywordState(searchKeyword)
        }
    })

    useEffect(() => {
        // undefined ==> false,
        // null ==> false
        // "" ==> false,
        // 0 ==> false
        // false ==> false
        if (genreId) {
            setScrollable(true)
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3cc0c46b7fd6181b12a5d89d2a40c0a8&language=ko-KR&with_genres=${genreId}`)
                 .then((response) => {
                    setMovies(response.data.results)
                 })
        }
        else if (searchKeyword) {
            setScrollable(false)
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3cc0c46b7fd6181b12a5d89d2a40c0a8&language=ko-KR&query=${searchKeyword}`)
                 .then((response) => {
                    setMovies(response.data.results)
                 })
        }
    }, [searchKeywordState, scrollable])

    return(
        <ul className={scrollable ? "movie_list" : "search_list"}>
            {
                movies.map((movie) => <Movie key={movie.id}
                                             id={movie.id}
                                             title={movie.title}
                                             posterPath={movie.poster_path} />)
            }
        </ul>
    );

}

export function Movie( {id, title, posterPath }) {

    const [viewModal, setViewModal] = useState(false)

    return (
        <li className="movie">
            <div>
                <img src={"http://image.tmdb.org/t/p/w154/" + posterPath} 
                     title={title}
                     onClick={() => setViewModal(true)} />
            </div>
            { viewModal && <Popup id={id} setViewModal={setViewModal} /> }
        </li>
    );

}